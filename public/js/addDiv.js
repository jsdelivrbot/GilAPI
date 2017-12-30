function addPage() {
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
	var $Title = "addDiv explained";
	var $Header = "addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)"
	var $bodyText = "This can be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n"
	$bodyText +=  "$divID - The only mandatory one is the first one.\n\n"
	
	$bodyText +=  "$divClass- Text.\n\n"
	$bodyText +=  "$divParent- Specify CSS classes here.\n\n"
	$bodyText +=  "$innerText- This will be the innerText if it's a Div, or if it's an IMG this will be the title, or if it's Input this will be the Value.\n\n"
	$bodyText +=  "$elementType- Specify element type. Default is Div, but can be anything from an A to Canvas to Link.\n\n"
	$bodyText +=  "$href- Specify HRef link if A type, HRef link and CSS type for Link type, or Source if IMG or Script type.\n\n"
	$bodyText +=  "$attributeType- Set a custom attribute, like 'onclick' or 'placeholder' or 'contenteditable'.\n\n"
	$bodyText +=  "$attributeAction- Set the value for the above attribute type. Leave blank for attributes with no value, such as 'contenteditable'.\n\n"
	
	addDiv("wrapper","container img-rounded",'body');
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'wrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'wrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel","img-rounded row contentTitles",'coinArea',$Title);
	
	addDiv("headerMainRow",$rowClasses,'coinArea');
	addDiv("headerRow",$inputClasses,'headerMainRow',$Header,"p","","onchange","updateRgbColor()");
	document.getElementById("headerRow").setAttribute( "style",  "color: #000");
	addDiv("textRow","",'coinArea',$bodyText,"p","","onchange","updateRgbColor()");
	document.getElementById("textRow").setAttribute( "style",  "color: #000");
	
}; // end addPage


window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}
