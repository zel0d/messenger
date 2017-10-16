var express = require('express');
var socket = require('socket.io');
// App setup
var app = express();
var server = app.listen(80, function(){
    console.log('Listening for requests on port 80...');
});

// Static files
app.use(express.static('public'));

var numUsers = 0;

// Socket setup & pass server
var io = socket(server);
io.on('connection', function(socket){
    var addedUser = false;
    console.log('New connection :', socket.id, 'from :', socket.handshake.address);


    // Handle chat event
    socket.on('chat', function(data){

        // Log events
        console.log(data);

        // Broadcast message
        socket.broadcast.emit('chat', data);

    });


    // Handle disconnection
    socket.on('disconnect', function(){

    });

});
