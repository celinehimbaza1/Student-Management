const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Test
router.get("/", (req, res) => {
  res.send("Auth route is working 🚀");
});

router.post("/register", registerUser);
router.post("/login", loginUser); // ✅ Add this line

module.exports = router;
