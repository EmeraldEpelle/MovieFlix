import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 10000, // 10 seconds timeout
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

export async function fetchPopularMovies() {
  try {
    const data = await apiClient.get("/movie/popular");
    return data.results || [];
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

export async function searchMovies(query) {
  if (!query.trim()) return [];
  
  try {
    const data = await apiClient.get("/search/movie", {
      params: { query: query.trim() }
    });
    return data.results || [];
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function fetchMovieDetails(id) {
  try {
    const data = await apiClient.get(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function fetchRecommendedMovies(id) {
  try {
    const data = await apiClient.get(`/movie/${id}/recommendations`);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
}

export async function fetchSimilarMovies(id) {
  try {
    const data = await apiClient.get(`/movie/${id}/similar`);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
}

export async function fetchMovieCredits(id) {
  try {
    const data = await apiClient.get(`/movie/${id}/credits`);
    return {
      cast: data.cast || [],
      crew: data.crew || []
    };
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return { cast: [], crew: [] };
  }
}

export async function fetchMovieVideos(id) {
  try {
    const data = await apiClient.get(`/movie/${id}/videos`);
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
}

// 🔹 NEW: Fetch top rated movies for the Movies page
export async function fetchTopRatedMovies() {
  try {
    const data = await apiClient.get("/movie/top_rated");
    return data.results || [];
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
}

// 🔹 NEW: Fetch now playing movies
export async function fetchNowPlayingMovies() {
  try {
    const data = await apiClient.get("/movie/now_playing");
    return data.results || [];
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
}

// 🔹 NEW: Fetch upcoming movies
export async function fetchUpcomingMovies() {
  try {
    const data = await apiClient.get("/movie/upcoming");
    return data.results || [];
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
}

