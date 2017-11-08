var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
const { Client } = require('pg');

var Sequelize = require('sequelize');
var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://dbuser:dbpasswd@dbhost:5432/dbname');
var User = sequelize.import('./User');
User.sync();

var app = express();

var chatGeneral = "";
var errgoLogic = "Variable Initialized.";
// Fruitbot scores
var fruitbotwin = 0;
var fruitbotloss = 0;
var fruitbottie = 0;

app.use(require('express-session')({ secret: process.env.PASSPORT_SECRET || 'aSecretToEverybody', resave: true, saveUninitialized: true }));

// Comments are fundamental
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views directory where all template files live
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
app.use(cookieParser()); // read cookies (needed for auth)
app.use(passport.initialize());
app.use(passport.session());

// PostGre SQL stuff.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();
client.query('SELECT table_name FROM information_schema.tables;', (err, queryOutput) => {
  if (err) chatGeneral = chatGeneral + err;
  chatGeneral = chatGeneral + "Connected successfully to server\n\r";
  for (let row of queryOutput.rows) {
    chatGeneral = chatGeneral + row.table_name + "\r\n";
  }
  client.end();
});

//Passport stuff
// LOCAL LOGIN
passport.use('local', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass in the request from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {		
	User.findOne({ where: { localemail: email }})
		.then(function(user) {
			if (!user) {
				done(null, false, {message:'Unknown user.'});
			} else if (!user.validPassword(password)) {
				done(null, false, {message:'Bad password'});
			} else {
				done(null, user);
			}
		})
		.catch(function(e) { 
			done(null, false, {message:'loginMessage',e.name + " " + e.message});
		});				
}));

// LOCAL SIGNUP ============================================================
passport.use('local-signup', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {        
	//  Whether we're signing up or connecting an account, we'll need
	//  to know if the email address is in use.
	
	User.findOne({ where: { localemail: email }})
		.then(function(existingUser) {
		
			// check to see if there's already a user with that email
			if (existingUser) 
				return done(null, false, {message:'loginMessage', 'That email is already taken.'});

			//  If we're logged in, we're connecting a new local account.
			if(req.user) {
				var user            = req.user;
				user.localemail    = email;
				user.localpassword = User.generateHash(password);
				user.save().catch(function (err) {
					throw err;
				}).then (function() {
					done(null, user);
				});
			} 
			//  We're not logged in, so we're creating a brand new user.
			else {
				// create the user
				var newUser = User.build ({localemail: email, localpassword: User.generateHash(password)});	
				newUser.save().then(function() {done (null, newUser);}).catch(function(err) { done(null, false, {message:'loginMessage', err});
			}
		})
		.catch(function (e) {
			done(null, false, {message:'loginMessage',e.name + " " + e.message});
		})
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


// Page calls
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/login', function(request, response) {
  response.render('pages/login');
});
app.post('/login', 
  passport.authenticate('local', {
	successRedirect : '/loginSuccess',
	failureRedirect : '/loginFailure'
  })
);

app.get('/loginFailure', function(request, response, next) {
  response.send('Failed to authenticate');
});

app.get('/loginSuccess', function(request, response, next) {
  response.send('Successfully authenticated');
});  

app.get('/logout', function(request, response){
  // console.log('logging out');
  request.logout();
  response.redirect('/');
});

app.get('/login2', function (request, response) {
   res = {
      userName:request.query.userName,
      last_name:request.query.userPassword
   };
  userName_query = request.query.userName,
  userPassword_query = request.query.userPassword
  if (userPassword_query == "Hello") {
    response.render('pages/Arkdata');
  } else {
    response.render('pages/demo');
  }; //end if first_name
})

//region WIP
app.get('/Arkdata', function(request, response) {
  response.render('pages/Arkdata');
});

app.get('/demo', function(request, response) {
  response.render('pages/demo');
});

app.get('/git', function(request, response) { 
  response.render('pages/git'); 
});  

app.get('/text2', function(request, response) {
  response.render('pages/text2');
});

app.get('/test', function(request, response) {
  response.send("app.get('/nfs', function(request, response) { <br> response.json(outstring); <br> }); ");
});


//region chat 
app.get('/chat', function(request, response) { 
  response.render('pages/chat'); 
});  

app.get('/chatpost', function(request, response) { 
// /chatpost?user=user&message=message&chatroom=General
  chatMessage = request.query.message
  chatUser = request.query.user
  chatRoom = request.query.chatroom

  chatGeneral = chatGeneral + chatUser + ": " + chatMessage + "\r\n"
  
  response.send(chatGeneral);
});  

app.get('/chatload', function(request, response) { 
// /chatpost?user=user&message=message&chatroom=General
  chatRoom = request.query.chatroom
  response.send(chatGeneral);
});  
//endregion

//region Fruitbot
app.get('/fruitbot', function(request, response) {
  response.render('pages/fruitbot');
});
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

//region ModuleBuilding
app.get('/nfs', function(request, response) {
  functionType = request.query.type
  functionName = request.query.name
  functionParams = request.query.params
  spaceChar = " "
  OpenParens = "("
  CloseParens = ")"
  LineBreak = "\r\n"
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
  newappgetreturn = "index.js \r\napp.get('/" + newAppName + "', function(request, response) { \r\n  response.render('pages/" + newAppName + "'); \r\n});  \r\n\r\ntest.js \r\nrequest('http://127.0.0.1:5000/" + newAppName + "', (error, response, body) => { \r\n  t.false(error); \r\n  t.equal(response.statusCode, 200);  \r\n  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  \r\n  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  \r\n});"

  response.send(newappgetreturn);
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

