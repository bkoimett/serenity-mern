// server/routes/gallery.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { body, validationResult } from "express-validator";
import Gallery from "../models/Gallery.js";
import { auth, staffAuth } from "../middleware/auth.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Configure Cloudinary INSIDE the route to ensure env vars are loaded
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// @route   POST /api/gallery
// @desc    Create a new gallery item
// @access  Private (Staff & Admin)
router.post(
  "/",
  [
    staffAuth,
    upload.single("image"),
    body("title", "Title is required").not().isEmpty().trim(),
    body("category", "Valid category is required").isIn([
      "nature",
      "wellness",
      "meditation",
      "retreat",
      "events",
      "facilities",
    ]),
  ],
  async (req, res) => {
    try {
      console.log("Gallery POST request received");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const { title, description, category, featured } = req.body;

      let imageData;

      // Configure Cloudinary here to ensure env vars are loaded
      configureCloudinary();

      // Check if we have valid Cloudinary config
      const hasCloudinaryConfig =
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET;

      console.log("Cloudinary config check:", { hasCloudinaryConfig });

      if (hasCloudinaryConfig) {
        try {
          console.log("Uploading to Cloudinary...");
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "serenity-gallery",
                transformation: [
                  { width: 1200, height: 800, crop: "limit", quality: "auto" },
                ],
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(error);
                } else {
                  console.log(
                    "Cloudinary upload successful:",
                    result.public_id
                  );
                  resolve(result);
                }
              }
            );
            uploadStream.end(req.file.buffer);
          });

          imageData = {
            public_id: uploadResult.public_id,
            url: uploadResult.url,
            secure_url: uploadResult.secure_url,
          };
          console.log("✓ Cloudinary upload successful");
        } catch (cloudinaryError) {
          console.error("Cloudinary failed:", cloudinaryError.message);
          // Fallback to a better placeholder
          imageData = createBetterPlaceholder(title);
        }
      } else {
        console.log("Cloudinary not configured");
        imageData = createBetterPlaceholder(title);
      }

      // Create gallery item
      const galleryItem = new Gallery({
        title,
        description: description || "",
        category,
        featured: featured === "true",
        image: imageData,
        createdBy: req.user.id,
      });

      await galleryItem.save();
      await galleryItem.populate("createdBy", "name email");

      console.log("Gallery item created successfully");
      res.status(201).json(galleryItem);
    } catch (error) {
      console.error("Gallery creation error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Better placeholder that actually works
function createBetterPlaceholder(title) {
  // Use a reliable placeholder service
  const colors = ["3B82F6", "10B981", "8B5CF6", "EF4444", "F59E0B"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const text = encodeURIComponent(title.substring(0, 20));

  return {
    public_id: `placeholder_${Date.now()}`,
    url: `https://dummyimage.com/1200x800/${color}/ffffff&text=${text}`,
    secure_url: `https://dummyimage.com/1200x800/${color}/ffffff&text=${text}`,
  };
}

// @route   GET /api/gallery
// @desc    Get all gallery items with filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit = 50, page = 1 } = req.query;

    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    const galleryItems = await Gallery.find(query)
      .populate("createdBy", "name")
      .sort({ order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Gallery.countDocuments(query);

    res.json({
      items: galleryItems,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/gallery/featured
// @desc    Get featured gallery items for homepage
// @access  Public
router.get("/featured", async (req, res) => {
  try {
    const featuredItems = await Gallery.find({ featured: true })
      .populate("createdBy", "name")
      .sort({ order: 1, createdAt: -1 })
      .limit(3);

    res.json(featuredItems);
  } catch (error) {
    console.error("Featured gallery fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/gallery/categories
// @desc    Get available gallery categories with counts
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Gallery.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(categories);
  } catch (error) {
    console.error("Categories fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update a gallery item
// @access  Private (Staff & Admin)
router.put(
  "/:id",
  [
    staffAuth,
    body("title", "Title is required").not().isEmpty().trim(),
    body("category", "Valid category is required").isIn([
      "nature",
      "wellness",
      "meditation",
      "retreat",
      "events",
      "facilities",
    ]),
  ],
  async (req, res) => {
    try {
      console.log("Gallery PUT request received for:", req.params.id);
      console.log("Request body:", req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, category, featured, order } = req.body;

      const galleryItem = await Gallery.findById(req.params.id);

      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }

      // Update fields - handle featured correctly
      galleryItem.title = title;
      galleryItem.description = description || "";
      galleryItem.category = category;
      galleryItem.featured = featured === true || featured === "true";
      galleryItem.order = order || 0;

      await galleryItem.save();
      await galleryItem.populate("createdBy", "name email");

      console.log("Gallery item updated successfully");
      res.json(galleryItem);
    } catch (error) {
      console.error("Gallery update error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery item
// @access  Private (Staff & Admin)
router.delete("/:id", staffAuth, async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Configure Cloudinary for deletion
    configureCloudinary();

    // Delete image from Cloudinary if it's not a placeholder
    if (!galleryItem.image.public_id.startsWith("placeholder_")) {
      await cloudinary.uploader.destroy(galleryItem.image.public_id);
    }

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Gallery deletion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
