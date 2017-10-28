const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(18);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:5000', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1);
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1);
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbot', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1);
      t.notEqual(body.indexOf("Gilgamech Technologies"), -1);
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotwin', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("1"), -1);
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbotloss', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("1"), -1);
    }); //end request
	
    request('http://127.0.0.1:5000/fruitbottie', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(body.indexOf("1"), -1);
    }); //end request
	
    request('http://127.0.0.1:5000/favicon.ico', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      t.false(error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      //t.notEqual(body.indexOf("1"), -1);
    }); //end request
	
  }); //end child
}); //end test
