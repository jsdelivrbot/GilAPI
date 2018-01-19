//Gil.JS

//Init vars
var $GilMain
var $pageVersion = "698"
var $apiVersion
var $GOOGLE_API_KEY

var $chatGeneral = "";
var $errgoLogic = "--- Err and Log Output --- " + lineBreak + lineBreak;

// addDiv
var timerInterval //Default timer variable, removed in removePage.

// Oddly useful
var lineBreak = "\r\n"; 
var spaceChar = " "; 

// Fruitbot, Meme, DSQ 
var bgImage;
var bgReady;
var canvas;
var ctx;
var $stage;
var SIZE = 50;

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
var $botCounter = 0
var $assetCounter = 0

// CSS classes
var $cssSmallHidden=" hidden-sm hidden-xs "
var $cssLargeHidden=" hidden-md hidden-lg "
var $cssClassA = "colorRow img-rounded  col-md-12 col-xs-12 "
var $cssClassB = "img-rounded col-md-12 col-xs-12"
var $cssClassC = "img-rounded row contentTitles"
var $cssClassD = "col-md-2 col-xs-2";
var $btnPrimary = "btn btn-primary"
var $btnCalc = "btn btn-primary btn-lg"
var $rowClasses = "row";

// Functions
// Init
function initPage(){
	
	$GilMain = {apiVersion: "null", googleApiKey: 'aSecretToEverybody',chatGeneral: "", errgoLogic: ""};
	
	postJSON("https://gil-api.herokuapp.com/settings.json", function(response) {
		$GilMain = response
	}); // end loadJSON
	$apiVersion = $GilMain.apiVersion
	$GOOGLE_API_KEY = $GilMain.googleApiKey
	$chatGeneral = $GilMain.chatGeneral
	$errgoLogic = $GilMain.errgoLogic
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
		document.getElementById("myErrDiv").innerText = "";	
	} catch($err) {
		document.getElementById("myErrDiv").innerText = $err;
	};
}

function getNumberFromDiv($numericDiv) {
	return Math.round(
		document.getElementById($numericDiv).innerText  *1
	)
};

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

function addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) {
	if (!$elementType) {
		$elementType = 'div'
	}; // end if elementType	
	var $newDiv = document.createElement($elementType);

	if ($divID) {
		$newDiv.id = $divID;
	}; // end if onClick

	if ($divClass) {
		$newDiv.className = $divClass
	}; // end if onClick
	
	if ($elementType == 'input' && $innerText) {
		$newDiv.value = $innerText
	} else if ($elementType == 'img' && $innerText) {
		$newDiv.title = $innerText
	} else if ($innerText) {
		$newDiv.innerText = $innerText
	}; // end if elementType	
	
	if ($elementType == 'a' && $href) {
		$newDiv.href = $href
	} else if ($elementType == 'img' && $href) {
		$newDiv.src = $href
	} else if ($elementType == 'script' && $href) {
		$newDiv.src = $href
	} else if ($elementType == 'link' && $href) {
		$newDiv.href = $href
		$newDiv.rel = "stylesheet"
		$newDiv.type="text/css"
	}; // end if elementType	
	
	if ($divParent == 'body') {
		document.body.appendChild($newDiv);
	} else if ($divParent == 'head') {
		document.head.appendChild($newDiv);
	} else {
		document.getElementById($divParent).appendChild($newDiv);
	}; // end if divParent
	
	if ($attributeType && $attributeAction) {
		document.getElementById($divID).setAttribute($attributeType, $attributeAction);
	}; // end if onClick
	
}; // end addDiv	

function addElement($elementParent,$innerText,$elementClass,$elementID,$elementType,$elementStyle,$href,$attributeType,$attributeAction) {
	if (!$elementType) {
		$elementType = 'div'
	}; // end if elementType	
	var $newElement = document.createElement($elementType);

	if (!$elementID) {
		$elementID = getBadPW();
	}; // end if onClick
	$newElement.id = $elementID;

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
		
			document.getElementById($elementID).setAttribute($attributeType, $attributeAction);
	}; // end if onClick	
}; // end addDiv	

function detectEnter($keypress,callback){
    if($keypress.keyCode === 13){
        $keypress.preventDefault(); // Ensure it is only this code that runs
		$outputCallback = function () {
            callback();
		};
    };
}; // end detectEnter

function updateElement($elementId,$source) {	  
	var $elementType = document.getElementById($elementId).type;
	
	if ($elementType == 'text') {
		document.getElementById($elementId).value = $source;
	} else {
		document.getElementById($elementId).innerText = $source;
	}; // end if divParent
}; // end getBadPW

function updateFormPost($elementId,$postJsonUrl) {
	postFile($postJsonUrl, function(response) {
		document.getElementById($elementId).value  = response
	}); // end loadJSON
}; // end updateFormPost

// Chat
function updateChat() {
  // /chatpost?user=user&message=message&chatroom=General
  // Post API with user:chat JSON and write reply to textbox.
  chatUser = document.getElementById("chatUser").value
  chatMessage = document.getElementById("chatMessage").value
  chatRoom = document.getElementById("chatRoom").value
  if (chatMessage) {
    if (chatUser) {
      chatUrl = "https://gil-api.herokuapp.com/chatpost?user=" + chatUser + "&message=" + chatMessage + "&chatroom=" + chatRoom
	  loadChat(chatUrl,"chatMainBox")
      document.getElementById("chatMessage").value = ""
      document.getElementById("userNameErr").innerText = ""
    } else {
      document.getElementById("userNameErr").innerText = "Enter a user name. Then do a barrel roll."
    }; //end if chatUser
  }; //end if chatMessage
}; // end update

function refreshChat(chatRoom){
  chatUrl = "https://gil-api.herokuapp.com/chatload?chatroom=" + chatRoom
  loadChat(chatUrl,"chatMainBox")
}; // end refresh

function loadChat(chatUrl,chatBox){
  loadJSON(chatUrl, function(response) {
    document.getElementById(chatBox).value = response
    document.getElementById("chatMainBox").value = response
  }); // end loadJSON
}; // end loadChat

// DSQ
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

function updateNewPageForm() {
  RepoUrlElement = "myTextAreaGit";
  Pagename = document.getElementById("pageName").value;

  updateTextAreaFromRepo("pageName",RepoUrlElement,"myTextArea");
  
  colorifyDivTextArea('myTextArea');
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

function setupLink(textAreaID,downloadLinkID) {
  document.getElementById(textAreaID).value = window.onload + '';
  document.getElementById(downloadLinkID).onclick = function() {
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
	
	$hex = hexToRgb(document.getElementById("htmlRow").value);
	document.getElementById("redRow").value = $hex.r
	document.getElementById("greenRow").value = $hex.g
	document.getElementById("blueRow").value = $hex.b
	
	document.getElementById("contentLabel").style.backgroundColor  
	= document.getElementById("htmlRow").value
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
		case "redRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "greenRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "blueRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

    document.getElementById("htmlRow").value = rgbToHex(
		(document.getElementById("redRow").value * 1), 
		(document.getElementById("greenRow").value * 1),
		(document.getElementById("blueRow").value * 1),
	);
	
	document.getElementById("contentLabel").style.backgroundColor = document.getElementById("htmlRow").value

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
	$coin2 += $eth.base + " | " + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $fbc.base + " | " + $fbc.amount  + " | " + (Math.round(($fbc.amount - $fbcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $btc.base + " | " + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;
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

function addBot($divBotName) {
	var $botName = document.getElementById($divBotName).innerText;
	
	var $coinAreaID = ($botName + 'CoinArea')
	var $coinAreaClass = 'img-rounded col-md-12 col-xs-12 row' ;
	var $titleRowID = ($botName + 'TitleRow')
	var $titleRowClass = 'row contentTitles';
	var $contentLabelID = ($botName + 'ContentLabel')
	var $contentLabelClass = 'col-md-6 col-xs-6';
	
	
	addDiv($coinAreaID,$coinAreaClass,'CoincointentArea2',"","","style","background-color:#fff;");
	addDiv($titleRowID,$titleRowClass,$coinAreaID);
	addDiv($contentLabelID,$contentLabelClass,$titleRowID,$botName);
	$assetCounter++
	
	var $assetLabelID = ($botName + 'AssetLabel')
	var $assetLabelClass = 'col-md-4 col-xs-4 img-rounded ';
	// addDiv($assetLabelID,$assetLabelClass,$titleRowID,"Asset"  + $assetCounter);
	 addDiv($assetLabelID,$assetLabelClass,$titleRowID,"Asset" + $assetCounter,'input',"","style","background-color:#fff;");
	
	var $dropdownListName = ('items' + $assetCounter);
	document.getElementById($assetLabelID).setAttribute( "list", $dropdownListName);

	 addDiv($dropdownListName,"",$titleRowID,"",'datalist');
	 addDiv("","",$dropdownListName,"Asset" + $assetCounter,'option');
	 addDiv("","",$dropdownListName,"firefox",'option');
	// <input type=text list=browsers ><datalist id=browsers >   <option> Google   <option> IE9</datalist>
	// <input type="text" name="myText" value="Norway" selectBoxOptions="Canada;Denmark;Finland;Germany;Mexico;Norway;Sweden;United Kingdom;United States"> 


	var $buttonID = ($botName + 'AssetButton')
	var $buttonClass = 'btn btn-warning';
	var $onClick = "javascript: addBotRow('" + $assetLabelID + "','" + $coinAreaID + "');"
	addDiv($buttonID,$buttonClass,$titleRowID,'Add Asset','button',"","onclick",$onClick)
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) {
	
	var $button2ID = ($botName + 'DeleteButton')
	var $button2Class = 'btn btn-xs btn-danger';
	var $onClick = "javascript: removeElement('" + $coinAreaID + "');"
	addDiv($button2ID,$button2Class,$titleRowID,'Del Bot','button',"","onclick",$onClick)	
	
	
	var $headerRow = ($botName + 'HeaderRow')
	var $headerClass = 'col-md-2 col-xs-2';
	
	addDiv($headerRow,"row",$coinAreaID,"","","style","background-color:#090909;color:#fff;");
	addDiv(($botName + "headerCoin"),$headerClass,$headerRow,":");
	addDiv(($botName + "headerPrice"),$headerClass,$headerRow,"Price:");
	addDiv(($botName + "headerManualBuy"),$headerClass,$headerRow,"Manual Buy:");
	addDiv(($botName + "headerBotAmount"),$headerClass,$headerRow,"Bot Amount:");
	addDiv(($botName + "headerBotAction"),$headerClass,$headerRow,"Bot Action:");
	addDiv(($botName + "headerBotPred"),$headerClass,$headerRow,"Del Asset:");

	$assetName = document.getElementById($assetLabelID).innerText
	
	$botCounter++;
	document.getElementById($divBotName).innerText = $botName + $botCounter;
	
	var $spacerName = ("spacerrow" + $botCounter);
	var $spacerClass = 'col-md-12 col-xs-12 row' ;
	addDiv($spacerName,$spacerClass,'content'," ",'');
	addDiv("","",$spacerName," ",'br');
	addDiv("","",$spacerName," ",'br');

}; // end addBot

function addBotRow($assetLabelID,$parentDivName) {
	$assetName = document.getElementById($assetLabelID).value;

	//coinAreaRowID is the container for the row.
	var $coinAreaRowID = ($assetName + 'ContentRow');
	var $divClass = ' row';
	addDiv($coinAreaRowID,'row',$parentDivName);
	
	var $assetManualTrans = ($assetName + 'AssetManualTrans');
	var $divDeleteBot = ($assetName + 'DeleteButtonDiv');
	var $button2ID = ($assetName + 'DeleteButton');
	
	var $divClass = 'contentItems col-md-2 col-xs-2';
	addDiv(($assetName + 'AssetLabel'),$divClass,$coinAreaRowID,$assetName);
	addDiv(($assetName + 'AssetPrice'),$divClass,$coinAreaRowID,"0");
	addDiv($assetManualTrans,$divClass,$coinAreaRowID);
	addDiv(($assetName + 'ManualBuyButton'),'btn btn-primary btn-xs',$assetManualTrans,'Buy','button');
	addDiv(($assetName + 'ManualSellButton'),'btn btn-success btn-xs',$assetManualTrans,'Sell','button');
	addDiv(($assetName + 'BotAmount'),$divClass,$coinAreaRowID,"0");
	addDiv(($assetName + 'BotAction'),$divClass,$coinAreaRowID,"0");
	addDiv($divDeleteBot,$divClass,$coinAreaRowID);

	var $btnAttribute = "javascript: removeElement('" + $coinAreaRowID + "');";
	addDiv($button2ID,'btn btn-xs btn-danger',$divDeleteBot,'Del','button',"","onClick",$btnAttribute);
	
	$assetCounter++;
	document.getElementById($assetLabelID).innerText = $assetName + $assetCounter
	
}; // end addBot

function refreshCharts() {
  try {
    if (document.getElementById("btcMedian").innerText == "NaN") {document.getElementById("btcMedian").innerText = 0}	loadCoinData();
	updateCoinsole("coinMainBox");
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
function pressCalcButton($inputNumber,$outputDiv) {
	document.getElementById($outputDiv).value += $inputNumber
}

function evalCalc($outputDiv) {
	$inputToEval = document.getElementById($outputDiv).value
	document.getElementById($outputDiv).value = eval($inputToEval)
}

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

// Add pages
function addHeader() {
	addElement("head","Gilgamech Technologies","","","title");
	addElement("head","","","","script","","/js/jquery.min.js");
	addElement("head","","","","link","","/stylesheets/bootstrap.min.css");
	addElement("head","","","","link","","/stylesheets/normalize.css");
	addElement("head","","","","link","","/stylesheets/Gilgamech.css");
	
}; // end addHeader

function addNav() {
	addDiv("gtBannerWrapper","container",'body');
	addDiv("gtBannerLinkW","img-rounded top " + $cssSmallHidden,'gtBannerWrapper',"Gilgamech Technologies","a","/","style",  "font-size: 7ex; color: #000; text-decoration: none");
	addDiv("gtBannerLinkM","img-rounded top " + $cssLargeHidden,'gtBannerWrapper',"Gilgamech Technologies","a","/","style",  "font-size: 4ex; color: #000; text-decoration: none");
	
	addDiv("navbar","navbar navbar-static-top navbar-inverse",'body');
	addDiv("navWrapper","container",'navbar');
	addDiv("nav2","nav navbar-nav col-md-6 col-xs-6",'navWrapper','','ul');
	
	addDiv("l1",$cssSmallHidden,'nav2','','li');
	addDiv("a1","",'l1','Fruitbot!','a',"","onclick","loadPage('fruitbot');");
	
	addDiv("l2",$cssSmallHidden,'nav2','','li');
	addDiv("a2","",'l2','Bad Password','a',"","onclick","loadPage('badpw');");

	addDiv("l3",$cssSmallHidden,'nav2','','li');
	addDiv("a3","",'l3','Chat!','a',"","onclick","loadPage('chat');");

	addDiv("dd","dropdown",'nav2');
	addDiv("ddp","",'dd','Menu','p');
	addDiv("ddc","dropdown-content",'dd',);
	
	addDiv("lip1",$cssLargeHidden,'ddc','','p');
	addDiv("aip1","",'lip1','Fruitbot!','a',"","onclick","loadPage('fruitbot');");
		
	addDiv("lip3",$cssLargeHidden,'ddc','','p');
	addDiv("aip3","",'lip3','Bad Password','a',"","onclick","loadPage('badpw');");

	addDiv("lip4",$cssLargeHidden,'ddc','','p');
	addDiv("aip4","",'lip4','Chat!','a',"","onclick","loadPage('chat');");

	addDiv("lip1d","",'ddc','','p');
	addDiv("aip1d","",'lip1d','DiffeRentIal','a',"","onclick","loadPage('rentalmap');");

	addDiv("lip1c","",'ddc','','p');
	addDiv("aip1c","",'lip1c','Calculator','a',"","onclick","loadPage('calc');");

	addDiv("lip13","",'ddc','','p');
	addDiv("aip13","",'lip13','addDiv Explained','a',"","onclick","loadPage('addDiv');");

	addDiv("lip11","",'ddc','','p');
	addDiv("aip11","",'lip11','RGB Calculator','a',"","onclick","loadPage('rgb');");

	addDiv("lip12","",'ddc','','p');
	addDiv("aip12","",'lip12','Draggable Squares','a',"","onclick","loadPage('dsq');");
	addDiv("lip5","",'ddc','','p');
	addDiv("aip5","",'lip5','Coins','a',"","onclick","loadPage('coin');");
	addDiv("lip6","",'ddc','','p');
	addDiv("aip6","",'lip6','JSON Lint','a',"","onclick","loadPage('jsonlint');");
	addDiv("lip7","",'ddc','','p');
	addDiv("aip7","",'lip7','Git','a',"","onclick","loadPage('git');");
	addDiv("lip8","",'ddc','','p');
	addDiv("aip8","",'lip8','Meme Maker','a',"","onclick","loadPage('meme');");
	//addDiv("lip9","",'ddc','','p');
	//addDiv("aip9","",'lip9','Arkdata Dynamap','a',"","onclick","loadPage('demo');");
	//addDiv("lip10","",'ddc','','p');
	//addDiv("aip10","",'lip10','Arkdata','a',"","onclick","loadPage('Arkdata');");
	
	
	addDiv("lip14",$cssLargeHidden,'ddc','','p');
	addDiv("aip14","",'lip14','Login!','a',"","onclick","loadPage('login');");	

	var $nbr = "navbar-right"
	addDiv("nav3","nav navbar-nav col-md-6 col-xs-6" + " " + $nbr,'navWrapper','','ul');
	
	addDiv("lr1",$nbr + " " + $cssSmallHidden,'nav3','','li');
	addDiv("ar1",$cssSmallHidden,'lr1','Login!','a',"","onclick","loadPage('login');");	
	
	addDiv("dd42","dropdown" + " " + $nbr,'nav3');
	addDiv("dd4r","",'dd42','How did I make this page?','p');
	addDiv("dd4rc","dropdown-content",'dd42',);

	addDiv("NavDDOuter","",'dd4rc','','p');

}; // end addPage

function addFooter() {
	$apiVersion = $GilMain.apiVersion
	addElement("footWrapper","","container-fluid");
	addElement("footWrapper","","navbar-static-bottom","footClan","","left: 0;bottom: 0;width: 100%;overflow: hidden;");
	addElement("footClan","","","ftBanner","p","width: 100%;text-align: center;");
	addElement("ftBanner","","","aFooter","a","https://www.duckduckgo.com");
	addElement("aFooter","C1ick h34r ph0r m04r inph0","img-rounded","","img","height: 150px","/images/BannerImage.gif");
	addElement("footClan",'Gil-API version: ' + $apiVersion + " - Gilgamech.js version: " + $pageVersion,"","","","font-weight:bold;text-align:center;");
	addElement("footClan","(c) 2013-2018 Gilgamech Technologies - We are the gears that make our world go around.","","","p","font-weight:bold;text-align:center;");
	
}; // end addFooter

function addFruitBotPage() {
	addDiv("load1","",'headWrapper',"","link","/assets/css/drawgame.css");
	addDiv("load2","",'headWrapper',"","script","/assets/js/seedrandom.js");
	addDiv("load3","",'headWrapper',"","script","/assets/js/board.js");
	addDiv("load4","",'headWrapper',"","script","/assets/js/grid.js");
	addDiv("load5","",'headWrapper',"","script","/mybot.js");
	addDiv("load6","",'headWrapper',"","script","/assets/js/simplebot.js");
	addDiv("load7","",'headWrapper',"","script","/assets/js/player.js");
	addDiv("load8","",'headWrapper',"","script","/js/jquery.min.js");
	
	addDiv("contentLabels","img-rounded row",'bodyWrapper',"","","style","background-color:#090909;color:#fff;");
	
	addDiv("content",$cssClassC,'bodyWrapper',"Fruitbot");
	
	addDiv("grid",$cssClassC,'bodyWrapper',"","canvas","","style","display: block;margin: 0px auto;border: 1px solid black;");
	addDiv("game_view",$cssClassC,'bodyWrapper',"","canvas","","style","display: block;margin: 0px auto;border: 1px solid black;");
	
	addDiv("myRow","row " + $cssClassB,'bodyWrapper');
	addDiv("btnPretty",$btnPrimary,'myRow',"new","button");
	addDiv("btnPretty","btn btn-caution",'myRow',"reset","button");
	addDiv("btnPretty","btn btn-info",'myRow',"pause","button");
	addDiv("btnPretty","btn btn-success",'myRow',"play","button");
	addDiv("btnPretty","btn btn-warning",'myRow',"forward","button");

	addDiv("myBoardRow","row " + $cssClassB,'bodyWrapper');
	addDiv("contentLabel2","img-rounded row contentTitles",'myBoardRow',"Board number");
	addDiv("BottomTextInput",$cssClassB,'myBoardRow',"0","input","","type","number");
	addDiv("btnPretty","btn btn-caution",'myBoardRow',"Set","button");
	
	addDiv("myScoreRow","row img-rounded col-md-4 col-xs-6",'bodyWrapper');
	addDiv("winsRow","row img-rounded",'myScoreRow');
	addDiv("winsLabel","img-rounded col-md-6 col-xs-3",'winsRow',"Wins");
	addDiv("winsInput","img-rounded col-md-6 col-xs-3",'winsRow',0,"input");
	addDiv("lossRow","row img-rounded",'myScoreRow');
	addDiv("lossLabel","img-rounded col-md-6 col-xs-3",'lossRow',"Losses");
	addDiv("lossInput","img-rounded col-md-6 col-xs-3",'lossRow',0,"input");
	addDiv("tiesRow","row img-rounded",'myScoreRow');
	addDiv("tiesLabel","img-rounded col-md-6 col-xs-3",'tiesRow',"Ties");
	addDiv("tiesInput","img-rounded col-md-6 col-xs-3",'tiesRow',0,"input");
	
}; // end addPage

function addRgbColorPage() {
	var $rowClasses = "row colorRow"
	
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','Search Convert to Hex','a',"https://duckduckgo.com/?q=javascript+convert+to+he&atb=v49-6&ia=qa");
	addDiv("linkP2","",'NavDDWrapper','','p');
	addDiv("linkSO2","",'linkP2','RGB to HEX and HEX to RGB','a',"https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139");
	addDiv("linkP3","",'NavDDWrapper','','p');
	addDiv("linkSO3","",'linkP3','Change Div color on keypress','a',"https://stackoverflow.com/questions/42521420/change-div-bgcolor-onkeypress");
	addDiv("linkP4","",'NavDDWrapper','','p');
	addDiv("linkSO4","",'linkP4','Prop style background color','a',"https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp");
	addDiv("linkP5","",'NavDDWrapper','','p');
	addDiv("linkSO5","",'linkP5','RGB coder','a',"https://www.easycalculation.com/colorconverter/rgb-coder.php");

	addDiv("spacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel",$cssClassC,'coinArea','RGB Calculator');
	
	addDiv("htmlColorRow",$rowClasses,'coinArea');
	addDiv("htmlRow",$cssClassA,'htmlColorRow','',"input","","onchange","updateRgbColor()");
	document.getElementById("htmlRow").setAttribute( "style",  "color: #000;background-color:#fff;");
	document.getElementById("htmlRow").setAttribute( "maxlength",  "7");
	
	addDiv("redCRow",$rowClasses,'coinArea');
	addDiv("redRow",($cssClassA),'redCRow',171,"input","","onchange","updateRgbDivColor('redRow');");
	document.getElementById("redRow").setAttribute( "style",  "background-color:#833");
	document.getElementById("redRow").setAttribute( "type",  "number");
	
	addDiv("greenCRow",$rowClasses,'coinArea');
	addDiv("greenRow",$cssClassA,'greenCRow',205,"input","","onchange","updateRgbDivColor('greenRow');");
	document.getElementById("greenRow").setAttribute( "style",  "background-color:#383");
	document.getElementById("greenRow").setAttribute( "type",  "number");
	
	addDiv("blueCRow",$rowClasses,'coinArea');
	addDiv("blueRow",$cssClassA,'blueCRow',239,"input","","onchange","updateRgbDivColor('blueRow');");
	document.getElementById("blueRow").setAttribute( "style",  "background-color:#338");
	document.getElementById("blueRow").setAttribute( "type",  "number");
	
	updateRgbDivColor('redRow');
	updateRgbDivColor('greenRow');
	updateRgbDivColor('blueRow');
}; // end addPage

function addArkdataPage() {
	addDiv("metaRefresh","",'headWrapper',"","meta","","http-equiv","refresh");
	document.getElementById("metaRefresh").setAttribute( "content","60");
	addDiv("Arkdatalink","",'headWrapper','','link','/stylesheets/ARKData.css');
	addDiv("Arkdatalinkm","",'headWrapper','','link','/stylesheets/ARKDatam.css',"media","handheld");
	
	addDiv("Arkdatawrapper","container img-rounded",'bodyWrapper');
	addDiv("Arkdataspacer","img-rounded col-md-3 hidden-xs",'Arkdatawrapper');
	addDiv("Arkdatacontent","img-rounded col-md-6 col-xs-12",'Arkdatawrapper');
	addDiv("ArkdatacoinArea","",'Arkdatacontent');
	addDiv("ArkdatacontentLabel1",$cssClassC,'ArkdatacoinArea','Welcome to ARKData');
	addDiv("ArkdatacontentLabel2","img-rounded row contentItems",'ArkdatacoinArea',"Gil's player and tribe tracker");
	addDiv("ArkdatacontentLabel3","img-rounded row contentItems",'ArkdatacoinArea',"Players currently being tracked:");

	
	addDiv("ArkdataContentRow","container  row ","ArkdatacoinArea","","style","border:1px solid #333;");
	addDiv("ArkdataLabel","contentItems " + $cssClassD,"ArkdataContentRow","BTC");
	addDiv("ArkdataAmount","img-rounded colorRow contentItems col-md-12 col-xs-12","ArkdataContentRow","0","number","","readonly");
	document.getElementById("ArkdataAmount").setAttribute( "style", "background-color:#3CBE3C");
	addDiv("ArkdataMedian","contentItems " + $cssClassD,"ArkdataContentRow","0");
	addDiv("ArkdataBotAmount","contentItems " + $cssClassD,"ArkdataContentRow","0");
	addDiv("ArkdataBotAction","contentItems " + $cssClassD,"ArkdataContentRow","0");
	addDiv("ArkdataBotPrediction","contentItems " + $cssClassD,"ArkdataContentRow","0");

}; // end addArkdataPage
/*

<H1>Welcome to ARKData</h1>
<h4>Gil's player and tribe tracker</H4>
<h4>Servers currently being tracked:</h4>

<table>
<tr><th>PlayerName<th>ServerName<th>Firstseen<th>Timeseen
<tr><td>dopey.tim<td>Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)<td>10/23/2017 13:25:45<td>10/24/2017 22:46:34
</table>

<textarea id="txtJob" cols="40" rows="5" value="software engineer" class="img-rounded"></textarea>

<table>
<tr><th>PlayerName<th>ServerName<th>Firstseen<th>Timeseen
<tr><td>MFrider88<td>Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)<td>10/23/2017 21:41:57<td>10/23/2017 23:02:46
<tr><td>MacNCheese3<td>Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)<td>9/1/2017 14:42:06<td>10/24/2017 15:21:50
<tr><td>GenMaxiu<td>Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)<td>6/10/2017 10:09:07<td>10/24/2017 0:10:12
<tr><td>FMFrider88<td>Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)<td>10/23/2017 21:23:43<td>10/23/2017 23:39:49
</table>

*/

function addAddDivPage() {
	var $Title = "addDiv explained";
	var $Header = "addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)"
	var $bodyText = "This can be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n"
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
	
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel",$cssClassC,'coinArea',$Title);
	
	addDiv("headerMainRow",$rowClasses,'coinArea');
	addDiv("headerRow","img-rounded col-md-12 col-xs-12 ",'headerMainRow',$Header,"p","","onchange","updateRgbColor()");
	document.getElementById("headerRow").setAttribute( "style",  "color: #000");
	addDiv("textRow","",'coinArea',$bodyText,"p","","onchange","updateRgbColor()");
	document.getElementById("textRow").setAttribute( "style",  "color: #000");
	
}; // end addPage

function addMemePage() {
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','How to add a border on html5 canvas text?','a',"https://stackoverflow.com/questions/1421082/how-to-add-a-border-on-html5-canvas-text#1421598");

	addDiv("content",$cssClassC,'bodyWrapper',"MemeGen");
	
	addDiv("canvas","img-rounded",'bodyWrapper',"","canvas","","style","display: block;margin: 0px auto;border: 1px solid black;");

	addDiv("memeUrlInput",$cssClassB,'bodyWrapper',"https://technabob.com/blog/wp-content/uploads/2014/08/picard1.jpg","input");
	addDiv("topTextInput",$cssClassB,'bodyWrapper',"Top Text","input");
	addDiv("BottomTextInput",$cssClassB,'bodyWrapper',"Bottom Text","input");
	addDiv("myRow","row " + $cssClassB,'bodyWrapper');
	addDiv("btnPretty",$btnPrimary,'myRow',"Create !","button","","onclick","updateMemeForm('memeUrlInput')");

	canvas = document.getElementById("canvas");
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
		
		addImpactWithBorder('topTextInput',10,100);
		addImpactWithBorder('BottomTextInput',10,(ctx.canvas.height - 20));
	};
	updateMemeForm('memeUrlInput');

}; // end addPage

function addBadPWPage() {	
	
	addElement('bodyWrapper',"Bad Password",$cssClassC);
	addElement('bodyWrapper','"JSON goes here"',"div_textarea " + $cssClassB,"getInput","input");
	addElement('bodyWrapper','',"row " + $cssClassB,"myRow");
	addElement('myRow','Get Bad Password',$btnPrimary,"","button","","","onclick","updateElement('getInput',getBadPW());");
	addElement('myRow','Copy to Clipboard',"btn btn-info","","button","","","onclick","copyToClipboard('getInput')");
		
}; // end addPage

function addChatPage() {
	var $rowClasses = "row colorRow"
	
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel",$cssClassC,'coinArea',' Room:');
	
	addDiv("labelRow",$rowClasses,'coinArea');
	addDiv("chatRoom",$cssClassA,'labelRow','General',"input");
	document.getElementById("chatRoom").setAttribute( "style",  "color: #000;background-color:#fff;");
	
	addDiv("redCRow",$rowClasses,'coinArea');
	addDiv("chatMainBox","img-rounded",'redCRow',171,"textarea");
	document.getElementById("chatMainBox").setAttribute( "style",  "color: #000");
	
	addDiv("nameRow",$rowClasses,'coinArea');
	addDiv("chatUser",$cssClassA,'nameRow',"","input","","placeholder","User Name");
	document.getElementById("chatUser").setAttribute( "style",  "background-color: #338");
	
	addDiv("messageRow",$rowClasses,'coinArea');
	addDiv("chatMessage",$cssClassA,'messageRow',"Hello World!","input","","onkeypress","detectEnter(event,updateChat());");
	document.getElementById("chatMessage").setAttribute( "style",  "background-color: #383");
	
	refreshChat(document.getElementById("chatRoom").value)
	
	timerInterval = setInterval(function () {
		refreshChat(document.getElementById("chatRoom").value)
	}, 5000);

}; // end addPage

function addDragSqPage() {
	addDiv("easelScript","","headWrapper","","script","/js/easeljs-0.8.2.min.js")

	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','Making draggable shapes with CreateJS','a',"https://superdevresources.com/draggable-shapes-canvas-createjs/");
	addDiv("linkP2","",'NavDDWrapper','','p');
	addDiv("linkSO2","",'linkP2','CreateJS website','a',"https://www.createjs.com/");
	addDiv("linkP3","",'NavDDWrapper','','p');
	addDiv("linkSO3","",'linkP3','Codepen demo','a',"https://codepen.io/anon/pen/rpMmvr");
	
	addDiv("divForButtons","","bodyWrapper")
	addDiv("btnSquare","btn","divForButtons","Add Square","button","","onclick","addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, 'yellow');")
	addDiv("btnCircle","btn","divForButtons","Add Circle","button","","onclick","addCircle(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 'red');")
	addDiv("btnStar","btn","divForButtons","Add Star","button","","onclick",'addStar(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, "blue");')
	addDiv("HelpfulMessage","","divForButtons" ,"Page has bug - it does not work the first time. Please click the link again.")
	
	addDiv("canvas","","bodyWrapper","","canvas","","style","display: block; margin: 0px auto; border: 1px solid black;");
	canvas = document.getElementById('canvas');
	var $halfWidth = canvas.width/2;
	var $halfHeight = canvas.height/2;
	
	canvas.width = (window.innerWidth * 0.75);
	canvas.height = (window.innerHeight * 0.75);

	$stage = new createjs.Stage("canvas");

	addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, "#f33");
	addRoundedSquare(canvas.width/2, canvas.height/2 + 100, SIZE * 2, 5, "#3f3");
	addRoundedSquare(canvas.width/2, canvas.height/2, SIZE * 2, 5, "#33f");
	
	$stage.update();
}; // end addPage

function addGitPage() {
	addDiv("wrapperGit","container img-rounded",'bodyWrapper');
	addDiv("contentGit",$cssClassC,'wrapperGit'," repo URL");
	addDiv("myTextAreaGit","div_textarea " + $cssClassB,'wrapperGit','https://raw.githubusercontent.com/Gilgamech/GilAPI/master',"input");
	addDiv("myRowGit","row " + $cssClassB,'wrapperGit');
	addDiv("btnClipGit","btn btn-info",'myRowGit',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaGit')");
	addDiv("btnUpdateGit",$btnPrimary,'myRowGit',"Load from Github","button","","onclick","updateNewPageForm()");
	addDiv("btnAddPageGit","btn btn-warning",'myRowGit',"Add New Page","button","","onclick","updateNewPageBoilerplate()");

	addDiv("wrapper","container img-rounded",'bodyWrapper');
	addDiv("pageName",$cssClassC,'wrapper',"Gilgamech.js","","","contenteditable","true");
	addDiv("myTextArea","div_textarea img-rounded " + $cssClassB,'wrapper','Code goes here.',"textarea","","contenteditable","true");
	document.getElementById("myTextArea").setAttribute( "style",  "background-color: #fff");
	document.getElementById("myTextArea").setAttribute( "style",  "height: 50vh");
	addDiv("myRow","row " + $cssClassB,'wrapper');
	addDiv("btnPretty",$btnPrimary,'myRow',"Pretty Print","button","","onclick","prettyPrint('myTextArea')");
	addDiv("btnColorify","btn btn-secondary",'myRow',"Colorify!","button","","onclick","colorifyDivTextArea('myTextArea')");
	addDiv("btnClip","btn btn-info",'myRow',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextArea')");
	
	addDiv("myErrDiv","row " + $cssClassB,'bodyWrapper');
		
	// updateForm('newappget', 'pageName', 'IndexJS')
	// updateForm('newappget', 'NFSpageName', 'TestJS')
	// window.onload = setupLink('textAreaID','gitFilelink');

}; // end addPage

function addRentalMapPage() {
	addDiv("scrGoogleMap","",'headWrapper',"","script","https://maps.googleapis.com/maps/api/js?key="+ $GOOGLE_API_KEY + "&callback=initMap");
	
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','Adding Google Maps to your website','a',"https://developers.google.com/maps/documentation/javascript/adding-a-google-map#key");
	// addDiv("linkP2","",'NavDDWrapper','','p');
	// addDiv("linkSO2","",'linkP2','copy textarea to clipboard	','a',"https://stackoverflow.com/questions/7218061/javascript-copy-text-to-clipboard#7218068");
	
	
	addDiv("wrapper","container img-rounded",'bodyWrapper');
	addDiv("content",$cssClassC,'wrapper'," DiffeRENTial");
	
	addDiv("map","" ,'wrapper');
	document.getElementById("map").setAttribute( "style",  "width: 100vh");
	document.getElementById("map").setAttribute( "style",  "height: 75vh");

	
	// addDiv("myTextArea","div_textarea " + $cssClassB,'wrapper','https://raw.githubusercontent.com/Gilgamech/GilAPI/master',"input");
	
	
	// addDiv("myRow","row " + $cssClassB,'wrapper');
	// addDiv("btnClip","btn btn-info",'myRow',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextArea')");
	// addDiv("btnUpdate",$btnPrimary,'myRow',"Load from hub","button","","onclick","updateNewPageForm()");
	// addDiv("btnAddPage","btn btn-warning",'myRow',"Add New Page","button","","onclick","updateNewPageBoilerplate()");

	
	addDiv("myErrDiv","row " + $cssClassB,'bodyWrapper');
		
	// updateForm('newappget', 'pageName', 'IndexJS')
	// updateForm('newappget', 'NFSpageName', 'TestJS')
	// window.onload = setupLink('textAreaID','gitFilelink');

}; // end addRentalMapPage

function addJsonLintPage() {
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','prettify json data in textarea input','a',"https://stackoverflow.com/questions/26320525/prettify-json-data-in-textarea-input#26324037");
	addDiv("linkP2","",'NavDDWrapper','','p');
	addDiv("linkSO2","",'linkP2','copy textarea to clipboard	','a',"https://stackoverflow.com/questions/7218061/javascript-copy-text-to-clipboard#7218068");
	
	
	addDiv("content",$cssClassC,'bodyWrapper',"JSONLint");
	
	addDiv("myTextArea","div_textarea " + $cssClassB,'bodyWrapper','"JSON goes here"',"textarea");
	addDiv("myRow","row " + $cssClassB,'bodyWrapper');
	addDiv("btnPretty",$btnPrimary,'myRow',"Pretty Print","button","","onclick","prettyPrint('myTextArea')");
	addDiv("btnClip","btn btn-info",'myRow',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextArea')");
	addDiv("myErrDiv","row " + $cssClassB,'bodyWrapper');
		
}; // end addPage

function addCalcPage() {
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','Cut and paste Javascript calculator','a',"http://javascriptkit.com/script/cut18.shtml");
	// addDiv("linkP2","",'NavDDWrapper','','p');
	// addDiv("linkSO2","",'linkP2','copy textarea to clipboard	','a',"https://stackoverflow.com/questions/7218061/javascript-copy-text-to-clipboard#7218068");
	
	addDiv("content",$cssClassC,'bodyWrapper',"Calculator");
	addDiv("calcWrapper","img-rounded col-md-12 col-xs-12",'bodyWrapper');
	
	addDiv("outputRow",$rowClasses,'calcWrapper');
	addDiv("output",$cssClassA,'outputRow','',"input","","onkeypress","detectEnter(event,evalCalc('output'))");
	document.getElementById("output").setAttribute( "style",  "color: #000;background-color:#fff;");
	
	addDiv("row1",$rowClasses,'calcWrapper');
	addDiv("btn1",$btnCalc,'row1',1,"button","","onclick","pressCalcButton(1,'output')");
	addDiv("btn2",$btnCalc,'row1',2,"button","","onclick","pressCalcButton(2,'output')");
	addDiv("btn3",$btnCalc,'row1',3,"button","","onclick","pressCalcButton(3,'output')");
	addDiv("btnDivide",$btnCalc,'row1',"/","button","","onclick","pressCalcButton('/','output')");
	
	addDiv("row2",$rowClasses,'calcWrapper');
	addDiv("btn4",$btnCalc,'row2',4,"button","","onclick","pressCalcButton(4,'output')");
	addDiv("btn5",$btnCalc,'row2',5,"button","","onclick","pressCalcButton(5,'output')");
	addDiv("btn6",$btnCalc,'row2',6,"button","","onclick","pressCalcButton(6,'output')");
	addDiv("btnMult",$btnCalc,'row2',"*","button","","onclick","pressCalcButton('*','output')");
	
	addDiv("row3",$rowClasses,'calcWrapper');
	addDiv("btn7",$btnCalc,'row3',7,"button","","onclick","pressCalcButton(7,'output')");
	addDiv("btn8",$btnCalc,'row3',8,"button","","onclick","pressCalcButton(8,'output')");
	addDiv("btn9",$btnCalc,'row3',9,"button","","onclick","pressCalcButton(9,'output')");
	addDiv("btnSub",$btnCalc,'row3',"-","button","","onclick","pressCalcButton('-','output')");
	
	addDiv("row4",$rowClasses,'calcWrapper');
	addDiv("btnEquals",$btnCalc,'row4',"=","button","","onclick","evalCalc('output')");
	addDiv("btn0",$btnCalc,'row4'," 0 ","button","","onclick","pressCalcButton(0,'output')");
	addDiv("btnDot",$btnCalc,'row4',".","button","","onclick","pressCalcButton('.','output')");
	addDiv("btnAdd",$btnCalc,'row4',"+","button","","onclick","pressCalcButton('+','output')");
	
	
	addDiv("myErrDiv","row " + $cssClassB,'bodyWrapper');
		
}; // end addCalcPage

function addCoinPage() {
	
	addDiv("linkP1","",'NavDDWrapper','','p');
	addDiv("linkSO1","",'linkP1','How do you implement a fixed left sidebar and fluid right content in CSS','a',"https://stackoverflow.com/questions/3393025/how-do-you-implement-a-fixed-left-sidebar-and-fluid-right-content-in-css#3393037");
	addDiv("linkP2","",'NavDDWrapper','','p');
	addDiv("linkSO2","",'linkP2','updateMePlease','a',"https://www.w3schools.com/Bootstrap/bootstrap_forms_inputs.asp");	
	addDiv("linkP3","",'NavDDWrapper','','p');
	addDiv("linkSO3","",'linkP3','Bootstrap','a',"https://getbootstrap.com/docs/3.3/css/");
	addDiv("linkP4","",'NavDDWrapper','','p');
	addDiv("linkSO4","",'linkP4','Bootstrap Buttons','a',"https://v4-alpha.getbootstrap.com/components/buttons/");
	addDiv("linkP5","",'NavDDWrapper','','p');
	addDiv("linkSO5","",'linkP5','Bootstrap Navbar','a',"https://www.w3schools.com/bootstrap/bootstrap_navbar.asp");
	addDiv("linkP6","",'NavDDWrapper','','p');
	addDiv("linkSO6","",'linkP6','Bootstrap Number Validation','a',"https://stackoverflow.com/questions/16517718/bootstrap-number-validation");
	addDiv("linkP7","",'NavDDWrapper','','p');
	addDiv("linkSO7","",'linkP7','Bootstrap rounded corners','a',"https://stackoverflow.com/questions/12084121/correct-way-to-create-rounded-corners-in-twitter-bootstrap");
	addDiv("linkP8","",'NavDDWrapper','','p');
	addDiv("linkSO8","",'linkP8','Number Input Type','a',"https://stackoverflow.com/questions/3368546/what-input-field-type-forces-the-number-pad-mobile-keyboard-to-come-up-when-focu");
	addDiv("linkP9","",'NavDDWrapper','','p');
	addDiv("linkSO9","",'linkP9','Radio Input Type','a',"https://html.com/input-type-radio/");
	addDiv("linkP10","",'NavDDWrapper','','p');
	addDiv("linkSO10","",'linkP10','Bootstrap Grid','a',"http://kimbryant.net/on-bootstraps-grid-using-display-inline-block-instead-of-floats/");
	addDiv("linkP11","",'NavDDWrapper','','p');
	addDiv("linkSO11","",'linkP11','Document Onload not cooperating','a',"https://bytes.com/topic/javascript/answers/441839-document-onload-getelementbyid-dont-cooperate");
	addDiv("linkP12","",'NavDDWrapper','','p');
	addDiv("linkSO12","",'linkP12','Set radio button status with Javascript','a',"https://stackoverflow.com/questions/9476617/how-to-set-radio-button-status-with-javascript");
	addDiv("linkP13","",'NavDDWrapper','','p');
	addDiv("linkSO13","",'linkP13','Change onclick action with Javascript','a',"https://stackoverflow.com/questions/5303899/change-onclick-action-with-a-javascript-function");
	addDiv("linkP14","",'NavDDWrapper','','p');
	addDiv("linkSO14","",'linkP14','Dynamically adding or removing a Div','a',"https://stackoverflow.com/questions/4967289/dynamically-adding-removing-a-div-to-html");
	addDiv("linkP15","",'NavDDWrapper','','p');
	addDiv("linkSO15","",'linkP15','Dropdown menus','a',"https://stackoverflow.com/questions/18030132/html-css-dropdown-menu-overflow");
	addDiv("linkP16","",'NavDDWrapper','','p');
	addDiv("linkSO16","",'linkP16','Search for "appendChild.body"','a',"https://duckduckgo.com/?q=document+appendchild+body&atb=v49-6&ia=qa");
	addDiv("linkP17","",'NavDDWrapper','','p');
	addDiv("linkSO17","",'linkP17','HTML5 Combobox','a',"http://www.scriptol.com/html5/combobox.php");
	addDiv("linkP18","",'NavDDWrapper','','p');
	addDiv("linkSO18","",'linkP18','Form widget editable select','a',"http://www.dhtmlgoodies.com/scripts/form_widget_editable_select/form_widget_editable_select.html");
	
	addDiv("generic","row","bodyWrapper");
	addDiv("sidebar","sidebar col-md-2 hidden-sm hidden-xs  img-rounded contentTitles","bodyWrapper","","style","border:1px solid #333;");
	addDiv("consoleLogLabel","","sidebar","Coinsole Log");
	addDiv("coinMainBox","img-rounded","sidebar","Data Loading...","","style","background-color:#fff;height: 75vh;font-size: small;overflow-x: hidden;overflow-y: auto;");
	addDiv("spacer","","bodyWrapper");
	
	addDiv("content","img-rounded col-md-10 col-xs-10","bodyWrapper");

	addDiv("cointentArea","img-rounded col-md-12 col-xs-12 row","content","","","style","background-color:#fff;");

	addDiv("coinTentWrapper","img-rounded","content","","","style","background-color:#fff;");
	addDiv("titleRow","row contentTitles","coinTentWrapper");
	addDiv("contentLabel","col-md-10 col-xs-10 contentTitles","titleRow","Cointent");
	addDiv("button1","button " + $cssClassD,"titleRow");
	addDiv("BtnGeneric","btn btn-success btn-sm","titleRow","Refresh","button","","onclick","refreshCharts();");
	
	addDiv("NameRow","row","coinTentWrapper","","","style","background-color:#090909;color:#fff;");
	addDiv("coinLabel",$cssClassD,"NameRow","");
	addDiv("valueLabel",$cssClassD,"NameRow","Value");
	addDiv("medianLabel",$cssClassD,"NameRow","My Coins");
	addDiv("botAmountLabel",$cssClassD,"NameRow","MyBot");
	addDiv("botActionLabel",$cssClassD,"NameRow","Fruitbot");
	addDiv("botPredictionLabel",$cssClassD,"NameRow","SimpleBot");


	addDiv("btcContentRow","row","coinTentWrapper","","","style","background-color:#fff;");
	addDiv("btcLabel","contentItems " + $cssClassD,"btcContentRow","BTC");
	addDiv("btcAmount","img-rounded colorRow contentItems " + $cssClassD,"btcContentRow","0","input","","readonly");
	document.getElementById("btcAmount").setAttribute( "type", "number");
	document.getElementById("btcAmount").setAttribute( "style", "background-color:#3CBE3C");
	addDiv("btcMedian","contentItems " + $cssClassD,"btcContentRow","0");
	addDiv("btcBotAmount","contentItems " + $cssClassD,"btcContentRow","0");
	addDiv("btcBotAction","contentItems " + $cssClassD,"btcContentRow","0");
	addDiv("btcBotPrediction","contentItems " + $cssClassD,"btcContentRow","0");


	addDiv("ltcContentRow","row","coinTentWrapper","","","style","background-color:#fff;");
	addDiv("ltcLabel","contentItems " + $cssClassD,"ltcContentRow","LTC");
	addDiv("ltcAmount","img-rounded colorRow contentItems " + $cssClassD,"ltcContentRow","0","input","","readonly");
	document.getElementById("ltcAmount").setAttribute( "type", "number");
	document.getElementById("ltcAmount").setAttribute( "style", "background-color:#3CBE3C");
	addDiv("ltcMedian","contentItems " + $cssClassD,"ltcContentRow","0");
	addDiv("ltcBotAmount","contentItems " + $cssClassD,"ltcContentRow","0");
	addDiv("ltcBotAction","contentItems " + $cssClassD,"ltcContentRow","0");
	addDiv("ltcBotPrediction","contentItems " + $cssClassD,"ltcContentRow","0");


	addDiv("ethContentRow","row","coinTentWrapper","","","style","background-color:#fff;");
	addDiv("ethLabel","contentItems " + $cssClassD,"ethContentRow","ETH");
	addDiv("ethAmount","img-rounded colorRow contentItems " + $cssClassD,"ethContentRow","0","input","","readonly");
	document.getElementById("ethAmount").setAttribute( "type", "number");
	document.getElementById("ethAmount").setAttribute( "style", "background-color:#3CBE3C");
	addDiv("ethMedian","contentItems " + $cssClassD,"ethContentRow","0");
	addDiv("ethBotAmount","contentItems " + $cssClassD,"ethContentRow","0");
	addDiv("ethBotAction","contentItems " + $cssClassD,"ethContentRow","0");
	addDiv("ethBotPrediction","contentItems " + $cssClassD,"ethContentRow","0");

	addDiv("fbcContentRow","row","coinTentWrapper","","","style","background-color:#fff;");
	addDiv("fbcLabel","contentItems " + $cssClassD,"fbcContentRow","FBC");
	addDiv("fbcAmount","img-rounded colorRow contentItems " + $cssClassD,"fbcContentRow","0","input","","readonly");
	document.getElementById("fbcAmount").setAttribute( "type", "number");
	document.getElementById("fbcAmount").setAttribute( "style", "background-color:#3CBE3C");
	addDiv("fbcMedian","contentItems " + $cssClassD,"fbcContentRow","0");
	addDiv("fbcBotAmount","contentItems " + $cssClassD,"fbcContentRow","0");
	addDiv("fbcBotAction","contentItems " + $cssClassD,"fbcContentRow","0");
	addDiv("fbcBotPrediction","contentItems " + $cssClassD,"fbcContentRow","0");
	addDiv("fbcmanualButtonRow","row","fbcContentRow");
	addDiv("fbcbutton","button " + $cssClassD,"fbcContentRow");
	addDiv("fbcmanualButtonRow","row","fbcContentRow");

	addDiv("cointentArea2","img-rounded col-md-12 col-xs-12 row","coinTentWrapper");
	addDiv("titleRow","row contentTitles","cointentArea2","","","style","background-color:#fff;");
	addDiv("botNameLabel","col-md-10 col-xs-10 contentTitles img-rounded","cointentArea2","MyBotName","","","contenteditable","true");
	document.getElementById("botNameLabel").setAttribute("style","background-color:#fff;");
	addDiv("button2","button " + $cssClassD,"cointentArea2");
	addDiv("BtnAddBot","btn btn-success btn-sm","cointentArea2","Add Bot","button","","onclick","addBot('botNameLabel');");

	loadCoinData();
	refreshCharts();
	document.getElementById("coinMainBox").innerText = $coin2;
	document.getElementById("btcMedian").innerText = 0;
	
	timerInterval = setInterval(function () {
		refreshCharts()
	}, 30000);
	
}; // end addCoinPage

function addFormPage($formPost) {
	addDiv("wrapperForm",$cssClassC,'bodyWrapper',$formPost,"form","","action",$formPost);
	document.getElementById("wrapperForm").setAttribute( "method", "post");
	
	addDiv("emailInput",$cssClassB,'wrapperForm','',"input","","placeholder","Email");
	addDiv("passwordInput",$cssClassB,'wrapperForm','',"input","","placeholder","Password");

	addDiv("myRow","row " + $cssClassB,'wrapperForm');
	addDiv("btnSubmit","btn btn-success",'myRow',"Submit","button");
		
}; // end addPage

//Run SPA
function loadPage($pageName) {
try {
	removeElement("headWrapper");
	removeElement("NavDDWrapper");
	removeElement("bodyWrapper");
	removeElement("footWrapper");
	window.clearInterval(timerInterval);
	
	addDiv("headWrapper","",'head');
	addDiv("NavDDWrapper","",'NavDDOuter');
	addDiv("bodyWrapper","container",'body');
	addDiv("footWrapper","",'body');
	
	switch ($pageName) {
		case "demo": 
			addArkDynaPage();
		break;
		case "Arkdata": 
			addArkdataPage();
		break;
		case "rentalmap": 
			addRentalMapPage();
		break;
		case "calc": 
			addCalcPage();
		break;
		case "coin": 
			addCoinPage();
		break;
		case "meme": 
			addMemePage();
		break;
		case "fruitbot": 
			addFruitBotPage();
		break;
		case "rgb": 
			addRgbColorPage();
		break;
		case "addDiv": 
			addAddDivPage();
		break;
		case "badpw": 
			addBadPWPage();
		break;
		case "chat": 
			addChatPage();
		break;
		case "dsq": 
			addDragSqPage();
		break;
		case "git": 
			addGitPage();
		break;
		case "jsonlint": 
			addJsonLintPage();
		break;
		case "login": 
			addFormPage("login");
			
	addDiv("linkP20","",'NavDDWrapper','','p');
	addDiv("linkSO20","",'linkP20','Javascript Basic Auth','a',"https://stackoverflow.com/questions/491914/pure-javascript-code-for-http-basic-authentication");
	addDiv("linkP21","",'NavDDWrapper','','p');
	addDiv("linkSO21","",'linkP21','Sequelize getting started','a',"http://docs.sequelizejs.com/manual/installation/getting-started.html");
	addDiv("linkP23","",'NavDDWrapper','','p');
	addDiv("linkSO23","",'linkP23','Sequelize Findone','a',"https://stackoverflow.com/questions/32212945/sequelize-findone-success-is-undefined#32213208");
	addDiv("linkP24","",'NavDDWrapper','','p');
	addDiv("linkSO24","",'linkP24','Render common variables from app.js to all routes in express','a',"https://stackoverflow.com/questions/29026650/how-to-render-common-variables-from-app-js-to-all-routes-in-express");
	addDiv("linkP25","",'NavDDWrapper','','p');
	addDiv("linkSO25","",'linkP25','Delete cookie on logout in Express and Passport','a',"https://stackoverflow.com/questions/33112299/how-to-delete-cookie-on-logout-in-express-passport-js");
	addDiv("linkP26","",'NavDDWrapper','','p');
	addDiv("linkSO26","",'linkP26','Cookie Parser on Github','a',"https://github.com/expressjs/cookie-parser#cookieparsersignedcookiestr-secret");
	addDiv("linkP27","",'NavDDWrapper','','p');
	addDiv("linkSO27","",'linkP27','Express JS book','a',"http://expressjs-book.com/index.html%3Fp=128.html");
	addDiv("linkP28","",'NavDDWrapper','','p');
	addDiv("linkSO28","",'linkP28','Bootstrap buttons','a',"https://v4-alpha.getbootstrap.com/components/buttons/#sizes");
	
		break;
		case "signup": 
			addFormPage("signup");
		break;
	}; // end switch divColor
	
	addDiv("linkP90","",'NavDDWrapper','','p');
	addDiv("linkSO90","",'linkP90','______________');
	
	addDiv("linkP91a","",'NavDDWrapper','','p');
	addDiv("linkSO91a","",'linkP91a','Custom scrollbars in Webkit','a',"https://css-tricks.com/custom-scrollbars-in-webkit/");
	
	addDiv("linkP91","",'NavDDWrapper','','p');
	addDiv("linkSO91","",'linkP91','Load div as file','a',"https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/");
	
	addDiv("linkP92","",'NavDDWrapper','','p');
	addDiv("linkSO92","",'linkP92','Applies color scheme to text in div','a',"https://stackoverflow.com/questions/23737776/how-to-color-specific-word-in-a-container-using-css");

	addDiv("linkP93","",'NavDDWrapper','','p');
	addDiv("linkSO93","",'linkP93','Load JSON','a',"https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript");

	addDiv("linkP93a","",'NavDDWrapper','','p');
	addDiv("linkSO93a","",'linkP93a','Javascript Objects','a',"https://www.w3schools.com/js/js_objects.asp");

	addDiv("linkP94","",'NavDDWrapper','','p');
	addDiv("linkSO94","",'linkP94','Clear SetInterval','a',"https://stackoverflow.com/questions/2901108/how-do-i-clear-this-setinterval#2901155");
	
	addDiv("linkP95","",'NavDDWrapper','','p');
	addDiv("linkSO95","",'linkP95','Make footer stick to the bottom of the page.','a',"https://stackoverflow.com/questions/3443606/make-footer-stick-to-bottom-of-page-correctly#18066619 ");
	
	addFooter();
} catch(e){console.log(e)};
}; // end loadPage

window.onload = function(){ 
	initPage();
	addHeader();
	addNav();
	loadPage("rentalmap");
}; // end window.onload

