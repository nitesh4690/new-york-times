// =====================================================================
// Pure array-based selectors — operate on any article collection.
// Used by the live news context (RSS / NewsAPI) and by the fallback data.
// =====================================================================

const byNewest = (a, b) =>
  new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date);

export const getFeaturedArticles = (list) => (list || []).filter((a) => a.featured);

export const getBreakingArticles = (list) => (list || []).filter((a) => a.breaking);

export const getTrendingArticles = (list) => (list || []).filter((a) => a.trending);

export const getLatestArticles = (list, count = 6) =>
  [...(list || [])].sort(byNewest).slice(0, count);

export const getArticlesByCategory = (list, slug) =>
  (list || []).filter((a) => a.categorySlug === slug);

export const getArticleById = (list, id) =>
  (list || []).find((a) => String(a.id) === String(id)) || null;

export const getRelatedArticles = (list, article, count = 3) =>
  (list || [])
    .filter((a) => String(a.id) !== String(article.id))
    .sort((a, b) => {
      const sameCat =
        Number(b.categorySlug === article.categorySlug) -
        Number(a.categorySlug === article.categorySlug);
      if (sameCat !== 0) return sameCat;
      return byNewest(a, b);
    })
    .slice(0, count);

export const searchArticles = (list, query) => {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  return (list || []).filter((a) =>
    [a.title, a.excerpt, a.author, a.category, a.sourceName]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
};