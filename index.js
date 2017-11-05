var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var mongodb = require('mongodb');

var app = express();
var chatGeneral = "";

// Fruitbot scores
fruitbotwin = 0
fruitbotloss = 0
fruitbottie = 0

// Comments are fundamental
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views directory where all template files live
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

dbuser = process.env.DBUSER;
dbpassword = process.env.DBPASS;

// Connection mongoUrl
var mongoUri = 'mongodb://' + dbuser + ':' + dbpassword +'@ds249325.mlab.com:49325/gilapi';

// Use connect method to connect to the server
mongodb.MongoClient.connect(mongoUri, function(err, db) {
  chatGeneral = chatGeneral + "Connected successfully to server\n\r";
}); // end MongoClient



app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/port', function(request, response) {
  response.render('pages/port');
});

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

app.get('/test', function(request, response) {
  response.send("app.get('/nfs', function(request, response) { <br> response.json(outstring); <br> }); ");
});

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

app.get('/Arkdata', function(request, response) {
  response.render('pages/Arkdata');
});

app.get('/demo', function(request, response) {
  response.render('pages/demo');
});

app.get('/git', function(request, response) { 
  response.render('pages/git'); 
});  

app.get('/login', function (request, response) {
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

app.get('/text2', function(request, response) {
  response.render('pages/text2');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

