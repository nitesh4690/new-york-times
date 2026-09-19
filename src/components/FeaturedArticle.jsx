import { Link } from 'react-router-dom';
import { getDateLabel } from '../data/articles.js';
import { brokenImageFallback } from '../api/newsApi.js';

export default function FeaturedArticle({ article }) {
  return (
    <article className="featured">
      <Link to={`/article/${article.id}`} className="featured-image-link">
        <img
          src={article.image}
          alt=""
          className="featured-image"
          onError={brokenImageFallback(article.categorySlug)}
        />
      </Link>
      <div className="featured-body">
        <div className="card-kicker">
          <Link to={`/category/${article.categorySlug}`} className="card-category">
            {article.category}
          </Link>
          {article.breaking && <span className="badge badge-breaking">Breaking</span>}
        </div>
        <h2 className="featured-title">
          <Link to={`/article/${article.id}`}>{article.title}</Link>
        </h2>
        <p className="featured-excerpt">{article.excerpt}</p>
        <p className="card-meta">
          By <span className="card-author">{article.author}</span> · {getDateLabel(article.date)} ·{' '}
          {article.readTime} min read
        </p>
      </div>
    </article>
  );
}