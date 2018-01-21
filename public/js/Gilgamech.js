//Gil.JS

// addElement($parentElement,"",$classRow,"elementType","elementStyle","href","attributeType","attributeAction");
// aSecretToEverybody

//Init vars
var $GilMain = {apiVersion: "null", googleApiKey: 'aSecretToEverybody',chatGeneral: "", errgoLogic: "", GilJSVersion: "704"};
var $pageVersion = $GilMain.GilJSVersion
var $apiVersion
var $GOOGLE_API_KEY
var $errDiv
var $headWrapper
var $NavDDWrapper
var $nav3dd
var $bodyWrapper
var $footWrapper
var $testVar

var $pageHeaderTitle = 'Gilgamech Technologies';
var $pageStarting = "rgb";
var $pageSettingsJson = "/settings.json";

var $chatGeneral = "";
var $errgoLogic = "--- Err and Log Output --- " + lineBreak + lineBreak;

// addElement
var timerInterval //Default timer variable, removed in removePage.

// Oddly useful
var lineBreak = "\r\n"; 
var spaceChar = " "; 
var OpenParens = "("
var CloseParens = ")"
var OpenCurlBracket = "{"
var CloseCurlBracket = "}"
var SemiColon = ";"
var EndComment = "//end"

// RGB page
var $redInput
var $greenInput
var $blueInput
var $contentLabel

// Coin page
var $cointentArea2

// Fruitbot, Meme, DSQ 
var bgImage;
var bgReady;
var canvas;
var ctx;
var $stage;
var SIZE = 50;

// Chat
var $chatUser
var $chatMessage
var $chatRoom
var $chatBox

// Coin 
var $btcMedian = 0
var $ltcMedian = 0
var $ethMedian = 0
var $btcOld = 0
var $ltcOld = 0
var $ethOld = 0
var $fbcOld = 0
var $tradeFee = 4
var $botFee = 1
var $time
var $btc
var $ltc
var $fbc
var $eth
var $coin2 = "Data loading..."
var $assetCounter = 0

// CSS classes
// Bootstrap
var $classSmallHidden = "hidden-sm hidden-xs ";
var $classLargeHidden = "hidden-md hidden-lg ";
var $classSmallHiddenLargeQuarter = "col-md-3 hidden-xs ";
var $classHalfWidth = 'col-md-6 col-xs-6 ';
var $classNarrowCol = "col-md-2 col-xs-2 ";
var $classThirdWidth = 'col-md-4 col-xs-4 ';
var $classHalfDesktopFullMobile = "col-md-6 col-xs-12 ";
var $classFullDesktopFullMobile = "col-md-12 col-xs-12 ";
var $classRow = 'row ';
var $classImgRnd = 'img-rounded ';
var $classContainer = "container ";
var $classDropdown = "dropdown ";
var $classDropdownContent = "dropdown-content ";
var $classNavBar = "nav navbar-nav "
var $nbr = "navbar-right "

// Composite
var $classContainerRow = $classContainer + $classRow;
var $classRow = $classImgRnd + $classRow;
var $classSpacer = $classImgRnd + $classSmallHiddenLargeQuarter;
var $classHalfDesktopFullMobileRnd = $classImgRnd + $classHalfDesktopFullMobile;
var $classInputField = $classImgRnd + $classFullDesktopFullMobile;
var $classInputFieldPLUSRow = $classInputField + $classRow;
var $classThirdWidthRnd = $classThirdWidth + $classImgRnd;

// Gil's
var $classContentTitle = 'contentTitles ';
var $classContentItems = 'contentItems ';
var $classColorRow = "colorRow ";
var $classTop = "top ";

// Gil's Composite
var $classContentRow = $classImgRnd + $classRow + $classContentTitle;
var $classNarrowContent = $classContentItems + $classNarrowCol
var $classInputFieldPLUSColorRow = $classInputField + $classColorRow;
var $classColorRow2x = $classRow + $classColorRow;
var $classNarrowContent = $classContentItems + $classNarrowCol;

// Styles
var $styleBlackText = "color: #000; ";
var $styleWhiteText = "color: #fff; ";
var $styleWhiteBack = "background-color: #fff; ";

var $styleBlackBack = "background-color: #000; ";
var $styleRedField = "background-color: #833";
var $styleGreenField = "background-color: #383";
var $styleBlueField = "background-color: #338";

var $styleBlackTextWhiteBack = $styleBlackText + $styleWhiteBack;
var $styleWhiteTextBlackBack = $styleWhiteText + $styleBlackBack;

// Bootstrap Buttons
var $btnCaution = "btn btn-caution ";
var $btnDanger = 'btn btn-danger';
var $btnInfo = "btn btn-info ";
var $btnPrimary = "btn btn-primary ";
var $btnSecondary = "btn btn-secondary ";
var $btnSuccess = "btn btn-success ";
var $btnWarning = "btn btn-warning ";
var $btnLg = "btn-lg ";
var $btnXl = "btn-xl ";
var $btnXs = "btn-xs ";
var $btnCalc = $btnPrimary + $btnLg;

// Pages

var $testVar = {
	"elements" : [
		{"elementParent": "parentElement","innerText": "Add newElementJson here.","elementType": "textarea"}
	]
}

var $adminPageVar = {
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classSpacer, "id":"contentOuter"},
		{"elementParent": "contentOuter","elementClass": $classHalfDesktopFullMobileRnd},
		{"elementParent": "parentElement","elementClass": $classHalfDesktopFullMobileRnd, "id":"contentInner"},
		{"elementParent": "contentInner","innerText": "Admin Page","elementClass": $classContentRow},
		{"elementParent": "contentInner","elementClass": $classInputField},
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow"},
		{"elementParent": "outputRow","innerText": "Log loading...","elementClass": $classInputField,"elementStyle": $styleBlackText,"elementType": "textarea","id":"output"},
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow2"},
		{"elementParent": "outputRow2","innerText": JSON.stringify($testVar),"elementClass": $classInputField,"elementStyle": $styleBlackText,"elementType": "textarea","id": "output2"},
		{"elementParent": "contentInner","id":"outputDiv"}
	],
	"rows" : [
		{"elementParent": "outputRow","firstName":"refreshPage","firstOnclick":"initPage($pageSettingsJson);"},
		{"elementParent": "outputRow2","firstName":"loadPage","firstOnclick":"cje('outputDiv',JSON.parse(readElement('output2')));","secondName":"parseHtml","secondOnclick":"parseHtml('outputDiv','outputDiv');"}
	],
	"timers" : [
		{"interval": "10000","callback":"writeElement('output','" + $GilMain.errgoLogic + "');"}
	]
}

// Functions
// Init
function initPage($initUrl){
		
	if ($initUrl.length > 6) {
	postJSON($initUrl, function(response) {
		$GilMain = response
	}); // end loadJSON
	$apiVersion = $GilMain.apiVersion
	$GOOGLE_API_KEY = $GilMain.googleApiKey
	$chatGeneral = $GilMain.chatGeneral
	$errgoLogic = $GilMain.errgoLogic
	}; // end if onClick
};// end initPage

// General
function loadFile(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          };
    };
    xobj.send(null);  
};// end loadJSON

function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          };
    };
    xobj.send(null);  
};// end loadJSON

function postJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("text/plain");
    xobj.open('POST', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);  
};// end loadJSON

function postFile(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("text/plain");
    xobj.open('POST', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
};// end loadJSON

function getBadPW() {	  
	return Math.random().toString(36).slice(-20);
 }

function copyToClipboard(text) {
    Copied = text.createRange();
    Copied.execCommand("Copy");
}; // end copyToClipboard

function colorifyDiv(divName, replaceWord, replaceColor) {
  var replacere = new RegExp(replaceWord, "g");
  var str = document.getElementById(divName).innerHTML,
  str = str.replace(replacere, '<span style="color:' + replaceColor + ';">' + replaceWord + '</span>');
  // Clean up repeats and duplicates.
  str = str.replace('<span style="color:<span style="color:', '<span style="color:');
  str = str.replace('</span></span>','</span>');
  document.getElementById(divName).innerHTML = str;
}; // end colorifyDiv

function prettyPrint($divName) {
	try {
		var ugly = document.getElementById($divName).value;
		var obj = JSON.parse(ugly);
		var pretty = JSON.stringify(obj);
		document.getElementById($divName).innerText = pretty;
		document.getElementById($errDiv).innerText = "";	
	} catch($err) {
		document.getElementById($errDiv).innerText = $err;
	};
}

function getNumberFromDiv($numericDiv) {
	return Math.round(
		document.getElementById($numericDiv).innerText  *1
	)
};

function writeElement($elementId,$source) {	  
	var $elementType = document.getElementById($elementId).type;
	
	if ($elementType == 'text') {
		document.getElementById($elementId).value = $source;
	} else {
		document.getElementById($elementId).innerText = $source;
	}; // end if divParent
}; // end getBadPW

function readElement($elementId) {	  
	var $elementType = document.getElementById($elementId).type;
	
	if (($elementType == 'text') || ($elementType == 'textarea')) {
		return document.getElementById($elementId).value;
	} else {
		return document.getElementById($elementId).innerText;
	}; // end if divParent
}; // end getBadPW

function appendElement($inputString,$elementId) {
	document.getElementById($elementId).value += $inputString
}

// Chat
function updateChat() {
	
	var $chatUser = document.getElementById($chatUser).value
	var $chatMessage = document.getElementById($chatMessage).value
	var $chatRoom = document.getElementById($chatRoom).value
	  if ($chatMessage) {
		if ($chatUser) {
			$chatUrl = "/chatpost?user=" + $chatUser + "&message=" + $chatMessage + "&chatroom=" + $chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById($chatBox).value = response
  }); // end loadJSON
			  document.getElementById($chatMessage).value = ""
			  document.getElementById($errDiv).innerText = ""
		} else {
			document.getElementById($errDiv).innerText = "Enter a user name. Then do a barrel roll."
		}; //end if chatUser
	}; //end if chatMessage
}; // end update

function refreshChat(chatRoom){
  var chatUrl = "/chatload?chatroom=" + chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById($chatBox).value = response
  }); // end loadJSON
}; // end refresh

// DSQ
function addShape(x, y, s, r, fill,$shapeName) {
	var shape = new createjs.Shape();
  
	if ($shapeName == 'circle') {
		shape.graphics.beginFill(fill).drawCircle(0, 0, r);
		shape.x = x;
		shape.y = y;
	} else if ($shapeName == 'square') {
		shape.graphics.beginFill(fill).drawRoundRect(0, 0, s, s, r);
		shape.x = x - s/2;
		shape.y = y - s/2;
	} else if ($shapeName == 'star') {
		shape.graphics.beginFill(fill).drawPolyStar(0, 0, r, 5, 0.6, -90);
		shape.x = x;
		shape.y = y;
	} else {
		shape.graphics.beginFill(fill).drawRoundRect(0, 0, s, s, r);
		shape.x = x - s/2;
		shape.y = y - s/2;
	}; // end if divParent

  shape.name = $shapeName;
  shape.on("pressmove",drag);
  $stage.addChild(shape);
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

// Git
function updateTextAreaFromRepo(FileNameElement,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).innerText
  if (FileName) {
    document.getElementById(FileNameElement).innerText = FileName
  } else {
	  FileName = "README.md"
      document.getElementById(FileNameElement).innerText = FileName
  }; //end if FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadFile(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateTextAreaFromRepo

function updateNewPageBoilerplate() {  
  boilerplateIndexTextArea("myTextArea","pageName","//region WIP");
  boilerplateTestTextArea("myTextArea","pageName","  t.plan(42);\r\n");
}; // end updateNewPageBoilerplate

function updateNewPageForm($pageName,$RepoUrlElement,$nestArea) {
  updateTextAreaFromRepo($pageName,$RepoUrlElement,$nestArea);  
  colorifyDivTextArea($nestArea);
}; // end updateNewPageForm

function boilerplateIndexTextArea(docTextArea,docNewName,splitMarker) {  
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = 'request("http://127.0.0.1:5000/fruitbot", (error, response, body) => {' + lineBreak + 't.false(error); // test 5' + lineBreak + 't.equal(response.statusCode, 200); // test 6' + lineBreak + 't.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 7' + lineBreak + 't.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 8' + lineBreak + '}); //end request';
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateIndexTextArea

function boilerplateTestTextArea(docTextArea,docNewName,splitMarker) {  
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for test.js
  docUpdateTextString = splitMarker + lineBreak + "app.get('/" + docNewPageName + "'," + spaceChar + "function(request, response)" + spaceChar + "{" + spaceChar + lineBreak + spaceChar + spaceChar + "response.render('pages/" + docNewPageName + "');" + spaceChar + lineBreak + "});" + spaceChar + spaceChar + lineBreak;
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateTestTextArea

function colorifyDivTextArea(DivTextArea) {  
  var words = ["function","var","this","new","if","then","true","false","const"];
  var superGreen = "green";
  for (word of words) {
    colorifyDiv(DivTextArea, word, superGreen);
  };
}; // end colorifyDivTextArea

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("gitFileTextArea").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function setupLink($nestAreaID,$downloadLinkID) {
  document.getElementById($nestAreaID).value = window.onload + '';
  document.getElementById($downloadLinkID).onclick = function() {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txtval);
  };
};

function updateForm(nfsCall, nfsName, nfsTextArea) {
  nfsInput = document.getElementById(nfsName).value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsInput
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

function updateNFSForm(nfsCall, nfsName, nfsTextArea, nfsParams, nfsType) {
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsName + "&params=" + nfsParams + "&type=" + nfsType
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

// RGB
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};// end componentToHex

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};// end rgbToHex

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};// end hexToRgb

function updateRgbColor() { 
	
	$hex = hexToRgb(document.getElementById($htmlRow).value);
	document.getElementById($redRow).value = $hex.r
	document.getElementById($greenRow).value = $hex.g
	document.getElementById($blueRow).value = $hex.b
	
	document.getElementById($contentLabel).style.backgroundColor  
	= document.getElementById($htmlRow).value
}; // end updateRgbColor

function updateRgbDivColor($divId) { 
	var $colorRatio = .25;
	var $Color = (document.getElementById($divId).value * 1);
	if ($Color > 255) {
		document.getElementById($divId).value = 255
		$Color = (document.getElementById($divId).value * 1);
	}; // end if Color
	$Color2 = Math.round(($Color) * $colorRatio)
	
	switch ($divId) {
		case $redInput: 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case $greenInput: 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case $blueInput: 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

    document.getElementById($htmlInput).value = rgbToHex(
		(document.getElementById($redInput).value * 1), 
		(document.getElementById($greenInput).value * 1),
		(document.getElementById($blueInput).value * 1),
	);
	
	document.getElementById($contentLabel).style.backgroundColor = document.getElementById($htmlInput).value

}; // end updateRedDivColor

// Meme
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

// NFS
function getNFS($functionType,$spaceChar,$OpenParens,$functionName,$CloseParens,$spaceChar,$OpenCurlBracket,$LineBreak,$functionParams,$SemiColon,$LineBreak,$CloseCurlBracket,$SemiColon,$spaceChar,$EndComment,$spaceChar,$functionType,$spaceChar,$functionName) {
	var $outPut = $functionType + $spaceChar + $OpenParens + $functionName + $CloseParens + $spaceChar + $OpenCurlBracket + $LineBreak + $functionParams + $SemiColon + $LineBreak + $CloseCurlBracket + $SemiColon + $spaceChar + $EndComment + $spaceChar + $functionType + $spaceChar + $functionName;
	
	return $outPut;
}; // end getNFS

function getNFS2($functionName,$functionParams) {
	var $outPut = "function " + $functionName + "(" + $functionParams + ") { \r\n  response.json(" + $functionParams + "); \r\n}; ";
	
	return $outPut;
}; // end getNFS2

function getNFS3($newAppName) {
	var $outPut = "index.js \r\napp.get('/" + $newAppName + "', function(request, response) { \r\n  response.render(testUA(request.header('user-agent')) + '/" + $newAppName + "'); \r\n});  \r\n\r\ntest.js \r\nrequest('http://127.0.0.1:5000/" + $newAppName + "', (error, response, body) => { \r\n  t.false(error); \r\n  t.equal(response.statusCode, 200);  \r\n  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  \r\n  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  \r\n});";
	
	return $outPut;
}; // end getNFS3

// Coin
function loadCoinData () {
  try {
	loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
	loadJSON("https://gil-api.herokuapp.com/fakecoin", function($response) { $fbc = $response.data});
  }catch(e){console.log(e)};
}; // end loadCoinData
	
function updateCoinsole ($outputTextBox) {
  try {
  var $today = new Date();
    $iso = $time.iso || $today;
    $coin2 = $iso + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $eth.base + " |" + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $ltc.base + " |" + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $fbc.base + " |" + $fbc.amount  + " | " + (Math.round(($fbc.amount - $fbcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $btc.base + " |" + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
    document.getElementById($outputTextBox).innerText  = $coin2 + document.getElementById($outputTextBox).innerText
  }catch(e){console.log(e)};
}; // end updateCoinsole

function updateCointent () {
  try {
    document.getElementById('btcAmount').value = $btc.amount
    document.getElementById('ltcAmount').value = $ltc.amount
    document.getElementById('ethAmount').value = $eth.amount
    document.getElementById('fbcAmount').value = $fbc.amount
  }catch(e){console.log(e)};
}; // end updateCointent

function fruitbotChooses($coin,$oldCoin,$coinMedian,$coinMedianDiv,$botAmountDiv,$botActionDiv, callback) {
	var $coinAmount = $coin.amount
	try {
		if ($coinMedian) {$coinMedian++} else {$coinMedian = $coinAmount};
		if ($coinAmount < $coinMedian && $coinAmount > $oldCoin) {
			$action = "BUY"
			$coinAmount += ($coinAmount - $tradeFee)
			loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
			$fbc = $response.data
			document.getElementById("fbcBotAmount").innerText = Math.round((getNumberFromDiv("simplebotfbcBotAmount") + $fbc.amount - $botFee)*100)/100
			document.getElementById("fbcBotAction").value = "SELL"
			}); //end loadJSON
		} else {
			if ($coinAmount + $tradeFee > $coinMedian && $coinAmount < $oldCoin) {
				$action = "SELL";
				$coinMedian--;
				$coinAmount -= ($coinAmount - $tradeFee);
				loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
				$fbc = $response.data;
				document.getElementById("fbcBotAmount").innerText = Math.round((getNumberFromDiv("simplebotfbcBotAmount") - $fbc.amount - $botFee)*100)/100
				document.getElementById("fbcBotAction").innerText = "BUY";
				}); //end loadJSON
			} else {
				$action = "HOLD";
			}; // end if $coinAmount
		}; // end if $coinAmount
		document.getElementById($botAmountDiv).innerText = $coinAmount
		document.getElementById($botActionDiv).innerText = $action
		document.getElementById($coinMedianDiv).innerText = $coinMedian
		
		$oldCoin = $coinAmount
		callback($oldCoin,$coinMedian)
	}catch(e){console.log(e)}; // end try 
}; // end fruitbotChooses

function simplebotChooses($coin,$botAmountDiv,$botActionDiv) {
// function fruitbotChooses($coin,$oldCoin,$coinMedian,$coinMedianDiv,$botAmountDiv,$botActionDiv, callback) {
	var $coinAmount = $coin.amount
    $expr = Math.round(Math.random() * 3);
switch ($expr) {
 case 1:
  $action = "BUY"
  $coinAmount += ($coinAmount - $tradeFee)
  try {
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data;
	document.getElementById("simplebotfbcBotAmount").innerText = (Math.round(((document.getElementById("simplebotfbcBotAmount").innerText *1) + $fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "SELL"
  });
	}catch(e){console.log(e)}; // end try 
 break;
 case 2:
  $action = "SELL"
  $coinAmount -= ($coinAmount - $tradeFee);
  try {
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data;
	document.getElementById("simplebotfbcBotAmount").innerText = (Math.round(((document.getElementById("simplebotfbcBotAmount").innerText *1) - $fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "BUY";
  });
	}catch(e){console.log(e)}; // end try 
 break;
 default:
 $action = "HOLD"
}
  try {
  document.getElementById($botAmountDiv).innerText = $coinAmount
  document.getElementById($botActionDiv).innerText = $action
    //$coinOld = $coin.amount

	}catch(e){console.log(e)}; // end try 
}; // end simplebotChooses

function setMyBot() {
	$botName = document.getElementById("myBotLabel").innerText; 
	$buyVal = "11000"; // document.getElementById("myBotBuy").value; 
	$buyDir =  "below"; //document.getElementById("radioBuyAbove").checked;
	$sellVal = "12000"; //document.getElementById("myBotSell").value;
	$sellDir = "above"; //document.getElementById("radioSellAbove").checked; 
	$botOutput = {"botName":$botName,"buyVal":$buyVal,"buyDir":$buyDir,"sellVal":$sellVal,"sellDir":$sellDir};	
	document.getElementById("jsonArea").innerText = JSON.stringify($botOutput);
}; // end simplebotChooses

function getMyBot() {
	$botInput = JSON.parse(document.getElementById("jsonArea").innerText);
	document.getElementById("myBotLabel").innerText = $botInput.botName; 
	document.getElementById("myBotBuy").value = $botInput.buyVal; 
	document.getElementById("radioBuyAbove").checked = $botInput.buyDir; 
	document.getElementById("myBotSell").value = $botInput.sellVal; 
	document.getElementById("radioSellBelow").checked = $botInput.sellDir; 
}; // end simplebotChooses

function manualTransaction($coin,$direction,$divToUpdate) {
switch ($direction) {
 case "BUY":
  document.getElementById($divToUpdate).innerText = Math.round((((document.getElementById("btcMedian").innerText * 1) + $coin.amount - $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText = Math.round((document.getElementById("btcMedian").innerText * 1) - (($coin.amount - $botFee)*100)/100);
	document.getElementById("fbcMedian").innerText = "SELL"
  });
 break;
 case "SELL":
  document.getElementById($divToUpdate).innerText = Math.round((((document.getElementById("btcMedian").innerText * 1) -  + $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data
    Math.round((document.getElementById("simplebotfbcBotAmount").innerText * 1) - (($coin.amount - $botFee)*100)/100);
	document.getElementById("fbcMedian").innerText = "BUY";
  });
 break;
 default:
 $action = "HOLD"
}

}; // end simplebotChooses

function refreshCharts() {
  try {
    if (document.getElementById("btcMedian").innerText == "NaN") {document.getElementById("btcMedian").innerText = 0}	loadCoinData();
	updateCoinsole($coinMainBox);
	updateCointent();
	fruitbotChooses($ltc,$ltcOld,$ltcMedian,"fruitbotltcMedian","fruitbotltcBotAmount","fruitbotltcBotAction",function($e,$f){$ltcOld = $e;$ltcMedian = $f});
    fruitbotChooses($btc,$btcOld,$btcMedian,"fruitbotbtcMedian","fruitbotbtcBotAmount","fruitbotbtcBotAction",function($e,$f){$btcOld = $e;$btcMedian = $f});
    fruitbotChooses($eth,$ethOld,$ethMedian,"fruitbotethMedian","fruitbotethBotAmount","fruitbotethBotAction",function($e,$f){$ethOld = $e;$ethMedian = $f});
  }catch(e){console.log(e)}; // end try 
  try {
	$fbcOld = $fbc.amount
  }catch(e){console.log(e)}; // end try 
  try {
	
	simplebotChooses($ltc,"simplebotltcBotAmount","simplebotltcBotAction");
    simplebotChooses($btc,"simplebotbtcBotAmount","simplebotbtcBotAction");
    simplebotChooses($eth,"simplebotethBotAmount","simplebotethBotAction");
  }catch(e){console.log(e)}; // end try 
}; // end refreshCharts

// Calculator
function evalCalc($elementId) {
	$inputToEval = document.getElementById($elementId).value
	document.getElementById($elementId).value = eval($inputToEval)
}

// Html
function parseHtml($inputId,$outputId) {
	var $inputToEval = document.getElementById($inputId).innerHTML;
	var $jsonOutput = $inputToEval.replace("<","").replace(">","");
	writeElement($outputId,$jsonOutput);
}; // end parseHtml

// DiffeRentIal
function initMap() {
	$GOOGLE_API_KEY = $GilMain.googleApiKey
	var uluru = {lat: 47, lng: -122};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}; // end initMap

// Pages
// Page Construction
function toggleElement($divId) {
	if (document.getElementById($divId).style.visibility == "visible") {
		document.getElementById($divId).style.visibility="hidden";
	} else { 
		document.getElementById($divId).style.visibility="visible";
	} // end if
}; // end toggleElement

function removeElement($divID) {
	var $div = document.getElementById($divID);
	if ($div) {
		$div.parentNode.removeChild($div);
	}	
}; // end removeBot

//createJsonElement - shortened to CJE.
function cje($parentElement,$jsonVar) {
	if	($jsonVar) {
		
	$jsonVar = JSON.stringify($jsonVar);
	$jsonVar = $jsonVar.replace(/parentElement/g,$parentElement);
	$jsonVar = JSON.parse($jsonVar);
	
	if	($jsonVar.menu) {
	try {
		$jsonVar.menu.forEach(function($element){
			addMenuItem($element.elementParent,$element.innerText,$element.onclick,$element.elementClass,$element.href);
		}); // end foreach jsonVar
	} catch(e) { 
		console.log(e);
	};
	}; // end if jsonVar.menu
		
	if	($jsonVar.elements) {
	try {
		$jsonVar.elements.forEach(function($element){
			addElement($element.elementParent,$element.innerText,$element.elementClass,$element.elementType,$element.elementStyle,$element.href,$element.attributeType,$element.attributeAction,$element.id);
		}); // end foreach jsonVar
	} catch(e) { 
		console.log(e);
	};
	}; // end if jsonVar.elements
		
	if	($jsonVar.rows) {
	try {
		$jsonVar.rows.forEach(function($element){
			addRow($element.elementParent,$element.firstName,$element.firstOnclick,$element.secondName,$element.secondOnclick,$element.thirdName,$element.thirdOnclick,$element.fourthName,$element.fourthOnclick,$element.fifthName,$element.fifthOnclick,$element.sixthName,$element.sixthOnclick);
		}); // end foreach jsonVar
	} catch(e) { 
		console.log(e);
	};
	}; // end if rows

	if	($jsonVar.timers) {
	try {
		$jsonVar.timers.forEach(function($element){
	timerInterval = setInterval($element.callback,$element.interval);
		}); // end foreach jsonVar
	} catch(e) { 
		console.log(e);
	};
	}; // end if rows
	}; // end if jsonVar
}; // end cje

function addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$attributeType,$attributeAction,$elementId) {
	if (!$elementType) {
		$elementType = 'div'
	}; // end if elementType	
	var $newElement = document.createElement($elementType);

	if (!$elementId) {
		$elementId = getBadPW();
	}; // end if divParent
	$newElement.id = $elementId;

	if ($elementStyle) {
		$newElement.style = $elementStyle
	}; // end if onClick
	
	if ($elementClass) {
		$newElement.className = $elementClass
	}; // end if onClick
	
	if ($elementType == 'input' && $innerText) {
		$newElement.value = $innerText
	} else if ($elementType == 'img' && $innerText) {
		$newElement.title = $innerText
	} else if ($innerText) {
		$newElement.innerText = $innerText
	}; // end if elementType	
	
	if ($elementParent == 'body') {
		document.body.appendChild($newElement);
	} else if ($elementParent == 'head') {
		document.head.appendChild($newElement);
	} else {
		document.getElementById($elementParent).appendChild($newElement);
	}; // end if divParent
	
	if ($elementType == 'a' && $href) {
		$newElement.href = $href
	} else if ($elementType == 'img' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'script' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'link' && $href) {
		$newElement.href = $href
		$newElement.rel = "stylesheet"
		$newElement.type="text/css"
	}; // end if elementType	
	
	if ($attributeType && $attributeAction) {
		
			document.getElementById($elementId).setAttribute($attributeType, $attributeAction);
	}; // end if onClick	
	return $elementId
}; // end addElement	

function addMenuItem($elementParent,$innerText,$onclick,$class,$href) {
	var $innerParent = getBadPW();
	var $parentType = getElementType($elementParent);
	var $elementType = "li"
	
	if ($elementParent == 'Div') {
		$elementType = "p"
	} else if ($elementParent == 'UList') {
		$elementType = "li"
	} else {
		$elementType = "li"
	}; // end if divParent
	
	var $innerParent = addElement($elementParent,"",$class,$elementType)
	addElement($innerParent,$innerText,$class,"a","",$href,"onclick",$onclick)
}; // end addMenuItem	

function getElementType($elementId) {
	return document.getElementById($elementId).toString().replace("[object HTML","").replace("Element]");
}; // end getElementType	

function detectEnter($keypress,callback){
    if($keypress.keyCode === 13){
        $keypress.preventDefault(); // Ensure it is only this code that runs
		$outputCallback = function () {
            callback();
		};
    };
}; // end detectEnter

function updateFormPost($elementId,$postJsonUrl) {
	postFile($postJsonUrl, function(response) {
		document.getElementById($elementId).value  = response
	}); // end loadJSON
}; // end updateFormPost

function addRow($parentElement,$firstName,$firstOnclick,$secondName,$secondOnclick,$thirdName,$thirdOnclick,$fourthName,$fourthOnclick,$fifthName,$fifthOnclick,$sixthName,$sixthOnclick) {
	var $rowName = addElement($parentElement,"",$classContainerRow + $classInputField);	
	
	buildRow($rowName,$firstName,$firstOnclick);
	buildRow($rowName,$secondName,$secondOnclick);
	buildRow($rowName,$thirdName,$thirdOnclick);
	buildRow($rowName,$fourthName,$fourthOnclick);
	buildRow($rowName,$fifthName,$fifthOnclick);
	buildRow($rowName,$sixthName,$sixthOnclick);
	return $rowName
}; // end addRow

function buildRow($rowName,$nameItem,$onclickItem) {
	var $elementId
	if ($nameItem) {
		if ($onclickItem) {
			$elementId = addElement($rowName,$nameItem,$btnPrimary,"button","","","onclick",$onclickItem);
		} else {
			$elementId = addElement($rowName,$nameItem,$classNarrowContent);
		}; // end if firstButtonName
	}; // end if firstButtonName
	return $elementId
}; // end addRow

// Page features
function addHeader($parentElement,$headerTitle) {
	addElement($parentElement,$headerTitle,"","title");
	addElement($parentElement,"","","script","","/js/jquery.min.js");
	addElement($parentElement,"","","link","","/stylesheets/bootstrap.min.css");
	addElement($parentElement,"","","link","","/stylesheets/normalize.css");
	addElement($parentElement,"","","link","","/stylesheets/Gilgamech.css");
	
}; // end addHeader

function addNav($parentElement,$headerTitle) {
	var $loadPageClose = "loadPage('" + $headerTitle;
	function loadPageOpen($pageName) {return $loadPageClose + "','" + $pageName + "');" }; // end loadPageOpen
	
	var $titleParent = addElement($parentElement,"",$classContainer);
	addElement($titleParent,$headerTitle,$classImgRnd + $classTop + $classSmallHidden,"a","font-size: 7ex; color: #000; text-decoration: none","/");
	addElement($titleParent,$headerTitle,$classImgRnd + $classTop + $classLargeHidden,"a","font-size: 4ex; color: #000; text-decoration: none","/");
	
	var $navBar = addElement($parentElement,"","navbar navbar-static-top navbar-inverse");
	var $NavDDOuter = addElement($navBar,"",$classContainer);
	
	var $nav2 = addElement($NavDDOuter,"",$classNavBar + " col-md-6 col-xs-6","ul");
	//addMenuItem($nav2,'Fruitbot!',loadPageOpen('fruitbot'),$classSmallHidden);
	addMenuItem($nav2,'Bad Password',loadPageOpen('badpw'),$classSmallHidden);
	addMenuItem($nav2,'Chat!',loadPageOpen('chat'),$classSmallHidden);	
	
	var $nav2dd = addElement($nav2,"",$classDropdown);
	addElement($nav2dd,"Menu","","p");
	var $nav2ddc = addElement($nav2dd,"",$classDropdownContent);
	
	//addMenuItem($nav2ddc,'Fruitbot!',loadPageOpen('fruitbot'),$classLargeHidden);
	addMenuItem($nav2ddc,'Bad Password',loadPageOpen('badpw'),$classLargeHidden);
	addMenuItem($nav2ddc,'Chat!',loadPageOpen('chat'),$classLargeHidden);
	
	addMenuItem($nav2ddc,'DiffeRentIal',loadPageOpen('rentalmap'));
	addMenuItem($nav2ddc,'Calculator',loadPageOpen('calc'));
	addMenuItem($nav2ddc,'addElement Explained',loadPageOpen('addElement'));
	addMenuItem($nav2ddc,'Minimalism',loadPageOpen('minimalism'));
	addMenuItem($nav2ddc,'RGB Calculator',loadPageOpen('rgb'));
	addMenuItem($nav2ddc,'Draggable Squares',loadPageOpen('dsq'));
	addMenuItem($nav2ddc,'Coins',loadPageOpen('coin'));
	addMenuItem($nav2ddc,'JSON Lint',loadPageOpen('jsonlint'));
	addMenuItem($nav2ddc,'Git',loadPageOpen('git'));
	addMenuItem($nav2ddc,'Meme Maker',loadPageOpen('meme'));
	//addMenuItem($nav2ddc,'Arkdata Dynamap',loadPageOpen('demo'));
	addMenuItem($nav2ddc,'Arkdata',loadPageOpen('Arkdata'));
	addMenuItem($nav2ddc,'Sandbox',loadPageOpen('sandbox'));
	addMenuItem($nav2ddc,'Admin',"cje($bodyWrapper,$adminPageVar);");
	addMenuItem($nav2ddc,'Login!',loadPageOpen('login'),$classLargeHidden);

	var $nav3 = addElement($NavDDOuter,"",$classNavBar + $classHalfWidth + $nbr,"ul");
	addMenuItem($nav3,'Login!',loadPageOpen('login'),$classSmallHidden + $nbr);
	
	$nav3dd = addElement($nav3,"",$classDropdown);
	addElement($nav3dd,"How did I make this page?","","p");
	$NavDDWrapper = addElement($nav3dd,"",$classDropdownContent);

}; // end addPage

function addFooter($parentElement) {
	$apiVersion = $GilMain.apiVersion
	
	addElement($parentElement,"","container-fluid");
	var $spacerName = addElement($parentElement);
	addElement($spacerName,"","",'br');
	addElement($spacerName,"","",'br');
	
	$errDiv = addElement($bodyWrapper,"",$classRow + $classInputField);
	var $footerStatic = addElement($footWrapper,"","navbar-static-bottom","","left: 0;bottom: 0;width: 100%;overflow: hidden;");
	var $footerBanner = addElement($footerStatic,"","","p","width: 100%;text-align: center;");
	var $footerLink = addElement($footerBanner,"","","a","https://www.duckduckgo.com");
	addElement($footerLink,"C1ick h34r ph0r m04r inph0",$classImgRnd,"img","height: 150px","/images/BannerImage.gif");
	addElement($footerStatic,'Gil-API version: ' + $apiVersion + " - Gilgamech.js version:" + $pageVersion,"","","font-weight:bold;text-align:center;");
	addElement($footerStatic,"(c) 2013-2018 Gilgamech Technologies - We are the gears that make our world go around.","","p","font-weight:bold;text-align:center;");
	
}; // end addFooter

// Page parts
function addBlogPage($parentElement,$Title,$Header,$bodyText) {
	addElement($parentElement,"",$classSpacer); //spacer to manually center div.
	var $contentOuter = addElement(addElement($parentElement,"",$classHalfDesktopFullMobileRnd));
	addElement($contentOuter,$Title,$classContentRow);
	
	var $contentInner = addElement($contentOuter);
	addElement($contentInner,$Header,$classInputField,"p",$styleBlackText);
	addElement($contentInner,$bodyText,"","p",$styleBlackText);
	
}; // end addBlogPage

function addJsonLintPage($parentElement) {
	var $nestArea = getBadPW();
	var $contentOuter = getBadPW();
	var $nestArea = getBadPW();
	var $output = getBadPW();
	var $jsonLintVar = {
		"menu" : [
			{"elementParent": $NavDDWrapper,"innerText": "prettify json data in textarea input","href":"https://stackoverflow.com/questions/26320525/prettify-json-data-in-textarea-input#26324037"},
			{"elementParent": $NavDDWrapper,"innerText": "copy textarea to clipboard","href": "https://stackoverflow.com/questions/7218061/javascript-copy-text-to-clipboard#7218068"}
		],
		"elements" : [
			{"elementParent": $parentElement,"elementClass": $classSpacer, "id": $contentOuter},
			{"elementParent": $contentOuter,"elementClass": $classHalfDesktopFullMobileRnd},
			{"elementParent": $parentElement,"elementClass": $classHalfDesktopFullMobileRnd,"id":$nestArea},
			{"elementParent": $nestArea},
			{"elementParent": $nestArea, "innerText": "JSONLint","elementClass": $classContentRow},
			{"elementParent": $nestArea, "innerText": '{"innerText":"JSON goes here"}',"elementClass": "div_textarea" + $classInputField,"elementType": "textarea","id":$output}
		],
		"rows" : [
			{"elementParent": $nestArea,"firstName": "Pretty Print","firstOnclick": "prettyPrint('" + $output + "')","secondName": "Copy to Clipboard","secondOnclick": "copyToClipboard('" + $output + "')"}
		]
	}
	
	cje($jsonLintVar);
		
}; // end addPage

function addCalcPage($parentElement) {
	
	var $nestArea = getBadPW();
	var $contentOuter = getBadPW();
	var $nestArea = getBadPW();
	var $outputRow = getBadPW();
	var $output = getBadPW();
	var $jsonLintVar = {
		"menu" : [
			{"elementParent": $NavDDWrapper,"innerText": "Cut and paste Javascript calculator","href":"http://javascriptkit.com/script/cut18.shtml"}
		],
		"elements" : [
			{"elementParent": $parentElement,"elementClass": $classSpacer, "id":$contentOuter},
			{"elementParent": $contentOuter,"elementClass": $classHalfDesktopFullMobileRnd},
			{"elementParent": $contentOuter,"elementClass": $classHalfDesktopFullMobileRnd, "id":$nestArea},
			{"elementParent": $nestArea,"innerText": "Calculator","elementClass": $classContentRow},
			{"elementParent": $nestArea,"elementClass": $classInputField},
			{"elementParent": $nestArea,"elementClass": $classInputFieldPLUSColorRow,"id":$outputRow},
			{"elementParent": $outputRow,"elementClass": "div_textarea" + $classInputField,"elementType": "input","id":$output}
		],
		"rows" : [
			{"elementParent": $nestArea,"firstName":"1","firstOnclick":"appendElement(1,'" + $output + "')","secondName":"2","secondOnclick":"appendElement(2,'" + $output + "')","thirdName":"3","thirdOnclick":"appendElement(3,'" + $output + "')","fourthName":"/","fourthOnclick":"appendElement('/','" + $output + "')"},	
			{"elementParent": $nestArea,"firstName":"4","firstOnclick":"appendElement(4,'" + $output + "')","secondName":"5","secondOnclick":"appendElement(5,'" + $output + "')","thirdName":"6","thirdOnclick":"appendElement(6,'" + $output + "')","fourthName":"*","fourthOnclick":"appendElement('*','" + $output + "')"},
			{"elementParent": $nestArea,"firstName":"7","firstOnclick":"appendElement(7,'" + $output + "')","secondName":"8","secondOnclick":"appendElement(8,'" + $output + "')","thirdName":"9","thirdOnclick":"appendElement(9,'" + $output + "')","fourthName":"-","fourthOnclick":"appendElement('-','" + $output + "')"},
			{"elementParent": $nestArea,"firstName":"=","firstOnclick":"evalCalc('" + $output + "')","secondName":"0","secondOnclick":"appendElement(0,'" + $output + "')","thirdName":".","thirdOnclick":"appendElement('.','" + $output + "')","fourthName":"+","fourthOnclick":"appendElement('+','" + $output + "')"}
		]
	}
	
	// var $output = addElement($outputRow,"",$classInputFieldPLUSColorRow,"input",$styleBlackTextWhiteBack,"","onkeypress","detectEnter(event,evalCalc('output'))");
	cje($jsonLintVar);
	
	
}; // end addCalcPage

function addChatPage($parentElement) {
	addElement($parentElement,"",$classSpacer); //spacer to manually center div.
	var $contentOuter = addElement(addElement($parentElement,"",$classHalfDesktopFullMobileRnd));

	addElement($contentOuter,"Room:",$classContentRow);
	
	var $chatWrapper = addElement($contentOuter,"",$classColorRow2x);
	var $chatRoom = addElement($chatWrapper,"General",$classInputFieldPLUSColorRow,"input",$styleBlackText);
	
	var $nestArea = addElement($contentOuter,"",$classColorRow2x);
	$chatBox = addElement($nestArea,"Chat loading...",$classInputFieldPLUSColorRow,"textarea",$styleBlackText);
	
	var $nameRow = addElement($contentOuter,"",$classColorRow2x);
	addElement($nameRow,"",$classInputFieldPLUSColorRow,"input","background-color: #338","","placeholder","User Name");
	
	var $chatMessage = addElement(addElement($contentOuter,"",$classColorRow2x),"Hello World!",$classInputFieldPLUSColorRow,"input","background-color: #383","","onkeypress","detectEnter(event,updateChat());");
	
	refreshChat(document.getElementById($chatRoom).value)
	
	timerInterval = setInterval(function () {
		refreshChat(document.getElementById($chatRoom).value)
	}, 5000);
}; // end addPage

function addDragSqPage($parentElement) {
	addElement($parentElement,"","","script","","/js/easeljs-0.8.2.min.js")

	addMenuItem($NavDDWrapper,'Making draggable shapes with CreateJS',"","","https://superdevresources.com/draggable-shapes-canvas-createjs/");
	addMenuItem($NavDDWrapper,'CreateJS website',"","","https://www.createjs.com/");
	addMenuItem($NavDDWrapper,'Codepen demo',"","","https://codepen.io/anon/pen/rpMmvr");
	
	var $divForButtons = addElement($parentElement);
	addElement($divForButtons,"Add Square","btn","button","","","onclick","addShape(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, 'yellow','square');")
	addElement($divForButtons,"Add Circle","btn","button","","","onclick","addShape(canvas.width/2 + (SIZE * 2.5),canvas.height/2,0,SIZE * 2, 'red','circle');")
	addElement($divForButtons,"Add Star","btn","button","","","onclick","addShape(canvas.width/2 + (SIZE * 2.5),canvas.height/2,0,SIZE * 2, 'blue','star');")
	addElement($divForButtons,"Page has bug - it does not work the first time. Please click the link again.");
	
	var $canvas = addElement($parentElement,"",$classImgRnd,"canvas","display: block;margin: 0px auto;border: 1px solid black;");
	canvas = document.getElementById($canvas);
	var $halfWidth = canvas.width/2;
	var $halfHeight = canvas.height/2;
	
	canvas.width = (window.innerWidth * 0.75);
	canvas.height = (window.innerHeight * 0.75);

	$stage = new createjs.Stage($canvas);

	addShape(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, "#f33",'square');
	addShape(canvas.width/2, canvas.height/2 + 100, SIZE * 2, 5, "#3f3",'square');
	addShape(canvas.width/2, canvas.height/2, SIZE * 2, 5, "#33f",'square');
	
	$stage.update();
}; // end addPage

function addFormPage($formPost,$elementParent) {
// 
	var $wrapper = addElement($elementParent,$formPost,$classContentRow,"","","method","post");	
	addElement($wrapper,"",$classInputField,"input","","","placeholder","Email","emailInput");
	addElement($wrapper,"",$classInputField,"input","","","placeholder","Password","passwordInput");

	var $btnRow = addElement($wrapper,"",$classRow + $classInputField);
	addElement($btnRow,"Submit",$btnSuccess,"button");
		
}; // end addPage

function addMemePage($parentElement) {
	addMenuItem($NavDDWrapper,'How to add a border on html5 canvas text?',"","","https://stackoverflow.com/questions/1421082/how-to-add-a-border-on-html5-canvas-text#1421598");
	
	addElement($parentElement,"MemeGen",$classContentRow);
	var $canvas = addElement($parentElement,"",$classImgRnd,"canvas","display: block;margin: 0px auto;border: 1px solid black;");
	var $urlInput = addElement($parentElement,"https://technabob.com/blog/wp-content/uploads/2014/08/picard1.jpg",$classInputField,"input");
	var $topTextInput = addElement($parentElement,"Top Text",$classInputField,"input");
	var $bottomTextInput = addElement($parentElement,"Bottom Text",$classInputField,"input");
	addRow($parentElement,'Create Meme!',"updateMemeForm('" + $urlInput + "')");
	
	canvas = document.getElementById($canvas);
	ctx = canvas.getContext("2d");

	canvas.height = (window.innerHeight * 0.75);
	canvas.width = (window.innerWidth * 0.75);
	// canvas.height = bgImage.height;
	// canvas.width = bgImage.width;

	// load background
	bgImage = new Image();
	bgReady = false;
	bgImage.onload = function () {
		var ImageRatio = bgImage.width / bgImage.height;
		canvas.width = canvas.height * ImageRatio;
		ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, // source rectangle
		0, 0, canvas.width, (canvas.width * ImageRatio)); // destination rectangle
		
		addImpactWithBorder($topTextInput,10,100);
		addImpactWithBorder($bottomTextInput,10,(ctx.canvas.height - 20));
	};
	updateMemeForm($urlInput);

}; // end addPage

function addBadPWPage($parentElement) {
	addElement($parentElement,"",$classSpacer); //spacer to manually center div.
	var $contentOuter = addElement(addElement($parentElement,"",$classHalfDesktopFullMobileRnd));
	
	addElement($contentOuter,"Bad Password",$classContentRow);
	var $textField = addElement($contentOuter,'Entropy not guaranteed.',$classInputField,"input");	
	addRow($contentOuter,'Get Bad Password',"writeElement('" + $textField + "',getBadPW());",'Copy to Clipboard',"copyToClipboard('" + $textField + "')");
	
}; // end addPage

function addRgbColorPage($parentElement) {	
	addMenuItem($NavDDWrapper,'Search Convert to Hex',"https://duckduckgo.com/?q=javascript+convert+to+he&atb=v49-6&ia=qa");
	addMenuItem($NavDDWrapper,'RGB to HEX and HEX to RGB',"https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139");
	addMenuItem($NavDDWrapper,'Change Div color on keypress',"https://stackoverflow.com/questions/42521420/change-div-bgcolor-onkeypress");
	addMenuItem($NavDDWrapper,'Prop style background color',"https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp");
	addMenuItem($NavDDWrapper,'RGB coder',"https://www.easycalculation.com/colorconverter/rgb-coder.php");

	var $spacer = addElement($parentElement,"",$classSpacer);
	var $content = addElement($parentElement,"",$classHalfDesktopFullMobileRnd);
	var $coinArea = addElement($content);
	$contentLabel = addElement($coinArea,"RGB Calculator",$classContentRow);
		
	$htmlInput = addElement(addElement($coinArea,"",$classColorRow2x),"",$classInputFieldPLUSColorRow,"input",$styleBlackTextWhiteBack,"maxlength","7");
	document.getElementById($htmlInput).setAttribute("onchange","updateRgbColor();");
	
	$redInput = addElement(addElement($coinArea,"",$classColorRow2x),171,$classInputFieldPLUSColorRow,"input","","type","number");
	document.getElementById($redInput).setAttribute("onchange","updateRgbDivColor('" + $redInput + "');");
	
	$greenInput = addElement(addElement($coinArea,"",$classColorRow2x),205,$classInputFieldPLUSColorRow,"input","","type","number");
	document.getElementById($greenInput).setAttribute("onchange","updateRgbDivColor('" + $greenInput + "');");
	
	$blueInput = addElement(addElement($coinArea,"",$classColorRow2x),239,$classInputFieldPLUSColorRow,"input","","type","number");
	document.getElementById($blueInput).setAttribute("onchange","updateRgbDivColor('" + $blueInput + "');");
	
	updateRgbDivColor($redInput);
	updateRgbDivColor($greenInput);
	updateRgbDivColor($blueInput);
}; // end addPage

function addArkdataPage($parentElement) {
	var $metaRefresh = addElement($headWrapper,"","","meta","","","http-equiv","refresh");
	document.getElementById($metaRefresh).setAttribute("content","60");
	addElement($headWrapper,'','','link','','/stylesheets/ARKData.css');
	addElement($headWrapper,'','','link','','/stylesheets/ARKDatam.css',"media","handheld");
	
	var $wrapper = addElement($parentElement,"",$classContainer + $classImgRnd);
	var $spacer = addElement($wrapper,"",$classSpacer);
	var $content = addElement($wrapper,"",$classHalfDesktopFullMobileRnd);
	var $coinArea = addElement($content);
	var $contentLabel1 = addElement($coinArea,"Welcome to ARKData",$classContentRow);
	var $contentLabel2 = addElement($coinArea,"Gil's player and tribe tracker",$classImgRnd + $classRow + $classContentTitle);
	var $contentLabel3 = addElement($coinArea,"Players currently being tracked:",$classImgRnd + $classRow + $classContentTitle);
	
	addRow($coinArea,"PlayerName","","ServerName","","Firstseen","","Timeseen");
	addRow($coinArea,"dopey.tim","","Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","","10/23/2017 13:25:45","","10/24/2017 22:46:34");
	addRow($coinArea,"MFrider88","","Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","","10/23/2017 21:41:57","","10/23/2017 23:02:46");
	addRow($coinArea,"MacNCheese3","","Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","","9/1/2017 14:42:06","","10/24/2017 15:21:50");
	addRow($coinArea,"GenMaxiu","","Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","","6/10/2017 10:09:07","","10/24/2017 0:10:12");
	addRow($coinArea,"FMFrider88","","Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","","10/23/2017 21:23:43","","10/23/2017 23:39:49");


}; // end addArkdataPage

function addAddElementPage($parentElement) {
	var $Title = "addElement explained";
	var $Header = "addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$attributeType,$attributeAction,$elementId);"
	var $bodyText = "This can  be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n"
	$bodyText +=  "$divID - The only mandatory one is the first one.\n\n"
	
	$bodyText +=  "$divClass- Specify CSS classes here.\n\n"
	$bodyText +=  "$divParent- Nest under parent div. Specify just 'head' or 'body' to attach directly to the document.\n\n"
	$bodyText +=  "$innerText- This will be the innerText if it's a Div, or if it's an IMG this will be the title, or if it's Input this will be the Value.\n\n"
	$bodyText +=  "$elementType- Specify element type. Default is Div, but can be anything from an A to Canvas to Link.\n\n"
	$bodyText +=  "$href- Specify HRef link if A type, HRef link and CSS type for Link type, or Source if IMG or Script type.\n\n"
	$bodyText +=  "$attributeType- Set a custom attribute, like 'onclick' or 'placeholder' or 'contenteditable'.\n\n"
	$bodyText +=  "$attributeAction- Set the value for the above attribute type. Leave blank for attributes with no value, such as 'contenteditable'.\n\n"
	$bodyText +=  "\n\n"
	$bodyText +=  "Other key parts of this framework are removeElement, wrapperHead, wrapperBody, and wrapperFoot. These divs are unloaded and rebuilt on each page change.\n\n"
	$bodyText +=  "\n\n"
	$bodyText +=  "Call other Javascript scripts, CSS files, and other Head-based items in wrapperHead.\n\n"
	$bodyText +=  "Nest all of your page within wrapperBody.\n\n"
	$bodyText +=  "Add any extra footer elements to wrapperFoot.\n\n"
	$bodyText +=  "\n\n"
	
	addBlogPage($parentElement,$Title,$Header,$bodyText)
}; // end addPage
	
function addMinimalismPage($parentElement) {
	var $Title = "Minimalism";
	var $Header = "1 year rule."
	var $bodyText = "If I don't use something once every 12 months (or so, I'm not exact), I get rid of it. Having so many objects cluttering the room is reminiscent of Victorian Era homes, which were cluttered with tables and chairs and curiosities. Stanley Kubrick in the 1970s flirted with the agoraphobia of large, empty living spaces - but so long as the space isn't completely empty, square footage is a luxury. \n\n"
	
	addBlogPage($parentElement,$Title,$Header,$bodyText)
}; // end addPage

function addElementSandboxPage($parentElement) {
	
	addElement($parentElement,"",$classSpacer); //spacer to manually center div.
	var $contentOuter = addElement(addElement($parentElement,"",$classHalfDesktopFullMobileRnd));
	addElement($contentOuter,"",$classContentRow);
	
	var $contentInner = addElement($contentOuter);
	var $contentUpper = addElement($contentInner,"",$classContainer);
	var $contentUpperLeft = addElement($contentUpper,"",$classHalfWidth);
	
	var $contentUpperRight = addElement($contentUpper,"",$classHalfWidth);
	
	var $contentLower = addElement($contentInner,"",$classContainer);
	var $contentLowerLeft = addElement($contentLower,"",$classHalfWidth);
	
	var $contentLowerRight = addElement($contentLower,"",$classHalfWidth);
	
	addRow($contentInner,"JsonLint","addJsonLintPage('" + $contentUpperLeft + "')","RGB","addRgbColorPage('" + $contentUpperRight + "')","Calc","addCalcPage('" + $contentLowerLeft + "')","BadPW","addBadPWPage('" + $contentLowerRight + "')","Meme","addMemePage('" + $contentLowerRight + "')");
	
}; // end addPage

function addRentalMapPage($parentElement) {
	addElement($headWrapper,"","","script","","https://maps.googleapis.com/maps/api/js?key="+ $GOOGLE_API_KEY + "&callback=initMap");
	addMenuItem($NavDDWrapper,"Adding Google Maps to your website","","","https://developers.google.com/maps/documentation/javascript/adding-a-google-map#key");
	
	var $wrapper = addElement($parentElement,"",$classContainer + $classImgRnd);
	addElement($wrapper,"DiffeRENTial",$classContentRow);
	addElement($wrapper,"","","","width: 100vh;height: 75vh","","id","map");

}; // end addRentalMapPage

function addBot($parentElement) {
	var $coinAreaID = addElement($parentElement,"",$classInputFieldPLUSRow,"",$styleBlackTextWhiteBack);
	var $titleRowID = addElement($coinAreaID,"",$classContentRow);
	var $contentLabelID = addElement($titleRowID,"",$classHalfWidth);
	$assetCounter++
	
	var $dropdownListName = addElement($titleRowID,"","",'datalist');
	addElement($dropdownListName,"Asset" + $assetCounter,"",'option');
	addElement($dropdownListName,"firefox","",'option');
	var $assetLabelID = addElement($titleRowID,"Asset" + $assetCounter,$classThirdWidthRnd,'input',$styleBlackTextWhiteBack,"","list",$dropdownListName);

	// <input type=text list=browsers ><datalist id=browsers >   <option> Google   <option> IE9</datalist>
	// <input type="text" name="myText" value="Norway" selectBoxOptions="Canada;Denmark;Finland;Germany;Mexico;Norway;Sweden;United Kingdom;United States"> 


	var $addRow = {
		"rows" : [
			{"elementParent": $titleRowID,"firstName":"Add Asset","firstOnclick":"addBotRow('" + $assetLabelID + "','" + $coinAreaID + "');","secondName":"Del Bot","secondOnclick":"removeElement('" + $coinAreaID + "');"}
		]
	}
	cje($addRow);
	
	var $spacerName = addElement($coinAreaID);
	addElement($spacerName,"","",'br');
	addElement($spacerName,"","",'br');

	$assetName = readElement($assetLabelID);
}; // end addBot

function addBotRow($assetLabelID,$parentElement) {
	// = addElement($parentElement,"innerText",$classNarrowContent,"elementType","elementStyle","href","attributeType","attributeAction","elementId");
	// addRow($parentElement,"firstName","firstOnclick","secondName","secondOnclick","thirdName","thirdOnclick","fourthName","fourthOnclick","fifthName","fifthOnclick","sixthName","sixthOnclick")
	var $addRow = {
		"rows" : [
			{"elementParent": $parentElement,"firstName":readElement($assetLabelID),"secondName":"0","thirdName":"Buy","thirdOnclick":"thirdOnclick","fourthName":"Sell","fourthOnclick":"fourthOnclick","fifthName":"0","sixthName":"Del","sixthOnclick":"removeElement('" + $parentElement + "');"}
		]
	}
	cje($addRow);
	$assetCounter++;

	writeElement($assetLabelID,$assetName + $assetCounter);
}; // end addBotRow

// Add applications
function addFruitBotPage($parentElement) {
	addElement($headWrapper,"","","script","/assets/js/seedrandom.js");
	addElement($headWrapper,"","","script","/assets/js/board.js");
	addElement($headWrapper,"","","script","/assets/js/grid.js");
	addElement($headWrapper,"","","script","/mybot.js");
	addElement($headWrapper,"","","script","/assets/js/simplebot.js");
	addElement($headWrapper,"","","script","/assets/js/player.js");
	addElement($headWrapper,"","","script","/js/jquery.min.js");
	
	var $contentLabels = addElement($parentElement,"",$classImgRnd + $classRow,"",$styleWhiteTextBlackBack);
	
	var $content = addElement($parentElement,"Fruitbot",$classContentRow);
	
	var $grid = addElement($parentElement,"",$classContentRow,"canvas","","display: block;margin: 0px auto;border: 1px solid black;");
	var $game_view = addElement($parentElement,"",$classContentRow,"canvas","","display: block;margin: 0px auto;border: 1px solid black;");
	
	addRow($parentElement,"new","","reset","","pause","","play","","forward");

	var $myBoardRow = addElement($parentElement,"",$classRow + $classInputField);
	var $contentLabel2 = addElement($myBoardRow,"Board number",$classImgRnd + $classRow + $classContentTitle);
	var $BottomTextInput = addElement($myBoardRow,"0",$classInputField,"input","","","type","number");
	addRow($parentElement,"","","","","Set");
	
	var $myScoreRow = addElement($parentElement,"","","",$classRow + $classImgRnd + "col-md-4 col-xs-6");
	addRow($myScoreRow,"Wins","","0");
	addRow($myScoreRow,"Losses","","0");
	addRow($myScoreRow,"Ties","","0");
		
}; // end addPage

function addGitPage($parentElement) {
	var $wrapperGit = addElement($parentElement,"",$classContainer + $classImgRnd);
	addElement($wrapperGit,"repo URL",$classContentRow);
	var $myTextAreaGit = addElement($wrapperGit,"https:raw.githubusercontent.com/Gilgamech/GilAPI/master/public/js","div_textarea" + $classInputField,"input");
	var $myRowGit = addElement($wrapperGit,"",$classRow + $classInputField);
	
	var $wrapper = addElement($parentElement,"",$classContainer + $classImgRnd);
	var $pageName = addElement($wrapper,"Gilgamech.js",$classContentRow,"","","","contenteditable","true");
	var $myTextArea = addElement($wrapper,"Code goes here.","div_textarea" + $classImgRnd + $classInputField,"textarea",$styleWhiteBack + "height: 50vh;","href","contenteditable","true");
	
	var $myRow = addElement($wrapper,"",$classRow + $classInputField);

	addRow($myRowGit,"Copy to Clipboard","copyToClipboard('" + $myTextAreaGit + "');","Load from Github","updateNewPageForm('" + $pageName + "','" + $myTextAreaGit + "','" + $myTextArea + "');","Add New Page","updateNewPageBoilerplate();");
	
	addRow($myRow,"Pretty Print","prettyPrint('" + $myTextArea + "');","Colorify!","colorifyDivTextArea('" + $myTextArea + "');","Copy to Clipboard","copyToClipboard('" + $myTextArea + "');");
	
};  //end addPage

function addCoinPage($parentElement) {
	addMenuItem($NavDDWrapper,'How do you implement a fixed left sidebar and fluid right content in CSS',"","","https://stackoverflow.com/questions/3393025/how-do-you-implement-a-fixed-left-sidebar-and-fluid-right-content-in-css#3393037");
	addMenuItem($NavDDWrapper,'updateMePlease',"","","https://www.w3schools.com/Bootstrap/bootstrap_forms_inputs.asp");	
	addMenuItem($NavDDWrapper,'Bootstrap',"","","https://getbootstrap.com/docs/3.3/css/");
	addMenuItem($NavDDWrapper,'Bootstrap Buttons',"","","https://v4-alpha.getbootstrap.com/components/buttons/");
	addMenuItem($NavDDWrapper,'Bootstrap Navbar',"","","https://www.w3schools.com/bootstrap/bootstrap_navbar.asp");
	addMenuItem($NavDDWrapper,'Bootstrap Number Validation',"","","https://stackoverflow.com/questions/16517718/bootstrap-number-validation");
	addMenuItem($NavDDWrapper,'Bootstrap rounded corners',"","","https://stackoverflow.com/questions/12084121/correct-way-to-create-rounded-corners-in-twitter-bootstrap");
	addMenuItem($NavDDWrapper,'Number Input Type',"","","https://stackoverflow.com/questions/3368546/what-input-field-type-forces-the-number-pad-mobile-keyboard-to-come-up-when-focu");
	addMenuItem($NavDDWrapper,'Radio Input Type',"","","https://html.com/input-type-radio/");
	addMenuItem($NavDDWrapper,'Bootstrap Grid',"","","http://kimbryant.net/on-bootstraps-grid-using-display-inline-block-instead-of-floats/");
	addMenuItem($NavDDWrapper,'Document Onload not cooperating',"","","https://bytes.com/topic/javascript/answers/441839-document-onload-getelementbyid-dont-cooperate");
	addMenuItem($NavDDWrapper,'Set radio button status with Javascript',"","","https://stackoverflow.com/questions/9476617/how-to-set-radio-button-status-with-javascript");
	addMenuItem($NavDDWrapper,'Change onclick action with Javascript',"","","https://stackoverflow.com/questions/5303899/change-onclick-action-with-a-javascript-function");
	addMenuItem($NavDDWrapper,'Dynamically adding or removing a Div',"","","https://stackoverflow.com/questions/4967289/dynamically-adding-removing-a-div-to-html");
	addMenuItem($NavDDWrapper,'Dropdown menus',"","","https://stackoverflow.com/questions/18030132/html-css-dropdown-menu-overflow");
	addMenuItem($NavDDWrapper,'Search for "appendChild.body"',"","","https://duckduckgo.com/?q=document+appendchild+body&atb=v49-6&ia=qa");
	addMenuItem($NavDDWrapper,'HTML5 Combobox',"","","http://www.scriptol.com/html5/combobox.php");
	addMenuItem($NavDDWrapper,'Form widget editable select',"","","http://www.dhtmlgoodies.com/scripts/form_widget_editable_select/form_widget_editable_select.html");
	
	var $generic = addElement($parentElement,"",$classRow);
	var $sidebar = addElement($parentElement,"","sidebar col-md-2 hidden-sm hidden-xs" + $classImgRnd + $classContentTitle,"","border:1px solid #333;");
	var $consoleLogLabel = addElement($sidebar,"Coinsole Log");
	var $coinMainBox = addElement($sidebar,"Data Loading...",$classImgRnd,"","background-color:#fff;height:75vh;font-size: small;overflow-x: hidden;overflow-y:auto;");
	var $spacer = addElement($parentElement);
	
	var $content = addElement($parentElement,"",$classImgRnd + " col-md-10 col-xs-10");

	var $cointentArea = addElement($content,"",$classInputFieldPLUSRow,"",$styleBlackTextWhiteBack);

	var $coinTentWrapper = addElement($content,"",$classImgRnd,"",$styleBlackTextWhiteBack);
	var $titleRow = addElement($coinTentWrapper,"",$classRow + $classContentTitle);
	var $contentLabel = addElement($titleRow,"Cointent","col-md-10 col-xs-10" + $classContentTitle);
	addRow($contentLabel,"","","","","Refresh","refreshCharts();");
	
	var $nameRow = addRow($content,"Coin","","Value","","My Coins","","MyBot","","Fruitbot","","SimpleBot");
	var $btcRow = addRow($content,"BTC","","0","","0","","0","","0","","0");
	var $ltcRow = addRow($content,"LTC","","0","","0","","0","","0","","0");
	var $ethRow = addRow($content,"ETH","","0","","0","","0","","0","","0");
	var $fbcRow = addRow($content,"FBC","","0","","0","","0","","0","","0");

	$cointentArea2 = addElement($coinTentWrapper,"",$classInputFieldPLUSRow);
	var $titleRow = addElement($cointentArea2,"",$classRow + $classContentTitle,"",$styleBlackTextWhiteBack);
	var $botNameLabel = addElement($cointentArea2,"MyBotName","col-md-10 col-xs-10" + $classContentTitle + $classImgRnd,"",$styleBlackTextWhiteBack,"","contenteditable","true");
	
	addRow($cointentArea2,"Add Bot","addBot('" + $botNameLabel + "');");	
	
	loadCoinData();
	refreshCharts();
	document.getElementById($coinMainBox).innerText = $coin2;
	document.getElementById($btcMedian).innerText = 0;
	
	timerInterval = setInterval(function () {
		refreshCharts()
	}, 30000);
	
}; // end addCoinPage

//Run SPA
function loadPage($pageTitle,$firstPage) {
try {
	removeElement($headWrapper);
	removeElement($NavDDWrapper);
	removeElement($bodyWrapper);
	removeElement($footWrapper);
	window.clearInterval(timerInterval);
	
	
	$headWrapper = addElement("head");
	$bodyWrapper = addElement("body");
	$footWrapper = addElement("body");
	$NavDDWrapper = addElement($nav3dd,"",$classDropdownContent);
	
	switch ($firstPage) {
		case "admin": 
		break;
		case "sandbox": 
			addElementSandboxPage($bodyWrapper);
		break;
		case "demo": 
			addArkDynaPage($bodyWrapper);
		break;
		case "Arkdata": 
			addArkdataPage($bodyWrapper);
		break;
		case "rentalmap": 
			addRentalMapPage($bodyWrapper);
		break;
		case "calc": 
			addCalcPage($bodyWrapper);
		break;
		case "coin": 
			addCoinPage($bodyWrapper);
		break;
		case "meme": 
			addMemePage($bodyWrapper);
		break;
		case "fruitbot": 
			addFruitBotPage($bodyWrapper);
		break;
		case "rgb": 
			addRgbColorPage($bodyWrapper);
		break;
		case "addElement": 
			addAddElementPage($bodyWrapper);
		break;
		case "minimalism": 
			addMinimalismPage($bodyWrapper);
		break;
		case "badpw": 
			addBadPWPage($bodyWrapper);
		break;
		case "chat": 
			addChatPage($bodyWrapper);
		break;
		case "dsq": 
			addDragSqPage($bodyWrapper);
		break;
		case "git": 
			addGitPage($bodyWrapper);
		break;
		case "jsonlint": 
			addJsonLintPage($bodyWrapper);
		break;
		case "login": 
			addFormPage("login",$bodyWrapper);
			
	addMenuItem($NavDDWrapper,'Javascript Basic Auth',"https://stackoverflow.com/questions/491914/pure-javascript-code-for-http-basic-authentication");
	addMenuItem($NavDDWrapper,'Sequelize getting started',"http://docs.sequelizejs.com/manual/installation/getting-started.html");
	addMenuItem($NavDDWrapper,'Sequelize Findone',"https://stackoverflow.com/questions/32212945/sequelize-findone-success-is-undefined#32213208");
	addMenuItem($NavDDWrapper,'Render common variables from app.js to all routes in express',"https://stackoverflow.com/questions/29026650/how-to-render-common-variables-from-app-js-to-all-routes-in-express");
	addMenuItem($NavDDWrapper,'Delete cookie on logout in Express and Passport',"https://stackoverflow.com/questions/33112299/how-to-delete-cookie-on-logout-in-express-passport-js");
	addMenuItem($NavDDWrapper,'Cookie Parser on Github',"https://github.com/expressjs/cookie-parser#cookieparsersignedcookiestr-secret");
	addMenuItem($NavDDWrapper,'Express JS book',"http://expressjs-book.com/index.html%3Fp=128.html");
	addMenuItem($NavDDWrapper,'Bootstrap buttons',"https://v4-alpha.getbootstrap.com/components/buttons/#sizes");
	
		break;
		case "signup": 
			addFormPage("signup",$bodyWrapper);
		break;
	}; // end switch divColor
	addMenuItem($NavDDWrapper,"______________");
	
	addMenuItem($NavDDWrapper,'Custom scrollbars in Webkit',"https://css-tricks.com/custom-scrollbars-in-webkit/");
	addMenuItem($NavDDWrapper,'Load div as file',"https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/");
	addMenuItem($NavDDWrapper,'Applies color scheme to text in div',"https://stackoverflow.com/questions/23737776/how-to-color-specific-word-in-a-container-using-css");
	addMenuItem($NavDDWrapper,'Load JSON',"https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript");
	addMenuItem($NavDDWrapper,'Javascript Objects',"https://www.w3schools.com/js/js_objects.asp");
	addMenuItem($NavDDWrapper,'Clear SetInterval',"https://stackoverflow.com/questions/2901108/how-do-i-clear-this-setinterval#2901155");
	addMenuItem($NavDDWrapper,'Make footer stick to the bottom of the page.',"https://stackoverflow.com/questions/3443606/make-footer-stick-to-bottom-of-page-correctly#18066619 ");
	
	addFooter($footWrapper);
	
	if ($GilMain.GilJSVersion != $pageVersion) {
		document.getElementById($errDiv).innerText = "Version " + $GilMain.GilJSVersion + " of Gilgamech.js is available. Refresh the page to update.";
	}; // end if GilJSVersion
	
} catch(e){console.log(e)};
}; // end loadPage

function buildPage($pageTitle,$firstPage){ 
	addHeader("head",$pageTitle);
	addNav("body",$pageTitle);	
	loadPage($pageTitle,$firstPage);
}; // end loadPage

window.onload = function(){
	buildPage($pageHeaderTitle,$pageStarting);
	initPage($pageSettingsJson);
}; // end window.onload

