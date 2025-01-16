export const chatHandler = (socket)=>{
    socket.on('chat:message',(data)=>{
        console.log(data)
        const msgObj = {
            ...data,
            type:'user-message'
        }
        socket.broadcast.emit('users-message',msgObj)
    })

    socket.on('left-user',data=>{        
        socket.broadcast.emit('left-user',data)
    })
}