const express = require("express");
const router = express.Router();
const User = require("../model/User_Registration");
const bcrypt = require("bcrypt");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        console.log("Register Data:", req.body); // debug

        // check existing user
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exists ❌" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registered successfully ✅"
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login Data:", req.body); // debug

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found ❌" });
        }

        console.log("User from DB:", user);

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password ❌" });
        }

        res.status(200).json({
            message: "Login successful ✅",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;