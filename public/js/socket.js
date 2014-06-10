/////////////////////////////////////
/////   Socket Stuff
////////////////////////////////////
var room = generateRoomId();

var socketController = {
    currentURL: window.location.href,
    loc: window.location,
    room: '',
    socket: io.connect(this.currentURL),
    phoneObj: {
        rotX: 0,
        rotY: 0,
        rotZ: 0
    },
    init: function() {


        //To catch when there is a port in the url, mainly for testing
        if (this.loc.port != undefined && this.loc.port > 1) {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname + ':' + this.loc.port;
        } else {
            this.currentURL = this.loc.protocol + '//' + this.loc.hostname;
        }

        if (debug) {
            console.log(window.location);
        };
    },
    connect: function() {
        socketController.socket.on('connect', this.socketConnected);
        socketController.socket.on('mobile_disconnect', this.socketDisconnected);
        socketController.socket.on('message', this.socketMessage);
        socketController.socket.on('moved', this.command);
        socketController.socket.on('motionDataOut', this.socketMotionDataOut);
        socketController.socket.on('joystickMove', this.joystickMove);

        this.updateInstructions();
    },
    socketConnected: function() {
        // Connected, let's sign-up for to receive messages for this room
        socketController.socket.emit('room', room);
        socketController.socket.emit('message', {
            msg: 'client joined room with ID ' + room
        });
        if (debug) {
            console.log('joined room ' + room);
        }
    },
    socketDisconnected: function(){
        showNotification('Phone connection lost')
    },
    socketMessage: function(data) {
        console.log('Incoming message:', data);
        console.log(data.command)
        if(data.command == 'stop'){
            playing = false;
        }else if(data.command == 'start'){
            playing = true;
            $('.info').fadeOut();
            music = createjs.Sound.play("music", {loop:-1});
        }
        if (data.msg.indexOf('mobile joined') != -1) {
            showNotification('Phone Connected')
        }
    },
    command: function(data) {
        console.log(data);
        if (cars[0] && playingWithPhone) {
            carController.moveCar(cars[0], data.direction)
        }
        // console.log(data.direction)
    },
    socketMotionDataOut: function(data) {
        // console.log('Incoming motionData:', data);
        // Tilt Left/Right [gamma]
        // Tilt Front/Back [beta]
        // Direction [alpha]

        if (cars[0] && data && playingWithPhone) {
            carController.rotateCar(cars[0], data.beta || 0)
        }

        if (!playing && playingWithPhone) {
            playing = true;
            $('.info').fadeOut();

        }
    },
    updateInstructions: function() {
        $('.urlFounded').html(this.currentURL);
        $('.instruct').fadeIn('fast')

        var genURL = this.currentURL + '/mobile/#' + room;

        // <span class="go_to_site">http://c.kerm.is/</span>
        //             <br>
        //              and enter <span class="room_id"></span>
        $('.room_id').html(room);

        $('.instruct').qrcode({
            text: genURL,
            render: "canvas", // 'canvas' or 'table'. Default value is 'canvas'
            background: "#EFEFEF",
            foreground: "#1f7350",
            width: 200,
            height: 200
        });

    },
    joystickMove: function(data){
        console.log(data)


        if( data.left ){
            carController.controlCarWithPhone('left', cars[0])
        }
        if( data.right ){
            carController.controlCarWithPhone('right', cars[0])
        }
        if( !data.right && !data.left){
            carController.controlCarWithPhone('forward', cars[0])
        }

    }

}

socketController.init();
socketController.connect();
