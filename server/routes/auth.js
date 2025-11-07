// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { auth, adminAuth, staffAuth } from "../middleware/auth.js"; // Import all middlewares

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (admin only)
// @access  Private (Admin)
router.post(
  "/register",
  [
    adminAuth,
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
        role: role || "staff",
      });

      await user.save();

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  "/profile",
  [
    auth,
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email } = req.body;

      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put(
  "/change-password",
  [
    auth,
    body("currentPassword", "Current password is required").exists(),
    body("newPassword", "New password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id);

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET /api/auth/users
// @desc    Get all users (both admin and staff can view)
// @access  Private (Admin & Staff)
router.get("/users", staffAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/auth/users/:id
// @desc    Update user (admin only)
// @access  Private (Admin)
router.put(
  "/users/:id",
  adminAuth,
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("role", "Role is required").isIn(["admin", "staff"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, role, password } = req.body;

      // Find the user to update
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if email is already taken by another user
      if (email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
        }
      }

      // Prepare update data
      const updateData = { name, email, role };

      // If password is provided, hash it
      if (password) {
        if (password.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
        }
        const salt = await bcrypt.genSalt(12);
        updateData.password = await bcrypt.hash(password, salt);
      }

      // Update the user
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (error) {
      console.error(error.message);

      // Handle duplicate key error (email)
      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already in use" });
      }

      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/auth/users/:id
// @desc    Delete user (admin only)
// @access  Private (Admin)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent self-deletion
    if (user._id.toString() === req.user.id) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
