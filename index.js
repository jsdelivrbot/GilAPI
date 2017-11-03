var express = require('express');
// var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Config body-parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Fruitbot scores
fruitbotwin = 0
fruitbotloss = 0
fruitbottie = 0

// Comments are fundamental
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/port', function(request, response) {
  response.render('pages/port');
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
  LineBreak = "<br>"
  OpenCurlBracket = "{"
  CloseCurlBracket = "}"
  SemiColon = ";"
  EndComment = "//end"
  nfsreturn = functionType + spaceChar + OpenParens + functionName + CloseParens + spaceChar + OpenCurlBracket + LineBreak + functionParams + SemiColon + LineBreak + CloseCurlBracket + SemiColon + spaceChar + EndComment + spaceChar + functionType + spaceChar + functionName
  // "if (!(fizzbuzznumber % 3)) { <br> outstring = 'Fizz' <br> }; //end if 3 " 

  response.send(nfsreturn);
});

app.get('/newfunction', function(request, response) {
  functionName = request.query.name
  functionParams = request.query.params
  nfsreturn = "function " + functionName + "(" + functionParams + ") { <br> response.json(" + functionParams + "); <br> }; "
  response.send(nfsreturn);
});

app.get('/newappget', function(request, response) {
  newAppName = request.query.name
  functionParams = request.query.params
  newappgetreturn = "index.js <br> app.get('/" + newAppName + "', function(" + functionParams + ") { <br> response.json(" + functionParams + "); <br> };  <br>  <br> test.js  <br> request('http://127.0.0.1:5000/" + newAppName + "', (error, response, body) => {  <br>  t.false(error); <br> t.equal(response.statusCode, 200);  <br> t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  <br> t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  <br> });"

  response.send(newappgetreturn);
});

app.get('/Arkdata', function(request, response) {
  response.render('pages/Arkdata');
});

app.get('/demo', function(request, response) {
  response.render('pages/demo');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

