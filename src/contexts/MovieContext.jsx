
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext(null);

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("movieshelf-watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "movieshelf-watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((current) => {
      if (current.some((item) => item.id === movie.id)) {
        return current;
      }
      return [...current, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((current) =>
      current.filter((movie) => movie.id !== movieId)
    );
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId);
  }

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovies must be used inside MovieProvider");
  }

  return context;
}
