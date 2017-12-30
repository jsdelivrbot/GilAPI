const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(50);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:5000', (error, response, body) => {
      t.false(error); // test 1
      t.equal(response.statusCode, 200); // test 2
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 3
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 4
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbot', (error, response, body) => {
      t.false(error); // test 5
      t.equal(response.statusCode, 200); // test 6
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 7
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 8
    }); //end request
	
    request('http://127.0.0.1:5000/badpw', (error, response, body) => {
      t.false(error); // test 9
      t.equal(response.statusCode, 200); // test 10
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 11
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 12
    }); //end request
	
    request('http://127.0.0.1:5000/meme', (error, response, body) => {
      t.false(error); // test 13
      t.equal(response.statusCode, 200); // test 14
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 15
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 16
    }); //end request
	
    request('http://127.0.0.1:5000/rgb', (error, response, body) => {
      t.false(error); // test 17
      t.equal(response.statusCode, 200); // test 18
    }); //end request
	
    request('http://127.0.0.1:5000/coin', (error, response, body) => {
      t.false(error); // test 19
      t.equal(response.statusCode, 200); // test 20
    }); //end request
	
    request('http://127.0.0.1:5000/chat', (error, response, body) => { 
      t.false(error); // test 21
      t.equal(response.statusCode, 200);  // test 22
    });
	
    request('http://127.0.0.1:5000/fruitbotwin', (error, response, body) => {
      t.false(error); // test 23
      t.equal(response.statusCode, 200); // test 24
      t.notEqual(body.indexOf("1"), -1); // test 25
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotloss', (error, response, body) => {
      t.false(error); // test 26
      t.equal(response.statusCode, 200); // test 27
      t.notEqual(body.indexOf("1"), -1); // test 28
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbottie', (error, response, body) => {
      t.false(error); // test 29
      t.equal(response.statusCode, 200); // test 30
      t.notEqual(body.indexOf("1"), -1); // test 31
    }); //end request
	
	request('http://127.0.0.1:5000/jsonlint', (error, response, body) => { 
	  t.false(error); // test 32
	  t.equal(response.statusCode, 200);  // test 33
	});
	
    request('http://127.0.0.1:5000/demo', (error, response, body) => {
      t.false(error); // test 34
      t.equal(response.statusCode, 200); // test 35
    }); //end request
	
    request('http://127.0.0.1:5000/newappget?name=test', (error, response, body) => {
      t.false(error); // test 36
      t.equal(response.statusCode, 200); // test 37
      t.notEqual(body.indexOf("app.get('/test', function(request, response) { "), -1); // test 38
    }); //end request
	
    request('http://127.0.0.1:5000/git', (error, response, body) => { 
      t.false(error); // test 39
      t.equal(response.statusCode, 200);  // test 40
      t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  // test 41
      t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  // test 42
    });
    request('http://127.0.0.1:5000/login', (error, response, body) => { 
      t.false(error);  // test 43
      t.equal(response.statusCode, 200);   // test 44
    });
	
    request('http://127.0.0.1:5000/dsq', (error, response, body) => {
      t.false(error); // test 45
      t.equal(response.statusCode, 200); // test 46
    }); //end request
	
    request('http://127.0.0.1:5000/addDiv', (error, response, body) => {
      t.false(error); // test 47
      t.equal(response.statusCode, 200); // test 48
    }); //end request
	
    request('http://127.0.0.1:5000/favicon.ico', (error, response, body) => {
      // stop the server
      child.kill();

      t.false(error); // test 49
      t.equal(response.statusCode, 200); // test 50
    }); //end request
	
  }); //end child
}); //end test
