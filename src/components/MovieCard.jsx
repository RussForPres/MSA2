
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useMovies();

  const inWatchlist = isInWatchlist(movie.id);

  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some((fav) => fav.id === movie.id);
  });

  function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (fav) => fav.id !== movie.id
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  }

  function toggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster'
            }
            alt={movie.title}
          />
        </Link>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">
          <Link to={`/movie/${movie.id}`}>
            {movie.title}
          </Link>
        </h3>

        <div className="movie-details">
          <span className="movie-rating">
            ⭐ {movie.vote_average}
          </span>
          <span className="movie-year">
            {movie.release_date?.substring(0, 4) || 'N/A'}
          </span>
        </div>

        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? '♥ Remove Favorite' : '♡ Add to Favorites'}
        </button>

        <button className="favorite-button" onClick={toggleWatchlist}>
          {inWatchlist ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
