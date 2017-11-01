var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/fizzbuzz/:number', function(request, response) {
  fbnum = request.params.number
  if (!(fbnum % 3)) {
    outstring = "Fizz"
  } 
  if (!(fbnum % 5)) {
    outstring = "Buzz"
  } 
  response.json(outstring);
});

app.get('/Arkdata', function(request, response) {
  response.render('pages/Arkdata');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

