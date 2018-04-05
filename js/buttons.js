// toggle drum pads on and off
$('.button').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
	} else {
		$(this).addClass('active')
	}
});