const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, role, course } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: role || "student",
      course: role === "student" ? course : undefined,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    // Sign JWT token (expires in 1 day)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
