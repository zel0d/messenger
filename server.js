var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('Listening for requests on port 4000...');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('New connection :', socket.id, 'from :', socket.handshake.address);

    // Handle disconnection
    socket.on('disconnect', function(){
      
    });

    // Handle chat event
    socket.on('chat', function(data){

        // Log events
        console.log(data);

        // Broadcast message
        socket.broadcast.emit('chat', data);

    });

});
