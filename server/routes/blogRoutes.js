const express = require("express");
const { createBlog, getBlog, allBlog } = require("../controllers/blogControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createBlog);
router.route("/").get(getBlog);
router.route("/search").get(allBlog);

module.exports = router