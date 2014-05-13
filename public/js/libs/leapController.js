var leapController = {
	controller: new Leap.Controller({frameEventName: "deviceFrame", enableGestures: true}),
	numberOfFingers: '',
	initialize: function() {
		console.log('leapcontroller initialize');

	 	this.controller.on( 'frame', this.onFrameEvent )

		this.controller.connect();
	},
	onFrameEvent: function( frame ) {
		//console.log('frame', frame);
		this.numberOfFingers = frame.fingers.length;

		//console.log('fingers', this.numberOfFingers);

		  for( var i =  0; i < frame.gestures.length; i++){

		    var gesture  = frame.gestures[0];
		    //Per gesture code goes here

		     var type = gesture.type;
          
			  switch( type ){

			    case "circle":
			      leapController.onCircle( gesture );
			      break;
			    case "swipe":
			      leapController.onSwipe( gesture );
			      
			      break;

			  
			  }
		  }
	},
	onSwipe: function( gesture ){

      console.log('swipe');

    },
    onCircle: function( gesture ){
    	console.log('circle');
    }

}