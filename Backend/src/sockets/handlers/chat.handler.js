export const chatHandler = (socket)=>{
    socket.on('chat:message',(data)=>{
        socket.broadcast.emit('message',data)
    })
}