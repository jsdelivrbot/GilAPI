var $btcMedian = 0
var $ltcMedian = 0
var $ethMedian = 0
var $btcOld = 0
var $ltcOld = 0
var $ethOld = 0
var $fbcOld = 0
var $tradeFee = 4
var $botFee = 1
var $time
var $btc
var $ltc
var $fbc
var $eth
var $coin2 = "Data loading..."

//Get data from URLs, add to array, do math against old array, output. 
//Have function get data from URL and output.

function loadCoinData () {
  try {
	loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
	loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
	loadJSON("https://gil-api.herokuapp.com/fakecoin", function($response) { $fbc = $response.data});
  }catch(e){console.log(e)};
}; // end loadCoinData
	
function updateCoinsole ($outputTextBox) {
  try {
  var $today = new Date();
    $iso = $time.iso || $today;
    $coin2 = $iso + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $eth.base + " | " + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $fbc.base + " | " + $fbc.amount  + " | " + (Math.round(($fbc.amount - $fbcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $btc.base + " | " + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
    document.getElementById($outputTextBox).innerText  = $coin2 + document.getElementById($outputTextBox).innerText
  }catch(e){console.log(e)};
}; // end updateCoinsole

function updateCointent () {
  try {
    document.getElementById('btcAmount').innerText = $btc.amount
    document.getElementById('ltcAmount').innerText = $ltc.amount
    document.getElementById('ethAmount').innerText = $eth.amount
    document.getElementById('fbcAmount').innerText = $fbc.amount
  }catch(e){console.log(e)};
}; // end updateCointent

function fruitbotChooses($coin,$oldCoin,$coinMedian,$coinMedianDiv,$botAmountDiv,$botActionDiv, callback) {
	var $coinAmount = $coin.amount
	try {
		if ($coinMedian) {$coinMedian++} else {$coinMedian = $coinAmount};
		if ($coinAmount < $coinMedian && $coinAmount > $oldCoin) {
			$action = "BUY"
			$coinAmount += ($coinAmount - $tradeFee)
			loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
			$fbc = $response.data
			document.getElementById("fbcBotAmount").innerText += (Math.round(($fbc.amount - $botFee)*100)/100)
			document.getElementById("fbcBotAction").innerText = "SELL"
			}); //end loadJSON
		} else {
			if ($coinAmount + $tradeFee > $coinMedian && $coinAmount < $oldCoin) {
				$action = "SELL";
				$coinMedian--;
				$coinAmount -= ($coinAmount - $tradeFee);
				loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
				$fbc = $response.data;
				document.getElementById("fbcBotAmount").innerText -= (Math.round(($fbc.amount - $botFee)*100)/100);
				document.getElementById("fbcBotAction").innerText = "BUY";
				}); //end loadJSON
			} else {
				$action = "HOLD";
			}; // end if $coinAmount
		}; // end if $coinAmount
		document.getElementById($botAmountDiv).innerText = $coinAmount
		document.getElementById($botActionDiv).innerText = $action
		document.getElementById($coinMedianDiv).innerText = $coinMedian
		
		$oldCoin = $coinAmount
		callback($oldCoin,$coinMedian)
	}catch(e){console.log(e)}; // end try 
}; // end fruitbotChooses

function simplebotChooses($coin,$botAmountDiv,$botActionDiv) {
// function fruitbotChooses($coin,$oldCoin,$coinMedian,$coinMedianDiv,$botAmountDiv,$botActionDiv, callback) {
	var $coinAmount = $coin.amount
  try {
    $expr = Math.round(Math.random() * 3);
switch ($expr) {
 case 1:
  $action = "BUY"
  $coinAmount += ($coinAmount - $tradeFee)
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText += (Math.round(($fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "SELL"
  });
 break;
 case 2:
  $action = "SELL"
  $coinAmount -= ($coinAmount - $tradeFee);
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText -= (Math.round(($fbc.amount - $botFee)*100)/100);
	document.getElementById("simplebotfbcBotAction").innerText = "BUY";
  });
 break;
 default:
 $action = "HOLD"
}
  document.getElementById($botAmountDiv).innerText = $coinAmount
  document.getElementById($botActionDiv).innerText = $action
    //$coinOld = $coin.amount

	}catch(e){console.log(e)}; // end try 
}; // end simplebotChooses


function setMyBot() {
  document.getElementById("jsonArea").innerText = JSON.stringify($coin2);
}; // end simplebotChooses

function manualTransaction($coin,$direction) {
switch ($direction) {
 case "BUY":
  document.getElementById("btcMedian").innerText += (Math.round(($coin.amount - $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText += (Math.round(($fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "SELL"
  });
 break;
 case 2:
  document.getElementById("btcMedian").innerText -= (Math.round(($coin.amount - $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText -= (Math.round(($fbc.amount - $botFee)*100)/100);
	document.getElementById("simplebotfbcBotAction").innerText = "BUY";
  });
 break;
 default:
 $action = "HOLD"
}

}; // end simplebotChooses


function refreshCharts() {
  try {
	loadCoinData();
	updateCoinsole("coinMainBox");
	updateCointent();
	fruitbotChooses($ltc,$ltcOld,$ltcMedian,"fruitbotltcMedian","fruitbotltcBotAmount","fruitbotltcBotAction",function($e,$f){$ltcOld = $e;$ltcMedian = $f});
    fruitbotChooses($btc,$btcOld,$btcMedian,"fruitbotbtcMedian","fruitbotbtcBotAmount","fruitbotbtcBotAction",function($e,$f){$btcOld = $e;$btcMedian = $f});
    fruitbotChooses($eth,$ethOld,$ethMedian,"fruitbotethMedian","fruitbotethBotAmount","fruitbotethBotAction",function($e,$f){$ethOld = $e;$ethMedian = $f});
  }catch(e){console.log(e)}; // end try 
  try {
	$fbcOld = $fbc.amount
  }catch(e){console.log(e)}; // end try 
  try {
	
	simplebotChooses($ltc,"simplebotltcBotAmount","simplebotltcBotAction");
    simplebotChooses($btc,"simplebotbtcBotAmount","simplebotbtcBotAction");
    simplebotChooses($eth,"simplebotethBotAmount","simplebotethBotAction");
  }catch(e){console.log(e)}; // end try 
};


// Refresh chart every 30 seconds.
document.onload = function(){ 
	document.getElementById().innerText = $coin2
	loadCoinData();
	refreshCharts()
};
setInterval(function () {
	refreshCharts()
}, 30000);
