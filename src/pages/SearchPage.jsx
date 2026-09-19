import { useSearchParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext.jsx';
import ArticleCard from '../components/ArticleCard.jsx';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const { searchArticles, totalArticles } = useNews();
  const results = searchArticles(query);

  return (
    <section className="container">
      <div className="page-header">
        <p className="eyebrow">Search</p>
        <h1 className="page-title">
          {query ? <>Results for &ldquo;{query}&rdquo;</> : 'Find a story'}
        </h1>
        <p className="page-subtitle">
          {query
            ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found across ${totalArticles} stories`
            : `Type a topic, author or keyword into the search box above (${totalArticles} stories indexed).`}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-2">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No stories match &ldquo;{query}&rdquo;</h2>
          <p>Try a broader term — or explore the latest news from the homepage.</p>
          <Link to="/" className="btn">Back to homepage</Link>
        </div>
      )}
    </section>
  );
}