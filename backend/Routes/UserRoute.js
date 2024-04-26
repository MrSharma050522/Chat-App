const express = require("express");
const router = express.Router();
const User = require("../Modal/UserModal.js");


router.post("/createNewUser", async (req, res) => {
    try {
        // console.log("Api HItted", req.body);
        const {name, email, password} = req.body;
        console.log("Name -> ", name);
        const user = await new User({ name: name, email: email, password: password });
        user.save();
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
        const users = await User.find().select("name email createdAt updatedAt chatGroups active");
        console.log("user", users);

        res.status(200).json(users);
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
})

module.exports = router;