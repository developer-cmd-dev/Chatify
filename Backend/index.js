const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io')
const cors = require("cors");
app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})


let usersArr = []
let yourData = {
    id: null,
    username: null,
}
let errorMsg = {
    error: false,
    message: ''
}
io.on("connection", (socket) => {
    console.log("Socket is connected.")

    try {
        socket.on('new-user-joined', email => {
            console.log(`New User Joined - ${email} and id - ${socket.id}`)
            const newUserObj = {
                id: socket.id,
                username: email,
                iconColor: `#${Math.floor(Math.random()*1000)}`
            }
            usersArr.push(newUserObj)
            socket.emit('joined-users', usersArr)
            socket.broadcast.emit('new-user-joined', newUserObj)

        })

        socket.on('new-message', message => {
            socket.broadcast.emit('user-message', message);
        })

        socket.on('send-message', msgObj => {
            msgObj = {
                ...msgObj,
                type: 'user-message',
            }
            socket.broadcast.emit('user-message', msgObj)
        })

        socket.on('logout', email => {
            socket.disconnect()
            usersArr.forEach((users, index) => {
                if (users.username == email) {
                    usersArr.splice(index, 1)
                    console.log(usersArr)
                } 
            })
            console.log("Socket is Disconnected.");


        })


    } catch (error) {
        return error
    }


})

server.listen(5000, () => {
    console.log("Server is running at 5000");
})