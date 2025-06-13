const User = require("../models/User");

// Fetch logged-in user data
const getProfile = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { email, ...updateFields } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOneAndUpdate({ email }, { $set: updateFields }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

module.exports = { updateProfile, getProfile };
