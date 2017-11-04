

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

function updateChat(chatUser, chatMessage, chatRoom) {
  // /chatpost?user=user&message=message&chatroom=General
  // Post API with user:chat JSON and write reply to textbox.
  chatUrl = "https://gil-api.herokuapp.com/chatpost?user=" + chatUser + "&message=" + chatMessage + "&chatroom=" + chatRoom
  document.getElementById("chatRoomName").value = chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById("chatMainBox").value = response
  }); // end loadJSON
  
}; // end updateForm


