// config/createAdmin.js
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

/**
 * Ensures the first admin user exists.
 * Expects mongoose connection to already be open.
 *
 * @param {Object} options
 * @param {string} options.email - admin email (optional, default from env)
 * @param {string} options.password - admin password (optional, default from env)
 * @param {string} options.name - admin name (optional)
 */
export const createFirstAdmin = async ({
  email = process.env.FIRST_ADMIN_EMAIL || "admin@serenityplace.org",
  password = process.env.FIRST_ADMIN_PASSWORD || "admin123",
  name = process.env.FIRST_ADMIN_NAME || "System Administrator",
} = {}) => {
  try {
    if (!User) throw new Error("User model not found");

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log(`⚠️ Admin already exists: ${adminExists.email}`);
      return { created: false, msg: "Admin already exists" };
    }

    const adminUser = new User({
      name,
      email,
      password, // assume hashing is handled in the model pre-save hook
      role: "admin",
    });

    await adminUser.save();
    console.log(`✅ First admin user created: ${email} / ${password}`);
    return { created: true, email };
  } catch (error) {
    console.error("❌ createFirstAdmin error:", error.message);
    return { created: false, error: error.message };
  }
};
