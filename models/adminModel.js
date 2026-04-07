const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
adminName: { type: String, required: true },
emailId: { type: String, required: true, unique: true },
password: { type: String, required: true },
isActive: { type: Boolean, default: true },
role: { type: String, enum: ["admin"], default: "admin" },
createdAt: { type: Date, default: Date.now }
});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;

