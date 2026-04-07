const Admin = require("../models/adminModel.js");

// Register new admin
const registerAdmin = async (req, res) => {
try {
    const { adminName, emailId, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ emailId });
    if (existingAdmin) {
    return res.status().json({ message: "Admin already exists" });
    }

    // Save new admin in DB
    const newAdmin = new Admin({ adminName, emailId, password });
    await newAdmin.save();

    res.status().json({ message: "Admin registered successfully" });
} catch (error) {
    res.status().json({ message: "Error registering admin", error });
}
};

// Login admin
const loginAdmin = async (req, res) => {
try {
    const { emailId, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ emailId });
    if (!admin) {
    return res.status().json({ message: "Admin not found" });
    }

    // Check password (simple check, abhi bcrypt use nahi kar rahe)
    if (admin.password !== password) {
    return res.status().json({ message: "Invalid credentials" });
    }

    // ✅ Yaha redirect kar sakti ho EJS page pe
    res.status().json({ message: "Login successful" });
    // ya fir: res.redirect("/redirectlogin");
} catch (error) {
    res.status().json({ message: "Error logging in", error });
}
};

// CommonJS export
module.exports = {
registerAdmin,
loginAdmin,
};
