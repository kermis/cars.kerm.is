// var playingWithLeap = false;
// var playingWithPhone = false;
// var playingWithKeys = false;

$(function(){
	$('.choose_button').on('click', function(){
		var id = $(this).attr('id');
		$('.info .title').html('How do you play?')
		$('.back-button').show();
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

	$('.back-button').on('click', function(){
		$('.chose_socket').hide();
		$('.chose_leap').hide();
		$('.chose_keys').hide();
		$('.back-button').hide();
		$('.buttons').show();
	})
})