/*
Signup
<form action="/signup" method="post">
<label>Email:</label>
<input type="text" name="username" />
<label>Password:</label>
<input type="password" name="password" />
<input type="submit" value="Submit" />
</form>


*/

function addPage() {
	// addDiv($divID,$divClass,$divParent,$innerText,$elementType,$href,$attributeType,$attributeAction) 
	addDiv("wrapper","container img-rounded",'body');
	addDiv("content","img-rounded row contentTitles",'wrapper',"Signup");
	
	addDiv("signupForm","",'wrapper',"","form","","action","/signup");
	document.getElementById("signupForm").setAttribute( "method", "post");
	
	addDiv("emailInput","img-rounded col-md-12 col-xs-12",'signupForm','',"input","","placeholder","Email");
	addDiv("passwordInput","img-rounded col-md-12 col-xs-12",'signupForm','',"input","","placeholder","Password");

	addDiv("myRow","row img-rounded col-md-12 col-xs-12",'signupForm');
	addDiv("btnSubmit","btn btn-success",'myRow',"Submit","button");
		
}; // end addPage

window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}
