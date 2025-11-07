// server/models/Contact.js - FINAL VERSION
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    inquiryType: {
      type: String,
      enum: ["general", "appointment", "counseling", "facility", "other"],
      default: "general",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "resolved"],
      default: "new",
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1, createdAt: -1 });

export default mongoose.model("Contact", contactSchema);
