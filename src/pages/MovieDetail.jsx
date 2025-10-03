import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard"; // your component to display a movie
import { Link } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/search/${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setMovies(data || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    // Fetch popular movies when clearing search
    setIsSearching(true);
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // Load popular movies on mount
    handleClearSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Buttons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          {searchTerm && (
            <button type="button" onClick={handleClearSearch} className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-2 transition-colors duration-200">
              <span>View All Popular</span>
            </button>
          )}
          <button
            type="submit"
            disabled={isSearching || searchTerm.trim() === ""}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Movie Results */}
      {movies.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎭</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {searchTerm ? "No movies found" : "No movies available"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm
              ? `We couldn't find any movies matching "${searchTerm}". Try searching for something else!`
              : "There seems to be an issue loading the popular movies. Please try again later."
            }
          </p>
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 font-semibold"
            >
              View Popular Movies
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date?.split("-")[0]}
              poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            />
          ))}
        </div>
      )}

      {/* Footer Note */}
      {movies.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? `Found ${movies.length} movies matching your search`
              : `Showing ${movies.length} popular movies • Scroll to explore more`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;

