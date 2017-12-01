//Gil.JS

var lineBreak = "\r\n"

// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
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

if (testUA(ua) = 'mobile'){ // may need changing?
  // Create the Script tags, toss these strings between them, store in "js".
  var js = document.createElement('script');
  js.type = "text/javascript";
  js.src = "/js/jquery.dropkick-1.0.0.js";

  // Create the Link tags, toss these strings between them, store in "css".
  var css = document.createElement('link');
  css.type = "text/css";
  css.rel = "stylesheet";
  css.href = "/stylesheets/mobile.css";

  // Get everything between the Link tags, store in "h", toss these strings at the end. 
  var h = document.getElementsByTagName('head')[0];
  h.appendChild(js);
  h.appendChild(css);
}