// =====================================================================
// The Daily Pulse — live news API layer
// ---------------------------------------------------------------------
// Primary source (zero-config, no API key): real-time RSS feeds from
// BBC News and The Guardian, fetched through public CORS proxies and
// parsed in the browser.
//
// Optional source: NewsAPI.org — activated by setting VITE_NEWSAPI_KEY
// in a .env file (see .env.example). Free tier allows 100 requests/day.
// =====================================================================

export const SOURCES = {
  world: {
    name: 'World',
    feeds: [
      'https://feeds.bbci.co.uk/news/world/rss.xml',
      'https://www.theguardian.com/world/rss',
    ],
  },
  politics: {
    name: 'Politics',
    feeds: [
      'https://feeds.bbci.co.uk/news/politics/rss.xml',
      'https://www.theguardian.com/politics/rss',
    ],
  },
  business: {
    name: 'Business',
    feeds: [
      'https://feeds.bbci.co.uk/news/business/rss.xml',
      'https://www.theguardian.com/business/rss',
    ],
  },
  technology: {
    name: 'Technology',
    feeds: [
      'https://feeds.bbci.co.uk/news/technology/rss.xml',
      'https://www.theguardian.com/technology/rss',
    ],
  },
  sports: {
    name: 'Sports',
    feeds: [
      'https://feeds.bbci.co.uk/sport/rss.xml',
      'https://www.theguardian.com/sport/rss',
    ],
  },
  health: {
    name: 'Health',
    feeds: [
      'https://feeds.bbci.co.uk/news/health/rss.xml',
      'https://www.theguardian.com/science/rss',
    ],
  },
  culture: {
    name: 'Culture',
    feeds: [
      'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
      'https://www.theguardian.com/culture/rss',
    ],
  },
};

const PROVIDER_LOOKUP = {
  'feeds.bbci.co.uk': 'BBC News',
  'www.theguardian.com': 'The Guardian',
  'theguardian.com': 'The Guardian',
};

export const FALLBACK_IMAGES = {
  world: 'https://images.unsplash.com/photo-1489514354504-1653aa90e34e?auto=format&fit=crop&w=1400&q=80',
  politics: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1400&q=80',
  business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
  technology: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80',
  health: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1400&q=80',
  culture: 'https://images.unsplash.com/photo-1566127444941-b3ad1c4164e9?auto=format&fit=crop&w=1400&q=80',
};

// ---------- Image URL hygiene ----------

// Feed image pipelines sometimes emit GCDN-style URLs, e.g.
//   https://api-prod.gothamist.com/images/358823/fill-1200x650|format-webp|webpquality-85/
// The pipe characters are URL-delimiters that must be percent-encoded,
// protocol-relative URLs should be expanded, and a stray trailing slash
// should be dropped. Anything non-http(s) is rejected so it can fall back.
export const sanitizeImageUrl = (url) => {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.startsWith('//')) cleaned = 'https:' + cleaned;
  if (!/^https?:\/\//i.test(cleaned)) return '';
  cleaned = cleaned.replace(/\|/g, '%7C');
  if (cleaned.endsWith('/')) cleaned = cleaned.slice(0, -1);
  return cleaned;
};

export const fallbackImage = (slug) => FALLBACK_IMAGES[slug] || FALLBACK_IMAGES.world;

// Bind to <img onError={...}>. Swaps a broken image for the category
// fallback exactly once, so blocked/hotlink-protected CDNs (Cloudflare
// challenges, CORP "same-origin" headers, 403s, 404s…) never leave a
// broken-image skeleton in the UI.
export const brokenImageFallback = (slug) => (event) => {
  const img = event.currentTarget;
  if (!img) return;
  img.onerror = null;
  img.src = fallbackImage(slug);
};

export const NEWSAPI_KEY = (import.meta.env && import.meta.env.VITE_NEWSAPI_KEY) || '';

// ---------- Helpers ----------

export const providerOf = (feedUrl) => {
  try {
    const host = new URL(feedUrl).hostname;
    return PROVIDER_LOOKUP[host] || host.replace(/^www\./, '');
  } catch {
    return 'News source';
  }
};

export const cleanHtml = (html) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
};

export const firstSentence = (text) => {
  if (!text) return '';
  const match = text.match(/^[^.!?]*[.!?]?/);
  const sentence = (match && match[0].trim()) || '';
  return sentence || text.slice(0, 160);
};

export const readTimeEstimate = (text) => {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(2, Math.round(words / 180));
};

// Stable, URL-derived id so links stay valid across refreshes.
export const makeId = (link) => {
  let hash = 0;
  for (let i = 0; i < link.length; i++) {
    hash = (hash << 5) - hash + link.charCodeAt(i);
    hash |= 0;
  }
  return 'n' + Math.abs(hash).toString(36);
};

// ---------- RSS via public CORS proxies ----------

const PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

async function fetchWithProxy(url, timeoutMs = 15000) {
  let lastError = null;
  for (const build of PROXIES) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(build(url), {
        signal: controller.signal,
        headers: { Accept: 'application/rss+xml, application/xml, text/xml, */*' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      let text = await res.text();
      // WhateverOrigin wraps the response in {"contents":"..."} — unwrap it.
      if (text.trimStart().startsWith('{"contents"')) {
        try {
          text = JSON.parse(text).contents || text;
        } catch {
          /* keep raw text */
        }
      }
      if (!text || !text.includes('<item')) throw new Error('Empty feed');
      return text;
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError || new Error('All proxies failed');
}

function nsText(el, localName) {
  const nodes = el.getElementsByTagNameNS('*', localName);
  return nodes.length ? (nodes[0].textContent || '').trim() : '';
}

function extractImage(el, descriptionHtml) {
  let url = '';
  for (const localName of ['content', 'thumbnail']) {
    const nodes = el.getElementsByTagNameNS('*', localName);
    for (let i = 0; i < nodes.length; i++) {
      url = nodes[i].getAttribute('url');
      if (url) break;
    }
    if (url) break;
  }
  if (!url) {
    const enc = el.querySelector('enclosure');
    if (enc && enc.getAttribute('type') && enc.getAttribute('type').startsWith('image/')) {
      url = enc.getAttribute('url');
    }
  }
  if (!url) {
    const imgMatch = descriptionHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    url = imgMatch ? imgMatch[1] : '';
  }
  return sanitizeImageUrl(url);
}

function toParagraphs(html, max = 3) {
  const clean = cleanHtml(html);
  if (!clean) return [];
  const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
  const paragraphs = sentences
    .map((s) => s.trim())
    .filter((s) => s.length > 40);
  if (!paragraphs.length) paragraphs.push(clean);
  return paragraphs.slice(0, max);
}

function normalizeRssItem(el, slug, sourceName) {
  const title = nsText(el, 'title');
  const link = nsText(el, 'link');
  if (!title || !link) return null;

  const descriptionHtml = nsText(el, 'description');
  const description = cleanHtml(descriptionHtml);
  const pubDateRaw = nsText(el, 'pubDate') || nsText(el, 'date');
  const publishedAt = pubDateRaw ? new Date(pubDateRaw).toISOString() : new Date().toISOString();
  const author = nsText(el, 'creator') || nsText(el, 'author') || sourceName;
  const paragraphBody = toParagraphs(descriptionHtml, 3);
  const body = paragraphBody.length ? paragraphBody : [firstSentence(description) || title];

  return {
    id: makeId(link),
    category: SOURCES[slug].name,
    categorySlug: slug,
    title,
    excerpt: firstSentence(description) || title,
    author,
    date: publishedAt.slice(0, 10),
    publishedAt,
    readTime: readTimeEstimate(description),
    image: extractImage(el, descriptionHtml) || FALLBACK_IMAGES[slug],
    body,
    sourceName,
    sourceUrl: link,
  };
}

function parseFeed(xml, slug, sourceName) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid RSS XML');
  const items = [...doc.querySelectorAll('item')];
  return items.map((el) => normalizeRssItem(el, slug, sourceName)).filter(Boolean);
}

async function fetchCategory(slug, perCategory = 8) {
  const config = SOURCES[slug];
  const results = await Promise.all(
    config.feeds.map(async (feedUrl) => {
      try {
        const xml = await fetchWithProxy(feedUrl);
        return parseFeed(xml, slug, providerOf(feedUrl));
      } catch (err) {
        console.warn(`[News] Feed failed for ${feedUrl}:`, err.message);
        return [];
      }
    })
  );
  const seen = new Map();
  results.flat().forEach((article) => {
    if (!seen.has(article.sourceUrl)) seen.set(article.sourceUrl, article);
  });
  return [...seen.values()]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, perCategory);
}
// ---------- Optional NewsAPI.org source ----------

const NEWSAPI_CATEGORIES = {
  world: 'general',
  politics: null, // uses the "everything" endpoint with a query
  business: 'business',
  technology: 'technology',
  sports: 'sports',
  health: 'health',
  culture: 'entertainment',
};

function normalizeNewsApiItem(art, slug) {
  const title = (art.title || '').trim();
  const url = (art.url || '').trim();
  if (!title) return null;
  const description = cleanHtml(art.description || art.content || '');
  const publishedAt = art.publishedAt || new Date().toISOString();
  return {
    id: makeId(url || title),
    category: SOURCES[slug].name,
    categorySlug: slug,
    title,
    excerpt: firstSentence(description) || title,
    author: art.author || art.source?.name || '',
    date: publishedAt.slice(0, 10),
    publishedAt,
    readTime: readTimeEstimate(art.content || description),
    image: sanitizeImageUrl(art.urlToImage) || FALLBACK_IMAGES[slug],
    body: toParagraphs(art.content || description, 3),
    sourceName: art.source?.name || 'NewsAPI',
    sourceUrl: url,
  };
}

async function fetchNewsApi(key) {
  const tasks = Object.entries(NEWSAPI_CATEGORIES).map(async ([slug, category]) => {
    try {
      const base = 'https://newsapi.org/v2';
      const params =
        category === null
          ? `q=politics&language=en&sortBy=publishedAt&pageSize=8&apiKey=${key}`
          : `country=us&category=${category}&pageSize=8&apiKey=${key}`;
      const endpoint = category === null ? '/everything' : '/top-headlines';
      const res = await fetch(`${base}${endpoint}?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message || 'NewsAPI error');
      return (data.articles || []).map((art) => normalizeNewsApiItem(art, slug));
    } catch (err) {
      console.warn(`[News] NewsAPI failed for ${slug}:`, err.message);
      return [];
    }
  });
  const groups = await Promise.all(tasks);
  return groups.flat().filter(Boolean);
}

// ---------- Assembly ----------

function applyFlags(sorted) {
  sorted.slice(0, 3).forEach((a) => {
    a.featured = true;
  });
  if (sorted[0]) sorted[0].breaking = true;

  const usedCategories = new Set();
  let count = 0;
  for (const article of sorted.slice(3)) {
    if (usedCategories.has(article.categorySlug)) continue;
    article.trending = true;
    usedCategories.add(article.categorySlug);
    count += 1;
    if (count === 4) break;
  }
}

export async function fetchLiveNews() {
  let articles = [];
  let provider = 'rss';

  if (NEWSAPI_KEY) {
    articles = await fetchNewsApi(NEWSAPI_KEY);
    provider = 'newsapi';
  } else {
    const groups = await Promise.all(Object.keys(SOURCES).map((slug) => fetchCategory(slug)));
    const seen = new Map();
    groups.flat().forEach((article) => {
      if (!seen.has(article.sourceUrl)) seen.set(article.sourceUrl, article);
    });
    articles = [...seen.values()];
  }

  if (!articles.length) {
    throw new Error('The live news sources returned no articles.');
  }

  const sorted = articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  applyFlags(sorted);

  return {
    provider,
    articles: sorted,
    sources: [...new Set(sorted.map((a) => a.sourceName))],
    refreshedAt: new Date().toISOString(),
  };
}