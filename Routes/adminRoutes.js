const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController.js");

const router = express.Router();

// Signup route (Register new Admin)
router.post("/signup", registerAdmin);

// Login route
router.post("/login", loginAdmin);

module.exports = router;


