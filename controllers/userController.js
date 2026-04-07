const User = require("../models/userModel.js");

// User Register
const registerUser = async (req, res) => {
try {
    const { name, email, password, confirmPassword } = req.fields; // 👈 kyunki tum express-formidable use kar rahi ho

    if (password !== confirmPassword) {
    return res.render("signup", { error: "Passwords do not match", role: "user" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.render("signup", { error: "Email already registered", role: "user" });
    }

    const newUser = new User({
    name,
    email,
      password // 👈 direct save kar rahe hain, no hashing
    });

    await newUser.save();
    res.redirect("/login?role=user");
} catch (err) {
    console.error(err);
    res.render("signup", { error: "Something went wrong", role: "user" });
}
};

// User Login
const loginUser = async (req, res) => {
try {
    const { email, password } = req.fields; // 👈 formidable use kar rahe ho

    const user = await User.findOne({ email });
    if (!user) {
    return res.render("login", { error: "User not found", role: "user" });
    }

    if (user.password !== password) {
    return res.render("login", { error: "Invalid password", role: "user" });
    }

    res.redirect("/dashboard"); // ✅ baad me user dashboard banaenge
} catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong", role: "user" });
}
};

module.exports = { registerUser, loginUser };
