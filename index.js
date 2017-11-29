var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var passport = require('passport');
var passporthttp = require('passport-http');
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

var lineBreak =  + "\r\n"

var chatGeneral = "";
var errgoLogic = "Variable Initialized" + lineBreak ;
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
  if (err) errgoLogic = errgoLogic + err;
  chatGeneral = chatGeneral + "Connected successfully to server\n\r";
  for (let row of queryOutput.rows) {
    errgoLogic = errgoLogic + row.table_name + lineBreak ;
  }
});
client.query('SELECT * FROM users;', (err, queryOutput) => {
  if (err) errgoLogic = errgoLogic + err;
  chatGeneral = chatGeneral + 'SELECT FROM Users\n\r';
  for (let row of queryOutput.rows) {
    errgoLogic = errgoLogic + row + lineBreak ;
  }
  client.end();
});

//Passport stuff
// LOCAL LOGIN
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
		errgoLogic = errgoLogic + err;
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

var navPages = [
	{ name: 'jsonlint', page: 'JSON Lint' },
	{ name: 'git', page: 'Git' },
	{ name: 'meme', page: 'Meme Maker' },
	{ name: 'demo', page: 'Arkdata Dynamap' },
	{ name: 'Arkdata', page: 'Arkdata' },
	{ name: 'text2', page: 'text2' }
];

// Page calls
app.get('/', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/index', {
        cssType: cssType
    });
});

function testUA(ua) {
    // Check the user-agent string to identyfy the device.
    if(/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(ua)) {
		return 'mobile'
    } else {
		return  'web'
    }
};

app.get('/login', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/login', {
        cssType: cssType
    });
});
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
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

app.get('/login2', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/login', {
        cssType: cssType
    });
});
app.post('/login2', function (request, response) {
   res = {
      userName:request.query.userName,
      last_name:request.query.userPassword
   };
  userName_query = request.query.userName,
  userPassword_query = request.query.userPassword
  if (userPassword_query == "Hello") {
    response.redirect('/demo');
  } else {
    response.redirect('/');
  }; //end if first_name
})

app.get('/signup', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/signup', {
        cssType: cssType
    });
});
app.post('/signup', function (request, response) {
  userEmail_query = request.query.userEmail,
  userPassword_query = request.query.userPassword
  
  client.query("INSERT INTO Users (localemail, localpassword) VALUES (userEmail_query, userPassword_query);", (err, queryOutput) => {
    if (err) errgoLogic = errgoLogic + err;
    chatGeneral = chatGeneral + 'New User userEmail_query signup\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + lineBreak ;
    }
  });
    response.redirect('/chat');
});

//region WIP
app.get('/meme', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/meme', {
        cssType: cssType
    });
}); 

app.get('/Arkdata', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/Arkdata', {
        cssType: cssType
    });
});

app.get('/demo', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/demo', {
        cssType: cssType
    });
});

app.get('/git', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/git', {
        cssType: cssType
    });
});  

app.get('/text2', function(request, response) {
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/text2', {
        cssType: cssType
    });
});

app.post('/mirror', function(request, response) {
  message = request.query.message,
  response.send(message);
});

app.get('/badpw', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/badpw', {
        cssType: cssType
    });
}); 
app.post('/badpw', function(request, response) { 
  var randomstring = Math.random().toString(36).slice(-20);
  response.send(randomstring);
}); 

app.get('/test', function(request, response) {
  response.send("app.get('/nfs', function(request, response) { <br> response.json(outstring); <br> }); ");
});

app.get('/coin', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
    response.render( 'pages/coin', {
    cssType: cssType
  });
}); 

//region chat 
app.get('/chat', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/chat', {
	    chatGeneral: chatGeneral,
        cssType: cssType
    });
}); 

app.get('/chatpost', function(request, response) { 
// /chatpost?user=user&message=message&chatroom=General
  chatMessage = request.query.message
  chatUser = request.query.user
  chatRoom = request.query.chatroom

  chatGeneral = chatGeneral + chatUser + ": " + chatMessage + lineBreak 
  
  client.connect();
  client.query("INSERT INTO chatroom_General (username, message) VALUES (chatUser, chatMessage);", (err, queryOutput) => {
    if (err) errgoLogic = errgoLogic + err;
    chatGeneral = chatGeneral + 'INSERT INTO chatroom_General\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + lineBreak ;
    }
  });
  client.query('SELECT * FROM chatroom_General;', (err, queryOutput) => {
    if (err) errgoLogic = errgoLogic + err;
    chatGeneral = chatGeneral + 'SELECT FROM chatroom_General\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + lineBreak ;
    }
  });
  client.end();
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
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/fruitbot', {
        cssType: cssType
    });
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


app.get('/jsonlint', function(request, response) { 
  var cssType = "/stylesheets/" + testUA(request.header('user-agent')) + ".css";
  response.render( 'pages/jsonlint', {
        cssType: cssType
    });
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

