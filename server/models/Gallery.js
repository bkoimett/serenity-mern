// server/models/Gallery.js
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "nature",
        "wellness",
        "meditation",
        "retreat",
        "events",
        "facilities",
      ],
      default: "nature",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
gallerySchema.index({ category: 1, featured: 1, order: 1 });
gallerySchema.index({ featured: 1, order: 1 });

export default mongoose.model("Gallery", gallerySchema);
