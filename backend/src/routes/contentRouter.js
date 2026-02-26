const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getMyPosts
} = require("../controllers/contentController");

const router = express.Router();

// Admin-only routes
router.post("/", protect, createContent);
router.get("/", protect, getAllContent);
router.put("/:id", protect, updateContent);
router.delete("/:id", protect,  deleteContent);
router.get("/my-posts", protect,getMyPosts);
module.exports = router;