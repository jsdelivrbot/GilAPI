var $stage;
var SIZE = 50;
var $canvas;

function addPage() {
	addDiv("pageMaker","","body","")
	addDiv("btnSquare","btn","pageMaker","Add Square","button","","onclick","addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, 'yellow');")
	addDiv("btnCircle","btn","pageMaker","Add Circle","button","","onclick","addCircle(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 'red');")
	addDiv("btnStar","btn","pageMaker","Add Star","button","","onclick",'addStar(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, "blue");')
	
	// addDiv("canvasDiv","container-fluid","body","")
	addDiv("canvas","","body" ,"This text is displayed if your browser does not support HTML5 Canvas.","canvas")
	var canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	$stage = new createjs.Stage("canvas");

	addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, "#f33");
	addRoundedSquare(canvas.width/2, canvas.height/2 + 100, SIZE * 2, 5, "#3f3");
	addRoundedSquare(canvas.width/2, canvas.height/2, SIZE * 2, 5, "#33f");
	
	$stage.update();
}; // end addPage

function addCircle(x, y, r, fill) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill(fill).drawCircle(0, 0, r);
  circle.x = x;
  circle.y = y;
  circle.name = "circle";
  circle.on("pressmove",drag);
  $stage.addChild(circle);
  $stage.update();
}

function addStar(x, y, r, fill) {
  var star = new createjs.Shape();
  star.graphics.beginFill(fill).drawPolyStar(0, 0, r, 5, 0.6, -90);
  star.x = x;
  star.y = y;
  star.name = "star";
  star.on("pressmove",drag);
  $stage.addChild(star);
  $stage.update();
}

function addRoundedSquare(x, y, s, r, fill) {
  var square = new createjs.Shape();
  square.graphics.beginFill(fill).drawRoundRect(0, 0, s, s, r);
  square.x = x - s/2;
  square.y = y - s/2;
  square.name = "square";
  square.on("pressmove",drag);
  $stage.addChild(square);
  $stage.update();
}

function drag(evt) {
  // target will be the container that the event listener was added to
  if(evt.target.name == "square") {
    evt.target.x = evt.stageX - SIZE;
    evt.target.y = evt.stageY - SIZE;
  }
  else  {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
  }

  // make sure to redraw the stage to show the change
  $stage.update();   
}

window.onload = function() {
	addHeader();
	addNav();
	addPage();
	addFooter();
}