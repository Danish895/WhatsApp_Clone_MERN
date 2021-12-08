import { Server } from "socket.io";

const PORT = '';

const io = new Server (PORT, {
    cors : {
        origin : ''
    }
})

let users = [];

const addUser = (userId,socketId) => {
    !users.some(user => user.userId === userId) && users.push( {userId, socketId});
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('adduser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users)
        console.log(users);
    })

    // to send message // receiver has been turned into user
    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        console.log(text);
        io.to(user.socketId).emit('getMessage',{
            senderId, text
        })
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id)
        io.emit('getUsers', users);
    })
})