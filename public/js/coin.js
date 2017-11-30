var $btcOld
var $ltcOld 
var $ethOld 
var $time
var $btc
var $ltc
var $eth
var $coin2

//Get data from URLs, add to array, do math against old array, output. 
//Have function get data from URL and output.

function refreshCoin (outputTextBox) {
	loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
	$coin2 = $time.iso + lineBreak;
	$coin2 += $eth.base + " | " + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
	$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
	$coin2 += $btc.base + " | " + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;

	document.getElementById(outputTextBox).value  = $coin2 + document.getElementById(outputTextBox).value

	$btcOld = $btc.amount
	$ltcOld = $ltc.amount
	$ethOld = $eth.amount
};

// Refresh chart every 60 seconds.

function updateCoinBox (outputTextBox) { 
  refreshCoin(outputTextBox);
  document.getElementById(outputTextBox).value  = "Data loading...";
  refreshCoin(outputTextBox);
};

updateCoinBox("coinMainBox");

setInterval(function () {
  refreshCoin("coinMainBox");
}, 30000);
