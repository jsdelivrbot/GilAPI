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

var navPages = [
	{ name: 'jsonlint', page: 'JSON Lint' },
	{ name: 'git', page: 'Git' },
	{ name: 'meme', page: 'Meme Maker' },
	{ name: 'demo', page: 'Arkdata Dynamap' },
	{ name: 'Arkdata', page: 'Arkdata' },
	{ name: 'text2', page: 'text2' }
];

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
  var $loggedin = testLoggedIn(request);
  var $cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'page', {
       cssType: $cssType,
       loggedin: $loggedin
    });
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

app.get('/logintest', function(request, response) {
    if (request.session) {
	response.redirect('/chat');
	} else {
	response.redirect('/signup');
	};
});

app.get('/loginFailure', function(request, response, next) {
  response.send('Failed to authenticate');
});

app.get('/loginSuccess', function(request, response, next) {
  response.send('Successfully authenticated');
});  

app.get('/err', function(request, response) {
  response.send($errgoLogic);
});

app.get('/logout', function(request, response){
	addErr("User logout: " + request.session.user);
  // request.logout();
	request.session.destroy(function (err) {
		addErr(err);
        response.redirect('/'); 
    });
});


//region WIP
app.post('/mirror', function(request, response) {
  message = request.query.message,
  response.send(message);
});

app.post('/badpw', function(request, response) { 
  var $loggedin = testLoggedIn(request);
  var randomstring = Math.random().toString(36).slice(-20);
  response.send(randomstring);
}); 

//region chat 
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

app.get('/chatload', function(request, response) { 
// /chatpost?user=user&message=message&chatroom=General
  chatRoom = request.query.chatroom
  response.json($chatGeneral);
});  

//region Fruitbot
app.get('/fruitbotwin', function(request, response) {
  fruitbotwin++
  response.json(fruitbotwin);
});
app.get('/fruitbotloss', function(request, response) {
  fruitbotloss++
  response.json(fruitbotloss);
});
app.get('/fruitbottie', function(request, response) {
  fruitbottie++
  response.json(fruitbottie);
});
app.get('/fruitbottotals', function(request, response) {
  response.json([fruitbotwin,fruitbotloss,fruitbottie]);
});

//region FizzBuzz
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

//region ModuleBuilding
app.get('/nfs', function(request, response) {
  functionType = request.query.type
  functionName = request.query.name
  functionParams = request.query.params
  spaceChar = " "
  OpenParens = "("
  CloseParens = ")"
  LineBreak =  + lineBreak 
  OpenCurlBracket = "{"
  CloseCurlBracket = "}"
  SemiColon = ";"
  EndComment = "//end"
  nfsreturn = functionType + spaceChar + OpenParens + functionName + CloseParens + spaceChar + OpenCurlBracket + LineBreak + functionParams + SemiColon + LineBreak + CloseCurlBracket + SemiColon + spaceChar + EndComment + spaceChar + functionType + spaceChar + functionName
  // https://gil-api.herokuapp.com/nfs?type=if&name=fizzbuzznumber&params=outstring%20=%20%27Fizz%27
  // "if (fizzbuzznumber) { <br> outstring = 'Fizz' <br> }; //end if fizzbuzznumber " 
  response.send(nfsreturn);
});

app.get('/newfunction', function(request, response) {
  functionName = request.query.name
  functionParams = request.query.params
  nfsreturn = "function " + functionName + "(" + functionParams + ") { \r\n  response.json(" + functionParams + "); \r\n}; "
  response.send(nfsreturn);
});

app.get('/newappget', function(request, response) {
  newAppName = request.query.name
  newappgetreturn = "index.js \r\napp.get('/" + newAppName + "', function(request, response) { \r\n  response.render(testUA(request.header('user-agent')) + '/" + newAppName + "'); \r\n});  \r\n\r\ntest.js \r\nrequest('http://127.0.0.1:5000/" + newAppName + "', (error, response, body) => { \r\n  t.false(error); \r\n  t.equal(response.statusCode, 200);  \r\n  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  \r\n  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  \r\n});"

  response.send(newappgetreturn);
});

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
