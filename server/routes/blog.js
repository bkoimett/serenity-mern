// server/routes/blog.js
import express from "express";
import { body, validationResult } from "express-validator";
import Blog from "../models/Blog.js";
import { auth, adminAuth, staffAuth } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blogs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ status: "published" })
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments({ status: "published" });

    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/blog/admin
// @desc    Get all blogs (admin sees all, staff sees only their own)
// @access  Private (Admin & Staff)
router.get("/admin", staffAuth, async (req, res) => {
  try {
    let blogs;
    if (req.user.role === "admin") {
      // Admin sees all blogs
      blogs = await Blog.find()
        .populate("author", "name")
        .sort({ createdAt: -1 });
    } else {
      // Staff only sees their own blogs
      blogs = await Blog.find({ author: req.user.id })
        .populate("author", "name")
        .sort({ createdAt: -1 });
    }
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/blog/:id
// @desc    Get single blog post
// @access  Public for published posts, Private for drafts
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // For public access, only show published posts
    if (blog.status !== "published") {
      // Check if user is authenticated and has access
      try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
          const jwt = require("jsonwebtoken");
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const User = require("../models/User.js");
          const user = await User.findById(decoded.user.id);

          if (
            user &&
            (user.role === "admin" ||
              (user.role === "staff" &&
                blog.author._id.toString() === user._id.toString()))
          ) {
            return res.json(blog);
          }
        }
      } catch (authError) {
        // Ignore auth errors and return 404
      }

      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private (Admin & Staff)
router.post(
  "/",
  [
    staffAuth,
    body("title", "Title is required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Generate slug from title
      const slug = req.body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const blog = new Blog({
        ...req.body,
        slug,
        author: req.user.id,
      });

      await blog.save();
      await blog.populate("author", "name");

      res.status(201).json(blog);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Slug already exists" });
      }
      res.status(400).json({ message: error.message });
    }
  }
);

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private (Admin & Staff - staff can only edit their own posts)
router.put(
  "/:id",
  [
    staffAuth,
    body("title", "Title is required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      // Staff can only edit their own posts, admin can edit all
      if (req.user.role !== "admin" && blog.author.toString() !== req.user.id) {
        return res
          .status(403)
          .json({
            message: "Access denied. You can only edit your own posts.",
          });
      }

      // Generate new slug if title changed
      let slug = blog.slug;
      if (req.body.title !== blog.title) {
        slug = req.body.title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { ...req.body, slug },
        { new: true }
      ).populate("author", "name");

      res.json(updatedBlog);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Slug already exists" });
      }
      res.status(400).json({ message: error.message });
    }
  }
);

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private (Admin & Staff - staff can only delete their own draft posts)
router.delete("/:id", staffAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Staff can only delete their own draft posts, admin can delete all
    if (req.user.role !== "admin") {
      if (blog.author.toString() !== req.user.id) {
        return res
          .status(403)
          .json({
            message: "Access denied. You can only delete your own posts.",
          });
      }
      if (blog.status === "published") {
        return res
          .status(403)
          .json({ message: "Access denied. You can only delete draft posts." });
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
