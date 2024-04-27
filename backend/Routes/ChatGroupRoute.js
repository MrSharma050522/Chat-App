const express = require("express");
const router = express.Router();
const ChatGroup = require("../Modal/ChatGroupModal.js");
const User = require("../Modal/UserModal.js");

router.post("/createNewChatGroup", async (req, res) => {
    try {
        // console.log("Api HItted", req.body);
        const { groupName, createdBy, users } = req.body;
        // console.log("Name -> ", name);
        const chatGroup = await new ChatGroup({
            groupName: groupName,
            createdBy: createdBy,
            users: users,
        });
        for (let i = 0; i < users.length; i++) {
            await User.findByIdAndUpdate(users[i], {
                $push: { chatGroups: chatGroup._id },
            });
        }
        chatGroup.save();
        console.log("Logging here", chatGroup);

        res.status(200).json(chatGroup);
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
});

router.get("/getAllChatGroup", async (req, res) => {
    try {
        // console.log("Getting Here user");
        const chatGroup = await ChatGroup.find().populate("createdBy users");
        // console.log("user", chatGroup);

        res.status(200).json(chatGroup);
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
});

router.get("/getChatGroupDetailsById/:id", async (req, res) => {
    try {
        // console.log("Getting Here user");
        const chatGroupDetail = await ChatGroup.findById({
            _id: req.params.id,
        }).populate("createdBy users");
        // console.log("user", chatGroupDetail);

        res.status(200).json(chatGroupDetail);
    } catch (error) {
        console.log("Error -> ", error);
        res.status(400).json(error);
    }
});

module.exports = router;
