// server/routes/contact.js - UPDATE ALL AUTH MIDDLEWARE
import express from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import { auth, staffAuth } from "../middleware/auth.js"; // Make sure staffAuth is imported

const router = express.Router();


// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty().trim(),
    body("email", "Please include a valid email").isEmail(),
    body("phone", "Phone number is required").not().isEmpty(),
    body("message", "Message is required").not().isEmpty().trim(),
  ],
  async (req, res) => {
    try {
      console.log("📨 Contact form submission received:", req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, message, inquiryType } = req.body;

      // Create contact entry
      const contact = new Contact({
        name,
        email,
        phone,
        message,
        inquiryType: inquiryType || "general",
      });

      await contact.save();

      console.log("Contact form saved successfully:", contact._id);

      res.status(201).json({
        message: "Thank you for your message. We'll get back to you soon!",
        contactId: contact._id,
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Server error. Please try again." });
    }
  }
);

// @route   GET /api/contact
// @desc    Get all contact submissions (admin & staff)
// @access  Private (Admin & Staff)
router.get("/", staffAuth, async (req, res) => {
  // CHANGED: adminAuth → staffAuth
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission (admin & staff)
// @access  Private (Admin & Staff)
router.get("/:id", staffAuth, async (req, res) => {
  // CHANGED: adminAuth → staffAuth
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status (admin & staff)
// @access  Private (Admin & Staff)
router.put(
  "/:id/status",
  [
    staffAuth, // CHANGED: adminAuth → staffAuth
    body("status", "Valid status is required").isIn([
      "new",
      "contacted",
      "resolved",
    ]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, adminNotes } = req.body;

      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status,
          ...(adminNotes && { adminNotes }),
        },
        { new: true }
      );

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      console.error("Update contact status error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   GET /api/contact/stats/summary
// @desc    Get contact statistics (admin & staff)
// @access  Private (Admin & Staff)
router.get("/stats/summary", staffAuth, async (req, res) => {
  // CHANGED: adminAuth → staffAuth
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: "new" });
    const contactedCount = await Contact.countDocuments({
      status: "contacted",
    });
    const resolvedCount = await Contact.countDocuments({ status: "resolved" });

    // Last 7 days trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCount = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      total,
      new: newCount,
      contacted: contactedCount,
      resolved: resolvedCount,
      recent: recentCount,
    });
  } catch (error) {
    console.error("Contact stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
