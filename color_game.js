var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.getElementById("pickedColorDisplay");
var resetButton = document.getElementById("resetButton");
var h1 = document.querySelector("h1");
var messageDisplay = document.getElementById("messageDisplay");
var mode = document.querySelectorAll(".mode");

init();

function init(){
	//Square listeners
	setUpSquareListeners();
	//Mode listeners
	setUpModeListeners();
	//Refresh
	reset(numSquares);
}

function setUpModeListeners(){
	for(var i = 0; i < mode.length; i++){
		mode[i].addEventListener("click", function(){
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset(numSquares);
		});
	}
}

function setUpSquareListeners(){
	for( var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor){
				putWinnerTheme();
			}else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}
}

resetButton.addEventListener("click", function(){
	reset(numSquares);
});


function reset(numSquares){
	//Reset stripe backgroundColor
	h1.style.background = "steelblue";
	//Do not display a message
	messageDisplay.textContent = "";
	resetButton.textContent = "New colors";
	//generate 6 new colors
	colors = generateRandomColors(numSquares);
	//picks new color
	pickedColor = pickRandomColor();
	pickedColorDisplay.textContent = pickedColor;
	for( var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
}

function generateRandomColors(num){
	var colors = [];
	console.log(colors);
	for(var i = 0; i < num; i++){
		colors.push(getRandomColor());
	}
	return colors;
}

function getRandomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random()* 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickRandomColor(num){
	return colors[Math.floor(Math.random() * numSquares)];
}

function putWinnerTheme(){
	h1.style.backgroundColor = pickedColor;
	for(var i = 0; i < colors.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
	messageDisplay.textContent = "Correct!";
	resetButton.textContent = "Play Again?";
}