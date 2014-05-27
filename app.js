// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the Anagrammatix game file.
// var game = require('./game');

// Create a simple Express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res) {
    res.send('app is running <br><br><br>&copy;Kerm.is 2014')
})

var port = process.env.PORT || 3000;

// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(port);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level', 1);


// attach Socket.io to our HTTP server
// io = socketio.listen(server);
//
var room;
var roomio;

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('newRoom', function(data) {
        room = data.room;
        room = room.toUpperCase();

    });
    socket.on('room', function(room) {
        room = room;
        roomio = room.toUpperCase();

        if(roomio){
            socket.join(roomio);
        }
        // console.log('room room:', roomio)
    });

    socket.on('message', function(data) {
        // console.log('currentroom: ', roomio);
        // console.log(data);
        if(roomio){
            io.sockets.in(roomio).emit('message', data);
        }
    })

    socket.on('test', function(data) {
        // console.log(data);
        io.sockets.in(roomio).emit('test', data);
    })

    socket.on('motionData', function(data) {
        // console.log(data);
        if(roomio){
            io.sockets.in(roomio).emit('motionDataOut', data);
        }
        // io.sockets.emit('motionDataOut', data);
    })

    socket.on('move', function(data) {
        // console.log('move', data);
        if(roomio){
            io.sockets.in(roomio).emit('moved', data);
        }
        // io.sockets.emit('motionDataOut', data);
    })
});

// now, it's easy to send a message to just the clients in a given room
// io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets. in ('foobar').emit('message', 'anyone in this room yet?');
