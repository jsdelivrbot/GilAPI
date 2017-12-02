var $btcOld = 0
var $ltcOld = 0
var $ethOld = 0
var $fbcOld = 0
var $time
var $btc
var $ltc
var $fbc
var $eth
var $coin2 = "Data loading..."
var $amount = 0
var $action = "HOLD"

//Get data from URLs, add to array, do math against old array, output. 
//Have function get data from URL and output.

function refreshCoin ($outputTextBox) {
  try {
	loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
	loadJSON("https://gil-api.herokuapp.com/fakecoin", function($response) { $fbc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data || $response});
  var $today = new Date();
    $iso = $time.iso || $today;
    $coin2 = $iso + lineBreak;
	$coin2 += $eth.base + " | " + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
	$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
	$coin2 += $fbc.base + " | " + $fbc.amount  + " | " + (Math.round(($fbc.amount - $fbcOld)*100)/100) + lineBreak;
	$coin2 += $btc.base + " | " + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;

    document.getElementById($outputTextBox).innerText  = $coin2 + document.getElementById($outputTextBox).innerText
    document.getElementById('btcAmount').innerText = $btc.amount
    document.getElementById('ltcAmount').innerText = $ltc.amount
    document.getElementById('ethAmount').innerText = $eth.amount
    document.getElementById('fbcAmount').innerText = $fbc.amount
	
	$btcOld = $btc.amount
	$ltcOld = $ltc.amount
	$ethOld = $eth.amount
	$fbcOld = $fbc.amount
  }catch(e){};
};


function botChooses($coin,$botAmountDiv,$botActionDiv) {
  try {
	$expr = Math.round(Math.random() * 3);
switch ($expr) {
 case 1:
 $action = "BUY"
 $amount++
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data
    document.getElementById("fbcBotAmount").innerText = $fbc.amount
  });
 break;
 case 2:
 $action = "SELL"
 $amount--
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data
    document.getElementById("fbcBotAmount").innerText = $fbc.amount
  });
 break;
 default:
 $action = "HOLD"
}
  document.getElementById($botAmountDiv).innerText = $amount
  document.getElementById($botActionDiv).innerText  = $action
    
	//$coinOld = $coin.amount
  }catch(e){};
};

function refreshCharts() {
  try {
    refreshCoin("coinMainBox");
    botChooses("btc","btcBotAmount","btcBotAction");
    botChooses("eth","ethBotAmount","ethBotAction");
	botChooses("ltc","ltcBotAmount","ltcBotAction");
  }catch(e){};
};


// Refresh chart every 30 seconds.
document.onload = function(){ 
  document.getElementById("coinMainBox").innerText = $coin2
  refreshCharts()
  refreshCharts()
  setInterval(function () {
    refreshCharts()
  }, 30000);
};
