// server/models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    featuredImage: { type: String },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
