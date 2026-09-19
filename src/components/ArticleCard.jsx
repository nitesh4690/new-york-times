import { Link } from 'react-router-dom';
import { getDateLabel } from '../data/articles.js';
import { brokenImageFallback } from '../api/newsApi.js';

export default function ArticleCard({ article, compact = false }) {
  if (compact) {
    return (
      <article className="card card-compact">
        <Link to={`/article/${article.id}`} className="card-image-link">
          <img
            src={article.image}
            alt=""
            loading="lazy"
            className="card-image"
            onError={brokenImageFallback(article.categorySlug)}
          />
        </Link>
        <div className="card-body">
          <Link to={`/category/${article.categorySlug}`} className="card-category">
            {article.category}
          </Link>
          <h3 className="card-title">
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </h3>
          <p className="card-meta">
            {getDateLabel(article.date)} · {article.readTime} min read
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="card">
      <Link to={`/article/${article.id}`} className="card-image-link">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className="card-image"
          onError={brokenImageFallback(article.categorySlug)}
        />
      </Link>
      <div className="card-body">
        <div className="card-kicker">
          <Link to={`/category/${article.categorySlug}`} className="card-category">
            {article.category}
          </Link>
          {article.breaking && <span className="badge badge-breaking">Breaking</span>}
        </div>
        <h3 className="card-title">
          <Link to={`/article/${article.id}`}>{article.title}</Link>
        </h3>
        <p className="card-excerpt">{article.excerpt}</p>
        <p className="card-meta">
          By <span className="card-author">{article.author}</span> · {getDateLabel(article.date)} ·{' '}
          {article.readTime} min read
        </p>
      </div>
    </article>
  );
}