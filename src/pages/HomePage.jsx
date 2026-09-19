import { useNews } from '../context/NewsContext.jsx';
import FeaturedArticle from '../components/FeaturedArticle.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import TrendingList from '../components/TrendingList.jsx';
import Newsletter from '../components/Newsletter.jsx';

export default function HomePage() {
  const { getFeaturedArticles, getTrendingArticles, getLatestArticles } = useNews();
  const featured = getFeaturedArticles(); // newest first
  const [lead, ...secondary] = featured;
  const trending = getTrendingArticles();
  const latest = getLatestArticles(6);

  return (
    <>
      {/* Hero: lead story + two secondary features */}
      <section className="hero container">
        {lead && <FeaturedArticle article={lead} />}
        {secondary.length > 0 && (
          <div className="hero-secondary">
            {secondary.slice(0, 2).map((a) => (
              <ArticleCard key={a.id} article={a} compact />
            ))}
          </div>
        )}
      </section>

      {/* Latest + Trending */}
      <section className="container layout-main">
        <div className="layout-content">
          <h2 className="section-title">
            <span>Latest News</span>
          </h2>
          <div className="grid grid-2">
            {latest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>

        <aside className="sidebar">
          <h2 className="section-title">
            <span>Trending</span>
          </h2>
          <TrendingList articles={trending} />
          <div className="sidebar-box">
            <Newsletter />
          </div>
        </aside>
      </section>
    </>
  );
}