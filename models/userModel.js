const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
emailId: { type: String, required: true, unique: true },
password: { type: String, required: true },
phone: { type: String, required: true },
isActive: { type: Boolean, default: true },
role: { type: String, enum: ["user"], default: "user" },
createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
