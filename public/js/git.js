

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

function updateGitPage() {
  gitFileName = document.getElementById(gitFileName).value
  gitRepoUrl = document.getElementById(gitRepoUrl).value + "/" + gitFileName
  loadJSON(nfsurl, function(response) {
    document.getElementById(gitFileTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm
