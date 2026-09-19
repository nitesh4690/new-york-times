import { Link, useParams } from 'react-router-dom';
import { categories } from '../data/articles.js';
import { useNews } from '../context/NewsContext.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function CategoryPage() {
  const { slug } = useParams();
  const { getArticlesByCategory } = useNews();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return <NotFoundPage />;
  }

  const articles = getArticlesByCategory(slug);
  const [lead, ...rest] = articles;

  return (
    <section className="container">
      <div className="page-header">
        <p className="eyebrow">Category</p>
        <h1 className="page-title">{category.name}</h1>
        <p className="page-subtitle">
          {articles.length} {articles.length === 1 ? 'story' : 'stories'} from the {category.name} desk
        </p>
      </div>

      {lead ? (
        <div className="category-lead">
          <ArticleCard article={lead} />
        </div>
      ) : (
        <div className="empty-state">
          <h2>No stories in {category.name} yet</h2>
          <p>Check back soon — our reporters are on the beat.</p>
          <Link to="/" className="btn">Back to homepage</Link>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-3">
          {rest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </section>
  );
}