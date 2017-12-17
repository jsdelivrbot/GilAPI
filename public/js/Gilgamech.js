//Gil.JS

var lineBreak = "\r\n"

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

function destroyClickedElement(event) {	document.body.removeChild(event.target); }

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

//window.onload setup link
function setupLink(textAreaID,downloadLinkID) {
  document.getElementById(textAreaID).value = window.onload + '';
  document.getElementById(downloadLinkID).onclick = function() {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txtval);
  };
};

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

function addDiv($divID,$divClass,$divParent,$innerText,$elementType,$onClick) {
	if (!$elementType) {
		$elementType = 'div'
	}	
	var $newDiv = document.createElement('div');
	$newDiv.id = $divID;
	$newDiv.className = $divClass
	
	if ($onClick) {
		$newDiv.onClick = $onClick
	}; // end if onClick
	
	if ($innerText) {
		$newDiv.innerText = $innerText
	}; // end if innerText
	
	document.getElementById($divParent).appendChild($newDiv);
}; // end addDiv


