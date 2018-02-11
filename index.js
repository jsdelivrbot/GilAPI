//Gil.JS
// Comments are fundamental
// aSecretToEverybody

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require("express-session");

var app = express();

var AWS = require('aws-sdk');
var $bucketName = "gilpublic";
// var s3 = new AWS.S3();
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: $bucketName}
});

AWS.config.update({
    "accessKeyId": process.env.AWS_S3_KEY || "AAAAAAAAAAAAA", 
    "secretAccessKey": process.env.AWS_S3_SECRET_KEY || "rc0jbosmx9o09gf72ov1xkp0dz2tirm6",
    "region": process.env.AWS_S3_REGION || "us-east-1"
});

var lineBreak = "\r\n"
var $basePrice = (Math.random()*10)
var $siteBase = "https://s3.amazonaws.com/" + $bucketName
var $rootPage = "root"

var $userPWHTable = {"initUser": "initPass"};
var $userACLTable = {"initUser": "initSite"};

var $settingsVar = {
	userName: "Login",
	deviceType: "null",
	apiVersion: "280", 
	googleApiKey: process.env.GOOGLE_API_KEY || 'aSecretToEverybody',
	chatGeneral: "", 
	errgoLogic: "--- Err and Log Output --- " + lineBreak + lineBreak,
	awsS3Key: "",
	session: "",
	fruitbotwin:0,
	fruitbotloss:0,
	fruitbottie:0
};

app.use(require('express-session')({ secret: process.env.PASSPORT_SECRET || 'aSecretToEverybody', resave: true, saveUninitialized: true, maxAge: null}));

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(cookieParser()); // read cookies (needed for auth)



function addErr(err) {
  $settingsVar.errgoLogic += err + "<br>"// lineBreak
};

function testUA(ua) {
    // Check the user-agent string to identyfy the device.
    if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
		return 'mobile'
    } else {
		return  'web'
    }
};

function testLoggedIn(request) {
    // Check the user-agent string to identyfy the device.
	$settingsVar.session = request.session
    if (request.session) {
		return (request.session.user); //true;
    } else {
		return "Login"; //false;
    }; // end if request
};

// Page calls
app.get(/\S+/, function(request, response) {
	//https://gil-api.herokuapp.com/?p=giltech
	var $queryString = request.path
	if ($queryString == "/") {
		$queryString += $rootPage
	}; //end if siteName
	response.send('<!DOCTYPE html><html lang="en"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="shortcut icon" href="' + $siteBase + '/favicon.ico" type="image/x-icon"><link href="' + $siteBase + '' + $queryString + $queryString + '.css" rel="stylesheet" type="text/css"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="deleteme" hidden><p1>Page requires Javascript and load files (XHR) to function.</p1><br><p3>This page composes itself entirely from Javascript -  a true single-page application, not only is it entirely one page in the browser. Where most websites use HTML for structure, CSS for style, and Javascript for operations, this page uses JSON to express every element. This uses a small (less than 500 lines) Javascript engine to interpret the JSON. To see this in action, please permit the site to run Javascript, and load files from the data source: </p3><br><div id="pageSettingsJson" >' + $siteBase + '' + $queryString + $queryString + '.json</div></div></body></html><script src="' + $siteBase + '/Gilgamech.js"></script> ')
});

app.post('/settings.json', function(request, response) {
	response.json($settingsVar);
});

app.post('/login', function(request, response) {
    var $userName = request.body.userName
    var $enteredPassword = request.body.password;
	addErr(("Login for user: " + $userName));
	
		addErr(("Searching for user: " + $userName));
	if ($userPWHTable[$userName]) {
		$pwhash = $userPWHTable[$userName];
		addErr(("User found: " + $userName));
	  
		bcrypt.compare($enteredPassword, $pwhash, function($err, $userFound) {
			if ($err) {
					addErr($err);
			}; //end if err
			if ($userFound) {
					request.session.regenerate(function(){
					addErr(("User password matches: " + $userName));
					request.session.user = $userName;
					response.send('Login Successful');
				}); // end request.session.regenerate
			} else {
				addErr(("User password not match: " + $userName));
				response.send('Login Failed');
			}; //end if userFound
		}); // end bcrypt.compare
	} else {
		//Signup
		addErr(("User not found: " + $userName + " - starting signup."));
		bcrypt.hash($enteredPassword, null, null, function($err, $hash){
		if ($err) {
				addErr($err);
		}; //end if err
		$userPWHTable[$userName] = $hash
		  
		addErr(("User signup: " + $userName));
		request.session.regenerate(function(){
			request.session.user = $userName;
			response.send('Signup Successful');
			  
		  }) // end request.session.regenerate
	  }); // end bcrypt.hash
	}; // end if userPWHTable
}); // end app post login 
	  
app.post('/logout', function(request, response){
	addErr("User logout: " + request.session.user);
  // request.logout();
	request.session.destroy(function (err) {
		addErr(err);
        response.send('Logout Successful'); 
    });
});

// Error capture
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
	addErr((req + err));
    next(err);
});

app.use(function(err, req, res, next) {
	addErr(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
