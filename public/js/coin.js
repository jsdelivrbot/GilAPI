var $btcOld
var $ltcOld 
var $ethOld 
var $ftcOld 
var $time
var $btc
var $ltc
var $ftc
var $eth
var $coin2 = "Data loading..."

//Get data from URLs, add to array, do math against old array, output. 
//Have function get data from URL and output.

function refreshCoin (outputTextBox) {
  try {
	loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
	loadJSON("https://gil-api.herokuapp.com/fakecoin", function($response) { $ftc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data || $response});
  var $today = new Date();
    $iso = $time.iso || $today;
    $coin2 = $iso + lineBreak;
	$coin2 += $eth.base + " | " + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
	$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
	$coin2 += $ftc.base + " | " + $ftc.amount  + " | " + (Math.round(($ftc.amount - $ftcOld)*100)/100) + lineBreak;
	$coin2 += $btc.base + " | " + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;

	document.getElementById(outputTextBox).value  = $coin2 + document.getElementById(outputTextBox).value

	$btcOld = $btc.amount
	$ltcOld = $ltc.amount
	$ethOld = $eth.amount
	$ftcOld = $ftc.amount
  }catch(e){};
};

// Refresh chart every 60 seconds.

function updateCoinBox (outputTextBox) { 
  refreshCoin(outputTextBox);
  document.getElementById(outputTextBox).value  = "Data loading...";
  refreshCoin(outputTextBox);
};

window.onload = function(){ 
  document.getElementById("coinMainBox").value = $coin2
  updateCoinBox("coinMainBox");
  setInterval(function () {
    refreshCoin("coinMainBox");
  }, 30000);
};
