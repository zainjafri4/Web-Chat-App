const express = require('express');
const router = express.Router();
const chatController = require("../controllers/chatController")

router.post("/", chatController.chatCreate);
router.get("/:userId", chatController.chatFindAll);
router.get("/find/:firstId/:secondId", chatController.chatFind);

module.exports = router;