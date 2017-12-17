BotDB
- Asset type infos.
- CRUD
- Data source
- Buy/sell price strategies
- Bot settings as dropdown


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



















