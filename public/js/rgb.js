var keyCode = ""

function updateHeader(keyCode) { 
    document.getElementById("htmlRow").value = "#" + (document.getElementById("redRow").value * 1).toString(16) + (document.getElementById("greenRow").value * 1).toString(16) + (document.getElementById("blueRow").value * 1).toString(16);
	document.getElementById("contentLabel").style.backgroundColor  = document.getElementById("htmlRow").value
	// document.body.style.backgroundColor  = document.getElementById("htmlRow").value
}; // end updateHeader

window.onkeypress = function () {updateHeader(keyCode)};
