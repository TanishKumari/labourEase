const express = require("express");
const router = express.Router();
const Franchisee = require("../model/Franchisee");

// ADD DATA
router.post("/apply", async (req, res) => {
    try {
        console.log("DATA:", req.body); // debug

        const newFranchisee = new Franchisee(req.body);
        await newFranchisee.save();

        res.status(201).json({
            message: "Saved successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;