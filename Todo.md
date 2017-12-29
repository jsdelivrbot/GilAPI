BotDB
- Asset type infos.
- CRUD
- Data source
- Buy/sell price strategies
- Bot settings as dropdown


curl "https://olymptrade.com/user/set-option" -H "Cookie: checked=1; lang=en_US; session=1000000000000594446900736398131081513801526685118229571196716166; CSRF-TOKEN=M7OiUmPw98fWjckPf52w1-wyPl8zv1pc9ISeIbcGWo0; enterdate=2017-12-20+23^%^3A25^%^3A27; guest_id=1000000000000594446911136398131081513801527371914125152420139937; props^[chatCol^]=true; props^[user_data_enriched17352083^]=true" -H "Origin: https://olymptrade.com" -H "Accept-Encoding: gzip, deflate, br" -H "Accept-Language: en-US,en;q=0.9" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: https://olymptrade.com/en-us/platform" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" -H "DNT: 1" --data "name=duration_history^&value=^%^5B^%^5D" --compressed


curl "https://olymptrade.com/user/set-option" -H "Cookie: checked=1; lang=en_US; session=1000000000000594446900736398131081513801526685118229571196716166; CSRF-TOKEN=M7OiUmPw98fWjckPf52w1-wyPl8zv1pc9ISeIbcGWo0; enterdate=2017-12-20+23^%^3A25^%^3A27; guest_id=1000000000000594446911136398131081513801527371914125152420139937; props^[chatCol^]=true; props^[user_data_enriched17352083^]=true" -H "Origin: https://olymptrade.com" -H "Accept-Encoding: gzip, deflate, br" -H "Accept-Language: en-US,en;q=0.9" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: https://olymptrade.com/en-us/platform" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" -H "DNT: 1" --data "name=duration_history^&value=^%^5B^%^5D" --compressed

curl "https://olymptrade.com/user/set-option" -H "Cookie: checked=1; lang=en_US; session=1000000000000594446900736398131081513801526685118229571196716166; CSRF-TOKEN=M7OiUmPw98fWjckPf52w1-wyPl8zv1pc9ISeIbcGWo0; enterdate=2017-12-20+23^%^3A25^%^3A27; guest_id=1000000000000594446911136398131081513801527371914125152420139937; props^[chatCol^]=true; props^[user_data_enriched17352083^]=true" -H "Origin: https://olymptrade.com" -H "Accept-Encoding: gzip, deflate, br" -H "Accept-Language: en-US,en;q=0.9" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: https://olymptrade.com/en-us/platform" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" -H "DNT: 1" --data "name=duration_history^&value=^%^5B^%^5D" --compressed


- Asset is dropdown of coins. Array.
- Something updates all DIVs on page with new prices? 
- Remove borders between rows.
- Spacer between bots.
- Top bar shows top scores. Something gets those from below?
- "getNumberFromDiv"


1. Add download links to Git page.
2. Add insert location and auto-insert to Git page files. 
3. Make wysiwyg page with default "hello world" page. 
4. Fix up meme-maker (impact font, white with black border)
5. Set up database for chatroom.
- Sort out domains.

- Search page.js files for dupe functions, auto-move to Gilgamech.js
- Fix divs

# Todo
- Git page
- Admin page
- Passport
- Error page

New page steps:
Example: 
https://stackoverflow.com/questions/26320525/prettify-json-data-in-textarea\-input#26324037
- Find code on StackOverflow
- Identify HTML and JS parts
- index.js get page call
- test.js increment test count
- test.js add tests
- nav.ejs add to project in flight.
- Pagename.ejs add in HTML boilerplate, HTML parts, and Pagename.js call.
- Write JS parts as Pagename.js


Passport:
Mostly works currently - successfully passes loginFailure when given no password. 
- Requires:
- Functions:
- Strategies:
- Pages: 
- DB: 

Options: 
- Local Dev (Need to setup NPM)
- Reference Build (Tried with Enkida - passes tests but fails on Heroku)

Write blog post, use this to lay out ideas about how it works. Reference HackerNoon post. 


app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('pages/index', {
        drinks: drinks,
        tagline: tagline
    });
});

// To echo a single variable, we just use <%= tagline %>. Let's add this to our index.ejs file:
<h2>Variable</h2>
<p><%= tagline %></p>
...
//To loop over our data, we will use .forEach. Let's add this to our view file:
<ul>
    <% drinks.forEach(function(drink) { %>
        <li><%= drink.name %> - <%= drink.drunkness %></li>
    <% }); %>
</ul>

Working with Node has been, for the most part, pretty fun. The hardest part of writing a modern website/webapp - for me at least - is making it pretty on mobile. Actually - that's the second-hardest part. The hardest part has been sorting out Passport authentication. Part of why I'm writing this is to help me gather my thoughts. 


Passport:
Mostly works currently - successfully passes loginFailure when given no password. 
- Requires:
- Functions:
- Strategies:
- Pages: 
- DB: 

Options: 
- Local Dev (Need to setup NPM)
- Reference Build (Tried with Enkida - passes tests but fails on Heroku)

Write blog post, use this to lay out ideas about how it works. Reference HackerNoon post. 


Go research forex strategies - don't reinvent them. It's faster.

Way to simulate 24h of these? (24*60 = 1440 random changes for a random amount.)

Average of last 24h? 
LTC - 
var Median = $87.5.
var unit = 1 LTC
var Mult = $2.5
var 

BTC - 
var Median = $9250.
var unit = 0.1 BTC

ETH - 
var Median = $440.
var unit = 1 ETH

If price is Median - Mult, and has gone up 2 times in a row, buy 1*unit. 
If price is Median - 3*Mult, and has gone up 2 times in a row, buy 2*unit. 
If price is Median + Mult, and has gone down 2 times in a row, buy 1*unit. 
If price is Median + 3*Mult, and has gone down 2 times in a row, buy 2*unit. 
- If market stays between these for 24h, buy 1*unit?
- Prevent rebuy churn? If price stays above Median+3 for 24h, reset median and continue. 
- 


Min Spread = 

OutputCurrency = ActualSalePrice - ActualBuyPrice
OutputCurrency = ActualSalePrice - ((InputCurrency - Fee )  * ConversionRateA)
OutputCurrency = ((ConversionRateB * SalePrice) - Fee) - ((InputCurrency - Fee )  * ConversionRateA)
OutputCurrency = ((ConversionRateB * SalePrice) - Fee) - ((InputCurrency - Fee )  * ConversionRateA)

BuyPrice = ConversionRateA * InputCurrency
ActualBuyPrice + (InputCurrency - Fee )  * ConversionRateA
OutputCurrency / SalePrice = ConversionRateB
OutputCurrency = ConversionRateB * SalePrice
ActualSalePrice = SalePrice - Fee
Spread = ActualSalePrice - ActualBuyPrice
Profit =  SalePrice - BuyPrice

Profit =  SalePrice - ConversionRateB * Input Currency
Spread = SalePrice - Fee - ConversionRateB * InputCurrency + Fee

OutputCurrency = ConversionRate * SalePrice

Target Sale Price = ABP + Spread - fee

Velocity of price changes
Each share has its own sale price? 


Way to find "target" price
More variance at certain times of day? Find patterns?

- I tell Page my Coinbase totals. (It can save?)
- Page calcuates fees and gives a "zero profit" sale price. 

Table shows: 
<div class="calculator-value ng-binding">$ 13.39</div>
1. Current prices
2. Recent changes
3. Highs, lows
- Better than graphs. How? 

- Page to gather stats.
-- Diff the 3 coins.

- Mine Eth


.temp123{
  text-align:center;
}
.temp123 > input{
  text-align:left;
}


var js = document.createElement('script');
js.type = "text/javascript";
js.src = "/js/jquery.dropkick-1.0.0.js";

// function testThis(callback) {callback("test","this",1,2,3,"fizz","buzz")}
// testThis(function(e,f,g){console.log(e,f,g)});


SCP 12810
- Only ages during intense mental exertion. 
- Only known Portal Gloves. (SCP 12811)
- RasenGun.
- DisassemBlade is Bankai.
-- Theoretical weapon - can be used through visualization, enabling past and future use. 
- Inverse reality distortion field ("a dissonant spirit", a form of invisibility, cannot control.)


Financial
Cut costs - Cancel/stop
- Amazon Prime? 
- 24h Fitness
- LA Fitness?
- Rent - buy a mobile home.
- Car - pay off by September.
- Navient - pay off ($8k) - 6 weeks
- Navient - pay off ($8k) - 6 weeks
- Navient - pay off ($8k) - 6 weeks

- Passport.js
- BECU account - apply for loan.
- Order of financial operations.

best
$k - weeks - item
(30 - 37.5 - Draw = $600/wk)
0.8 - +1 - income
30 - 37.5 - Bank
$k - weeks - item
79.5 - 99.5 - Total (1.91y)
8 - 10 - Navient
15.5 - 19 - Car
50 - 62.5 - Mobile
6 - 7.5 - Appliances?
99.5 - 37.5 = 62 - 4 = 58 - 52 = 6
-- Dec 2017 move-in - 2018 - February 2019 payoff

worst
$k - weeks - item
(30 - 37.5 - Draw = $600/wk)
0.8 - +1 - income
30 - 37.5 - Bank
$k - weeks - item
99.5 - 124.5 - Total (2.39y)
8 - 10 - Navient
15.5 - 19 - Car
50 - 62.5 - Mobile
6 - 7.5 - Appliances?
20  - 14.5 - Rent
124.5 - 37.5 = 87 - 4 = 83 - 52 = 31
-- 2017 - October 2018 move-in - June 2019 payoff


2/20/2018
best
$k - weeks - item
(30 - 37.5 - Draw = $600/wk)
0.8 - +1 - income
5 - 6.5 - Bank
$k - weeks - item
45.5 - 57 - Total (1.91y)
14.5 - 18 - Car
25 - 62.5 - Mobile
6 - 7.5 - Appliances?
57 - 6.5 = 50.5 +8 = 58.5 - 52 = 6.5
-- Dec 2017 move-in - 2018 - February 2019 payoff

worst
$k - weeks - item
(30 - 37.5 - Draw = $600/wk)
0.8 - +1 - income
31.5 - 39.5 - Bank
$k - weeks - item
86.5 - 108 - Total (2.07y)
14.5 - 18 - Car
50 - 62.5 - Mobile
6 - 7.5 - Appliances?
16  - 14.5 - Rent
108 - 39.5 = 68.5 + 8 = 76.5 - 52 = 24.5
-- October 2018 move-in - May 2019 payoff


https://olymptrade.com/user/set-option






curl "https://olymptrade.com/user/set-option" -H "Cookie: lang=en_US; session=1000000000000594446900736398131081513801526685118229571196716166; CSRF-TOKEN=M7OiUmPw98fWjckPf52w1-wyPl8zv1pc9ISeIbcGWo0; enterdate=2017-12-20+23^%^3A25^%^3A27; guest_id=1000000000000594446911136398131081513801527371914125152420139937; props^[chatCol^]=true; checked=1; props^[user_data_enriched17352083^]=true; props^[deal_user_collapsed^]=true" -H "Origin: https://olymptrade.com" -H "Accept-Encoding: gzip, deflate, br" -H "Accept-Language: en-US,en;q=0.9" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: https://olymptrade.com/en-us/platform" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" -H "DNT: 1" --data "name=duration_history^&value=^%^5B^%^5D" --compressed &

curl "https://olymptrade.com/user/set-option" -H "Cookie: lang=en_US; session=1000000000000594446900736398131081513801526685118229571196716166; CSRF-TOKEN=M7OiUmPw98fWjckPf52w1-wyPl8zv1pc9ISeIbcGWo0; enterdate=2017-12-20+23^%^3A25^%^3A27; guest_id=1000000000000594446911136398131081513801527371914125152420139937; props^[chatCol^]=true; checked=1; props^[user_data_enriched17352083^]=true; props^[deal_user_collapsed^]=true" -H "Origin: https://olymptrade.com" -H "Accept-Encoding: gzip, deflate, br" -H "Accept-Language: en-US,en;q=0.9" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Accept: application/json, text/javascript, */*; q=0.01" -H "Referer: https://olymptrade.com/en-us/platform" -H "X-Requested-With: XMLHttpRequest" -H "Connection: keep-alive" -H "DNT: 1" --data "name=duration_history^&value=^%^5B^%^5D" --compressed




Calculators
http://www.mortgage-info.com/mortgage-calculators/15yearmortgagecalculator.aspx
https://www.cryptocompare.com/mining/calculator/btc?HashingPower=1&HashingUnit=TH%2Fs&PowerConsumption=1&CostPerkWh=0. (also coin)
https://bettereveryday.vc/how-hard-is-it-to-generate-a-10x-return-on-an-investment-9c1656d6c3af
http://www.morningstar.com/InvGlossary/risk-adjusted-return.aspx
https://en.wikipedia.org/wiki/Beta_(finance)
https://cnotmz.appspot.com/#
http://www.bristol.ac.uk/media-library/sites/physics/migrated/documents/tutorial.pdf
https://liquorwa.appspot.com/?msg=Cost%20Breakdown:&lP=$25.00&t=$36.72&pT=$5.12&lT=$6.60

Finn
https://encrypted.google.com/search?q=stock+price+api&hl=en&source=lnt&tbs=qdr:y&sa=X&ved=0ahUKEwiLjc2k3orYAhUK1WMKHbpZAE4QpwUIIA&biw=1315&bih=1192&dpr=0.8
https://developers.coinbase.com/docs/wallet/guides/bitcoin-wallet
https://finance.yahoo.com/cryptocurrencies
https://finance.yahoo.com/quote/grow
http://www.morningstar.com/funds/XNAS/DFEMX/quote.html
https://data.bitcoinity.org/markets/price/6m/USD?c=e&t=l
https://coinmarketcap.com/

- APIs
https://docs.gdax.com/#api
https://duckduckgo.com/?q=binary+options+api&atb=v61-6&ia=web
https://www.programmableweb.com/news/96-stocks-apis-bloomberg-nasdaq-and-etrade/2013/05/22
https://www.quora.com/Are-there-any-binary-option-brokers-that-offer-a-trading-API
https://www.quora.com/What-are-some-good-APIs-to-get-real-time-stock-quotes
http://www.financial-hacker.com/bye-yahoo-and-thank-you-for-the-fish/
http://www.xe.com/currencyconverter/convert/?Amount=260&From=ZAR&To=USD
https://blog.quandl.com/api-for-stock-data
https://www.tdameritrade.com/why-td-ameritrade.page
https://www.interactivebrokers.com/en/index.php?f=1338
https://blockchain.info/api
https://blockchain.info/q/24hrtransactioncount
https://blockchain.info/q/24hrbtcsent
https://blockchain.info/q/hashrate
https://blockchain.info/q/unconfirmedcount
https://blockchain.info/ticker

- Strategies
https://www.youtube.com/watch?v=9ofM0QbgYvE
https://davidgerard.co.uk/blockchain/2017/12/17/why-you-cant-cash-out-pt-1-why-bitcoins-price-is-largely-fictional/
https://news.ycombinator.com/item?id=15987828
https://olymptrade.com/en-us/training
https://www.investopedia.com/terms/m/movingaverage.asp
https://admiralmarkets.com/education/articles/forex-strategy/best-forex-trading-strategies-that-work
http://www.nasdaq.com/dividend-stocks/
https://www.alphavantage.co/
http://js.syncfusion.com/demos/web/dashboard/stockAnalysis/default.html
http://www.eeemo.net/
http://www.dividend.com/
https://www.marketwatch.com/story/heres-a-better-way-to-screen-for-dividend-stocks-so-you-dont-get-burned-2017-11-27
https://www.investopedia.com/articles/basics/04/100804.asp

JS Music
https://duckduckgo.com/?q=javascript+music&atb=v61-6&ia=web
http://javascriptkit.com/script/cutindex4.shtml
http://badassjs.com/post/41708259332/teoria-a-javascript-music-theory-library-for
https://github.com/mudcube/MIDI.js

Misc
https://www.postgresql.org/docs/9.3/static/hstore.html
https://he.net/colocation.html
http://js.syncfusion.com/demos/web/
https://guacamole.apache.org/


Enkida
https://hubot.github.com/


Map
https://duckduckgo.com/?q=add+google+maps+to+your+website&atb=v61-6&ia=web
https://www.add-map.net/
https://www.add-map.net/en/google-maps-api-key
https://console.developers.google.com/apis/credentials/key?project=red-road-189822&type=CLIENT_SIDE
http://www.vestus.com/ForeclosureCount.aspx?page=countyCity&CountyID=3
http://www.vestus.com/foreclosure/WA/King/BELLEVUE/Register%20for%20full%20address-98007/350556


