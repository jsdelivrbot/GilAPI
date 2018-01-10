const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(16);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:5000', (error, response, body) => {
      t.false(error); // test 1
      t.equal(response.statusCode, 200); // test 2
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotwin', (error, response, body) => {
      t.false(error); // test 3
      t.equal(response.statusCode, 200); // test 4
      t.notEqual(body.indexOf("1"), -1); // test 5
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotloss', (error, response, body) => {
      t.false(error); // test 6
      t.equal(response.statusCode, 200); // test 7
      t.notEqual(body.indexOf("1"), -1); // test 8
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbottie', (error, response, body) => {
      t.false(error); // test 9
      t.equal(response.statusCode, 200); // test 10
      t.notEqual(body.indexOf("1"), -1); // test 11
	  }); //end request
	
    request('http://127.0.0.1:5000/newappget?name=test', (error, response, body) => {
      t.false(error); // test 12
      t.equal(response.statusCode, 200); // test 13
      t.notEqual(body.indexOf("app.get('/test', function(request, response) { "), -1); // test 14
    }); //end request
	
    request('http://127.0.0.1:5000/favicon.ico', (error, response, body) => {
      // stop the server
      child.kill();

      t.false(error); // test 15
      t.equal(response.statusCode, 200); // test 16
    }); //end request
	
  }); //end child
}); //end test
