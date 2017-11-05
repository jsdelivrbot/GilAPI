var express      = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var mongodb = require('mongodb');

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

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

// Set up the connection to the local db
var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
  // Open the connection to the server
  mongoclient.open(function(err, mongoclient) {

    // Get the first db and do an update document on it
    var db = mongoclient.db("integration_tests");
    db.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
      assert.equal(null, err);
      assert.equal(1, result);

      // Get another db and do an update document on it
      var db2 = mongoclient.db("integration_tests2");
      db2.collection('mongoclient_test').update({a:1}, {b:1}, {upsert:true}, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result);

        // Close the connection
        mongoclient.close();
      });
    });
  });
  
  /*
   * First we'll add a few songs. Nothing is required to create the 
   * songs collection; it is created automatically when we insert.
   */

  var songs = db.collection('songs');

   // Note that the insert method can take either an array or a dict.

  songs.insert(seedData, function(err, result) {
    
    if(err) chatGeneral = chatGeneral + err;

    /*
     * Then we need to give Boyz II Men credit for their contribution
     * to the hit "One Sweet Day".
     */

    songs.update(
      { song: 'One Sweet Day' }, 
      { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
      function (err, result) {
        
        if(err) chatGeneral = chatGeneral + err;

        /*
         * Finally we run a query which returns all the hits that spend 10 or
         * more weeks at number 1.
         */

        songs.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {

          if(err) chatGeneral = chatGeneral +  err;

          docs.forEach(function (doc) {
            chatGeneral = chatGeneral + 
              'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] + 
              ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.';
          });
         
          // Since this is an example, we'll clean up after ourselves.
          songs.drop(function (err) {
            if(err) chatGeneral = chatGeneral +  err;
           
            // Only close the connection when your app is terminating.
            db.close(function (err) {
              if(err) chatGeneral = chatGeneral +  err;
            }); // end db.close
          }); // end songs.drop
		}); // end insertDocuments
      } // end function
    ); // end songs.update
  }; // end songs.insert
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

