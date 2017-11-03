
// get list of radio buttons with name 'size'
var sz = document.forms['demoForm'].elements['size'];

// loop through list
for (var i=0, len=sz.length; i<len; i++) {
    sz[i].onclick = function() { // assign onclick handler function to each
        // put clicked radio button's value in total field
        this.form.elements.total.value = this.value;
    };
}

// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
};// end loadJSON
 
loadJSON("https://gil-api.herokuapp.com/newappget?name=test", function(response) {
  document.getElementById("txtJob").value = response //actual_JSON
}); // end loadJSON

