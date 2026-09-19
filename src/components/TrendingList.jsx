import { Link } from 'react-router-dom';
import { getDateLabel } from '../data/articles.js';

export default function TrendingList({ articles }) {
  return (
    <ol className="trending-list">
      {articles.map((a, index) => (
        <li key={a.id} className="trending-item">
          <span className="trending-rank">{String(index + 1).padStart(2, '0')}</span>
          <div className="trending-info">
            <Link to={`/category/${a.categorySlug}`} className="trending-category">
              {a.category}
            </Link>
            <h3 className="trending-title">
              <Link to={`/article/${a.id}`}>{a.title}</Link>
            </h3>
            <p className="trending-meta">{getDateLabel(a.date)} · {a.readTime} min read</p>
          </div>
        </li>
      ))}
    </ol>
  );
}