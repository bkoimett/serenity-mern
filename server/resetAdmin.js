// server/resetAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Delete all existing users
    await User.deleteMany({});
    console.log("Deleted all existing users");

    // Create new admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const adminUser = new User({
      name: "System Administrator",
      email: "admin@serenityplace.org",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ New admin user created successfully");
    console.log("Email: admin@serenityplace.org");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

resetAdmin();
