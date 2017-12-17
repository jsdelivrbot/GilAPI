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

function addDiv($divID,$divClass,$divParent,$innerText,$elementType,$onClick,$href) {
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
	
	if ($onClick) {
		$newDiv.onClick = $onClick
	}; // end if onClick
	
	if ($elementType == 'input' && $innerText) {
		$newDiv.value = $innerText
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
}; // end addDiv	

function addHeader() {
	addDiv("titleHead","",'head','Gilgamech Technologies','title');
	addDiv("scr1","",'head','','script','','/js/Gilgamech.js');
	addDiv("scr2","",'head','','script','','/js/jquery.min.js');
	addDiv("link1","",'head','','link','','/stylesheets/bootstrap.min.css');
	addDiv("link2","",'head','','link','','/stylesheets/normalize.css');
	addDiv("link3","",'head','','link','','/stylesheets/main.css');
	addDiv("link4","",'head','','link','','/stylesheets/mobile.css');
	addDiv("link5","",'head','','link','','/stylesheets/rgb.css');
	
}; // end addFooter

function addNav() {
	var $pclass1="hidden-sm hidden-xs"
	var $pclass2="hidden-md hidden-lg"
	
	addDiv("gtBannerWrapper","wrapper container",'body');
	addDiv("gtBanner","img-rounded top",'gtBannerWrapper',"Gilgamech Technologies");
	
	addDiv("navbar","navbar navbar-static-top navbar-inverse",'body');
	addDiv("navWrapper","wrapper container",'navbar');
	addDiv("nav2","nav navbar-nav",'navWrapper','','ul');
	
	addDiv("l1",$pclass1,'nav2','','li');
	addDiv("a1","",'l1','Fruitbot!','a',"https://gil-api.herokuapp.com/fruitbot");
	
	addDiv("l2",$pclass1,'nav2','','li');
	addDiv("a2","",'l2','Bad Password','a',"https://gil-api.herokuapp.com/badpw");

	addDiv("l3","",'nav2','','li');
	addDiv("a3","",'l3','Chat!','a',"https://gil-api.herokuapp.com/chat");

	addDiv("dd","dropdown",'nav2');
	addDiv("ddp","",'dd','Menu','p');
	addDiv("ddc","dropdown-content",'dd',);
	
	
	addDiv("lip1",$pclass2,'ddc','','p');
	addDiv("aip1","",'lip1','Fruitbot!','a',"https://gil-api.herokuapp.com/fruitbot");
		
	addDiv("lip3",$pclass2,'ddc','','p');
	addDiv("aip3","",'lip3','Bad Password','a',"https://gil-api.herokuapp.com/badpw");

	addDiv("lip4",$pclass2,'ddc','','p');
	addDiv("aip4","",'lip4','Chat!','a',"https://gil-api.herokuapp.com/chat");

	addDiv("lip5","",'ddc','','p');
	addDiv("aip5","",'lip5','Coins','a',"https://gil-api.herokuapp.com/coin");

	addDiv("lip6","",'ddc','','p');
	addDiv("aip6","",'lip6','JSON Lint','a',"https://gil-api.herokuapp.com/jsonlint");

	addDiv("lip7","",'ddc','','p');
	addDiv("aip7","",'lip7','Git','a',"https://gil-api.herokuapp.com/git");

	addDiv("lip8","",'ddc','','p');
	addDiv("aip8","",'lip8','Meme Maker','a',"https://gil-api.herokuapp.com/meme");

	addDiv("lip9","",'ddc','','p');
	addDiv("aip9","",'lip9','Arkdata Dynamap','a',"https://gil-api.herokuapp.com/demo");

	addDiv("lip10","",'ddc','','p');
	addDiv("aip10","",'lip10','Arkdata','a',"https://gil-api.herokuapp.com/Arkdata");

	addDiv("lip1","",'ddc','','p');
	addDiv("aip1","",'lip1','text2','a',"https://gil-api.herokuapp.com/text2");

	addDiv("lip1",$pclass2,'ddc','','p');
	addDiv("aip1","",'lip1','Login!','a',"https://gil-api.herokuapp.com/login");
	
	addDiv("dd2","dropdown" + $pclass2,'nav2');
	addDiv("ddr","",'dd2','StackOverflow Links','p');
	addDiv("ddrc","dropdown-content",'dd2',);

	addDiv("lipr5","",'ddc','','p');
	addDiv("aipr5","",'lipr5','Coins','a',"https://gil-api.herokuapp.com/coin");
	
	var $nbr = "navbar-right"
	addDiv("nav3","nav navbar-nav" + " " + $nbr + " " + $pclass1,'navWrapper','','ul');
	
	addDiv("lr1",$nbr + " " + $pclass1,'nav3','','li');
	addDiv("ar1","",'lr1','Login!','a',"https://gil-api.herokuapp.com/login");
	
	addDiv("dd42","dropdown" + " " + $nbr + " " + $pclass1,'nav3');
	addDiv("dd4r","",'dd42','StackOverflow Links','p');
	addDiv("dd4rc","dropdown-content",'dd42',);

	addDiv("lip4r5","",'dd4rc','','p');
	addDiv("aip4r5","",'lip4r5','Coins','a',"https://gil-api.herokuapp.com/coin");
	

}; // end addPage

function addFooter() {
	addDiv("footClan","footer navbar-static-bottom",'body');
	addDiv("ftBanner","banner",'footClan','','p');
	addDiv("aFooter","",'ftBanner','','a',"https://www.duckduckgo.com");
	addDiv("aFooterImg","",'aFooter','','img',"/images/BannerImage.gif");
	addDiv("aFooterCR","copyright",'footClan','(c) 2013-2017 Gilgamech Technologies. Now enhanced with gaming technology.','p');
	
}; // end addFooter


