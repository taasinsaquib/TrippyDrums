// toggle drum pads on and off
$('.button').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active')
	} else {
		$(this).addClass('active')
	}
});

var intervalID;		// store the interval when starting to stop later
var number = 1;		// track which column is being played

// store sounds for diff instruments
// TODO: add more sounds, use colors to make visualization with paper.js
var soundData = {
	"r1" : {
		sound: new Howl({
			 src: ['DRUMS/rh55-001.wav']
		}),
		color: '#1abc9c'
	},
	"r2" : {
		sound: new Howl({
			 src: ['DRUMS/rh55-002.wav']
		}),
		color: '#2ecc71'
	},
	"r3" : {
		sound: new Howl({
			 src: ['DRUMS//rh55-003.wav']
		}),
		color: '#3498db'
	},
	"r4" : {
		sound: new Howl({
			 src: ['DRUMS//rh55-004.wav']
		}),
		color: '#9b59b6'
	}
}

// plays sound that corresponds to the row that the button is in
function playSound(row){
	soundData[row].sound.play();
}

// move a grey bar to show where in the loop the sequencer is
function animateMe(){

	// TODO: make the number variable
	intervalID = setInterval(frame, 500);	// start the animation

	function frame() {
		var oldButtons

		if(!(number <= 4)){		// if the bar has reached the last column, loop back
			oldButtons = document.getElementsByClassName("col" + parseInt(number-1));
			number = 1;
		}
		else{					// otherwise, continue forward
			oldButtons = document.getElementsByClassName("col" + parseInt(number-1));
		}
					
		var buttons = document.getElementsByClassName("col" + parseInt(number));
		console.log("col" + parseInt(number));

		for(var i = 0; i < buttons.length; i++){
			
			if(buttons[i].classList.contains("active")){		// play sound if button is active
				playSound(buttons[i].classList[2]);
			}
			buttons[i].classList.add('grey');					// grey out current colummn
		}

		for(var i = 0; i < oldButtons.length; i++){				// remove grey from previous column
			oldButtons[i].classList.remove('grey');
		}				    
					    
		number++;												// increment current column
	}
}

// stop the grey bar
function dontAnimateMe(){
	clearInterval(intervalID);
}
			