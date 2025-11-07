// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import galleryRoutes from "./routes/gallery.js";
import { createFirstAdmin } from "./config/createAdmin.js";
// import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/gallery", galleryRoutes);
// app.use("/api/contact", contactRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Create admin (safe — will do nothing if admin exists)
    await createFirstAdmin();
    // start server after setup
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });