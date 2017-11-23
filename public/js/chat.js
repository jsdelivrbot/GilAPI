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
      document.getElementById("userNameErr").value = ""
    } else {
      document.getElementById("userNameErr").innerText = "Enter a user name. Then do a barrel roll."
    }; //end if chatUser
  }; //end if chatMessage
}; // end updateChat

function refreshChat(chatRoom){
  chatUrl = "https://gil-api.herokuapp.com/chatload?chatroom=" + chatRoom
  document.getElementById("chatRoomName").innerHTML = chatRoom
  loadChat(chatUrl,"chatMainBox")
}; // end refreshChat

function loadChat(chatUrl,chatBox){
  loadJSON(chatUrl, function(response) {
    document.getElementById(chatBox).value = response
  }); // end loadJSON
}; // end loadChat

//init the chat page.
window.onload = refreshChat("General")

