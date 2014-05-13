/////////////////////////////////////
/////   Socket Stuff
////////////////////////////////////
var room = generateRoomId();
var socketController = {
    currentURL: window.location.href,
    loc: window.location,
    room: '',
    socket: io.connect(this.currentURL),
    phoneObj: { rotX: 0, rotY: 0, rotZ:0},
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
        socketController.socket.on('message', this.socketMessage);
        socketController.socket.on('pulled', this.pulled);
        socketController.socket.on('motionDataOut', this.socketMotionDataOut);

        this.updateInstructions();
    },
    socketConnected: function() {
        // Connected, let's sign-up for to receive messages for this room
        socketController.socket.emit('room', room);
        socketController.socket.emit('message', {
            msg: 'client joined room with ID ' + room
        });
        if (debug) {
            console.log('joined room '+ room);
        }
    },
    socketMessage: function(data) {
        console.log('Incoming message:', data);
    },
    pulled: function(data){
        // console.log(data);
        checkCollision();
    },
    socketMotionDataOut: function(data) {
        // console.log('Incoming motionData:', data);
        // Tilt Left/Right [gamma]
        // Tilt Front/Back [beta]
        // Direction [alpha]

        $('.debug').html('<br>beta:' + data.beta);
        // phoneObj.rotY = deg2rad(data.alpha);
        var rotation = deg2rad(data.beta)-45;

        rodPivot.rotation.x = rotation;

        moveRodStrings('nothing');

        // socketController.phoneObj.rotZ = deg2rad(data.gamma * 1.5);
        // socketController.phoneObj.rotY = 0;

        // updateRod();
    },
    updateInstructions: function() {
        $('.urlFounded').html(this.currentURL);
        $('.roomGenerated').html(this.room);
        $('.instruct').fadeIn('fast')

        var genURL = this.currentURL+'/mobile/#' + room;
        // Render the QR code on a newly created img element
        var img = qr.image(genURL);
        $('.instruct').html(img); // Re-render the QR code on an existing element
        // $('.instruct').parent().css('text-align','center')
        $('.instruct').attr('style','background-color:white; padding: 15px 0 0 15px; position: absolute; left:200px;')
        qr.image({
            image: img,
            value: genURL,
            size: 5,
            level: 'H'
        });
    }

}

socketController.init();
socketController.connect();
