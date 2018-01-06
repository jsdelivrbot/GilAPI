var bgImage
var bgReady
var canvas
var ctx


function addPage() {
		
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("wrapper","container img-rounded",'body');
	addDiv("content","img-rounded row contentTitles",'wrapper',"MemeGen");
	
	addDiv("canvas","img-rounded row contentTitles",'wrapper',"","canvas");

	addDiv("memeUrlInput","img-rounded col-md-12 col-xs-12",'wrapper',"https://technabob.com/blog/wp-content/uploads/2014/08/picard1.jpg","input");
	addDiv("topTextInput","img-rounded col-md-12 col-xs-12",'wrapper',"Top Text","input");
	addDiv("BottomTextInput","img-rounded col-md-12 col-xs-12",'wrapper',"Bottom Text","input");
	addDiv("myRow","row img-rounded col-md-12 col-xs-12",'wrapper');
	addDiv("btnPretty","btn btn-primary",'myRow',"Create Meme!","button","","onclick","updateMemeForm('memeUrlInput')");
		
}; // end addPage

window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();


//Create the canvas
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.height = bgImage.height;
// canvas.width = bgImage.width;

// load background
bgImage = new Image();
bgReady = false;
bgImage.onload = function () {
	var ImageRatio = bgImage.width / bgImage.height;
	canvas.height = canvas.width * ImageRatio;
	ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, // source rectangle
	0, 0, canvas.width, (canvas.width * ImageRatio)); // destination rectangle
	addImpactWithBorder('topTextInput',10,100);
	addImpactWithBorder('BottomTextInput',10,(ctx.canvas.height - 20));
};
}; // end window.onload

function updateMemeForm(memeUrlInput) {
	bgImage.src = document.getElementById(memeUrlInput).value;
};


function addImpactWithBorder(fromInputBox,pixelsFromLeft,pixelsFromTop) {
	ctx.font="100px Impact";
    ctx.lineWidth = 4;  //define the width of the stroke line
    ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	
	ctx.fillText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
    ctx.strokeText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
};


