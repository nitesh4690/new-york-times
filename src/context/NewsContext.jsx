import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchLiveNews } from '../api/newsApi.js';
import { articles as fallbackArticles } from '../data/articles.js';
import * as selectors from '../api/selectors.js';

const NewsContext = createContext(null);

// Cache + in-flight share so StrictMode's double effect and rapid page loads
// don't hammer the NewsAPI quota (free tier: 100 requests/day).
const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedLive = null; // { fetchedAt, payload }
let inflight = null;

export function NewsProvider({ children }) {
  const [state, setState] = useState({
    status: 'loading', // 'loading' | 'live' | 'fallback'
    articles: fallbackArticles, // fallback renders instantly while feeds load
    source: null,
    sources: [],
    error: null,
    refreshedAt: null,
  });

  const load = useCallback(async (force = false) => {
    // Share an already-running request instead of starting a second one.
    if (inflight) return inflight;

    // Serve a fresh cached result without a new network call.
    if (!force && cachedLive && Date.now() - cachedLive.fetchedAt < CACHE_TTL_MS) {
      setState({
        status: 'live',
        articles: cachedLive.payload.articles,
        source: cachedLive.payload.provider,
        sources: cachedLive.payload.sources,
        error: null,
        refreshedAt: cachedLive.payload.refreshedAt,
      });
      return cachedLive.payload;
    }

    setState((s) => ({ ...s, status: 'loading', error: null }));
    inflight = (async () => {
      try {
        const result = await fetchLiveNews();
        if (!result.articles.length) {
          throw new Error('The live news sources returned no articles.');
        }
        cachedLive = { fetchedAt: Date.now(), payload: result };
        setState({
          status: 'live',
          articles: result.articles,
          source: result.provider,
          sources: result.sources,
          error: null,
          refreshedAt: result.refreshedAt,
        });
        return result;
      } catch (err) {
        console.warn('[News] Live feeds unreachable — showing the saved edition.', err);
        setState({
          status: 'fallback',
          articles: fallbackArticles,
          source: null,
          sources: [],
          error: err.message,
          refreshedAt: null,
        });
        return null;
      } finally {
        inflight = null;
      }
    })();
    return inflight;
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(() => {
    const list = state.articles;
    return {
      status: state.status,
      source: state.source,
      sources: state.sources,
      error: state.error,
      refreshedAt: state.refreshedAt,
      totalArticles: list.length,
      refresh: () => load(true),
      getFeaturedArticles: () => selectors.getFeaturedArticles(list),
      getBreakingArticles: () => selectors.getBreakingArticles(list),
      getTrendingArticles: () => selectors.getTrendingArticles(list),
      getLatestArticles: (count = 6) => selectors.getLatestArticles(list, count),
      getArticlesByCategory: (slug) => selectors.getArticlesByCategory(list, slug),
      getArticleById: (id) =>
        selectors.getArticleById(list, id) ||
        selectors.getArticleById(fallbackArticles, id),
      getRelatedArticles: (article, count = 3) => {
        const fromFallback = selectors.getArticleById(fallbackArticles, article.id) !== null;
        return selectors.getRelatedArticles(fromFallback ? fallbackArticles : list, article, count);
      },
      searchArticles: (query) => selectors.searchArticles(list, query),
    };
  }, [state, load]);

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within a <NewsProvider>.');
  return ctx;
}