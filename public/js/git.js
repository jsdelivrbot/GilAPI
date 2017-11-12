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

// https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
function loadFileAsText() { 	
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("gitFileTextArea").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function destroyClickedElement(event) {	document.body.removeChild(event.target); }

function updateGitPage() {
updateTextAreaFromRepo("gitFileName","gitFileNameItem","gitRepoUrl","gitFileTextArea")  
}; // end updateForm

function updateTextAreaFromRepo(FileNameElement,FileNameItem,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).value
  if (FileName) {
    document.getElementById(FileNameElement).value = FileName
  } else {
	  FileName = "README.md"
      document.getElementById(FileNameElement).value = FileName
  }; //end if FileName
  document.getElementById(FileNameItem).innerHTML = FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadJSON(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).value = response
  }); // end loadJSON
  
}; // end updateForm

function updateDownloadLink() {
  document.getElementById("gitFilelink").download = document.getElementById("inputFileNameToSaveAs").value
}; // end updateForm


function updateNewPageForm() {
	//Get new page name from element
  RepoUrlElement = "gitRepoUrl";
  Pagename = document.getElementById("NewPageNameInput").value;
  document.getElementById("PagenameEJSNameInput").value = "\\views\\pages\\template.ejs";
  document.getElementById("PagenameJSNameInput").value = Pagename + ".js";

  // Get each page from Github, populate textarea
  // updateTextAreaFromRepo("inputTextBoxFileName","divItemToRenameTo1stParam","inputTextBoxGitRepoURL","TextAreaToUpdate")
  updateTextAreaFromRepo("IndexJSNameInput","IndexJSNameItem",RepoUrlElement,"IndexJSTextArea");
  updateTextAreaFromRepo("TestJSNameInput","TestJSNameItem",RepoUrlElement,"TestJSTextArea");
  updateTextAreaFromRepo("NavEJSNameInput","NavEJSNameItem",RepoUrlElement,"NavEJSTextArea");
  updateTextAreaFromRepo("PagenameJSNameInput","PagenameJSNameItem",RepoUrlElement,"PagenameJSTextArea");
  updateTextAreaFromRepo("PagenameEJSNameInput","PagenameEJSNameItem",RepoUrlElement,"PagenameEJSTextArea");
  
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById("IndexJSTextArea").value;
  docUpdateNewName = document.getElementById("NewPageNameInput").value;
  docUpdateTextString = "\r\n//region WIP\r\napp.get('/" + docUpdateNewName + "', function(request, response) { \r\n  response.render('pages/" + docUpdateNewName + "'); \r\n});  \r\n";
  document.getElementById("IndexJSTextArea").value = docUpdateTextArea.split("//region WIP")[0] + docUpdateTextString + docUpdateTextArea.split("//region WIP")[1];
  
  document.getElementById("PagenameEJSNameInput").value = Pagename + ".ejs";
}; // end updateNewPageForm


function updateForm(nfsCall, nfsName, nfsTextArea) {
  nfsInput = document.getElementById(nfsName).value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsInput
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

function updateNFSForm(nfsCall, nfsName, nfsTextArea, nfsParams, nfsType) {
  nfsName = document.getElementById("NFSpageName").value
  nfsParams = document.getElementById("NFSInput").value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsName + "&params=" + nfsParams + "&type=" + nfsType
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

updateForm('newappget', 'pageName', 'IndexJS')
updateForm('newappget', 'NFSpageName', 'TestJS')

// http://cwestblog.com/2014/10/21/javascript-creating-a-downloadable-file-in-the-browser/
window.onload = function() {
  var txt = document.getElementById('gitFileTextArea');
  txt.value = window.onload + '';
  document.getElementById('gitFilelink').onclick = function(code) {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txt.value);
  };
};

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
