var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
const { Client } = require('pg');

var Sequelize = require('sequelize');
var pg = require('pg').native;
var pghstore = require('pg-hstore');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://dbuser:dbpasswd@dbhost:5432/dbname');
var User = sequelize.import('./User');
// var db = require('./db');
User.sync();

var app = express();

var chatGeneral = "";
var errgoLogic = "Variable Initialized.";
// Fruitbot scores
var fruitbotwin = 0;
var fruitbotloss = 0;
var fruitbottie = 0;


var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// Comments are fundamental
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views directory where all template files live
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.PASSPORT_SECRET || 'aSecretToEverybody', resave: false, saveUninitialized: false }));

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
});
client.query('SELECT * FROM users;', (err, queryOutput) => {
  if (err) chatGeneral = chatGeneral + err;
  chatGeneral = chatGeneral + 'SELECT FROM Users\n\r';
  for (let row of queryOutput.rows) {
    chatGeneral = chatGeneral + row + "\r\n";
  }
  client.end();
});

//Passport stuff
//Local Signup
passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in db with provided username
      User.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');
 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  });
);

// LOCAL LOGIN
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
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
  response.render('home', { user: req.user });
  // response.render('pages/index');
});

app.get('/login', function(request, response) {
  response.render('pages/login');
});
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(request, response) {
    response.redirect('/');
  });
   
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

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(request, response){
    response.render('profile', { user: request.user });
  });

  
app.get('/login2', function(request, response) {
  response.render('pages/login');
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
  response.render('pages/signup');
});
app.post('/signup', function (request, response) {
  userEmail_query = request.query.userEmail,
  userPassword_query = request.query.userPassword
  
  client.query("INSERT INTO Users (localemail, localpassword,createdAt,updatedAt) VALUES (userEmail_query, userPassword_query,,);", (err, queryOutput) => {
    if (err) chatGeneral = chatGeneral + err;
    chatGeneral = chatGeneral + 'New User ' + userEmail_query + ' signup\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + "\r\n";
    }
  });
    response.redirect('/chat');
});

//region WIP
app.get('/meme', function(request, response) { 
response.render('pages/meme'); 
}); 

app.get('/Arkdata', function(request, response) {
  response.render('pages/Arkdata');
});

app.get('demo/', function(request, response) {
  response.render('pages/demo', { user: req.user });
});

app.get('/git', function(request, response) { 
  response.render('pages/git'); 
});  

app.get('/text2',
  require('connect-ensure-login').ensureLoggedIn(),
  function(request, response){
    response.render('pages/text2', { user: request.user });
  });

app.get('/badpw', function(request, response) { 
  response.render('pages/badpw');
}); 
app.post('/badpw', function(request, response) { 
  var randomstring = Math.random().toString(36).slice(-20);
  response.send(randomstring);
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
  
  client.connect();
  client.query("INSERT INTO chatroom_General (username, message) VALUES (chatUser, chatMessage);", (err, queryOutput) => {
    if (err) chatGeneral = chatGeneral + err;
    chatGeneral = chatGeneral + 'INSERT INTO chatroom_General\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + "\r\n";
    }
  });
  client.query('SELECT * FROM chatroom_General;', (err, queryOutput) => {
    if (err) chatGeneral = chatGeneral + err;
    chatGeneral = chatGeneral + 'SELECT FROM chatroom_General\n\r';
    for (let row of queryOutput.rows) {
      chatGeneral = chatGeneral + row + "\r\n";
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


app.get('/jsonlint', function(request, response) { 
  response.render('pages/jsonlint'); 
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

