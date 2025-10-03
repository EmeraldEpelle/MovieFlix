import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const BASE_URL = "http://localhost:5000/api/movies";

  // Fetch top rated movies
  const fetchTopRated = async () => {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setMovies(data || []);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search movies
  const handleSearch = async () => {
    if (!query.trim()) return fetchTopRated(); // if empty, show top rated
    setSearching(true);
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setMovies(data || []);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-pink-500 text-lg font-semibold">
          {searching ? "Searching movies..." : "Loading top rated movies..."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            {searching ? `Search results for "${query}"` : "Top Rated Movies"}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {searching
              ? "Find the movie you are looking for."
              : "Discover the most beloved and critically acclaimed films of all time."}
          </p>

          {/* Search Box */}
          <div className="mt-6 flex justify-center gap-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 w-64 focus:outline-none focus:ring-2 focus:ring-pink-400"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="block group transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-pink-100 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm font-bold text-gray-800">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                      {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                    </span>
                    <div className="text-pink-400 group-hover:text-pink-600 transform group-hover:translate-x-1 transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        {movies.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Showing {movies.length} movies • Scroll to explore more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
