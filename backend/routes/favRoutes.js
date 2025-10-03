import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// GET favorites
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("favorites");
    res.json(user?.favorites || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADD favorite
router.post("/", auth, async (req, res) => {
  try {
    const { movieId, title, posterPath, releaseDate } = req.body;
    if (!movieId) return res.status(400).json({ message: "Missing movieId" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = user.favorites.some(f => f.movieId === movieId);
    if (exists) return res.status(400).json({ message: "Already in favorites" });

    user.favorites.push({ movieId, title, posterPath, releaseDate });
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE favorite
router.delete("/:movieId", auth, async (req, res) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(f => String(f.movieId) !== String(movieId));
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
