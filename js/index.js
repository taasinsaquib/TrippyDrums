var intervalID;		// store the interval when starting to stop later
var number = 1;		// track which column is being played
var bpm = 1000;
var circles = [];	// store circle objects

// init paper context 
// TODO: make a cooler visualization
window.onload = function() {
	
	// Get a reference to the canvas object
	var canvas = document.getElementById('visualize');
	
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	// draw the circles if they exist
	view.onFrame = function(event) {

		for(var i = 0; i < circles.length; i++){
			circles[i].fillColor.hue += 1;
			circles[i].scale(0.9);
		}

		paper.view.draw();
	}
}

paper.install(window);

// store sounds for diff instruments
// TODO: add more sounds
var soundData = {
	"r1" : {
		sound: new Howl({
			 src: ['DRUMS/rh55-001.wav']
		}),
		color: '#1abc9c'
	},
	"r2" : {
		sound: new Howl({
			 src: ['DRUMS/rh55-005.wav']
		}),
		color: '#2ecc71'
	},
	"r3" : {
		sound: new Howl({
			 src: ['DRUMS//rh55-013.wav']
		}),
		color: '#3498db'
	},
	"r4" : {
		sound: new Howl({
			 src: ['DRUMS//rh55-025.wav']
		}),
		color: '#9b59b6'
	}
}

// toggle drum pads on and off
$('.button').click(function(){
	if($(this).hasClass('active')){			// disable
		$(this).removeClass('active')
		$(this).css("background-color", "white");
	} else {								// enable
		$(this).addClass('active')
		var color = getColor(this.classList[2]);
		$(this).css("background-color", color);
	}
});

// when new bpm entered, restart loop
// TODO: convert bpm to milliseconds
$("#bpm").change(function() {
	dontAnimateMe(0);
	// var inputVal = $("#bpm").val();
	// bpm = (inputVal/60) * 1000;
	bpm = $("#bpm").val();
	animateMe();
});

// plays sound that corresponds to the row that the button is in
function playSound(row){
	soundData[row].sound.play();
}

// return color for specified instrument
function getColor(row){
	return soundData[row].color
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// add object to array to animate
// TODO: remove circle object once its been used
function animate(row){

	var right = window.innerWidth;
	var bottom = window.innerHeight;

	var randX = getRandomInt(right);
	var randY = getRandomInt(bottom);

	//TODO: randomize location
	var circle = new Path.Circle(new Point(randX, randY), 200);
	circle.strokeColor = 'black';
	circle.fillColor = getColor(row);	// use unique color for each instrument
	circles.push(circle);				// push to array to animate
}

// move a grey bar to show where in the loop the sequencer is
function animateMe(){

	intervalID = setInterval(frame, bpm);	// start the animation

	function frame() {
		var oldButtons

		if(!(number <= 5)){		// if the bar has reached the last column, loop back
			oldButtons = document.getElementsByClassName("col" + parseInt(number-1));
			number = 1;
		}
		else{					// otherwise, continue forward
			oldButtons = document.getElementsByClassName("col" + parseInt(number-1));
		}
					
		var buttons = document.getElementsByClassName("col" + parseInt(number));
		// console.log("col" + parseInt(number));

		for(var i = 0; i < buttons.length; i++){
			
			if(buttons[i].classList.contains("active")){		// play sound if button is active
				playSound(buttons[i].classList[2]);
				animate(buttons[i].classList[2]);
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
function dontAnimateMe(reset){
	clearInterval(intervalID);
}

// reset grey bar to before 1st column
function stopAnimation(){
	// console.log(number);
	var buttons = document.getElementsByClassName("col" + parseInt(number-1));
	for(var i = 0; i < buttons.length; i++){
		buttons[i].classList.remove('grey');
	}
	number = 1;
	dontAnimateMe();
}


			