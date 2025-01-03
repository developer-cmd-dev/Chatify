export const chatHandler = (socket)=>{
    socket.on('chat:message',(data)=>{
        const msgObj = {
            ...data,
            type:'user-message'
        }
        socket.broadcast.emit('message',msgObj)
    })

    socket.on('left-user',data=>{        
        socket.broadcast.emit('left-user',data)
    })
}