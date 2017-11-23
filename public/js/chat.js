function updateChat() {
  // /chatpost?user=user&message=message&chatroom=General
  // Post API with user:chat JSON and write reply to textbox.
  chatUser = document.getElementById("chatUser").value
  chatMessage = document.getElementById("chatMessage").value
  chatRoom = document.getElementById("chatRoom").value
  chatUrl = "https://gil-api.herokuapp.com/chatpost?user=" + chatUser + "&message=" + chatMessage + "&chatroom=" + chatRoom
  document.getElementById("chatRoomName").innerHTML = chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById("chatMainBox").value = response
  }); // end loadJSON
  
  document.getElementById("chatMessage").value = ""
  
  document.getElementById("textarea").scrollTop = document.getElementById("textarea").scrollHeight 
}; // end updateForm

//init the chat page.
chatRoom = "General"
chatUrl = "https://gil-api.herokuapp.com/chatload?chatroom=" + chatRoom
loadJSON(chatUrl, function(response) {
  document.getElementById("chatMainBox").value = response
}); // end loadJSON

