const express = require("express");
const router = express.Router();
const User = require("../Modal/UserModal.js");


router.get("/createNewUser", async (req, res) => {
    try {
        const user = await new User({ name: "Sandeep Sharma", email: "test@test.com", password: "test" });
        user.save();
        console.log("Logging here", user);
        console.log("Logging here", user);
        console.log("Logging here", user);
        console.log("Logging here", user);
        console.log("Logging here", user);

        res.status(200).json(user);;
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
})

router.get("/getAllUser", async (req, res) => {
    try {
        console.log("Getting Here user");
        const users = await User.find().select("name email createdAt updatedAt");
        console.log("user", users);

        res.status(200).json(users);
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
})

module.exports = router;