const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate required fields
if (!fullName || !email || !password) {
  return res.status(400).json({
    message: "All fields are required"
  });
}

// Validate email format
if (!/^\S+@\S+\.\S+$/.test(email)) {
  return res.status(400).json({
    message: "Please enter a valid email address"
  });
}

// Validate password length
if (password.length < 8) {
  return res.status(400).json({
    message: "Password must be at least 8 characters long"
  });
}

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password before saving
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = await User.create({
  fullName,
  email,
  password: hashedPassword
});

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

module.exports = { registerUser };