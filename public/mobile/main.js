// var socket = io.connect('http://192.168.1.13:3000');
var currentURL = window.location.href;
var loc = window.location;
var angleOffset = 1;


console.log(loc);
if (loc.port != undefined) {
    var currentURL = loc.protocol + '//' + loc.hostname + ':' + loc.port;
} else {
    var currentURL = loc.protocol + '//' + loc.hostname;
}


console.log(currentURL);
var socket = io.connect(currentURL);

var room = queryParam('roomNumber');
if (room == '') {
    room = location.hash.replace('#', '');
}
//var room = location.hash.replace('#','');

if (!room) {

    room = 'EmptyRoom' + Math.round(Math.random() * 100000)
}

var motionD, direction, sending, joystick;


$(function() {

    $('#accelerate').on('touchstart', function() {
        forward();
    });

    $('#accelerate').on('mousedown', function() {
        forward();
    });

    function forward(){
         createjs.Sound.play("eng1", {
            loop: -1
        });
        direction = "forward"
        sendMove();
    }

    $('#reverse').on('touchstart', function() {
        backWards();
    });
    $('#reverse').on('mousedown', function() {
        backWards();
    });

    function backWards(){
        createjs.Sound.play("rev", {
            loop: -1
        });
         direction = "back"
        sendMove();
    }

    $('button').on('touchend', function() {
        createjs.Sound.stop();
        // socket.emit('move', {
        //     direction: direction
        // });
        clearInterval(sending);
    });

    $('button').on('mouseup', function() {
        createjs.Sound.stop();
        clearInterval(sending);
    });


    joystick = new VirtualJoystick({
        container: document.getElementById('steeringWheel'),
        mouseSupport: true,
        // strokeStyle: '#1f7350'
        strokeStyle: '#696969',
    });

    joystick.up(function(){
        console.log('ip')
    })

    joystick.addEventListener('touchStart', function() {
        console.log('down')
    })
    joystick.addEventListener('touchEnd', function() {
        console.log('up')
    })



    socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', room);
        socket.emit('message', {
            msg: 'mobile joined room with ID ' + room,
            room: room,
            command: 'start'
        });

        $('.connect').html("Connected to " + room);
    });

    socket.on('message', function(data) {
        console.log('Incoming message:', data.msg);
    });

    socket.on('motionDataOut', function(data) {
        //console.log('Incoming message:', data);
        /*$('.x2').html(data.motion)*/
    });


    initSound();
})

function initSound() {

    console.log('test');

    if (!createjs.Sound.initializeDefaultPlugins()) {
        return;
    }

    var audioPath = "/../sound/";
    var manifest = [{
        id: "eng1",
        src: "eng1.wav"
    }, {
        id: "eng2",
        src: "eng2.wav"
    }, {
        id: "rev",
        src: "revv.mp3"
    }];

    createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerManifest(manifest, audioPath);
}

function handleLoad(event) {



}
var sendMove = function() {
    console.log(direction)
    sending = setInterval(function() {
        socket.emit('move', {
            direction: direction,
            room:room
        });
    }, 125);
}

setInterval(function() {
    // socket.emit('motionData', motionD)

    socket.emit('joystickMove', {
        room: room,
        up: joystick.up(),
        down: joystick.down(),
        left: joystick.left(),
        right: joystick.right()
    })

}, 1000 / 20)


/////// to get room from URL //////////

function queryParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
