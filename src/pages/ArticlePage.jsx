import { Link, useParams } from 'react-router-dom';
import { getDateLabel } from '../data/articles.js';
import { useNews } from '../context/NewsContext.jsx';
import { brokenImageFallback } from '../api/newsApi.js';
import ArticleCard from '../components/ArticleCard.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ArticlePage() {
  const { id } = useParams();
  const { getArticleById, getRelatedArticles } = useNews();
  const article = getArticleById(id);

  if (!article) {
    return <NotFoundPage />;
  }

  const related = getRelatedArticles(article, 3);

  return (
    <>
      <article className="container article-page">
        <div className="article-top">
          <p className="eyebrow">
            <Link to={`/category/${article.categorySlug}`}>{article.category}</Link>
          </p>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-dek">{article.excerpt}</p>

          <div className="article-meta">
            <div className="avatar" aria-hidden="true">
              {article.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="article-author">By {article.author}</div>
              <div className="article-date">
                {getDateLabel(article.date)} · {article.readTime} min read
              </div>
            </div>
          </div>

          {article.sourceUrl && article.sourceName && (
            <p className="article-source">
              Source:{' '}
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                {article.sourceName}
              </a>
            </p>
          )}
        </div>

        <figure className="article-figure">
          <img
            src={article.image}
            alt=""
            className="article-image"
            onError={brokenImageFallback(article.categorySlug)}
          />
        </figure>

        <div className="article-body">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="article-footer">
          <div className="tags">
            <span className="tag">{article.category}</span>
            <span className="tag">Daily Pulse</span>
            <span className="tag">In depth</span>
          </div>
          <div className="share-row">
            <span className="share-label">Share this story</span>
            <a href="#" className="share-btn" aria-label="Share on X">𝕏</a>
            <a href="#" className="share-btn" aria-label="Share on Facebook">f</a>
            <a href="#" className="share-btn" aria-label="Share via email">@</a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container related">
          <h2 className="section-title">
            <span>Related Stories</span>
          </h2>
          <div className="grid grid-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}