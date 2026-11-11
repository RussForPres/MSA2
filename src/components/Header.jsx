
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>

        <form className="search-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
