var keyCode = ""

function updateHeader(keyCode) { 
    document.getElementById("htmlRow").value = "#" + (document.getElementById("redRow").value * 1).toString(16) + (document.getElementById("greenRow").value * 1).toString(16) + (document.getElementById("blueRow").value * 1).toString(16);
	document.getElementById("contentLabel").style.backgroundColor  = document.getElementById("htmlRow").value
	// document.body.style.backgroundColor  = document.getElementById("htmlRow").value
}; // end updateHeader

window.onkeypress = function () {updateHeader(keyCode)};

// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$onClick)
function addPage() {
	addDiv("wrapper","container img-rounded",'body');
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'wrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'wrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel","img-rounded row contentTitles",'coinArea','RGB Calculator');
	
	addDiv("htmlColorRow","row colorRow",'coinArea');
	addDiv("htmlRow","colorRow img-rounded htmlColorRow contentRows col-md-12 col-xs-12",'htmlColorRow','#abcdef');
	document.getElementById("htmlRow").setAttribute( "style",  "color: #000");
	addDiv("redCRow","row colorRow",'coinArea');
	addDiv("redRow","colorRow img-rounded redColorRow contentRows col-md-12 col-xs-12",'redCRow',171);
	addDiv("greenCRow","row colorRow",'coinArea');
	addDiv("greenRow","colorRow img-rounded greenColorRow contentRows col-md-12 col-xs-12",'greenCRow',205);
	addDiv("blueCRow","row colorRow",'coinArea');
	addDiv("blueRow","colorRow img-rounded blueColorRow contentRows col-md-12 col-xs-12",'blueCRow',239);
	
	
}; // end addPage


window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}