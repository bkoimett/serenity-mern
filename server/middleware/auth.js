// server/middleware/auth.js - UPDATED VERSION
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
    await auth(req, res, () => {});

    // Check if user has staff or admin role
    if (!["admin", "staff"].includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Staff or admin rights required." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

// Only allow admin for sensitive operations
const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin rights required." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export { auth, staffAuth, adminAuth };
export default auth;
