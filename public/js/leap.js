////////////////////////////////////////////////////////////////////////////////
//      Leap stuff                        //
//////////////////////////////////////////////////////////////////////////////////
var controller, leapObj, leapConnected;

var count = 0;

var leapController = {
    leapObj : {},
    leapConnected: false,
    init: function() {
        controller = new Leap.Controller();
        controller.connect();

        controller.on('connect', this.controllerConnected)
        controller.on('animationFrame', this.onAnimationframe)
    },
    controllerConnected: function() {
        console.log('Leap connected')
        $('.debug').html('To play with the Leap, use your arm as a fishing rod and press the space bar to pull the fish up')
        if (debug) {
            console.log("Leap Successfully connected.");
        }
        this.leapConnected = true;
    },
    onAnimationframe: function(frame) {
        // your code here
        count++;

        try {
            var pointables = frame.hands;

            if(count > 10 || 1){

                var rotation = (rad2deg(pointables[0].pitch())-45)*1.5;
                rodPivot.rotation.x = deg2rad(rotation);
                moveRodStrings('nothing');
                // $('.debug').html(rotation);
                // count = 0;

            }

            // leapObj.posX = (pointables[0].palmPosition[0]);
            // leapObj.posY = (pointables[0].palmPosition[2]);
            // leapObj.posZ = (pointables[0].palmPosition[1]);
            // this.leapObj.rotX = (pointables[0]._rotation[2]);
            // this.leapObj.rotY = (pointables[0]._rotation[1]);
            // this.leapObj.rotZ = (pointables[0]._rotation[0]);

            // console.log(hand.rotY, rod.rotation.y);
            // $('.debug').html(pointables.length + ' pointables visible');
            updateRod();

        } catch (e) {
        //     console.log('error',e);
            // $('.debug').html('No fingers visible'+ e);
        //     // console.log('no fingers in frame')
        }
    }

}

leapController.init();