function addPage() {
	$inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 "
	$rowClasses = "row colorRow"
	
	addDiv("wrapper","container img-rounded",'body');
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'wrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'wrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel","img-rounded row contentTitles",'coinArea','RGB Calculator');
	
	addDiv("htmlColorRow",$rowClasses,'coinArea');
	addDiv("htmlRow",$inputClasses + "htmlColorRow",'htmlColorRow','',"input","","onchange","updateRgbColor()");
	document.getElementById("htmlRow").setAttribute( "style",  "color: #000");
	document.getElementById("htmlRow").setAttribute( "maxlength",  "7");
	
	addDiv("redCRow",$rowClasses,'coinArea');
	addDiv("redRow",($inputClasses + "redColorRow"),'redCRow',171,"input","","onchange","updateRgbDivColor('redRow');");
	document.getElementById("redRow").setAttribute( "type",  "number");
	
	addDiv("blueCRow",$rowClasses,'coinArea');
	addDiv("blueRow",$inputClasses + "blueColorRow",'blueCRow',239,"input","","onchange","updateRgbDivColor('blueRow');");
	document.getElementById("blueRow").setAttribute( "type",  "number");
	
	addDiv("greenCRow",$rowClasses,'coinArea');
	addDiv("greenRow",$inputClasses + "greenColorRow",'greenCRow',205,"input","","onchange","updateRgbDivColor('greenRow');");
	document.getElementById("greenRow").setAttribute( "type",  "number");
	
	updateRgbDivColor('redRow');
	updateRgbDivColor('greenRow');
	updateRgbDivColor('blueRow');
}; // end addPage

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

window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}