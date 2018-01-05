function updategetBadPWInputForm() {
  postJSON('/badpw', function(response) {
    document.getElementById('getBadPWInput').value  = response
  }); // end loadJSON
}; // end updategetBadPWInputForm

/*
<div id="wrapper" class="container img-rounded">
<div id="spacer" class="img-rounded col-md-3 hidden-xs">
<div id="content" class="img-rounded col-md-6 col-xs-12">
<div id="coinArea" class="">
<div id="contentLabel" class="img-rounded row contentTitles">Bad Password
<div id="htmlColorRow" class="row colorRow">
<input type="text" id="getBadPWInput" name="getBadPWInput" class="resizedTextbox img-rounded" value="">
<div id="colorRow" class="row colorRow">
<button type="button" class="btn btn-primary" onclick="updategetBadPWInputForm()">Get Bad Password

*/