const express = require("express");
const router = express.Router();
const Shopkeeper = require("../model/Shopkeeper");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const data = req.body;

        // check email
        const exist = await Shopkeeper.findOne({ email: data.email });
        if (exist) {
            return res.status(400).json({ message: "Email already exists ❌" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new Shopkeeper({
            ...data,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registered successfully ✅"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;