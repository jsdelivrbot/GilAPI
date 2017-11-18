//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
// canvas.height = bgImage.height;
// canvas.width = bgImage.width;

// load background
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function () {
	var ImageRatio = bgImage.width / bgImage.height;
	canvas.height = canvas.width * ImageRatio;
	ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, // source rectangle
	0, 0, canvas.width, (canvas.width * ImageRatio)); // destination rectangle
};

function updateMemeForm() {
	bgImage.src = document.getElementById('memeUrlInput').value;
	ctx.font="20px Impact";
	ctx.fillText(document.getElementById('topTextInput').value,10,50);
	ctx.font="20px Impact";
	ctx.fillText(document.getElementById('BottomTextInput').value,10,100);
};


