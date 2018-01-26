//Gil.JS
// Comments are fundamental
// aSecretToEverybody

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var bcrypt = require('bcrypt-nodejs');
var session = require("express-session");
var bookshelf = require("bookshelf");
const { Client } = require('pg');

var Sequelize = require('sequelize');
var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://dbuser:dbpasswd@dbhost:5432/dbname');
var User = sequelize.import('./User');
User.sync();

var app = express();

var lineBreak = "\r\n"
var $basePrice = (Math.random()*10)

var $GilMain = {
	apiVersion: "280", 
	googleApiKey: process.env.GOOGLE_API_KEY || 'aSecretToEverybody',
	chatGeneral: "", 
	errgoLogic: "--- Err and Log Output --- " + lineBreak + lineBreak,
	GilJSVersion: "709",
	pageHeaderTitle:'Gilgamech Technologies',
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

// PostGre SQL stuff.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();
client.query('SELECT table_name FROM information_schema.tables;', (err, queryOutput) => {
  $GilMain.chatGeneral = $GilMain.chatGeneral + "Connected successfully to server" + lineBreak;
  if (err) addErr((err));
  addErr(("Connected successfully to DB server"));
  // for (let row of queryOutput.rows) {
    // addErr((row.table_name));
  // }
});

User.findAll().then(users => {
  $GilMain.chatGeneral = $GilMain.chatGeneral + 'SELECT FROM Users\n\r';
  addErr((users));
});

function addErr(err) {
  $GilMain.errgoLogic += err + "<br>"// lineBreak
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
    if (request.session) {
		return ("Welcome, " + request.session.user); //true;
    } else {
		return "Login!"; //false;
    }; // end if request
};

// Page calls
app.get('/', function(request, response) {
  var $queryString = request.path
	if ($queryString == "/") {
		var $queryString = "root"
	}; //end if siteName
	response.send('<!DOCTYPE html> <html lang="en"> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <link rel="shortcut icon" href="https://s3.amazonaws.com/gilpublic/favicon.ico" type="image/x-icon"> <link href="https://s3.amazonaws.com/gilpublic/' + $queryString + "/" + $queryString + '.css" rel="stylesheet" type="text/css"> <meta name="viewport" content="width=device-width, initial-scale=1"> </head> <body> <div id="deleteme" hidden><p1>Page requires Javascript and load files (XHR) to function.</p1> <br> <p3>This page composes itself entirely from Javascript -  a true single-page application, not only is it entirely one page in the browser. Where most websites use HTML for structure, CSS for style, and Javascript for operations, this page uses JSON to express every element. This uses a small (less than 500 lines) Javascript engine to interpret the JSON. To see this in action, please permit the site to run Javascript, and load files from the data source: </p3><br> <div id="pageSettingsJson" >https://s3.amazonaws.com/gilpublic/' + $queryString + "/" + $queryString + '.json</div></div> </body> </html> <script src="https://s3.amazonaws.com/gilpublic/Gilgamech.js"></script> ')
});

app.post('/settings.json', function(request, response) {
	response.json($GilMain);
});

app.post('/login', function(request, response) {
    var username = request.body.username
    var enteredPassword = request.body.password;
	addErr(("Login for user: " + username));
    
    User.findOne( {where:{ localemail: username }}).then(function(found){
	addErr(("Searching for user: " + username));
        if (found) {
			pwhash = found.get('localpassword');
			userfromdb = found.get('localemail');
            addErr(("User found: " + username +  " " + userfromdb));
          
            bcrypt.compare(enteredPassword, pwhash, function(err, userFound) {
                if (err) {
                        addErr(err);
                }; //end if err
                if (userFound) {
                        request.session.regenerate(function(){
                        addErr(("User password matches: " + username));
                        request.session.user = found.username;
                        response.send('Login Successful');
                    }); // end request.session.regenerate
                } else {
                    addErr(("User password not match: " + username));
                    response.send('Login Failed');
                }; //end if userFound
            }); // end bcrypt.compare
        } else {
            addErr(("User not found: " + username));
            response.send('Login Failed');
        }; // end if found
    }); // end new User
}); // end app post login 

app.post('/signup', function (request, response) {
  var username = request.body.username
  bcrypt.hash(request.body.password, null, null, function(err, hash){
	  var user = new User({localemail:username, localpassword:hash})
	  user.save().then(function(newUser){
		  
		  addErr(("User signup: " + username));
		  request.session.regenerate(function(){
			  response.redirect('/');
			  request.session.user = username;
			  
		  }) // end request.session.regenerate
	  }) // end user.save
  }); // end bcrypt.hash
}); // end app.post

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

