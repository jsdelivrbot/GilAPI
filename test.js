const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(38);

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
	
    request('http://127.0.0.1:5000/chat', (error, response, body) => { 
      t.false(error); // 9
      t.equal(response.statusCode, 200);  // 10
      t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  // 11
      t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  // 12
    });
    request('http://127.0.0.1:5000/fruitbotwin', (error, response, body) => {
      t.false(error); // test 13
      t.equal(response.statusCode, 200); // test 14
      t.notEqual(body.indexOf("1"), -1); // test 15
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotloss', (error, response, body) => {
      t.false(error); // test 16
      t.equal(response.statusCode, 200); // test 17
      t.notEqual(body.indexOf("1"), -1); // test 18
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbottie', (error, response, body) => {
      t.false(error); // test 19
      t.equal(response.statusCode, 200); // test 20
      t.notEqual(body.indexOf("1"), -1); // test 21
    }); //end request
	
	request('http://127.0.0.1:5000/jsonlint', (error, response, body) => { 
	  t.false(error); 
	  t.equal(response.statusCode, 200);  
	  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  
	  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  
	});
	
    request('http://127.0.0.1:5000/demo', (error, response, body) => {
      t.false(error); // test 22
      t.equal(response.statusCode, 200); // test 23
    }); //end request
	
    request('http://127.0.0.1:5000/newappget?name=test', (error, response, body) => {
      t.false(error); // test 24
      t.equal(response.statusCode, 200); // test 25
      t.notEqual(body.indexOf("app.get('/test', function(request, response) { "), -1); // test 26
    }); //end request
	
    request('http://127.0.0.1:5000/git', (error, response, body) => { 
      t.false(error); // 27
      t.equal(response.statusCode, 200);  // 28
      t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  // 29
      t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  // 30
    });
    request('http://127.0.0.1:5000/login2', (error, response, body) => { 
      t.false(error);  // test 31
      t.equal(response.statusCode, 200);   // test 32
    });
    request('http://127.0.0.1:5000/favicon.ico', (error, response, body) => {
      // stop the server
      child.kill();

      t.false(error); // test 33
      t.equal(response.statusCode, 200); // test 34
    }); //end request
	
  }); //end child
}); //end test
