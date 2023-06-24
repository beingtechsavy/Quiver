// node server which will handle socketio connections.
const io= require('socket.io')(8000, {
    cors: {
        origin: "*"
    }
})
const express=require('express')
const users={};
const app=express()
const cors=require('cors')
// app.use(cors({
//     origin:"http://127.0.0.1:5500",
// }))
io.on('connection', socket =>{
    socket.on('new-user-joined',name=>{
        // console.log("New User", name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined' , name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('recieve',{message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
    // enter the node server
    // type npm init
    // type nodemon ./tab

})