import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import dotevn from 'dotenv';
import connectDB from './db/index.js';



const app = express();
app.use(cors())
const server = http.createServer(app);

dotevn.config({path:'./env'});
connectDB()











const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})


let usersArr = []


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
            socket.emit("your-data",newUserObj)

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
            console.log("Socket is Disconnected.",usersArr);


        })


    } catch (error) {
        return error
    }


})

server.listen(5000, () => {
    console.log("Server is running at 5000");
})