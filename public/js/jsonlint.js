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

function addPage() {
	var $inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 ";
	var $rowClasses = "row";
	var $Title = "addDiv explained";
	var $Header = "addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction)"
	var $bodyText = "This can be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n"
	$bodyText +=  "$divID - The only mandatory one is the first one.\n\n"
		
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("wrapper","container img-rounded",'body');
	addDiv("myTextArea","div_textarea img-rounded col-md-12 col-xs-12",'wrapper','"JSON goes here"',"textarea");
	addDiv("myRow","row img-rounded col-md-12 col-xs-12",'wrapper');
	addDiv("btnPretty","btn btn-primary",'myRow',"Pretty Print","button","","onclick","prettyPrint('myTextArea')");
	addDiv("btnClip","btn btn-info",'myRow',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextArea')");
	addDiv("myErrDiv","row img-rounded col-md-12 col-xs-12",'wrapper');
		
}; // end addPage

/*
  <div contenteditable="true" class="div_textarea img-rounded" id="myTextArea" value="Code goes here."></div>
  <button type="button" class="btn btn-primary" onclick=")">Pretty Print</button>
  <button type="button" class="btn" onclick="copyToClipboard('myTextArea')">Copy To Clipboard</button>
*/


window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}

  
  