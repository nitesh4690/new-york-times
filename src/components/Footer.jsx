import { Link } from 'react-router-dom';
import { categories } from '../data/articles.js';
import Newsletter from './Newsletter.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-footer">
            <span className="brand-kicker">The</span>
            <span className="brand-name">Daily Pulse</span>
          </Link>
          <p className="footer-about">
            Independent journalism for curious readers. Reporting on the world with accuracy,
            fairness and a sense of wonder since 1987.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Categories">
          <h4 className="footer-heading">Sections</h4>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-nav" aria-label="Company">
          <h4 className="footer-heading">Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Ethics &amp; Standards</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </nav>

        <div className="footer-newsletter">
          <Newsletter />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2024 The Daily Pulse. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}