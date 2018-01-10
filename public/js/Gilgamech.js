//Gil.JS

var lineBreak = "\r\n";
var spaceChar = " ";
var bgImage;
var bgReady;
var canvas;
var ctx;
var $stage;
var SIZE = 50;
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

// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
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

// Post JSON
function postJSON(file, callback) {
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

function destroyClickedElement(event) {	document.body.removeChild(event.target); }

function copyToClipboard(text) {
    Copied = text.createRange();
    Copied.execCommand("Copy");
}; // end copyToClipboard

// Applies color scheme to text in div.
//  https://stackoverflow.com/questions/23737776/how-to-color-specific-word-in-a-container-using-css
function colorifyDiv(divName, replaceWord, replaceColor) {
  var replacere = new RegExp(replaceWord, "g");
  var str = document.getElementById(divName).innerHTML,
  str = str.replace(replacere, '<span style="color:' + replaceColor + ';">' + replaceWord + '</span>');
  // Clean up repeats and duplicates.
  str = str.replace('<span style="color:<span style="color:', '<span style="color:');
  str = str.replace('</span></span>','</span>');
  document.getElementById(divName).innerHTML = str;
}; // end colorifyDiv

//input.onchange
function updateDownloadLink(downloadLinkID,inputFieldID) {
  document.getElementById(downloadLinkID).download = document.getElementById(inputFieldID).value
}; // end updateDownloadLink

function updategetBadPWInputForm() {
  postJSON('/badpw', function(response) {
    document.getElementById('getBadPWInput').value  = response
  }); // end loadJSON
}; // end updategetBadPWInputForm

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
      document.getElementById("ChatchatMessage").value = ""
      document.getElementById("ChatuserNameErr").innerText = ""
    } else {
      document.getElementById("ChatuserNameErr").innerText = "Enter a user name. Then do a barrel roll."
    }; //end if chatUser
  }; //end if chatMessage
}; // end updateChat

function refreshChat(chatRoom){
  chatUrl = "https://gil-api.herokuapp.com/chatload?chatroom=" + chatRoom
  loadChat(chatUrl,"ChatchatMainBox")
}; // end refreshChat

function loadChat(chatUrl,chatBox){
  loadJSON(chatUrl, function(response) {
    document.getElementById(chatBox).value = response
  }); // end loadJSON
}; // end loadChat

function detectEnter(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        updateChat();
    };
}; // end detectEnter

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

// https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
function loadFileAsText() { 	
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("gitFileTextArea").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function updateNewPageForm() {
	//Get new page name from element
  RepoUrlElement = "gitRepoUrl";
  Pagename = document.getElementById("NewPageNameInput").value;
  document.getElementById("PagenameEJSNameInput").value = "\\views\\pages\\template.ejs";
  document.getElementById("PagenameJSNameInput").value = Pagename + ".js";

  // Get each page from Github, populate textarea
  // updateTextAreaFromRepo("inputTextBoxFileName","divItemToRenameTo1stParam","inputTextBoxGitRepoURL","TextAreaToUpdate")
  updateTextAreaFromRepo("IndexJSNameInput","IndexJSNameItem",RepoUrlElement,"IndexJSTextArea");
  updateTextAreaFromRepo("TestJSNameInput","TestJSNameItem",RepoUrlElement,"TestJSTextArea");
  updateTextAreaFromRepo("NavEJSNameInput","NavEJSNameItem",RepoUrlElement,"NavEJSTextArea");
  updateTextAreaFromRepo("PagenameEJSNameInput","PagenameEJSNameItem",RepoUrlElement,"PagenameEJSTextArea");
  
  document.getElementById("PagenameEJSNameInput").value = Pagename + ".ejs";

  boilerplateIndexTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  colorifyDivTextArea('IndexJSTextArea');
}; // end updateNewPageForm

function updateTextAreaFromRepo(FileNameElement,FileNameItem,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).value
  if (FileName) {
    document.getElementById(FileNameElement).value = FileName
  } else {
      FileName = "README.md"
      document.getElementById(FileNameElement).value = FileName
  }; //end if FileName
  document.getElementById(FileNameItem).innerHTML = FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadJSON(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateForm

function updateNewPageBoilerplate() {  
  boilerplateIndexTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  boilerplateTestTextArea("IndexJSTextArea","NewPageNameInput","  t.plan(42);\r\n");
}; // end updateNewPageBoilerplate

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
  // Customized for index.js
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

//window.onload setup link
function setupLink(textAreaID,downloadLinkID) {
  document.getElementById(textAreaID).value = window.onload + '';
  document.getElementById(downloadLinkID).onclick = function() {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txtval);
  };
};

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

function getNumberFromDiv($numericDiv) {
	return Math.round(
		document.getElementById($numericDiv).innerText  *1
	)
};

function toggleSettingsDisplay($divId) {
	if (document.getElementById($divId).style.visibility == "visible") {
		document.getElementById($divId).style.visibility="hidden";
	} else { 
		document.getElementById($divId).style.visibility="visible";
	} // end if
}; // end toggleSettingsDisplay

function removeDiv($divID) {
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
		case "RgbredRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "RgbgreenRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "RgbblueRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

    document.getElementById("RgbhtmlRow").value = rgbToHex(
		(document.getElementById("RgbredRow").value * 1), 
		(document.getElementById("RgbgreenRow").value * 1),
		(document.getElementById("RgbblueRow").value * 1),
	);
	
	document.getElementById("RgbcontentLabel").style.backgroundColor = document.getElementById("RgbhtmlRow").value

}; // end updateRedDivColor

function updateGitPage() {
  updateTextAreaFromRepo("gitFileName","gitFileNameItem","gitRepoUrl","gitFileTextArea")  
}; // end updateGitPage

function updateTextAreaFromRepo(FileNameElement,FileNameItem,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).value
  if (FileName) {
    document.getElementById(FileNameElement).value = FileName
  } else {
	  FileName = "README.md"
      document.getElementById(FileNameElement).value = FileName
  }; //end if FileName
  document.getElementById(FileNameItem).innerHTML = FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadJSON(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateTextAreaFromRepo

function updateForm(nfsCall, nfsName, nfsTextArea) {
  nfsInput = document.getElementById(nfsName).value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsInput
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

function updateNFSForm(nfsCall, nfsName, nfsTextArea, nfsParams, nfsType) {
  nfsName = document.getElementById("NFSpageName").value
  nfsParams = document.getElementById("NFSInput").value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsName + "&params=" + nfsParams + "&type=" + nfsType
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm


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
	var $coinAreaClass = 'img-rounded col-md-12 col-xs-12 contentRows dataArea row' ;
	var $titleRowID = ($botName + 'TitleRow')
	var $titleRowClass = 'row contentTitles';
	var $contentLabelID = ($botName + 'ContentLabel')
	var $contentLabelClass = 'col-md-6 col-xs-6';
	
	
	addDiv($coinAreaID,$coinAreaClass,'CoincointentArea');
	addDiv($titleRowID,$titleRowClass,$coinAreaID);
	addDiv($contentLabelID,$contentLabelClass,$titleRowID,$botName);
	$assetCounter++
	
	var $assetLabelID = ($botName + 'AssetLabel')
	var $assetLabelClass = 'col-md-4 col-xs-4 dataArea img-rounded contentRows';
	// addDiv($assetLabelID,$assetLabelClass,$titleRowID,"Asset"  + $assetCounter);
	 addDiv($assetLabelID,$assetLabelClass,$titleRowID,"Asset" + $assetCounter,'input');
	
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
	var $onClick = "javascript: removeDiv('" + $coinAreaID + "');"
	addDiv($button2ID,$button2Class,$titleRowID,'Del Bot','button',"","onclick",$onClick)	
	
	
	var $headerRow = ($botName + 'HeaderRow')
	var $headerClass = 'col-md-2 col-xs-2';
	
	addDiv($headerRow,"row contentLabels",$coinAreaID);
	addDiv(($botName + "headerCoin"),$headerClass,$headerRow,"Coin:");
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
	var $divClass = 'contentRows row';
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

	var $btnAttribute = "javascript: removeDiv('" + $coinAreaRowID + "');";
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

// updateForm('newappget', 'pageName', 'IndexJS')
// updateForm('newappget', 'NFSpageName', 'TestJS')
// http://cwestblog.com/2014/10/21/javascript-creating-a-downloadable-file-in-the-browser/
// window.onload = setupLink('textAreaID','gitFilelink');

// Add pages
function addHeader() {
	addDiv("titleHead","",'head','Gilgamech Technologies','title');
	addDiv("scr1","",'head','','script','/js/Gilgamech.js');
	addDiv("scr2","",'head','','script','/js/jquery.min.js');
	addDiv("link1","",'head','','link','/stylesheets/bootstrap.min.css');
	addDiv("link2","",'head','','link','/stylesheets/normalize.css');
	addDiv("link3","",'head','','link','/stylesheets/main.css');
	addDiv("link4","",'head','','link','/stylesheets/mobile.css');
	addDiv("link5","",'head','','link','/stylesheets/rgb.css');
	
}; // end addHeader

function addNav() {
	var $pclass1="hidden-sm hidden-xs"
	var $pclass2="hidden-md hidden-lg"
	
	addDiv("gtBannerWrapper","bodyWrapper container",'body');
	addDiv("gtBannerLink","img-rounded top",'gtBannerWrapper',"","a","","/");
	addDiv("gtBanner","img-rounded top",'gtBannerLink',"Gilgamech Technologies");
	
	addDiv("navbar","navbar navbar-static-top navbar-inverse",'body');
	addDiv("navWrapper","bodyWrapper container",'navbar');
	addDiv("nav2","nav navbar-nav",'navWrapper','','ul');
	
	addDiv("l1",$pclass1,'nav2','','li');
	addDiv("a1","",'l1','Fruitbot!','a',"","onclick","loadPage('fruitbot');");
	
	addDiv("l2",$pclass1,'nav2','','li');
	addDiv("a2","",'l2','Bad Password','a',"","onclick","loadPage('badpw');");

	addDiv("l3","",'nav2','','li');
	addDiv("a3","",'l3','Chat!','a',"","onclick","loadPage('chat');");

	addDiv("dd","dropdown",'nav2');
	addDiv("ddp","",'dd','Menu','p');
	addDiv("ddc","dropdown-content",'dd',);
	
	addDiv("lip1",$pclass2,'ddc','','p');
	addDiv("aip1","",'lip1','Fruitbot!','a',"","onclick","loadPage('fruitbot');");
		
	addDiv("lip3",$pclass2,'ddc','','p');
	addDiv("aip3","",'lip3','Bad Password','a',"","onclick","loadPage('badpw');");

	addDiv("lip4",$pclass2,'ddc','','p');
	addDiv("aip4","",'lip4','Chat!','a',"","onclick","loadPage('chat');");

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
	addDiv("lip14",$pclass2,'ddc','','p');
	addDiv("aip14","",'lip14','Login!','a',"","onclick","loadPage('login');");	
	addDiv("dd2","dropdown" + $pclass2,'nav2');
	addDiv("ddr","",'dd2','StackOverflow Links','p');
	addDiv("ddrc","dropdown-content",'dd2',);

	var $nbr = "navbar-right"
	addDiv("nav3","nav navbar-nav" + " " + $nbr + " " + $pclass1,'navWrapper','','ul');
	
	addDiv("lr1",$nbr + " " + $pclass1,'nav3','','li');
	addDiv("ar1","",'lr1','Login!','a',"","onclick","loadPage('login');");	
	addDiv("dd42","dropdown" + " " + $nbr + " " + $pclass1,'nav3');
	
	addDiv("dd4r","",'dd42','StackOverflow Links','p');
	addDiv("dd4rc","dropdown-content",'dd42',);

	addDiv("lip4r5","",'dd4rc','','p');
	addDiv("aip4r5","",'lip4r5','Coins','a',"","onclick","loadPage('coin');");	

}; // end addPage

function addFooter() {
	addDiv("Footerspacer","container-fluid",'body',"");
	addDiv("footClan","footer navbar-static-bottom",'body');
	addDiv("ftBanner","banner",'footClan','','p');
	addDiv("aFooter","",'ftBanner','','a',"https://www.duckduckgo.com");
	addDiv("aFooterImg","",'aFooter',"C1ick h34r ph0r m04r inph0",'img',"/images/BannerImage.gif","","height","250px");
	document.getElementById("aFooterImg").style.height = "150px";
	addDiv("aFooterCR","copyright",'footClan','(c) 2013-2018 Gilgamech Technologies - We are the gears that make our world go around.','p');
	
}; // end addFooter

function addFruitBotPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("headWrapper","",'head');
	addDiv("FruitBotload1","",'headWrapper',"","link","/assets/css/drawgame.css");
	addDiv("FruitBotload2","",'headWrapper',"","script","/assets/js/seedrandom.js");
	addDiv("FruitBotload3","",'headWrapper',"","script","/assets/js/board.js");
	addDiv("FruitBotload4","",'headWrapper',"","script","/assets/js/grid.js");
	addDiv("FruitBotload5","",'headWrapper',"","script","/mybot.js");
	addDiv("FruitBotload6","",'headWrapper',"","script","/assets/js/simplebot.js");
	addDiv("FruitBotload7","",'headWrapper',"","script","/assets/js/player.js");
	addDiv("FruitBotload8","",'headWrapper',"","script","/js/jquery.min.js");
	
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("FruitBotcontentLabels","img-rounded row FruitBotcontentTitles",'bodyWrapper',"FruitBot");
	
	addDiv("FruitBotcontent","container img-rounded",'bodyWrapper');
	addDiv("FruitBotgrid","img-rounded row FruitBotcontentTitles",'FruitBotcontent',"","canvas");
	addDiv("FruitBotgame_view","img-rounded row FruitBotcontentTitles",'FruitBotcontent',"","canvas");

	addDiv("FruitBotmyRow","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
	addDiv("FruitBotbtnPretty","btn btn-primary",'FruitBotmyRow',"new","button");
	addDiv("FruitBotbtnPretty","btn btn-caution",'FruitBotmyRow',"reset","button");
	addDiv("FruitBotbtnPretty","btn btn-info",'FruitBotmyRow',"pause","button");
	addDiv("FruitBotbtnPretty","btn btn-success",'FruitBotmyRow',"play","button");
	addDiv("FruitBotbtnPretty","btn btn-warning",'FruitBotmyRow',"forward","button");

	addDiv("FruitBotmyBoardRow","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
	addDiv("FruitBotcontentLabel2","img-rounded row FruitBotcontentTitles",'FruitBotmyBoardRow',"Board number");
	addDiv("FruitBotBottomTextInput","img-rounded col-md-12 col-xs-12",'FruitBotmyBoardRow',"0","input","","type","number");
	addDiv("FruitBotbtnPretty","btn btn-caution",'FruitBotmyBoardRow',"Set","button");
	
	addDiv("FruitBotmyScoreRow","row img-rounded col-md-4 col-xs-6",'bodyWrapper');
	addDiv("FruitBotwinsRow","row img-rounded",'FruitBotmyScoreRow');
	addDiv("FruitBotwinsLabel","img-rounded col-md-6 col-xs-3",'FruitBotwinsRow',"Wins");
	addDiv("FruitBotwinsInput","img-rounded col-md-6 col-xs-3",'FruitBotwinsRow',0,"input");
	addDiv("FruitBotlossRow","row img-rounded",'FruitBotmyScoreRow');
	addDiv("FruitBotlossLabel","img-rounded col-md-6 col-xs-3",'FruitBotlossRow',"Losses");
	addDiv("FruitBotlossInput","img-rounded col-md-6 col-xs-3",'FruitBotlossRow',0,"input");
	addDiv("FruitBottiesRow","row img-rounded",'FruitBotmyScoreRow');
	addDiv("FruitBottiesLabel","img-rounded col-md-6 col-xs-3",'FruitBottiesRow',"Ties");
	addDiv("FruitBottiesInput","img-rounded col-md-6 col-xs-3",'FruitBottiesRow',0,"input");
	
}; // end addPage

function addRgbColorPage() {
	$inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 "
	$rowClasses = "row colorRow"
	
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("Rgbspacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("Rgbcontent","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("RgbcoinArea","",'Rgbcontent');
	addDiv("RgbcontentLabel","img-rounded row contentTitles",'RgbcoinArea','RGB Calculator');
	
	addDiv("RgbhtmlColorRow",$rowClasses,'RgbcoinArea');
	addDiv("RgbhtmlRow",$inputClasses + "RgbhtmlColorRow",'RgbhtmlColorRow','',"input","","onchange","updateRgbColor()");
	document.getElementById("RgbhtmlRow").setAttribute( "style",  "color: #000");
	document.getElementById("RgbhtmlRow").setAttribute( "maxlength",  "7");
	
	addDiv("RgbredCRow",$rowClasses,'RgbcoinArea');
	addDiv("RgbredRow",($inputClasses + "redColorRow"),'RgbredCRow',171,"input","","onchange","updateRgbDivColor('redRow');");
	document.getElementById("RgbredRow").setAttribute( "type",  "number");
	
	addDiv("RgbgreenCRow",$rowClasses,'RgbcoinArea');
	addDiv("RgbgreenRow",$inputClasses + "greenColorRow",'RgbgreenCRow',205,"input","","onchange","updateRgbDivColor('greenRow');");
	document.getElementById("RgbgreenRow").setAttribute( "type",  "number");
	
	addDiv("RgbblueCRow",$rowClasses,'RgbcoinArea');
	addDiv("RgbblueRow",$inputClasses + "blueColorRow",'RgbblueCRow',239,"input","","onchange","updateRgbDivColor('blueRow');");
	document.getElementById("RgbblueRow").setAttribute( "type",  "number");
	
	updateRgbDivColor('RgbredRow');
	updateRgbDivColor('RgbgreenRow');
	updateRgbDivColor('RgbblueRow');
}; // end addPage

function addArkdataPage() {
	var $Class1 = "col-md-2 col-xs-2";
	//addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)
	addDiv("headWrapper","",'head');
	addDiv("metaRefresh","",'headWrapper',"","meta","","http-equiv","refresh");
	document.getElementById("metaRefresh").setAttribute( "content","60");
	addDiv("Arkdatalink","",'headWrapper','','link','/stylesheets/ARKData.css');
	addDiv("Arkdatalinkm","",'headWrapper','','link','/stylesheets/ARKDatam.css',"media","handheld");
	
	addDiv("Arkdatawrapper","container img-rounded",'body');
	addDiv("Arkdataspacer","img-rounded col-md-3 hidden-xs",'Arkdatawrapper');
	addDiv("Arkdatacontent","img-rounded col-md-6 col-xs-12",'Arkdatawrapper');
	addDiv("ArkdatacoinArea","",'Arkdatacontent');
	addDiv("ArkdatacontentLabel1","img-rounded row contentTitles",'ArkdatacoinArea','Welcome to ARKData');
	addDiv("ArkdatacontentLabel2","img-rounded row contentItems",'ArkdatacoinArea',"Gil's player and tribe tracker");
	addDiv("ArkdatacontentLabel3","img-rounded row contentItems",'ArkdatacoinArea',"Players currently being tracked:");

	
	addDiv("ArkdataContentRow","container contentRows row ","ArkdatacoinArea");
	addDiv("ArkdataLabel","contentItems" + $Class1,"ArkdataContentRow","BTC");
	addDiv("ArkdataAmount","img-rounded colorRow numberRow contentItems col-md-12 col-xs-12","ArkdataContentRow","0","number","","readonly");
	addDiv("ArkdataMedian","contentItems" + $Class1,"ArkdataContentRow","0");
	addDiv("ArkdataBotAmount","contentItems" + $Class1,"ArkdataContentRow","0");
	addDiv("ArkdataBotAction","contentItems" + $Class1,"ArkdataContentRow","0");
	addDiv("ArkdataBotPrediction","contentItems" + $Class1,"ArkdataContentRow","0");

}; // end addArkdataPage
//	removeDiv("metaRefresh");

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
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
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
	
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("AddDivspacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("AddDivcontent","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("AddDivcoinArea","",'AddDivcontent');
	addDiv("AddDivcontentLabel","img-rounded row contentTitles",'AddDivcoinArea',$Title);
	
	addDiv("AddDivheaderMainRow",$rowClasses,'AddDivcoinArea');
	addDiv("AddDivheaderRow","img-rounded col-md-12 col-xs-12 ",'AddDivheaderMainRow',$Header,"p","","onchange","updateRgbColor()");
	document.getElementById("AddDivheaderRow").setAttribute( "style",  "color: #000");
	addDiv("AddDivtextRow","",'AddDivcoinArea',$bodyText,"p","","onchange","updateRgbColor()");
	document.getElementById("AddDivtextRow").setAttribute( "style",  "color: #000");
	
}; // end addPage

function addMemePage() {
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("Memecontent","img-rounded row contentTitles",'bodyWrapper',"MemeGen");
	
	addDiv("Memecanvas","img-rounded row contentTitles",'bodyWrapper',"","canvas");

	addDiv("MemememeUrlInput","img-rounded col-md-12 col-xs-12",'bodyWrapper',"https://technabob.com/blog/wp-content/uploads/2014/08/picard1.jpg","input");
	addDiv("MemetopTextInput","img-rounded col-md-12 col-xs-12",'bodyWrapper',"Top Text","input");
	addDiv("MemeBottomTextInput","img-rounded col-md-12 col-xs-12",'bodyWrapper',"Bottom Text","input");
	addDiv("MememyRow","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
	addDiv("MemebtnPretty","btn btn-primary",'MememyRow',"Create Meme!","button","","onclick","updateMemeForm('memeUrlInput')");
}; // end addPage

function addBadPWPage() {
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
		
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("BadPWcontent","img-rounded row contentTitles",'bodyWrapper',"Bad Password");
	
	addDiv("BadPWgetBadPWInput","div_textarea img-rounded col-md-12 col-xs-12",'bodyWrapper','"JSON goes here"',"textarea");

	addDiv("BadPWmyRow","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
	addDiv("BadPWbtnPretty","btn btn-primary",'BadPWmyRow',"Get Bad Password","button","","onclick","updategetBadPWInputForm()");
	addDiv("BadPWbtnClip","btn btn-info",'BadPWmyRow',"Copy to Clipboard","button","","onclick","copyToClipboard('getBadPWInput')");
		
}; // end addPage

function addChatPage() {
	$inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 "
	$rowClasses = "row colorRow"
	
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("Chatspacer","img-rounded col-md-3 hidden-xs",'bodyWrapper');
	addDiv("Chatcontent","img-rounded col-md-6 col-xs-12",'bodyWrapper');
	addDiv("ChatcoinArea","",'Chatcontent');
	addDiv("ChatcontentLabel","img-rounded row contentTitles",'ChatcoinArea','Chat Room:');
	
	addDiv("ChathtmlColorRow",$rowClasses,'ChatcoinArea');
	addDiv("ChatchatRoom",$inputClasses + "htmlColorRow",'ChathtmlColorRow','General',"input","","onchange","updateRgbColor()");
	document.getElementById("ChatchatRoom").setAttribute( "style",  "color: #000");
	
	addDiv("ChatredCRow",$rowClasses,'ChatcoinArea');
	addDiv("ChatchatMainBox","img-rounded",'ChatredCRow',171,"textarea");
	document.getElementById("ChatchatMainBox").setAttribute( "style",  "color: #000");
	
	addDiv("ChatblueCRow",$rowClasses,'ChatcoinArea');
	addDiv("ChatchatUser",$inputClasses + "blueColorRow",'ChatblueCRow',"","input","","placeholder","User Name");
	
	addDiv("ChatgreenCRow",$rowClasses,'ChatcoinArea');
	addDiv("ChatchatMessage",$inputClasses + "greenColorRow",'ChatgreenCRow',"Hello World!","input","","onkeypress","detectEnter(event);");
	
}; // end addPage

function addDragSqPage() {
	addDiv("headWrapper","",'head');
	addDiv("easelScript","","headWrapper","","script","/js/easeljs-0.8.2.min.js")

	addDiv("bodyWrapper","","body","")
	addDiv("DragSqbtnSquare","btn","bodyWrapper","Add Square","button","","onclick","addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, 'yellow');")
	addDiv("DragSqbtnCircle","btn","bodyWrapper","Add Circle","button","","onclick","addCircle(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 'red');")
	addDiv("DragSqbtnStar","btn","bodyWrapper","Add Star","button","","onclick",'addStar(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, "blue");')
	
	// addDiv("canvasDiv","container-fluid","body","")
	addDiv("DragSqcanvas","","bodyWrapper" ,"This text is displayed if your browser does not support HTML5 Canvas.","canvas")
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	$stage = new createjs.Stage("DragSqcanvas");

	addRoundedSquare(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, "#f33");
	addRoundedSquare(canvas.width/2, canvas.height/2 + 100, SIZE * 2, 5, "#3f3");
	addRoundedSquare(canvas.width/2, canvas.height/2, SIZE * 2, 5, "#33f");
	
	$stage.update();
}; // end addPage

function addGitPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	
	addDiv("bodyWrapper","container img-rounded",'body');
	
	addDiv("wrapperGit","container img-rounded",'bodyWrapper');
	addDiv("GitcontentGit","img-rounded row contentTitles",'wrapperGit',"Git repo URL");
	addDiv("GitmyTextAreaGit","div_textarea img-rounded col-md-12 col-xs-12",'wrapperGit','https://raw.githubusercontent.com/Gilgamech/GilAPI/master',"input");
	addDiv("GitmyRowGit","row img-rounded col-md-12 col-xs-12",'wrapperGit');
	addDiv("GitbtnClipGit","btn btn-info",'GitmyRowGit',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaGit')");
	addDiv("GitbtnUpdateGit","btn btn-primary",'GitmyRowGit',"Load from Github","button","","onclick","updateNewPageForm()");
	addDiv("GitbtnAddPageGit","btn btn-warning",'GitmyRowGit',"Add New Page","button","","onclick","updateNewPageBoilerplate()");

	addDiv("wrapperNPN","container img-rounded",'bodyWrapper');
	addDiv("GitcontentNPN","img-rounded row contentTitles",'wrapperNPN',"NewPageName","","","contenteditable","true");
	addDiv("GitmyTextAreaNPN","div_textarea img-rounded col-md-12 col-xs-12",'wrapperNPN','Code goes here.',"textarea");
	addDiv("GitmyRowNPN","row img-rounded col-md-12 col-xs-12",'wrapperNPN');
	addDiv("GitbtnPrettyNPN","btn btn-primary",'GitmyRowNPN',"Pretty Print","button","","onclick","prettyPrint('myTextAreaNPN')");
	addDiv("GitbtnColorifyNPN","btn btn-secondary",'GitmyRowNPN',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaNPN')");
	addDiv("GitbtnClipNPN","btn btn-info",'GitmyRowNPN',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaNPN')");

	addDiv("wrapperIndex","container img-rounded",'bodyWrapper');
	addDiv("GitcontentIndex","img-rounded row contentTitles",'wrapperIndex',"Index.js","","","contenteditable","true");
	addDiv("GitmyTextAreaIndex","div_textarea img-rounded col-md-12 col-xs-12",'wrapperIndex','Code goes here.',"textarea");
	addDiv("GitmyRowIndex","row img-rounded col-md-12 col-xs-12",'wrapperIndex');
	addDiv("GitbtnPrettyIndex","btn btn-primary",'GitmyRowIndex',"Pretty Print","button","","onclick","prettyPrint('myTextAreaIndex')");
	addDiv("GitbtnColorifyIndex","btn btn-secondary",'GitmyRowIndex',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaIndex')");
	addDiv("GitbtnClipIndex","btn btn-info",'GitmyRowIndex',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaIndex')");

	addDiv("wrapperTest","container img-rounded",'bodyWrapper');
	addDiv("GitcontentTest","img-rounded row contentTitles",'wrapperTest',"Test.js","","","contenteditable","true");
	addDiv("GitmyTextAreaTest","div_textarea img-rounded col-md-12 col-xs-12",'wrapperTest','Code goes here.',"textarea");
	addDiv("GitmyRowTest","row img-rounded col-md-12 col-xs-12",'wrapperTest');
	addDiv("GitbtnPrettyTest","btn btn-primary",'GitmyRowTest',"Pretty Print","button","","onclick","prettyPrint('myTextAreaTest')");
	addDiv("GitbtnColorifyTest","btn btn-secondary",'GitmyRowTest',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaTest')");
	addDiv("GitbtnClipTest","btn btn-info",'GitmyRowTest',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaTest')");

	addDiv("wrapperPagename","container img-rounded",'bodyWrapper');
	addDiv("GitcontentPagename","img-rounded row contentTitles",'wrapperPagename',"Pagename.js","","","contenteditable","true");
	addDiv("GitmyTextAreaPagename","div_textarea img-rounded col-md-12 col-xs-12",'wrapperPagename','Code goes here.',"textarea");
	addDiv("GitmyRowPagename","row img-rounded col-md-12 col-xs-12",'wrapperPagename');
	addDiv("GitbtnPrettyPagename","btn btn-primary",'GitmyRowPagename',"Pretty Print","button","","onclick","prettyPrint('myTextAreaPagename')");
	addDiv("GitbtnColorifyPagename","btn btn-secondary",'GitmyRowPagename',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaPagename')");
	addDiv("GitbtnClipPagename","btn btn-info",'GitmyRowPagename',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaPagename')");
	
	addDiv("GitmyErrDiv","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
		
}; // end addPage

function addJsonLintPage() {
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
	var $Title = "addDiv explained";
	var $Header = "addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)"
	var $bodyText = "This can be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n"
	$bodyText +=  "$divID - The only mandatory one is the first one.\n\n"
		
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("JsonLintmyTextArea","div_textarea img-rounded col-md-12 col-xs-12",'bodyWrapper','"JSON goes here"',"textarea");
	addDiv("JsonLintmyRow","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
	addDiv("JsonLintbtnPretty","btn btn-primary",'JsonLintmyRow',"Pretty Print","button","","onclick","prettyPrint('myTextArea')");
	addDiv("JsonLintbtnClip","btn btn-info",'JsonLintmyRow',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextArea')");
	addDiv("JsonLintmyErrDiv","row img-rounded col-md-12 col-xs-12",'bodyWrapper');
		
}; // end addPage

function addLoginPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("Logincontent","img-rounded row contentTitles",'bodyWrapper',"Login");
	
	addDiv("LoginsignupForm","",'bodyWrapper',"","form","","action","/login");
	document.getElementById("LoginsignupForm").setAttribute( "method", "post");
	
	addDiv("LoginemailInput","img-rounded col-md-12 col-xs-12",'LoginsignupForm','',"input","","placeholder","Email");
	addDiv("LoginpasswordInput","img-rounded col-md-12 col-xs-12",'LoginsignupForm','',"input","","placeholder","Password");

	addDiv("LoginmyRow","row img-rounded col-md-12 col-xs-12",'LoginsignupForm');
	addDiv("LoginbtnSubmit","btn btn-success",'LoginmyRow',"Submit","button");
		
}; // end addPage

function addSignupPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("bodyWrapper","container img-rounded",'body');
	addDiv("Signupcontent","img-rounded row contentTitles",'bodyWrapper',"Signup");
	
	addDiv("SignupsignupForm","",'bodyWrapper',"","form","","action","/login");
	document.getElementById("SignupsignupForm").setAttribute( "method", "post");
	
	addDiv("SignupemailInput","img-rounded col-md-12 col-xs-12",'SignupsignupForm','',"input","","placeholder","Email");
	addDiv("SignuppasswordInput","img-rounded col-md-12 col-xs-12",'SignupsignupForm','',"input","","placeholder","Password");

	addDiv("SignupmyRow","row img-rounded col-md-12 col-xs-12",'SignupsignupForm');
	addDiv("SignupbtnSubmit","btn btn-success",'SignupmyRow',"Submit","button");
		
}; // end addPage

function addCoinPage() {
// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)
	var $Class1 = "col-md-2 col-xs-2";

	addDiv("bodyWrapper","container img-rounded","body");
	addDiv("Coingeneric","row","bodyWrapper");
	addDiv("Coinsidebar","sidebar col-md-2 hidden-sm hidden-xs contentRows img-rounded contentTitles","bodyWrapper");
	addDiv("CoinconsoleLogLabel","","Coinsidebar","Coinsole Log");
	addDiv("CoincoinMainBox","contentRows dataArea scrollToWindow img-rounded","Coinsidebar","Data Loading...");
	addDiv("Coinspacer","","bodyWrapper");

	addDiv("Coincontent","img-rounded col-md-10 col-xs-10","bodyWrapper");

	addDiv("CoincointentArea","img-rounded col-md-12 col-xs-12 contentRows dataArea row","bodyWrapper");

	addDiv("CointitleRow","row contentTitles","bodyWrapper");
	addDiv("Cointent","col-md-10 col-xs-10 contentTitles","bodyWrapper","","","","contenteditable","true");
	addDiv("Coinbutton1","button" + $Class1,"bodyWrapper");
	addDiv("CoinBtnGeneric","btn btn-success btn-sm","bodyWrapper","Refresh","button","","onclick","refreshCharts();");
	addDiv("CoincoinLabel",$Class1,"CointitleRow","Coin");
	addDiv("CoinvalueLabel",$Class1,"CointitleRow","Value");
	addDiv("CoinmedianLabel",$Class1,"CointitleRow","My Coins");
	addDiv("CoinbotAmountLabel",$Class1,"CointitleRow","MyBot");
	addDiv("CoinbotActionLabel",$Class1,"CointitleRow","Fruitbot");
	addDiv("CoinbotPredictionLabel",$Class1,"CointitleRow","SimpleBot");


	addDiv("CoinbtcContentRow","row ","bodyWrapper");
	addDiv("CoinbtcLabel","contentItems" + $Class1,"CoinbtcContentRow","BTC");
	addDiv("CoinbtcAmount","img-rounded colorRow numberRow contentItems col-md-12 col-xs-12","CoinbtcContentRow","0","number","","readonly");
	addDiv("CoinbtcMedian","contentItems" + $Class1,"CoinbtcContentRow","0");
	addDiv("CoinbtcBotAmount","contentItems" + $Class1,"CoinbtcContentRow","0");
	addDiv("CoinbtcBotAction","contentItems" + $Class1,"CoinbtcContentRow","0");
	addDiv("CoinbtcBotPrediction","contentItems" + $Class1,"CoinbtcContentRow","0");


	addDiv("CoinltcContentRow","row ","bodyWrapper");
	addDiv("CoinltcLabel","contentItems" + $Class1,"CoinltcContentRow","LTC");
	addDiv("CoinltcAmount","img-rounded colorRow numberRow contentItems col-md-12 col-xs-12","CoinbtcContentRow","0","number","","readonly");
	addDiv("CoinltcMedian","contentItems" + $Class1,"CoinltcContentRow","0");
	addDiv("CoinltcBotAmount","contentItems" + $Class1,"CoinltcContentRow","0");
	addDiv("CoinltcBotAction","contentItems" + $Class1,"CoinltcContentRow","0");
	addDiv("CoinltcBotPrediction","contentItems" + $Class1,"CoinltcContentRow","0");


	addDiv("CoinethContentRow","row ","bodyWrapper");
	addDiv("CoinethLabel","contentItems" + $Class1,"CoinethContentRow","ETH");
	addDiv("CoinethAmount","img-rounded colorRow numberRow contentItems col-md-12 col-xs-12","CoinbtcContentRow","0","number","","readonly");
	addDiv("CoinethMedian","contentItems" + $Class1,"CoinethContentRow","0");
	addDiv("CoinethBotAmount","contentItems" + $Class1,"CoinethContentRow","0");
	addDiv("CoinethBotAction","contentItems" + $Class1,"CoinethContentRow","0");
	addDiv("CoinethBotPrediction","contentItems" + $Class1,"CoinethContentRow","0");

	addDiv("CoinfbcContentRow","row ","bodyWrapper");
	addDiv("CoinfbcLabel","contentItems" + $Class1,"CoinfbcContentRow","FBC");
	addDiv("CoinfbcAmount","img-rounded colorRow numberRow contentItems col-md-12 col-xs-12","CoinbtcContentRow","0","number","","readonly");
	addDiv("CoinfbcMedian","contentItems" + $Class1,"CoinfbcContentRow","0");
	addDiv("CoinfbcBotAmount","contentItems" + $Class1,"CoinfbcContentRow","0");
	addDiv("CoinfbcBotAction","contentItems" + $Class1,"CoinfbcContentRow","0");
	addDiv("CoinfbcBotPrediction","contentItems" + $Class1,"CoinfbcContentRow","0");
	addDiv("CoinfbcmanualButtonRow","row","CoinfbcContentRow");
	addDiv("Coinfbcbutton","button" + $Class1,"CoinfbcContentRow");
	addDiv("CoinfbcmanualButtonRow","row","CoinfbcContentRow");

	addDiv("CoincointentArea","img-rounded col-md-12 col-xs-12 contentRows dataArea row","bodyWrapper");
	addDiv("CointitleRow","row contentTitles","CoincointentArea");
	addDiv("CoinbotNameLabel","col-md-10 col-xs-10 dataArea contentRows img-rounded","CoincointentArea","MyBotName","","","contenteditable","true");
	addDiv("Coinbutton2","button" + $Class1,"CoincointentArea");
	addDiv("CoinBtnAddBot","btn btn-success btn-sm","bodyWrapper","Add Bot","button","","onclick","addBot('CoinbotNameLabel');");
}; // end addCoinPage


function removePage() {
	removeDiv("headWrapper");
	removeDiv("bodyWrapper");
	removeFooter();
}; // end addPage

function removeFooter() {
	removeDiv("Footerspacer");
	removeDiv("footClan");
}; // end removeFooter

function loadPage($pageName) {
try {
	
	removePage();
	
	switch ($pageName) {
		case "demo": 
			addArkDynaPage();
		break;
		case "Arkdata": 
			addArkdataPage();
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
			addLoginPage();
		break;
		case "signup": 
			addSignupPage();
		break;
	}; // end switch divColor
	
	addFooter();
} catch(e){console.log(e)};
}; // end removePage


/* Meme page onload
window.onload = function(){ 
	addHeader();
	addNav();
	addMemePage();
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
*/

// Refresh chart every 30 seconds.
// window.onload = coinOnLoad();
function coinOnLoad(){ 
	addCoinPage();
	loadCoinData();
	refreshCharts();
	document.getElementById("CoincoinMainBox").innerText = $coin2;
	// document.getElementById("jsonArea").innerText = "Click 'set!' to load.";
	document.getElementById("CoinbtcMedian").innerText = 0;
};

/* setInterval(function () {
	refreshCharts()
}, 30000);*/

window.onload = function(){ 
	addHeader();
	addNav();
	addRgbColorPage();
	addFooter();
}
