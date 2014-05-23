// var playingWithLeap = false;
// var playingWithPhone = false;
// var playingWithKeys = false;

$(function(){
	$('.choose_button').on('click', function(){
		var id = $(this).attr('id');
		$('.info .title').html('How do you play?')
		switch(id){
			case 'socket' :
				playingWithPhone = true;
				$('.buttons').hide();
				$('.chose_socket').show();
				// socketController.updateInstructions();
				break;
			case 'leap':
				playingWithLeap = true;
				$('.buttons').hide();
				$('.chose_leap').show();
				break;
			case 'keys':
				playingWithKeys = true;
				$('.buttons').hide();
				$('.chose_keys').show();
				break;
		}
	})

	$('.play').on('click', function(){
		$('.info').fadeOut();
		playing = true;
	})
})