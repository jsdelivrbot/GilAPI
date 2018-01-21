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

var $GilMain = {apiVersion: "279", googleApiKey: process.env.GOOGLE_API_KEY || 'aSecretToEverybody',chatGeneral: "", errgoLogic: "", GilJSVersion: "703"};

var lineBreak = "\r\n"
var $basePrice = (Math.random()*10)

var $chatGeneral = "";
var $errgoLogic = "--- Err and Log Output --- " + lineBreak + lineBreak;
// Fruitbot scores
var fruitbotwin = 0;
var fruitbotloss = 0;
var fruitbottie = 0;

app.use(require('express-session')({ secret: process.env.PASSPORT_SECRET || 'aSecretToEverybody', resave: true, saveUninitialized: true, maxAge: null}));

// Comments are fundamental
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views directory where all template files live
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
  $chatGeneral = $chatGeneral + "Connected successfully to server" + lineBreak;
  if (err) addErr((err));
  addErr(("Connected successfully to DB server"));
  // for (let row of queryOutput.rows) {
    // addErr((row.table_name));
  // }
});

User.findAll().then(users => {
  $chatGeneral = $chatGeneral + 'SELECT FROM Users\n\r';
  addErr((users));
});

function addErr(err) {
  $errgoLogic += err + "<br>"// lineBreak
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
	response.send('<!DOCTYPE html> <html lang="en"> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <link rel="shortcut icon" href="./public/favicon.ico" type="image/x-icon"> <meta name="viewport" content="width=device-width, initial-scale=1"> </head><script src="/js/Gilgamech.js"></script> <body> </body> </html> ')
});

app.post('/settings.json', function(request, response) {
	$GilMain.chatGeneral = $chatGeneral
	$GilMain.errgoLogic = $errgoLogic
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
                        response.redirect('/');
                    }); // end request.session.regenerate
                } else {
                    addErr(("User password not match: " + username));
                    response.redirect('/signup');
                }; //end if userFound
            }); // end bcrypt.compare
        } else {
            addErr(("User not found: " + username));
            response.redirect('/signup');
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

app.get('/logout', function(request, response){
	addErr("User logout: " + request.session.user);
  // request.logout();
	request.session.destroy(function (err) {
		addErr(err);
        response.redirect('/'); 
    });
});

// Need to roll into pages

//region WIP

//chat 
app.get('/chatpost', function(request, response) { 
// /chatpost?user=user&message=message&chatroom=General
  chatMessage = request.query.message
  chatUser = request.query.user
  chatRoom = request.query.chatroom

  $chatGeneral = $chatGeneral + chatUser + ": " + chatMessage + lineBreak 
  
  client.connect();
  client.query("INSERT INTO chatroom_General (username, message) VALUES (chatUser, chatMessage);", (err, queryOutput) => {
    if (err) addErr((err));
    $chatGeneral = $chatGeneral + 'INSERT INTO chatroom_General\n\r';
	try {
    for (let row of queryOutput.rows) {
      $chatGeneral = $chatGeneral + row + lineBreak;
    }
	} catch(err) {addErr((err))}
  });
  client.query('SELECT * FROM chatroom_General;', (err, queryOutput) => {
    if (err) addErr((err));
    $chatGeneral = $chatGeneral + 'SELECT FROM chatroom_General\n\r';
	try {
    for (let row of queryOutput.rows) {
      $chatGeneral = $chatGeneral + row + lineBreak;
    }
	} catch(err) {addErr((err))}
  });
  client.end();
  response.send($chatGeneral);
});  

//FizzBuzz
app.get('/fizzbuzz', function(request, response) {
  fizzbuzznumber = request.query.n
  outstring = fizzbuzznumber
  if (!(fizzbuzznumber % 3)) {
    outstring = "Fizz"
  }; //end if 3  
  if (!(fizzbuzznumber % 5)) {
    outstring = "Buzz"
  }; //end if 5  
  response.json(outstring);
});

//fakecoin
app.get('/fakecoin', function(request, response) {
  $dataVar = {"data":{"base":"FTC","currency":"USD","amount": $basePrice}}
  response.json($dataVar);
});

app.get('/fakecoinbuy', function(request, response) {
  $basePrice = $basePrice + Math.random();
  Math.round($basePrice = Math.round($basePrice*100)/100);
  $dataVar = {"data":{"base":"FTC","currency":"USD","amount": $basePrice}};	
  response.json($dataVar);
});

app.get('/fakecoinsell', function(request, response) {
  $basePrice = $basePrice - Math.random();
  Math.round($basePrice = Math.round($basePrice*100)/100);
  $dataVar = {"data":{"base":"FBC","currency":"USD","amount": $basePrice}};	
  response.json($dataVar);
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
