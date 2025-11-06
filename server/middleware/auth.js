// server/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// server/middleware/auth.js - Add console logs temporarily
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    console.log('🔐 Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded successfully:', decoded);
    
    const user = await User.findById(decoded.user.id).select("-password");
    
    if (!user) {
      console.log('❌ User not found for ID:', decoded.user.id);
      return res.status(401).json({ message: "Token is not valid" });
    }

    console.log('✅ User found:', user.email, 'Role:', user.role);
    req.user = user;
    next();
  } catch (error) {
    console.log('❌ JWT verification failed:', error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

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

export { auth, adminAuth };
export default auth;
