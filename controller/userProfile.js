import User from "../model/userModel.js";
import bcrypt from "bcryptjs";


// Get Current User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token
    const { name, surname, phone, address, email, password } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password if updated
    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update user fields
    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.email = email || user.email;
    user.password = hashedPassword;

    const updatedUser = await user.save();
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete User Profile
export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


  