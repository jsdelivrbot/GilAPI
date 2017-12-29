
function addPage() {
	$inputClasses = "colorRow img-rounded contentRows col-md-12 col-xs-12 "
	$rowClasses = "row colorRow"
	
	addDiv("wrapper","container img-rounded",'body');
	addDiv("spacer","img-rounded col-md-3 hidden-xs",'wrapper');
	addDiv("content","img-rounded col-md-6 col-xs-12",'wrapper');
	addDiv("coinArea","",'content');
	addDiv("contentLabel","img-rounded row contentTitles",'coinArea','Chat Room:');
	
	addDiv("htmlColorRow",$rowClasses,'coinArea');
	addDiv("chatRoom",$inputClasses + "htmlColorRow",'htmlColorRow','General',"input","","onchange","updateRgbColor()");
	document.getElementById("chatRoom").setAttribute( "style",  "color: #000");
	
	addDiv("redCRow",$rowClasses,'coinArea');
	addDiv("chatMainBox","img-rounded",'redCRow',171,"textarea");
	document.getElementById("chatMainBox").setAttribute( "style",  "color: #000");
	
	addDiv("blueCRow",$rowClasses,'coinArea');
	addDiv("chatUser",$inputClasses + "blueColorRow",'blueCRow',"","input","","placeholder","User Name");
	
	addDiv("greenCRow",$rowClasses,'coinArea');
	addDiv("chatMessage",$inputClasses + "greenColorRow",'greenCRow',"Hello World!","input","","onkeypress","detectEnter(event);");
	
}; // end addPage

function updateChat() {
  // /chatpost?user=user&message=message&chatroom=General
  // Post API with user:chat JSON and write reply to textbox.
  chatUser = document.getElementById("chatUser").value
  chatMessage = document.getElementById("chatMessage").value
  chatRoom = document.getElementById("chatRoom").value
  if (chatMessage) {
    if (chatUser) {
      chatUrl = "https://gil-api.herokuapp.com/chatpost?user=" + chatUser + "&message=" + chatMessage + "&chatroom=" + chatRoom
	  loadChat(chatUrl,"chatMainBox")
      document.getElementById("chatMessage").value = ""
      document.getElementById("userNameErr").innerText = ""
    } else {
      document.getElementById("userNameErr").innerText = "Enter a user name. Then do a barrel roll."
    }; //end if chatUser
  }; //end if chatMessage
}; // end updateChat

function refreshChat(chatRoom){
  chatUrl = "https://gil-api.herokuapp.com/chatload?chatroom=" + chatRoom
  loadChat(chatUrl,"chatMainBox")
}; // end refreshChat

function loadChat(chatUrl,chatBox){
  loadJSON(chatUrl, function(response) {
    document.getElementById(chatBox).value = response
  }); // end loadJSON
}; // end loadChat

function detectEnter(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        updateChat();
    };
}; // end detectEnter

// Refresh chat every 5 seconds.
setInterval(function () {
  refreshChat("General")
}, 5000);

window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}

