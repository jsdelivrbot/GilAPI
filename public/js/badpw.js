function updategetBadPWInputForm() {
  postJSON('/badpw', function(response) {
    document.getElementById('getBadPWInput').value  = response
  }); // end loadJSON
}; // end updategetBadPWInputForm

