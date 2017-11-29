function refreshCoin(outputTextBox){
  timeUrl = "https://api.coinbase.com/v2/time"
  loadCoin(timeUrl,outputTextBox)
  btcBuyUrl = "https://api.coinbase.com/v2/prices/BTC-USD/buy"
  loadCoin(btcBuyUrl,outputTextBox)
  ltcBuyUrl = "https://api.coinbase.com/v2/prices/LTC-USD/buy"
  loadCoin(ltcBuyUrl,outputTextBox)
  ethBuyUrl = "https://api.coinbase.com/v2/prices/ETH-USD/buy"
  loadCoin(ethBuyUrl,outputTextBox)
}; // end refreshChat

function loadCoin(coinUrl,coinBox){
  loadJSON(coinUrl, function(response) {
  if (response.data.iso) {
      document.getElementById(coinBox).value += response.data.iso + lineBreak
  } else {
	  amount = response.data.amount
      document.getElementById(coinBox).value += response.data.base + " | " + amount  + " | " + Math.round(amount-oldamount) + lineBreak 
  }
  }); // end loadJSON
}; // end loadChat

// Refresh chart every 60 seconds.
setInterval(function () {
  refreshCoin("coinMainBox")
}, 60000);


function r2Coin (outputTextBox) {
var $time
var $btc
var $ltc
var $time
loadJSON("https://api.coinbase.com/v2/time", function($response) { $time = $response.data});
loadJSON("https://api.coinbase.com/v2/prices/BTC-USD/buy", function($response) { $btc = $response.data});
loadJSON("https://api.coinbase.com/v2/prices/LTC-USD/buy", function($response) { $ltc = $response.data});
loadJSON("https://api.coinbase.com/v2/prices/ETH-USD/buy", function($response) { $eth = $response.data});
$coin2 = [];
$coin2 = $coin2 + $time + lineBreak;
$coin2 += $eth.base + " | " + $eth.amount + lineBreak;
$coin2 = $coin2 + $ltc + lineBreak;
$coin2 = $coin2 + $btc + lineBreak;
/*
$coin2 += $time.iso + lineBreak;
$coin2 += $eth.base + " | " + $eth.amount  + " | " + $ethOld+ lineBreak;
$coin2 += $ltc.base + " | " + $ltc.amount  + " | " + $ltcOld+ lineBreak;
$coin2 += $btc.base + " | " + $btc.amount  + " | " + $btcOld+ lineBreak;
*/
document.getElementById(outputTextBox).value  += $coin2
/*
$btcOld = $btc.amount
$ltcOld = $ltc.amount
$ethOld = $eth.amount*/
};