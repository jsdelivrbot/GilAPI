// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
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

function pressButton(number) {
  postJSON('/calc', function(response) {
    document.getElementById('calcDisplay').value  = response
  }); // end loadJSON
}; // end pressButton

