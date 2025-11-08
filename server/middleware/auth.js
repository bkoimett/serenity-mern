// server/middleware/auth.js - FIXED VERSION
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Allow both admin and staff for basic access
const staffAuth = async (req, res, next) => {
  try {
    // Call auth middleware properly
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Check if user has staff or admin role
    if (!["admin", "staff"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. Staff or admin rights required.",
      });
    }

    next();
  } catch (error) {
    // Don't send response if already sent by auth middleware
    if (!res.headersSent) {
      res.status(401).json({ message: "Authentication failed" });
    }
  }
};

// Only allow admin for sensitive operations
const adminAuth = async (req, res, next) => {
  try {
    // Call auth middleware properly
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin rights required.",
      });
    }

    next();
  } catch (error) {
    // Don't send response if already sent by auth middleware
    if (!res.headersSent) {
      res.status(401).json({ message: "Authentication failed" });
    }
  }
};

export { auth, staffAuth, adminAuth };
export default auth;
