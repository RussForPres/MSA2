
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to load movie');
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError('Could not load movie details.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <main className="main-content"><p>Loading movie...</p></main>;
  if (error) return <main className="main-content"><p>{error}</p></main>;
  if (!movie) return null;

  return (
    <main className="main-content">
      <Link to="/">← Back to Home</Link>

      <h1>{movie.title}</h1>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://placehold.co/300x450?text=No+Poster'
        }
        alt={movie.title}
        style={{ width: '250px', marginTop: '20px' }}
      />

      <p><strong>Release Date:</strong> {movie.release_date || 'N/A'}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview || 'No description available.'}</p>
    </main>
  );
}

export default MovieDetails;
