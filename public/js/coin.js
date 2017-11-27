function refreshCoin(chatRoom){
  chatUrl = "https://api.coinbase.com/v2/prices/BTC-USD/buy"
  loadCoin(chatUrl,"coinMainBox")
  chatUrl = "https://api.coinbase.com/v2/prices/LTC-USD/buy"
  loadCoin(chatUrl,"coinMainBox")
  chatUrl = "https://api.coinbase.com/v2/prices/ETH-USD/buy"
  loadCoin(chatUrl,"coinMainBox")
}; // end refreshChat

function loadCoin(coinUrl,coinBox){
  loadJSON(chatUrl, function(response) {
    document.getElementById(coinBox).value += response
  }); // end loadJSON
}; // end loadChat

// Refresh chart every 60 seconds.
setInterval(function () {
  refreshCoin("General")
}, 60000);
