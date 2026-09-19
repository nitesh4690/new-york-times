import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="container empty-state page-header">
      <p className="eyebrow">404</p>
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">
        The story you&rsquo;re looking for may have moved — or never existed.
      </p>
      <Link to="/" className="btn">Back to homepage</Link>
    </section>
  );
}