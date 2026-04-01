const mongoose = require("mongoose");

const shopkeeperSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    shopAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    shopCategory: { type: String },
    gstNumber: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    workingHours: { type: String, required: true },
    password: { type: String, required: true },
    shopImage: { type: String },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Shopkeeper", shopkeeperSchema);