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
  updateTextAreaFromRepo("PagenameEJSNameInput","PagenameEJSNameItem",RepoUrlElement,"PagenameEJSTextArea");
  
  document.getElementById("PagenameEJSNameInput").value = Pagename + ".ejs";

  boilerplateIndexTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  colorifyDivTextArea('IndexJSTextArea');
}; // end updateNewPageForm

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
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateForm
function updateNewPageBoilerplate() {  
  boilerplateIndexTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  boilerplateTestTextArea("IndexJSTextArea","NewPageNameInput","  t.plan(42);\r\n");
}; // end updateNewPageBoilerplate

var lineBreak = "\r\n"
var spaceChar = " "
function boilerplateIndexTextArea(docTextArea,docNewName,splitMarker) {  
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = 'request("http://127.0.0.1:5000/fruitbot", (error, response, body) => {' + lineBreak + 't.false(error); // test 5' + lineBreak + 't.equal(response.statusCode, 200); // test 6' + lineBreak + 't.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 7' + lineBreak + 't.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 8' + lineBreak + '}); //end request';
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateIndexTextArea

function boilerplateTestTextArea(docTextArea,docNewName,splitMarker) {  
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = splitMarker + lineBreak + "app.get('/" + docNewPageName + "'," + spaceChar + "function(request, response)" + spaceChar + "{" + spaceChar + lineBreak + spaceChar + spaceChar + "response.render('pages/" + docNewPageName + "');" + spaceChar + lineBreak + "});" + spaceChar + spaceChar + lineBreak;
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateTestTextArea

function colorifyDivTextArea(DivTextArea) {  
  var words = ["function","var","this","new","if","then","true","false","const"];
  var superGreen = "green";
  for (word of words) {
    colorifyDiv(DivTextArea, word, superGreen);
  };
}; // end colorifyDivTextArea

function addPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	
	addDiv("wrapper","container img-rounded",'body');
	
	addDiv("wrapperGit","container img-rounded",'body');
	addDiv("contentGit","img-rounded row contentTitles",'wrapperGit',"Git repo URL");
	addDiv("myTextAreaGit","div_textarea img-rounded col-md-12 col-xs-12",'wrapperGit','https://raw.githubusercontent.com/Gilgamech/GilAPI/master',"input");
	addDiv("myRowGit","row img-rounded col-md-12 col-xs-12",'wrapperGit');
	addDiv("btnClipGit","btn btn-info",'myRowGit',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaGit')");
	addDiv("btnUpdateGit","btn btn-primary",'myRowGit',"Load from Github","button","","onclick","updateNewPageForm()");
	addDiv("btnAddPageGit","btn btn-warning",'myRowGit',"Add New Page","button","","onclick","updateNewPageBoilerplate()");

	addDiv("wrapperNPN","container img-rounded",'body');
	addDiv("contentNPN","img-rounded row contentTitles",'wrapperNPN',"NewPageName","","","contenteditable","true");
	addDiv("myTextAreaNPN","div_textarea img-rounded col-md-12 col-xs-12",'wrapperNPN','Code goes here.',"textarea");
	addDiv("myRowNPN","row img-rounded col-md-12 col-xs-12",'wrapperNPN');
	addDiv("btnPrettyNPN","btn btn-primary",'myRowNPN',"Pretty Print","button","","onclick","prettyPrint('myTextAreaNPN')");
	addDiv("btnColorifyNPN","btn btn-secondary",'myRowNPN',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaNPN')");
	addDiv("btnClipNPN","btn btn-info",'myRowNPN',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaNPN')");

	addDiv("wrapperIndex","container img-rounded",'body');
	addDiv("contentIndex","img-rounded row contentTitles",'wrapperIndex',"Index.js","","","contenteditable","true");
	addDiv("myTextAreaIndex","div_textarea img-rounded col-md-12 col-xs-12",'wrapperIndex','Code goes here.',"textarea");
	addDiv("myRowIndex","row img-rounded col-md-12 col-xs-12",'wrapperIndex');
	addDiv("btnPrettyIndex","btn btn-primary",'myRowIndex',"Pretty Print","button","","onclick","prettyPrint('myTextAreaIndex')");
	addDiv("btnColorifyIndex","btn btn-secondary",'myRowIndex',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaIndex')");
	addDiv("btnClipIndex","btn btn-info",'myRowIndex',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaIndex')");

	addDiv("wrapperTest","container img-rounded",'body');
	addDiv("contentTest","img-rounded row contentTitles",'wrapperTest',"Test.js","","","contenteditable","true");
	addDiv("myTextAreaTest","div_textarea img-rounded col-md-12 col-xs-12",'wrapperTest','Code goes here.',"textarea");
	addDiv("myRowTest","row img-rounded col-md-12 col-xs-12",'wrapperTest');
	addDiv("btnPrettyTest","btn btn-primary",'myRowTest',"Pretty Print","button","","onclick","prettyPrint('myTextAreaTest')");
	addDiv("btnColorifyTest","btn btn-secondary",'myRowTest',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaTest')");
	addDiv("btnClipTest","btn btn-info",'myRowTest',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaTest')");

	addDiv("wrapperPagename","container img-rounded",'body');
	addDiv("contentPagename","img-rounded row contentTitles",'wrapperPagename',"Pagename.js","","","contenteditable","true");
	addDiv("myTextAreaPagename","div_textarea img-rounded col-md-12 col-xs-12",'wrapperPagename','Code goes here.',"textarea");
	addDiv("myRowPagename","row img-rounded col-md-12 col-xs-12",'wrapperPagename');
	addDiv("btnPrettyPagename","btn btn-primary",'myRowPagename',"Pretty Print","button","","onclick","prettyPrint('myTextAreaPagename')");
	addDiv("btnColorifyPagename","btn btn-secondary",'myRowPagename',"Colorify!","button","","onclick","colorifyDivTextArea('myTextAreaPagename')");
	addDiv("btnClipPagename","btn btn-info",'myRowPagename',"Copy to Clipboard","button","","onclick","copyToClipboard('myTextAreaPagename')");
	
	addDiv("myErrDiv","row img-rounded col-md-12 col-xs-12",'wrapper');
		
}; // end addPage

window.onload = function() {
	addHeader();
	addNav();
	addPage();
	addFooter();
}