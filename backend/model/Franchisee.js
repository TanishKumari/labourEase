const mongoose = require("mongoose");

const franchiseeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    gstNumber: String,
    businessName: String,
    experience: Number,
    website: String,
    businessImage: String,
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("Franchisee", franchiseeSchema);