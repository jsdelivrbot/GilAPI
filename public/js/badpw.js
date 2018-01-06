function updategetBadPWInputForm() {
  postJSON('/badpw', function(response) {
    document.getElementById('getBadPWInput').value  = response
  }); // end loadJSON
}; // end updategetBadPWInputForm


function addPage() {
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
		
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("wrapper","container img-rounded",'body');
	addDiv("content","img-rounded row contentTitles",'wrapper',"Bad Password");
	
	addDiv("getBadPWInput","div_textarea img-rounded col-md-12 col-xs-12",'wrapper','"JSON goes here"',"textarea");

	addDiv("myRow","row img-rounded col-md-12 col-xs-12",'wrapper');
	addDiv("btnPretty","btn btn-primary",'myRow',"Get Bad Password","button","","onclick","updategetBadPWInputForm()");
	addDiv("btnClip","btn btn-info",'myRow',"Copy to Clipboard","button","","onclick","copyToClipboard('getBadPWInput')");
		
}; // end addPage

window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}
