import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { fetchPopularMovies, searchMovies } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    
    setIsSearching(true);
    const results = await searchMovies(searchTerm);
    setMovies(results);
    setIsSearching(false);
  };

  // Handle clear search
  const handleClearSearch = async () => {
    setSearchTerm("");
    setLoading(true);
    const data = await fetchPopularMovies();
    setMovies(data);
    setLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-pink-500 text-lg font-semibold">Loading popular movies...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <span className="text-2xl text-white">🎬</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              MovieFlix
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Discover amazing movies and create your perfect watchlist
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for your favorite movies..."
              className="w-full p-4 pl-12 pr-32 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
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
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium"
                >
                  Clear
                </button>
              )}
              <button 
                type="submit"
                disabled={isSearching || searchTerm.trim() === ""}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="w-3 h-8 bg-pink-400 rounded-full mr-3"></span>
            {searchTerm ? `Search Results for "${searchTerm}"` : "Popular Movies"}
          </h2>
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-2 transition-colors duration-200"
            >
              <span>View All Popular</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>

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
                className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold"
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
                poster={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
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
                : `Showing ${movies.length} popular movies • Scroll to explore more`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
