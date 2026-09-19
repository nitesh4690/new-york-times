import { NavLink } from 'react-router-dom';
import { categories } from '../data/articles.js';
import SearchBar from './SearchBar.jsx';

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="container navbar-inner">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Home
        </NavLink>

        {categories.map((cat) => (
          <NavLink
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {cat.name}
          </NavLink>
        ))}

        <div className="nav-search">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}