const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000,function(){
console.log("listening now!!");
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket){
    console.log('socket online',socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})