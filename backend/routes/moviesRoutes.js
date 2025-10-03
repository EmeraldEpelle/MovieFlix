import express from "express";
import axios from "axios";
const router = express.Router();

const BASE = "https://api.themoviedb.org/3";

// Top Rated Movies
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BASE}/movie/top_rated`, {
      params: { api_key: process.env.TMDB_API_KEY, language: "en-US", page: 1 }
    });
    res.json(response.data.results || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// Single Movie Details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE}/movie/${id}`, {
      params: { api_key: process.env.TMDB_API_KEY, language: "en-US" }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch movie" });
  }
});

// Search Movies
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`${BASE}/search/movie`, {
      params: { api_key: process.env.TMDB_API_KEY, language: "en-US", query: q, page: 1 }
    });
    res.json(response.data.results || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
});

export default router;
