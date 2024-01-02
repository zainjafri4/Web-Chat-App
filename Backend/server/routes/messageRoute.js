const express = require('express')
const router = express.Router();

const messageController = require("../controllers/messageController")


router.post("/", messageController.messageCreate);
router.get("/:chatId", messageController.messagesGetAll);


module.exports = router;