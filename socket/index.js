// const {Server} = require("socket.io");
// const io = new Server ({cors: "*"})

// io.on("connection", (socket)=>{
//     console.log("New Connection", socket.id)
// })

// io.listen(8000, () => {
//     console.log("Server Running on port 8000")
// })

//-----------

// const fs = require('fs');
// const https = require('https');
// const express = require('express');
// const socket = require('socket.io');

// const app = express();
// const server = https.createServer({
//   key: fs.readFileSync('path/to/private-key.pem'),
//   cert: fs.readFileSync('path/to/certificate.pem'),
// }, app);
// const io = socket(server);

// // Your Socket.IO server logic goes here

// server.listen(8000, () => {
//   console.log('Server Running on port 8000 (HTTPS)');
// });

const http = require("http")
const socket = require("socket.io")

const server = http.createServer()

const io = socket(server, {
    cors: {
      origin: "https://zainapp.catalystt.co", 
      methods: ["GET", "POST"],
    },
    path: "/socket.io",
  });
  

server.listen(8000, () => {
    console.log("Server Running on port 8000")
})

let onlineUsers = []


io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });
            console.log("onlineUsers", onlineUsers);

            io.emit("getOnUsers", onlineUsers);
    });

    // add message
 
    socket.on ("sendMessage", (message)=>{
        const user = onlineUsers.find((user) => user.userId === message.recId);

        if(user){
            io.to(user.socketId).emit("getMessage", message)
        }
    })


    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnUsers", onlineUsers);
        console.log("onlineUsers", onlineUsers);
    })

});






