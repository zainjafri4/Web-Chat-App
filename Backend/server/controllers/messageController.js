const Message = require("../models/messageModel")

module.exports.messageCreate = async (req, res)=>{
    const {chatId, senderId, text} = req.body

    const message = new Message({
        chatId, senderId, text
    })

    try {
        const response = await message.save();
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({Error: error})
    }
}

module.exports.messagesGetAll = async (req, res)=>{
    const {chatId} = req.params;
    try {
        const messages = await Message.find({chatId})
        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json({Error: error})
    }
};