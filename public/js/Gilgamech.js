//Gil.JS
// aSecretToEverybody

//Init vars
var $GilMain = {apiVersion: "null", googleApiKey: 'aSecretToEverybody',chatGeneral: "", errgoLogic: "", GilJSVersion: "708",pageHeaderTitle: 'Gilgamech Testing'};

var $pageSettingsJson = "/settings.json";

// addElement
var timerInterval //Default timer variable, removed in removePage.

// Oddly useful
var lineBreak = "\r\n"; 
var spaceChar = " "; 
var OpenParens = "("
var CloseParens = ")"
var OpenCurlBracket = "{"
var CloseCurlBracket = "}"
var SemiColon = ";"
var EndComment = "//end"

// Fruitbot, Meme, DSQ 
var bgImage;
var canvas;
var ctx;
var $stage;
var SIZE = 50;

// Chat
var $chatUser
var $chatMessage
var $chatRoom
var $chatBox

// Coin 
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

// CSS classes
// Bootstrapvar 
$class = {
	"SmallHidden":"hidden-sm hidden-xs ",
	"LargeHidden":"hidden-md hidden-lg ",
	"SmallHiddenLargeQuarter":"col-md-3 hidden-xs ",
	"QuarterWidth":"col-md-3 col-xs-3 ",
	"HalfWidth":"col-md-6 col-xs-6 ",
	"NarrowCol":"col-md-2 col-xs-2 ",
	"ThirdWidth":"col-md-4 col-xs-4 ",
	"HalfDesktopFullMobile":"col-md-6 col-xs-12 ",
	"FullDesktopFullMobile":"col-md-12 col-xs-12 ",
	"Row":"row ",
	"ImgRnd":"img-rounded ",
	"Container":"container ",
	"Dropdown":"dropdown ",
	"DropdownContent":"dropdown-content ",
	"NavBar":"nav navbar-nav ",
	"NavbarRight":"navbar-right "
}

// Composite
var $classRow = $class.ImgRnd + $class.Row;
var $classContainerRow = $class.Container + $classRow;
var $classSpacer = $class.ImgRnd + $class.SmallHiddenLargeQuarter;
var $classHalfDesktopFullMobileRnd = $class.ImgRnd + $class.HalfDesktopFullMobile;
var $classInputField = $class.ImgRnd + $class.FullDesktopFullMobile;
var $classInputFieldPLUSRow = $classInputField + $classRow;
var $classThirdWidthRnd = $class.ThirdWidth + $class.ImgRnd;

// Gil's
var $classContentTitle = 'contentTitles ';
var $classContentItems = 'contentItems ';
var $classColorRow = "colorRow ";
var $classTop = "top ";

// Gil's Composite
var $classContentRow = $classRow + $classContentTitle;
var $classNarrowContent = $classContentItems + $class.NarrowCol
var $classInputFieldPLUSColorRow = $classInputField + $classColorRow;
var $classColorRow2x = $classRow + $classColorRow;

// Styles
var $style = {
	"BlackText" : "color: #000, ",
	"WhiteText" : "color: #fff, ",
	"WhiteBack" : "background-color: #fff, ",
	"BlackBack" : "background-color: #000, ",
	"RedField" : "background-color: #833",
	"GreenField" : "background-color: #383",
	"BlueField" : "background-color: #338"
}

// Bootstrap Buttons
var $btn = {
	"primary" : "btn btn-primary ",
	"danger" : "btn btn-danger ",
	"caution" : "btn btn-caution ",
	"info" : "btn btn-info ",
	"secondary" : "btn btn-secondary ",
	"success" : "btn btn-success ",
	"warning" : "btn btn-warning ",
	"lg" : "btn-lg ",
	"xl" : "btn-xl ",
	"xs" : "btn-xs "
}

var $styleBlackTextWhiteBack = $style.BlackText + $style.WhiteBack;
var $styleWhiteTextBlackBack = $style.WhiteText + $style.BlackBack;

var $btnCalc = $btn.primary + $btn.lg;

// Pages

var $blankPageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "Cut and paste Javascript calculator","href":"http://javascriptkit.com/script/cut18.shtml"}
	],
	"elements" : [
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow","attributeType":"onkeypress","attributeAction":"detectEnter(event,evalCalc('output'))"},
		{"elementParent": "outputRow","elementClass": "div_textarea" + $classInputField,"elementType": "input","id":"output"}
	],
	"rows" : [
		{"elementParent": "contentInner","firstName":"=","firstOnclick":"evalCalc('output')","secondName":"0","secondOnclick":"appendElement(0,'output')","thirdName":".","thirdOnclick":"appendElement('.','output')","fourthName":"+","fourthOnclick":"appendElement('+','output')"}
	],
	"timers" : [
		{"interval": "10000","callback":"writeElement('output','" + $GilMain.errgoLogic + "');"}
	]
}
//rbp("bodyWrapper",$blankPageVar)

// Page Elements
var $headerVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","elementType":"title","innerText":$GilMain.pageHeaderTitle},
		{"elementParent": "parentElement","elementType":"script","href":"/js/jquery.min.js"},
		{"elementParent": "parentElement","elementType":"link","href":"/stylesheets/bootstrap.min.css"},
		{"elementParent": "parentElement","elementType":"link","href":"/stylesheets/normalize.css"},
		{"elementParent": "parentElement","elementType":"link","href":"/stylesheets/Gilgamech.css"}
	]
}

var $footerVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","elementClass": "container-fluid"},
		{"elementParent": "parentElement","id":"spacerName"},
		{"elementParent": "spacerName","elementType":"br"},
		{"elementParent": "spacerName","elementType":"br"},
		{"elementParent": "footWrapper","elementClass": $classRow + $classInputField,"id":"errDiv"},
		{"elementParent": "footWrapper","elementClass": "navbar-static-bottom","elementStyle":"left: 0;bottom: 0;width: 100%;overflow: hidden;","id":"footerStatic"},
		{"elementParent": "footerStatic","elementType":"p","elementClass":"width: 100%;text-align: center;","id":"footerBanner"},
		{"elementParent": "footerBanner","elementType":"a","href":"https://www.duckduckgo.com","src":"/images/BannerImage.gif","id":"footerLink"},
		{"elementParent": "footerLink","elementType":"img","innerText":"C1ick h34r ph0r m04r inph0","elementStyle":"height: 150px","elementClass":$class.ImgRnd},
		{"elementParent": "footerStatic","innerText":'Gil-API version: ' + $GilMain.apiVersion + " - Gilgamech.js version:" + $GilMain.GilJSVersion,"elementStyle":"font-weight:bold;text-align:center;","elementType":"p"},
		{"elementParent": "footerStatic","innerText":"(c) 2013-2018 Gilgamech Technologies - We are the gears that make our world go around.","elementStyle":"font-weight:bold;text-align:center;","elementType":"p"}
	]
}

var $navBarVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent":"nav2","innerText":"Fruitbot!","onclick":"rbp('bodyWrapper',$fruitBotVar);","elementClass":$class.SmallHidden},
		{"elementParent":"nav2","innerText":"Bad Password","onclick":"rbp('bodyWrapper',$badPwVar);","elementClass":$class.SmallHidden},
		{"elementParent":"nav2","innerText":"Chat!","onclick":"rbp('bodyWrapper',$chatPageVar);","elementClass":$class.SmallHidden},	
		{"elementParent":"nav2ddc","innerText":"Fruitbot!","onclick":"rbp('bodyWrapper',$fruitBotVar);","elementClass":$class.LargeHidden},
		{"elementParent":"nav2ddc","innerText":"Bad Password","onclick":"rbp('bodyWrapper',$badPwVar);","elementClass":$class.LargeHidden},
		{"elementParent":"nav2ddc","innerText":"Chat!","onclick":"rbp('bodyWrapper',$chatPageVar);","elementClass":$class.LargeHidden},
		{"elementParent":"nav2ddc","innerText":"DiffeRentIal","onclick":"rbp('bodyWrapper',$rentalMapVar);"},
		{"elementParent":"nav2ddc","innerText":"Calculator","onclick":"rbp('bodyWrapper',$calcPageVar);"},
		{"elementParent":"nav2ddc","innerText":"Coins","onclick":"rbp('bodyWrapper',$coinPageVar);"},
		{"elementParent":"nav2ddc","innerText":"JSON Lint","onclick":"rbp('bodyWrapper',$jsonLintVar);"},
		{"elementParent":"nav2ddc","innerText":"Git","onclick":"rbp('bodyWrapper',$gitPageVar);"},
		{"elementParent":"nav2ddc","innerText":"Arkdata","onclick":"rbp('bodyWrapper',$arkDataVar);"},
		{"elementParent":"nav2ddc","innerText":"Admin","onclick":"rbp('bodyWrapper',$adminPageVar);"},
		{"elementParent":"nav2ddc","innerText":"addElement Explained","onclick":'abp("bodyWrapper",$addElementBlogVar);'},
		{"elementParent":"nav2ddc","innerText":"Minimalism","onclick":'abp("bodyWrapper",$minimalismBlogVar);'},
		{"elementParent":"nav2ddc","innerText":"RGB Calculator","onclick":'rbp("bodyWrapper",$rgbColorVar);addRgbColorPage("bodyWrapper");'},
		{"elementParent":"nav2ddc","innerText":"Draggable Squares","onclick":"rbp('bodyWrapper',$dsqPageVar);buildDsqPage('canvas');"},
		{"elementParent":"nav2ddc","innerText":"Meme Maker","onclick":'rbp("bodyWrapper",$memePageVar);buildMemePage("canvas","topTextInput","bottomTextInput","urlInput",bgImage);'},
		{"elementParent":"nav2ddc","innerText":"Login!","onclick":'afp("login","bodyWrapper");rbp("bodyWrapper",$loginMenuVar);',"elementClass":$class.LargeHidden},
		{"elementParent":"nav2ddc","innerText":"Signup!","onclick":'afp("signup","bodyWrapper");',"elementClass":$class.SmallHidden + $class.LargeHidden},
		{"elementParent":"nav3","innerText":"Login!","onclick":'afp("login","bodyWrapper");rbp("bodyWrapper",$loginMenuVar);',"elementClass":$class.SmallHidden + $class.NavbarRight}
	],
	"elements" : [
		{"elementParent":"parentElement","elementClass":$class.Container,"id":"titleParent"},
		{"elementParent":"titleParent","innerText":$GilMain.pageHeaderTitle,"elementClass":$class.ImgRnd + $classTop + $class.SmallHidden,"elementType":"a","elementStyle":"font-size: 7ex; color: #000; text-decoration: none","href":"/"},
		{"elementParent":"titleParent","innerText":$GilMain.pageHeaderTitle,"elementClass":$class.ImgRnd + $classTop + $class.LargeHidden,"elementType":"a","elementStyle":"font-size: 4ex; color: #000; text-decoration: none","href":"/"},
		{"elementParent":"parentElement","elementClass":"navbar navbar-static-top navbar-inverse","id":"navBar"},
		{"elementParent":"navBar","elementClass":$class.Container,"id":"NavDDOuter"},
		{"elementParent":"NavDDOuter","elementClass":$class.NavBar + " col-md-6 col-xs-6","elementType":"ul","id":"nav2"},
		{"elementParent":"nav2","elementClass":$class.Dropdown,"id":"nav2dd"},
		{"elementParent":"nav2dd","innerText":"Menu","elementType":"p"},
		{"elementParent":"nav2dd","elementClass":$class.DropdownContent,"id":"nav2ddc"},
		{"elementParent":"NavDDOuter","elementClass":$class.NavBar + $class.HalfWidth + $class.NavbarRight,"elementType":"ul","id":"nav3"},
		{"elementParent":"nav3","elementClass":$class.Dropdown,"id":"nav3dd"},
		{"elementParent":"nav3dd","innerText":"How did I make this page?","elementType":"p"},
		{"elementParent":"nav3dd","elementClass":$class.DropdownContent,"id":"NavDDWrapper"}
	]
}

var $wrapperVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "body","id":"headWrapper"},
		{"elementParent": "body","id":"bodyWrapper"},
		{"elementParent": "body","id":"footWrapper"},
		{"elementParent": "nav3dd","elementClass":$class.DropdownContent,"id":"NavDDWrapper"}
	]
}

// Page sections
var $loginMenuVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText":"Javascript Basic Auth","href":"https://stackoverflow.com/questions/491914/pure-javascript-code-for-http-basic-authentication"},
		{"elementParent": "NavDDWrapper","innerText":"Sequelize getting started","href":"http://docs.sequelizejs.com/manual/installation/getting-started.html"},
		{"elementParent": "NavDDWrapper","innerText":"Sequelize Findone","href":"https://stackoverflow.com/questions/32212945/sequelize-findone-success-is-undefined#32213208"},
		{"elementParent": "NavDDWrapper","innerText":"Render common variables from app.js to all routes in express","href":"https://stackoverflow.com/questions/29026650/how-to-render-common-variables-from-app-js-to-all-routes-in-express"},
		{"elementParent": "NavDDWrapper","innerText":"Delete cookie on logout in Express and Passport","href":"https://stackoverflow.com/questions/33112299/how-to-delete-cookie-on-logout-in-express-passport-js"},
		{"elementParent": "NavDDWrapper","innerText":"Cookie Parser on Github","href":"https://github.com/expressjs/cookie-parser#cookieparsersignedcookiestr-secret"},
		{"elementParent": "NavDDWrapper","innerText":"Express JS book","href":"http://expressjs-book.com/index.html%3Fp=128.html"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap buttons","href":"https://v4-alpha.getbootstrap.com/components/buttons/#sizes"}
	]
}

var $pageMenuVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText":"______________"},	
		{"elementParent": "NavDDWrapper","innerText":"'Custom scrollbars in Webkit","href":"https://css-tricks.com/custom-scrollbars-in-webkit/"},
		{"elementParent": "NavDDWrapper","innerText":"'Load div as file","href":"https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/"},
		{"elementParent": "NavDDWrapper","innerText":"'Applies color scheme to text in div","href":"https://stackoverflow.com/questions/23737776/how-to-color-specific-word-in-a-container-using-css"},
		{"elementParent": "NavDDWrapper","innerText":"'Load JSON","href":"https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript"},
		{"elementParent": "NavDDWrapper","innerText":"'Javascript Objects","href":"https://www.w3schools.com/js/js_objects.asp"},
		{"elementParent": "NavDDWrapper","innerText":"'Clear SetInterval","href":"https://stackoverflow.com/questions/2901108/how-do-i-clear-this-setinterval#2901155"},
		{"elementParent": "NavDDWrapper","innerText":"'Make footer stick to the bottom of the page.","href":"https://stackoverflow.com/questions/3443606/make-footer-stick-to-bottom-of-page-correctly#18066619 "}
	]
}

var $testVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","innerText": "Add newElementJson here.","elementType": "textarea"}
	]
}

var $adminPageVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classSpacer,"id":"contentOuter"},
		{"elementParent": "contentOuter","elementClass": $classHalfDesktopFullMobileRnd},
		{"elementParent": "parentElement","elementClass": $classHalfDesktopFullMobileRnd,"id":"contentInner"},
		{"elementParent": "contentInner","innerText": "Admin Page","elementClass": $classContentRow},
		{"elementParent": "contentInner","elementClass": $classInputField},
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow"},
		{"elementParent": "outputRow","innerText": "Log loading...","elementClass": $classInputField,"elementStyle": $style.BlackText,"elementType": "textarea","id":"output"},
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow2"},
		{"elementParent": "outputRow2","innerText": JSON.stringify($testVar),"elementClass": $classInputField,"elementStyle": $style.BlackText,"elementType": "textarea","id": "output2"},
		{"elementParent": "contentInner","id":"outputDiv"}
	],
	"rows" : [
		{"elementParent": "outputRow","firstName":"refreshPage","firstOnclick":"initPage($pageSettingsJson);"},
		{"elementParent": "outputRow2","firstName":"loadPage","firstOnclick":"cje('outputDiv',JSON.parse(readElement('output2')));","secondName":"parseHtml","secondOnclick":"parseHtml('outputDiv','outputDiv');"}
	],
	"timers" : [
		{"interval": "10000","callback":"writeElement('output','" + $GilMain.errgoLogic + "');"}
	]
}

var $calcPageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "Cut and paste Javascript calculator","href":"http://javascriptkit.com/script/cut18.shtml"}
	],
	"elements" : [
		{"elementParent": "parentElement","elementClass": $class.QuarterWidth,"id":"contentOuter"},
		{"elementParent": "contentOuter","elementClass": $classHalfDesktopFullMobileRnd},
		{"elementParent": "contentOuter","elementClass": $classHalfDesktopFullMobileRnd,"id":"contentInner"},
		{"elementParent": "contentInner","innerText": "Calculator","elementClass": $classContentRow},
		{"elementParent": "contentInner","elementClass": $classInputField},
		{"elementParent": "contentInner","elementClass": $classInputFieldPLUSColorRow,"id":"outputRow","attributeType":"onkeypress","attributeAction":"detectEnter(event,evalCalc('output'))"},
		{"elementParent": "outputRow","elementClass": "div_textarea" + $classInputField,"elementType": "input","id":"output"}
	],
	"rows" : [
		{"elementParent": "contentInner","firstName":"1","firstOnclick":"appendElement(1,'output')","secondName":"2","secondOnclick":"appendElement(2,'output')","thirdName":"3","thirdOnclick":"appendElement(3,'output')","fourthName":"/","fourthOnclick":"appendElement('/','output')"},	
		{"elementParent": "contentInner","firstName":"4","firstOnclick":"appendElement(4,'output')","secondName":"5","secondOnclick":"appendElement(5,'output')","thirdName":"6","thirdOnclick":"appendElement(6,'output')","fourthName":"*","fourthOnclick":"appendElement('*','output')"},
		{"elementParent": "contentInner","firstName":"7","firstOnclick":"appendElement(7,'output')","secondName":"8","secondOnclick":"appendElement(8,'output')","thirdName":"9","thirdOnclick":"appendElement(9,'output')","fourthName":"-","fourthOnclick":"appendElement('-','output')"},
		{"elementParent": "contentInner","firstName":"=","firstOnclick":"evalCalc('output')","secondName":"0","secondOnclick":"appendElement(0,'output')","thirdName":".","thirdOnclick":"appendElement('.','output')","fourthName":"+","fourthOnclick":"appendElement('+','output')"}
	]
}

var $jsonLintVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "prettify json data in textarea input","href":"https://stackoverflow.com/questions/26320525/prettify-json-data-in-textarea-input#26324037"},
		{"elementParent": "NavDDWrapper","innerText": "copy textarea to clipboard","href": "https://stackoverflow.com/questions/7218061/javascript-copy-text-to-clipboard#7218068"}
	],
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classSpacer,"id": "contentOuter"},
		{"elementParent": "contentOuter","elementClass": $classHalfDesktopFullMobileRnd},
		{"elementParent": "parentElement","elementClass": $classHalfDesktopFullMobileRnd,"id":"nestArea"},
		{"elementParent": "nestArea"},
		{"elementParent": "nestArea", "innerText": "JSONLint","elementClass": $classContentRow},
		{"elementParent": "nestArea", "innerText": '{"innerText":"JSON goes here"}',"elementClass": "div_textarea" + $classInputField,"elementType": "textarea","id":"output"}
	],
	"rows" : [
		{"elementParent": "nestArea","firstName": "Pretty Print","firstOnclick": "prettyPrint('" + "output" + "')","secondName": "Copy to Clipboard","secondOnclick": "copyToClipboard('" + "output" + "')"}
	]
}

var $dsqPageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "Making draggable shapes with CreateJS","href":"https://superdevresources.com/draggable-shapes-canvas-createjs"},
		{"elementParent": "NavDDWrapper","innerText": "CreateJS website","href":"https://www.createjs.com"},
		{"elementParent": "NavDDWrapper","innerText": "Codepen demo","href":"https://codepen.io/anon/pen/rpMmvr"}
	],
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classInputFieldPLUSColorRow,"elementType":"script","href":"/js/easeljs-0.8.2.min.js"},
		{"elementParent": "parentElement","id":"divForButtons"},
		{"elementParent": "divForButtons","innerText":"Add Square","elementClass":"btn","elementType":"button","attributeType":"onclick","attributeAction":"addShape(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, 'yellow','square');"},
		{"elementParent": "divForButtons","innerText":"Add Circle","elementClass":"btn","elementType":"button","attributeType":"onclick","attributeAction":"addShape(canvas.width/2 + (SIZE * 2.5),canvas.height/2,0,SIZE * 2, 'red','circle');"},
		{"elementParent": "divForButtons","innerText":"Add Star","elementClass":"btn","elementType":"button","attributeType":"onclick","attributeAction":"addShape(canvas.width/2 + (SIZE * 2.5),canvas.height/2,0,SIZE * 2, 'blue','star');"},
		{"elementParent": "divForButtons","innerText":"Page has bug - it does not work the first time. Please click the link again."},
		{"elementParent": "parentElement","id":"canvas","elementClass":$class.ImgRnd,"elementType":"canvas","elementStyle":"display: block,margin: 0px auto,border: 1px solid black,"}
	]
}

var $arkDataVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"id":"wrapper","elementParent":"parentElement","elementClass":$class.Container + $class.ImgRnd},
		{"id":"spacer","elementParent":"wrapper","elementClass":$classSpacer},
		{"id":"content","elementParent":"wrapper","elementClass":$classHalfDesktopFullMobileRnd},
		{"id":"coinArea","elementParent":"content"},
		{"id":"contentLabel1","elementParent":"coinArea","innerText":"Welcome to ARKData","elementClass":$classContentRow},
		{"id":"contentLabel2","elementParent":"coinArea","innerText":"Gil's player and tribe tracker","elementClass":$classRow + $classContentTitle},
		{"id":"contentLabel3","elementParent":"coinArea","innerText":"Players currently being tracked:","elementClass":$classRow + $classContentTitle},
		
	],
	"rows" : [
		{"elementParent":"coinArea","firstName":"PlayerName","secondName":"ServerName","thirdName":"Firstseen","fourthName":"Timeseen"},
		{"elementParent":"coinArea","firstName":"dopey.tim","secondName":"Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","thirdName":"10/23/2017 13:25:45","fourthName":"10/24/2017 22:46:34"},
		{"elementParent":"coinArea","firstName":"MFrider88","secondName":"Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","thirdName":"10/23/2017 21:41:57","fourthName":"10/23/2017 23:02:46"},
		{"elementParent":"coinArea","firstName":"MacNCheese3","secondName":"Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","thirdName":"9/1/2017 14:42:06","fourthName":"10/24/2017 15:21:50"},
		{"elementParent":"coinArea","firstName":"GenMaxiu","secondName":"Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","thirdName":"6/10/2017 10:09:07","fourthName":"10/24/2017 0:10:12"},
		{"elementParent":"coinArea","firstName":"FMFrider88","secondName":"Asgard Awakens-Ragnarok (Cluster-x5,XP&amp;H,x10T) - (v272.3)","thirdName":"10/23/2017 21:23:43","fourthName":"10/23/2017 23:39:49"},
	]
}

var $rentalMapVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "Adding Google Maps to your website","href":"https://developers.google.com/maps/documentation/javascript/adding-a-google-map#key"}
	],
	"elements" : [
		{"elementParent": "headWrapper","elementType":"script","href":"https://maps.googleapis.com/maps/api/js?key="+ $GilMain.googleApiKey + "&callback=initMap"},
		{"elementParent": "parentElement","elementClass":$class.Container + $class.ImgRnd,"id":"wrapper"},
		{"elementParent": "wrapper","innerText":"DiffeRENTial","elementClass":$classContentRow},
		{"elementParent": "wrapper","elementStyle":"width: 100vh;height: 75vh","id":"map"},
	]
}

var $memePageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "How to add a border on html5 canvas text?","href":"https://stackoverflow.com/questions/1421082/how-to-add-a-border-on-html5-canvas-text#1421598"}
	],
	"elements" : [
		{"elementParent":"parentElement","innerText":"MemeGen","elementClass":$classContentRow},
		{"elementParent":"parentElement","id":"canvas","elementClass":$class.ImgRnd,"elementType":"canvas","elementStyle":"display: block;margin: 0px auto;border: 1px solid black;"},
		{"elementParent":"parentElement","id":"urlInput","innerText":"https://technabob.com/blog/wp-content/uploads/2014/08/picard1.jpg","elementClass":$classInputField,"elementType":"input"},
		{"elementParent":"parentElement","id":"topTextInput","innerText":"Top Text","elementClass":$classInputField,"elementType":"input"},
		{"elementParent":"parentElement","id":"bottomTextInput","innerText":"Bottom Text","elementClass":$classInputField,"elementType":"input"},
	],
	"rows" : [
		{"elementParent": "parentElement","firstName":"Create Meme!","firstOnclick":"updateMemeForm('urlInput','canvas'},"}
	]
}

var $gitPageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText": "Cut and paste Javascript calculator","href":"http://javascriptkit.com/script/cut18.shtml"}
	],
	"elements" : [
		{"elementParent":"parentElement","id":"contentOuter","elementClass":$class.Container + $class.ImgRnd},
		{"elementParent":"contentOuter","innerText":"repo URL","elementClass":$classContentRow},
		{"elementParent":"contentOuter","id":"contentTextArea","innerText":"https://raw.githubusercontent.com/Gilgamech/GilAPI/master/public/js","elementClass":"div_textarea" + $classInputField,"elementType":"input"},
		{"elementParent":"contentOuter","id":"contentRow","elementClass":$classRow + $classInputField},
		{"elementParent":"parentElement","id":"contentInner","elementClass":$class.Container + $class.ImgRnd},
		{"elementParent":"contentInner","id":"pageNameTitle","innerText":"Gilgamech.js","elementClass":$classContentRow,"attributeType":"contenteditable","attributeAction":"true"},
		{"elementParent":"contentInner","id":"pageNameTextArea","innerText":"Code goes here.","elementClass":"div_textarea" + $class.ImgRnd + $classInputField,"elementType":"textarea","elementStyle":$style.WhiteBack + "height: 50vh;","attributeType":"contenteditable","attributeAction":"true"},	
		{"elementParent":"contentInner","id":"pageNameRow","elementClass":$classRow + $classInputField}
	],
	"rows" : [
		{"elementParent": "contentRow","firstName":"Copy to Clipboard","firstOnclick":"copyToClipboard('contentTextArea'},","secondName":"Load from Github","secondOnclick":"updateNewPageForm('pageNameTitle','contentTextArea','pageNameTextArea'},","thirdName":"Add New Page","thirdOnclick":"updateNewPageBoilerplate(},"},
		
		{"elementParent": "pageNameRow","firstName":"Pretty Print","firstOnclick":"prettyPrint('pageNameTextArea'},","secondName":"Colorify!","secondOnclick":"colorifyDivTextArea('pageNameTextArea'},","thirdName":"Copy to Clipboard","thirdOnclick":"copyToClipboard('pageNameTextArea'},"}
	]
}

var $coinPageVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText":"How do you implement a fixed left sidebar and fluid right content in CSS","href":"https://stackoverflow.com/questions/3393025/how-do-you-implement-a-fixed-left-sidebar-and-fluid-right-content-in-css#3393037"},
		{"elementParent": "NavDDWrapper","innerText":"updateMePlease","href":"https://www.w3schools.com/Bootstrap/bootstrap_forms_inputs.asp"},	
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap","href":"https://getbootstrap.com/docs/3.3/css/"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap Buttons","href":"https://v4-alpha.getbootstrap.com/components/buttons/"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap Navbar","href":"https://www.w3schools.com/bootstrap/bootstrap_navbar.asp"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap Number Validation","href":"https://stackoverflow.com/questions/16517718/bootstrap-number-validation"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap rounded corners","href":"https://stackoverflow.com/questions/12084121/correct-way-to-create-rounded-corners-in-twitter-bootstrap"},
		{"elementParent": "NavDDWrapper","innerText":"Number Input Type","href":"https://stackoverflow.com/questions/3368546/what-input-field-type-forces-the-number-pad-mobile-keyboard-to-come-up-when-focu"},
		{"elementParent": "NavDDWrapper","innerText":"Radio Input Type","href":"https://html.com/input-type-radio/"},
		{"elementParent": "NavDDWrapper","innerText":"Bootstrap Grid","href":"http://kimbryant.net/on-bootstraps-grid-using-display-inline-block-instead-of-floats/"},
		{"elementParent": "NavDDWrapper","innerText":"Document Onload not cooperating","href":"https://bytes.com/topic/javascript/answers/441839-document-onload-getelementbyid-dont-cooperate"},
		{"elementParent": "NavDDWrapper","innerText":"Set radio button status with Javascript","href":"https://stackoverflow.com/questions/9476617/how-to-set-radio-button-status-with-javascript"},
		{"elementParent": "NavDDWrapper","innerText":"Change onclick action with Javascript","href":"https://stackoverflow.com/questions/5303899/change-onclick-action-with-a-javascript-function"},
		{"elementParent": "NavDDWrapper","innerText":"Dynamically adding or removing a Div","href":"https://stackoverflow.com/questions/4967289/dynamically-adding-removing-a-div-to-html"},
		{"elementParent": "NavDDWrapper","innerText":"Dropdown menus","href":"https://stackoverflow.com/questions/18030132/html-css-dropdown-menu-overflow"},
		{"elementParent": "NavDDWrapper","innerText":"Search for 'appendChild.body'","href":"https://duckduckgo.com/?q=document+appendchild+body&atb=v49-6&ia=qa"},
		{"elementParent": "NavDDWrapper","innerText":"HTML5 Combobox","href":"http://www.scriptol.com/html5/combobox.php"},
		{"elementParent": "NavDDWrapper","innerText":"Form widget editable select","href":"http://www.dhtmlgoodies.com/scripts/form_widget_editable_select/form_widget_editable_select.html"}
	],
	"elements" : [
		{"elementParent":"parentElement","elementClass":$classRow},
		{"elementParent":"parentElement","elementClass":"sidebar col-md-2 hidden-sm hidden-xs" + $class.ImgRnd + $classContentTitle,"elementStyle":"border:1px solid #333;","id":"sidebar"},
		{"elementParent":"sidebar","innerText":"Coinsole Log"},
		{"elementParent":"sidebar","innerText":"Data Loading...","elementClass":$class.ImgRnd,"elementStyle":"background-color:#fff;height:75vh;font-size: small;overflow-x: hidden;overflow-y:auto;"},
		{"elementParent":"parentElement"},
		{"elementParent":"parentElement","elementClass":$class.ImgRnd + " col-md-10 col-xs-10","id":"content"},
		{"elementParent":"content","elementClass":$classInputFieldPLUSRow,"elementStyle":$style.BlackTextWhiteBack,"id":"cointentArea"},
		{"elementParent":"content","elementClass":$class.ImgRnd,"elementStyle":$style.BlackTextWhiteBack,"id":"coinTentWrapper"},
		{"elementParent":"coinTentWrapper","elementClass":$classRow + $classContentTitle,"id":"titleRow"},
		{"elementParent":"titleRow","innerText":"Cointent","elementClass":"col-md-10 col-xs-10 " + $classContentTitle},
		{"elementParent":"coinTentWrapper","elementClass":$classInputFieldPLUSRow,"id":"cointentArea2"},
		{"elementParent":"cointentArea2","elementClass":$classRow + $classContentTitle,"elementStyle":$style.BlackTextWhiteBack},
		{"elementParent":"cointentArea2","innerText":"MyBotName","elementClass":"col-md-10 col-xs-10" + $classContentTitle + $class.ImgRnd,"elementStyle":$style.BlackTextWhiteBack,"attributeType":"contenteditable","attributeAction":"true"}
	],
	"rows" : [
		{"elementParent":"titleRow","firstName":"Refresh","firstOnclick":"refreshCharts();"},
		{"elementParent":"cointentArea2","firstName":"Add Bot","firstOnclick":'rbp("bodyWrapper",$addBotVar);'},
		{"elementParent":"content","firstName":"Coin","secondName":"Value","thirdName":"My Coins","fourthName":"MyBot","fifthName":"Fruitbot","sixthName":"SimpleBot"},
		{"elementParent":"content","firstName":"BTC","secondName":"0","thirdName":"0","fourthName":"0","fifthName":"0","sixthName":"0"},
		{"elementParent":"content","firstName":"LTC","secondName":"0","thirdName":"0","fourthName":"0","fifthName":"0","sixthName":"0"},
		{"elementParent":"content","firstName":"ETH","secondName":"0","thirdName":"0","fourthName":"0","fifthName":"0","sixthName":"0"},
		{"elementParent":"content","firstName":"FBC","secondName":"0","thirdName":"0","fourthName":"0","fifthName":"0","sixthName":"0"}
	],
	"timers" : [
		{"interval": "30000","callback":"refreshCharts();"}
	]
}

var $fruitBotVar = {
	"version" : "21JAN2018",
	"elements" : [
	{"elementParent": "headWrapper","elementType":"script","href":"/assets/js/seedrandom.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/assets/js/board.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/assets/js/grid.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/mybot.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/assets/js/simplebot.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/assets/js/player.js"},
	{"elementParent": "headWrapper","elementType":"script","href":"/js/jquery.min.js"},
	{"elementParent": "parentElement","elementClass":$classRow,"elementStyle":$style.WhiteTextBlackBack},
	{"elementParent": "parentElement","innerText":"Fruitbot","elementClass":$classContentRow},
	{"elementParent": "parentElement","elementClass":$classContentRow,"elementType":"canvas","elementStyle":"display: block;margin: 0px auto;border: 1px solid black;","id":"grid"},
	{"elementParent": "parentElement","elementClass":$classContentRow,"elementType":"canvas","elementStyle":"display: block;margin: 0px auto;border: 1px solid black;","id":"game_view"},
	{"elementParent": "parentElement","elementClass":$classRow + $classInputField,"id":"myBoardRow"},
	{"elementParent": "myBoardRow","innerText":"Board number","elementClass":$classRow + $classContentTitle},
	{"elementParent": "myBoardRow","innerText":"0","elementClass":$classInputField,"elementType":"input","attributeType":"type","attributeAction":"number"},
	{"elementParent": "parentElement","elementClass":$classRow + $class.ImgRnd + "col-md-4 col-xs-6","id":"myScoreRow"}
	],
	"rows" : [
		{"elementParent": "parentElement","firstName":"Set","firstOnclick":"firstOnclick","secondName":"new","secondOnclick":"secondOnclick","thirdName":"reset","thirdOnclick":"thirdOnclick","fourthName":"pause","fourthOnclick":"fourthOnclick","fifthName":"forward","fifthOnclick":"fifthOnclick","sixthName":"sixthName","sixthOnclick":"sixthOnclick"},		
		{"elementParent": "myScoreRow","firstName":"Wins","firstOnclick":"firstOnclick","secondName":"0","secondOnclick":"secondOnclick","thirdName":"Losses","thirdOnclick":"thirdOnclick","fourthName":"0","fourthOnclick":"fourthOnclick","fifthName":"Ties","fifthOnclick":"fifthOnclick","sixthName":"sixthName","sixthOnclick":"0"}
	]
}

var $rgbColorVar = {
	"version" : "21JAN2018",
	"menu" : [
		{"elementParent": "NavDDWrapper","innerText":"Search Convert to Hex","href":"https://duckduckgo.com/?q=javascript+convert+to+he&atb=v49-6&ia=qa"},
		{"elementParent": "NavDDWrapper","innerText":"RGB to HEX and HEX to RGB","href":"https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139"},
		{"elementParent": "NavDDWrapper","innerText":"Change Div color on keypress","href":"https://stackoverflow.com/questions/42521420/change-div-bgcolor-onkeypress"},
		{"elementParent": "NavDDWrapper","innerText":"Prop style background color","href":"https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp"},
		{"elementParent": "NavDDWrapper","innerText":"RGB coder","href":"https://www.easycalculation.com/colorconverter/rgb-coder.php"}
	],
	"elements" : [
		{"elementParent": "parentElement","elementClass":$classSpacer},
		{"elementParent": "parentElement","elementClass":$classHalfDesktopFullMobileRnd,"id":"content"},
		{"elementParent": "content","id":"coinArea"},
		{"elementParent": "coinArea","innerText":"RGB Calculator","elementClass":$classContentRow,"id":"contentLabel"},
		{"elementParent": "coinArea","elementClass":$classInputFieldPLUSColorRow,"elementType":"input","elementStyle":$style.BlackTextWhiteBack,"attributeType":"maxlength","attributeAction":"7","id":"htmlInput"},
		{"elementParent": "coinArea","innerText":171,"elementClass":$classInputFieldPLUSColorRow,"elementType":"input","attributeType":"type","attributeAction":"number","id":"redInput"},
		{"elementParent": "coinArea","innerText":205,"elementClass":$classInputFieldPLUSColorRow,"elementType":"input","attributeType":"type","attributeAction":"number","id":"greenInput"},
		{"elementParent": "coinArea","innerText":239,"elementClass":$classInputFieldPLUSColorRow,"elementType":"input","attributeType":"type","attributeAction":"number","id":"blueInput"},
	]
}

// page parts
var $testBlogVar = {
	"version" : "22JAN2018",
	"titleText" : "Hello World!",
	"headerText" : "This is a test blog",
	"bodyText" : "Testing out how this goes. Let me know what you think!"
};

var $minimalismBlogVar = {
	"version" : "22JAN2018",
	"titleText" : "Minimalism",
	"headerText" : "1 year rule.",
	"bodyText" : "If I don't use something once every 12 months (or so, I'm not exact), I get rid of it. Having so many objects cluttering the room is reminiscent of Victorian Era homes, which were cluttered with tables and chairs and curiosities. Stanley Kubrick in the 1970s flirted with the agoraphobia of large, empty living spaces - but so long as the space isn't completely empty, square footage is a luxury. \n\n"
};

var $addElementBlogVar = {
	"version" : "22JAN2018",
	"titleText" : "addElement explained",
	"headerText" : "addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$attributeType,$attributeAction,$elementId);",
	"bodyText" : "This can  be complex to look at, but will make sense as we work through it. You'll almost never use all of these parameters at the same time, but even being able to use a few of them will give you a powerful tool.\n\n $divID - The only mandatory one is the first one.\n\n $divClass- Specify CSS classes here.\n\n $divParent- Nest under parent div. Specify just 'head' or 'body' to attach directly to the document.\n\n $innerText- This will be the innerText if it's a Div, or if it's an IMG this will be the title, or if it's Input this will be the Value.\n\n $elementType- Specify element type. Default is Div, but can be anything from an A to Canvas to Link.\n\n $href- Specify HRef link if A type, HRef link and CSS type for Link type, or Source if IMG or Script type.\n\n $attributeType- Set a custom attribute, like 'onclick' or 'placeholder' or 'contenteditable'.\n\n $attributeAction- Set the value for the above attribute type. Leave blank for attributes with no value, such as 'contenteditable'.\n\n \n\n Other key parts of this framework are removeElement, wrapperHead, wrapperBody, and wrapperFoot. These divs are unloaded and rebuilt on each page change.\n\n \n\n Call other Javascript scripts, CSS files, and other Head-based items in wrapperHead.\n\n Nest all of your page within wrapperBody.\n\n Add any extra footer elements to wrapperFoot.\n\n \n\n"
};

var $botRowVar = {
	"rows" : [
		{"elementParent": "parentElement","firstName":"Coin","secondName":"0","thirdName":"Buy","thirdOnclick":"thirdOnclick","fourthName":"Sell","fourthOnclick":"fourthOnclick","fifthName":"0","sixthName":"Del","sixthOnclick":"removeElement('parentElement');"}
	]
}

var $chatPageVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","id":"contentOuter","elementClass":$classHalfDesktopFullMobileRnd},
		{"elementParent": "contentOuter","innerText":"Room:","elementClass":$classContentRow},
		{"elementParent": "contentOuter","id":"chatWrapper","elementClass":$classColorRow2x},
		{"elementParent": "chatWrapper","id":"chatRoom","innerText":"General","elementClass":$classInputFieldPLUSColorRow,"elementType":"input","elementStyle":$style.BlackText},
		{"elementParent": "contentOuter","id":"contentInner","elementClass":$classColorRow2x},
		{"elementParent": "contentInner","id":"chatBox","innerText":"Chat loading...","elementClass":$classInputFieldPLUSColorRow,"elementType":"textarea","elementStyle":$style.BlackText},
		{"elementParent": "contentOuter","id":"nameRow","elementClass":$classColorRow2x},
		{"elementParent": "nameRow","elementClass":$classInputFieldPLUSColorRow,"elementType":"input","elementStyle":"background-color: #338","attributeType":"placeholder","attributeAction":"User Name"},
		{"elementParent": "contentInner","id":"chatMessage","elementClass":$classColorRow2x},
		{"elementParent": "contentInner","innerText":"Hello World!",$classInputFieldPLUSColorRow,"elementType":"input","elementStyle":"background-color: #383","attributeType":"onkeypress","attributeAction":"detectEnter(event,updateChat(},"}
	]
}

var $badPwVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classSpacer},
		{"elementParent": "parentElement","elementClass": $classHalfDesktopFullMobileRnd,"id":"contentOuter"},
		{"elementParent": "contentOuter","innerText": "Bad Password","elementClass": $classContentRow},
		{"elementParent": "contentOuter","innerText": "Entropy not guaranteed","elementType": "input","id": "textField","elementClass": $classInputField},
	],
	"rows" : [
		{"elementParent": "contentOuter","firstName":"Get Bad Password","firstOnclick":"writeElement('textField',getBadPW());","secondName":"Copy to Clipboard","secondOnclick":"copyToClipboard('textField');"}
	]
}

var $addBotRowVar = {
	"rows" : [
		{"elementParent": "parentElement","firstName":"Add Asset","firstOnclick":"cje('coinAreaID','assetLabelID');","secondName":"Del Bot","secondOnclick":"removeElement('coinAreaID');"}
	]
}

var $addBotVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent":"parentElement","elementClass":$classInputFieldPLUSRow,"elementStyle":$style.BlackTextWhiteBack,"id":"coinAreaID"},
		{"elementParent":"coinAreaID","elementClass":$classContentRow,"id":"titleRowID"},
		{"elementParent":"titleRowID","elementClass":$class.HalfWidth,"id":"contentLabelID"},
		{"elementParent":"titleRowID","elementType":'datalist',"id":"dropdownListName"},
		{"elementParent":"dropdownListName","innerText":"Coin","elementType":'option'},
		{"elementParent":"dropdownListName","innerText":"firefox","elementType":'option'},
		{"elementParent":"titleRowID","innerText":"Coin","elementClass":$classThirdWidthRnd,"elementType":'input',"elementStyle":$style.BlackTextWhiteBack,"attributeType":"list","attributeAction":"dropdownListName","id":"assetLabelID"},
		{"elementParent":"coinAreaID","id":"spacerName"},
		{"elementParent":"spacerName","elementType":'br'},
		{"elementParent":"spacerName","elementType":'br'}
	]
}

// Functions
// Init
function initPage($initUrl){
	if ($initUrl.length > 6) {
	postJSON($initUrl, function(response) {
		$GilMain = response
	}); // end loadJSON
	}; // end if initUrl
};// end initPage

// General
//createJsonElement - shortened to CJE.
function loadFile(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          };
    };
    xobj.send(null);  
};// end loadJSON

function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          };
    };
    xobj.send(null);  
};// end loadJSON

function postJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("text/plain");
    xobj.open('POST', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);  
};// end loadJSON

function postFile(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("text/plain");
    xobj.open('POST', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
};// end loadJSON

function getBadPW() {	  
	return Math.random().toString(36).slice(-20);
 }

function copyToClipboard(text) {
    Copied = text.createRange();
    Copied.execCommand("Copy");
}; // end copyToClipboard

function colorifyDiv(divName, replaceWord, replaceColor) {
  var replacere = new RegExp(replaceWord, "g");
  var str = document.getElementById(divName).innerHTML,
  str = str.replace(replacere, '<span style="color:' + replaceColor + ';">' + replaceWord + '</span>');
  // Clean up repeats and duplicates.
  str = str.replace('<span style="color:<span style="color:', '<span style="color:');
  str = str.replace('</span></span>','</span>');
  document.getElementById(divName).innerHTML = str;
}; // end colorifyDiv

function prettyPrint($divName) {
	try {
		var ugly = document.getElementById($divName).value;
		var obj = JSON.parse(ugly);
		var pretty = JSON.stringify(obj);
		document.getElementById($divName).innerText = pretty;
		document.getElementById("errDiv").innerText = "";	
	} catch($err) {
		document.getElementById("errDiv").innerText = $err;
	};
}

function getNumberFromDiv($numericDiv) {
	return Math.round(
		document.getElementById($numericDiv).innerText  *1
	)
};

function writeElement($elementId,$source) {	  
	var $elementType = document.getElementById($elementId).type;
	
	if ($elementType == 'text') {
		document.getElementById($elementId).value = $source;
	} else if ($elementType == 'Imageundefined') {
		document.getElementById($elementId).src = $source;
	} else {
		document.getElementById($elementId).innerText = $source;
	}; // end if divParent
}; // end getBadPW

function readElement($elementId) {	  
	var $elementType = document.getElementById($elementId).type;
	
	if (($elementType == 'text') || ($elementType == 'textarea')) {
		return document.getElementById($elementId).value;
	} else {
		return document.getElementById($elementId).innerText;
	}; // end if divParent
}; // end getBadPW

function appendElement($inputString,$elementId) {
	document.getElementById($elementId).value += $inputString
}

// Chat
function updateChat() {
	
	var $chatUser = document.getElementById("chatUser").value
	var $chatMessage = document.getElementById("chatMessage").value
	var $chatRoom = document.getElementById("chatRoom").value
	  if ($chatMessage) {
		if ($chatUser) {
			$chatUrl = "/chatpost?user=" + $chatUser + "&message=" + $chatMessage + "&chatroom=" + $chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById($chatBox).value = response
  }); // end loadJSON
			  document.getElementById("chatMessage").value = ""
			  document.getElementById("errDiv").innerText = ""
		} else {
			document.getElementById("errDiv").innerText = "Enter a user name. Then do a barrel roll."
		}; //end if chatUser
	}; //end if chatMessage
}; // end update

function refreshChat(chatRoom){
  var chatUrl = "/chatload?chatroom=" + chatRoom
  loadJSON(chatUrl, function(response) {
    document.getElementById($chatBox).value = response
  }); // end loadJSON
}; // end refresh

// DSQ
function addShape(x, y, s, r, fill,$shapeName) {
	var shape = new createjs.Shape();
  
	if ($shapeName == 'circle') {
		shape.graphics.beginFill(fill).drawCircle(0, 0, r);
		shape.x = x;
		shape.y = y;
	} else if ($shapeName == 'square') {
		shape.graphics.beginFill(fill).drawRoundRect(0, 0, s, s, r);
		shape.x = x - s/2;
		shape.y = y - s/2;
	} else if ($shapeName == 'star') {
		shape.graphics.beginFill(fill).drawPolyStar(0, 0, r, 5, 0.6, -90);
		shape.x = x;
		shape.y = y;
	} else {
		shape.graphics.beginFill(fill).drawRoundRect(0, 0, s, s, r);
		shape.x = x - s/2;
		shape.y = y - s/2;
	}; // end if divParent

  shape.name = $shapeName;
  shape.on("pressmove",drag);
  $stage.addChild(shape);
  $stage.update();
}

function drag(evt) {
  // target will be the container that the event listener was added to
  if(evt.target.name == "square") {
    evt.target.x = evt.stageX - SIZE;
    evt.target.y = evt.stageY - SIZE;
  }
  else  {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
  }

  // make sure to redraw the stage to show the change
  $stage.update();   
}

// Git
function updateTextAreaFromRepo(FileNameElement,RepoUrlElement,TextAreaElement) {
  // If textbox not empty, push contents to cookie, otherwise push from cookie to textbox. Always push to name field.
  FileName = document.getElementById(FileNameElement).innerText
  if (FileName) {
    document.getElementById(FileNameElement).innerText = FileName
  } else {
	  FileName = "README.md"
      document.getElementById(FileNameElement).innerText = FileName
  }; //end if FileName
  
  // Load file from repo into gitFileTextArea.
  RepoUrl = document.getElementById(RepoUrlElement).value + "/" + FileName
  loadFile(RepoUrl, function(response) {
    document.getElementById(TextAreaElement).innerText = response
  }); // end loadJSON
  
}; // end updateTextAreaFromRepo

function updateNewPageBoilerplate() {  
  boilerplateIndexTextArea("myTextArea","pageName","//region WIP");
  boilerplateTestTextArea("myTextArea","pageName","  t.plan(42);\r\n");
}; // end updateNewPageBoilerplate

function updateNewPageForm($pageName,$RepoUrlElement,$nestArea) {
  updateTextAreaFromRepo($pageName,$RepoUrlElement,$nestArea);  
  colorifyDivTextArea($nestArea);
}; // end updateNewPageForm

function boilerplateIndexTextArea(docTextArea,docNewName,splitMarker) {  
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = 'request("http://127.0.0.1:5000/fruitbot", (error, response, body) => {' + lineBreak + 't.false(error); // test 5' + lineBreak + 't.equal(response.statusCode, 200); // test 6' + lineBreak + 't.notEqual(body.indexOf("<title>Gilgamech Technologies</title>"), -1); // test 7' + lineBreak + 't.notEqual(body.indexOf("Gilgamech Technologies"), -1); // test 8' + lineBreak + '}); //end request';
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateIndexTextArea

function boilerplateTestTextArea(docTextArea,docNewName,splitMarker) {  
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for test.js
  docUpdateTextString = splitMarker + lineBreak + "app.get('/" + docNewPageName + "'," + spaceChar + "function(request, response)" + spaceChar + "{" + spaceChar + lineBreak + spaceChar + spaceChar + "response.render('pages/" + docNewPageName + "');" + spaceChar + lineBreak + "});" + spaceChar + spaceChar + lineBreak;
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateTestTextArea

function colorifyDivTextArea(DivTextArea) {  
  var words = ["function","var","this","new","if","then","true","false","const"];
  var superGreen = "green";
  for (word of words) {
    colorifyDiv(DivTextArea, word, superGreen);
  };
}; // end colorifyDivTextArea

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("gitFileTextArea").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function setupLink($nestAreaID,$downloadLinkID) {
  document.getElementById($nestAreaID).value = window.onload + '';
  document.getElementById($downloadLinkID).onclick = function() {
	this.href = 'data:text/plain;charset=utf-8,'
	  + encodeURIComponent(txtval);
  };
};

function updateForm(nfsCall, nfsName, nfsTextArea) {
  nfsInput = document.getElementById(nfsName).value
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsInput
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

function updateNFSForm(nfsCall, nfsName, nfsTextArea, nfsParams, nfsType) {
  nfsurl = "https://gil-api.herokuapp.com/" + nfsCall + "?name=" + nfsName + "&params=" + nfsParams + "&type=" + nfsType
  loadJSON(nfsurl, function(response) {
    document.getElementById(nfsTextArea).value = response //actual_JSON
  }); // end loadJSON
}; // end updateForm

// RGB
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};// end componentToHex

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};// end rgbToHex

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};// end hexToRgb

function updateRgbColor() { 
	$hex = hexToRgb(document.getElementById("htmlRow").value);
	document.getElementById("redRow").value = $hex.r
	document.getElementById("greenRow").value = $hex.g
	document.getElementById("blueRow").value = $hex.b
	
	document.getElementById("contentLabel").style.backgroundColor  
	= document.getElementById("htmlRow").value
}; // end updateRgbColor

function updateRgbDivColor($divId) { 
	var $colorRatio = .25;
	var $Color = (document.getElementById($divId).value * 1);
	if ($Color > 255) {
		document.getElementById($divId).value = 255
		$Color = (document.getElementById($divId).value * 1);
	}; // end if Color
	$Color2 = Math.round(($Color) * $colorRatio)
	
	switch ($divId) {
		case "redInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "greenInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "blueInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

    document.getElementById("htmlInput").value = rgbToHex(
		(document.getElementById("redInput").value * 1), 
		(document.getElementById("greenInput").value * 1),
		(document.getElementById("blueInput").value * 1),
	);
	
	document.getElementById("contentLabel").style.backgroundColor = document.getElementById("htmlInput").value

}; // end updateRedDivColor

function addImpactWithBorder(fromInputBox,pixelsFromLeft,pixelsFromTop) {
	ctx.font="100px Impact";
    ctx.lineWidth = 4;  //define the width of the stroke line
    ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	
	ctx.fillText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
    ctx.strokeText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
};

function addRgbColorPage($parentElement) {	
	document.getElementById("htmlInput").setAttribute("onchange","updateRgbColor();");
	document.getElementById("redInput").setAttribute("onchange","updateRgbDivColor('redInput');");
	document.getElementById("greenInput").setAttribute("onchange","updateRgbDivColor('greenInput');");
	document.getElementById("blueInput").setAttribute("onchange","updateRgbDivColor('blueInput');");
	updateRgbDivColor("redInput");
	updateRgbDivColor("greenInput");
	updateRgbDivColor("blueInput");
}; // end addPage


// NFS
function getNFS($functionType,$spaceChar,$OpenParens,$functionName,$CloseParens,$spaceChar,$OpenCurlBracket,$LineBreak,$functionParams,$SemiColon,$LineBreak,$CloseCurlBracket,$SemiColon,$spaceChar,$EndComment,$spaceChar,$functionType,$spaceChar,$functionName) {
	var $outPut = $functionType + $spaceChar + $OpenParens + $functionName + $CloseParens + $spaceChar + $OpenCurlBracket + $LineBreak + $functionParams + $SemiColon + $LineBreak + $CloseCurlBracket + $SemiColon + $spaceChar + $EndComment + $spaceChar + $functionType + $spaceChar + $functionName;
	
	return $outPut;
}; // end getNFS

function getNFS2($functionName,$functionParams) {
	var $outPut = "function " + $functionName + "(" + $functionParams + ") { \r\n  response.json(" + $functionParams + "); \r\n}; ";
	
	return $outPut;
}; // end getNFS2

function getNFS3($newAppName) {
	var $outPut = "index.js \r\napp.get('/" + $newAppName + "', function(request, response) { \r\n  response.render(testUA(request.header('user-agent')) + '/" + $newAppName + "'); \r\n});  \r\n\r\ntest.js \r\nrequest('http://127.0.0.1:5000/" + $newAppName + "', (error, response, body) => { \r\n  t.false(error); \r\n  t.equal(response.statusCode, 200);  \r\n  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  \r\n  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  \r\n});";
	
	return $outPut;
}; // end getNFS3

// Coin
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
	$coin2 += $eth.base + " |" + $eth.amount  + " | " + (Math.round(($eth.amount - $ethOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $ltc.base + " |" + $ltc.amount  + " | " + (Math.round(($ltc.amount - $ltcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $fbc.base + " |" + $fbc.amount  + " | " + (Math.round(($fbc.amount - $fbcOld)*100)/100) + lineBreak;
  }catch(e){console.log(e)};
  try {
	$coin2 += $btc.base + " |" + $btc.amount  + " | " + (Math.round(($btc.amount - $btcOld)*100)/100)+ lineBreak;
  }catch(e){console.log(e)};
  try {
    document.getElementById($outputTextBox).innerText  = $coin2 + document.getElementById($outputTextBox).innerText
  }catch(e){console.log(e)};
}; // end updateCoinsole

function updateCointent () {
  try {
    document.getElementById('btcAmount').value = $btc.amount
    document.getElementById('ltcAmount').value = $ltc.amount
    document.getElementById('ethAmount').value = $eth.amount
    document.getElementById('fbcAmount').value = $fbc.amount
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
			document.getElementById("fbcBotAmount").innerText = Math.round((getNumberFromDiv("simplebotfbcBotAmount") + $fbc.amount - $botFee)*100)/100
			document.getElementById("fbcBotAction").value = "SELL"
			}); //end loadJSON
		} else {
			if ($coinAmount + $tradeFee > $coinMedian && $coinAmount < $oldCoin) {
				$action = "SELL";
				$coinMedian--;
				$coinAmount -= ($coinAmount - $tradeFee);
				loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
				$fbc = $response.data;
				document.getElementById("fbcBotAmount").innerText = Math.round((getNumberFromDiv("simplebotfbcBotAmount") - $fbc.amount - $botFee)*100)/100
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
    $expr = Math.round(Math.random() * 3);
switch ($expr) {
 case 1:
  $action = "BUY"
  $coinAmount += ($coinAmount - $tradeFee)
  try {
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data;
	document.getElementById("simplebotfbcBotAmount").innerText = (Math.round(((document.getElementById("simplebotfbcBotAmount").innerText *1) + $fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "SELL"
  });
	}catch(e){console.log(e)}; // end try 
 break;
 case 2:
  $action = "SELL"
  $coinAmount -= ($coinAmount - $tradeFee);
  try {
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data;
	document.getElementById("simplebotfbcBotAmount").innerText = (Math.round(((document.getElementById("simplebotfbcBotAmount").innerText *1) - $fbc.amount - $botFee)*100)/100)
	document.getElementById("simplebotfbcBotAction").innerText = "BUY";
  });
	}catch(e){console.log(e)}; // end try 
 break;
 default:
 $action = "HOLD"
}
  try {
  document.getElementById($botAmountDiv).innerText = $coinAmount
  document.getElementById($botActionDiv).innerText = $action
    //$coinOld = $coin.amount

	}catch(e){console.log(e)}; // end try 
}; // end simplebotChooses

function setMyBot() {
	$botName = document.getElementById("myBotLabel").innerText; 
	$buyVal = "11000"; // document.getElementById("myBotBuy").value; 
	$buyDir =  "below"; //document.getElementById("radioBuyAbove").checked;
	$sellVal = "12000"; //document.getElementById("myBotSell").value;
	$sellDir = "above"; //document.getElementById("radioSellAbove").checked; 
	$botOutput = {"botName":$botName,"buyVal":$buyVal,"buyDir":$buyDir,"sellVal":$sellVal,"sellDir":$sellDir};	
	document.getElementById("jsonArea").innerText = JSON.stringify($botOutput);
}; // end simplebotChooses

function getMyBot() {
	$botInput = JSON.parse(document.getElementById("jsonArea").innerText);
	document.getElementById("myBotLabel").innerText = $botInput.botName; 
	document.getElementById("myBotBuy").value = $botInput.buyVal; 
	document.getElementById("radioBuyAbove").checked = $botInput.buyDir; 
	document.getElementById("myBotSell").value = $botInput.sellVal; 
	document.getElementById("radioSellBelow").checked = $botInput.sellDir; 
}; // end simplebotChooses

function manualTransaction($coin,$direction,$divToUpdate) {
switch ($direction) {
 case "BUY":
  document.getElementById($divToUpdate).innerText = Math.round((((document.getElementById("btcMedian").innerText * 1) + $coin.amount - $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinsell", function($response) { 
    $fbc = $response.data
	document.getElementById("simplebotfbcBotAmount").innerText = Math.round((document.getElementById("btcMedian").innerText * 1) - (($coin.amount - $botFee)*100)/100);
	document.getElementById("fbcMedian").innerText = "SELL"
  });
 break;
 case "SELL":
  document.getElementById($divToUpdate).innerText = Math.round((((document.getElementById("btcMedian").innerText * 1) -  + $botFee)*100)/100);
  loadJSON("https://gil-api.herokuapp.com/fakecoinbuy", function($response) { 
    $fbc = $response.data
    Math.round((document.getElementById("simplebotfbcBotAmount").innerText * 1) - (($coin.amount - $botFee)*100)/100);
	document.getElementById("fbcMedian").innerText = "BUY";
  });
 break;
 default:
 $action = "HOLD"
}

}; // end simplebotChooses

function refreshCharts() {
  try {
    if (document.getElementById("btcMedian").innerText == "NaN") {document.getElementById("btcMedian").innerText = 0}	loadCoinData();
	updateCoinsole($coinMainBox);
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
}; // end refreshCharts

// Html
function parseHtml($inputId,$outputId) {
	var $inputToEval = document.getElementById($inputId).innerHTML;
	var $jsonOutput = $inputToEval.replace("<","").replace(">","");
	writeElement($outputId,$jsonOutput);
}; // end parseHtml

// Canvas
function buildCanvas($canvasId) {
	canvas = document.getElementById($canvasId);
	ctx = canvas.getContext("2d");

	var $halfWidth = canvas.width/2;
	var $halfHeight = canvas.height/2;	
	canvas.height = (window.innerHeight * 0.75);
	canvas.width = (window.innerWidth * 0.75);
	// load background
	bgImage = new Image();
	bgImage.onload = function () {
		var ImageRatio = bgImage.width / bgImage.height;
		canvas.width = canvas.height * ImageRatio;
		ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, // source rectangle
		0, 0, canvas.width, (canvas.width * ImageRatio)); // destination rectangle
	};
}; // end buildCanvas
	
// DSQ
function buildDsqPage($canvasId) {
	buildCanvas($canvasId);
	$stage = new createjs.Stage($canvasId);
	
	addShape(canvas.width/2 + (SIZE * 2.5), canvas.height/2, SIZE * 2, 5, "#f33",'square');
	addShape(canvas.width/2, canvas.height/2 + 100, SIZE * 2, 5, "#3f3",'square');
	addShape(canvas.width/2, canvas.height/2, SIZE * 2, 5, "#33f",'square');
	
	$stage.update();
}; // end buildDsqPage
		
// Meme
function buildMemePage($canvasId,$topTextInputId,$bottomTextInputId,$urlInputId,$bgImageId) {
	buildCanvas($canvasId);
	addImpactWithBorder($topTextInputId,10,100);
	addImpactWithBorder($bottomTextInputId,10,(ctx.canvas.height - 20));
	updateMemeForm($urlInputId,$bgImageId);
}; // end buildMemePage

function updateMemeForm($urlInputId,$bgImageId) {
	document.getElementById($bgImageId).src = document.getElementById($urlInputId).value;
}; // end updateMemeForm

// Calculator
function evalCalc($elementId) {
	var $inputToEval = document.getElementById($elementId).value
	document.getElementById($elementId).value = eval($inputToEval)
}

// DiffeRentIal
function initMap() {
	$GilMain.googleApiKey = $GilMain.googleApiKey
	var uluru = {lat: 47, lng: -122};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}; // end initMap

// Pages
// Page Construction
function toggleElement($divId) {
	if (document.getElementById($divId).style.visibility == "visible") {
		document.getElementById($divId).style.visibility="hidden";
	} else { 
		document.getElementById($divId).style.visibility="visible";
	} // end if
}; // end toggleElement

function removeElement($divID) {
	var $div = document.getElementById($divID);
	if ($div) {
		$div.parentNode.removeChild($div);
	}	
}; // end removeBot

function addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$attributeType,$attributeAction,$elementId) {
	if (!$elementType) {
		$elementType = 'div'
	}; // end if elementType	
	var $newElement = document.createElement($elementType);

	if (!$elementId) {
		$elementId = getBadPW();
	}; // end if divParent
	$newElement.id = $elementId;

	if ($elementStyle) {
		$newElement.style = $elementStyle
	}; // end if onClick
	
	if ($elementClass) {
		$newElement.className = $elementClass
	}; // end if onClick
	
	if ($elementType == 'input' && $innerText) {
		$newElement.value = $innerText
	} else if ($elementType == 'img' && $innerText) {
		$newElement.title = $innerText
	} else if ($innerText) {
		$newElement.innerText = $innerText
	}; // end if elementType	
	
	if ($elementParent == 'body') {
		document.body.appendChild($newElement);
	} else if ($elementParent == 'head') {
		document.head.appendChild($newElement);
	} else {
		document.getElementById($elementParent).appendChild($newElement);
	}; // end if divParent
	
	if ($elementType == 'a' && $href) {
		$newElement.href = $href
	} else if ($elementType == 'img' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'script' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'link' && $href) {
		$newElement.href = $href
		$newElement.rel = "stylesheet"
		$newElement.type="text/css"
	}; // end if elementType	
	
	if ($attributeType && $attributeAction) {
		
			document.getElementById($elementId).setAttribute($attributeType, $attributeAction);
	}; // end if onClick	
	return $elementId
}; // end addElement	

function addMenuItem($elementParent,$innerText,$onclick,$class,$href) {
	var $innerParent = getBadPW();
	var $parentType = getElementType($elementParent);
	var $elementType = "li"
	
	if ($elementParent == 'Div') {
		$elementType = "p"
	} else if ($elementParent == 'UList') {
		$elementType = "li"
	} else {
		$elementType = "li"
	}; // end if divParent
	
	var $innerParent = addElement($elementParent,"",$class,$elementType)
	addElement($innerParent,$innerText,$class,"a","",$href,"onclick",$onclick)
}; // end addMenuItem	

function getElementType($elementId) {
	return document.getElementById($elementId).toString().replace("[object HTML","").replace("Element]");
}; // end getElementType	

function detectEnter($keypress,callback){
    if($keypress.keyCode === 13){
        $keypress.preventDefault(); // Ensure it is only this code that runs
		$outputCallback = function () {
            callback();
		};
    };
}; // end detectEnter

function updateFormPost($elementId,$postJsonUrl) {
	postFile($postJsonUrl, function(response) {
		document.getElementById($elementId).value  = response
	}); // end loadJSON
}; // end updateFormPost

function addRow($parentElement,$firstName,$firstOnclick,$secondName,$secondOnclick,$thirdName,$thirdOnclick,$fourthName,$fourthOnclick,$fifthName,$fifthOnclick,$sixthName,$sixthOnclick) {
	var $rowName = addElement($parentElement,"",$classContainerRow + $classInputField);	
	
	buildRow($rowName,$firstName,$firstOnclick);
	buildRow($rowName,$secondName,$secondOnclick);
	buildRow($rowName,$thirdName,$thirdOnclick);
	buildRow($rowName,$fourthName,$fourthOnclick);
	buildRow($rowName,$fifthName,$fifthOnclick);
	buildRow($rowName,$sixthName,$sixthOnclick);
	return $rowName
}; // end addRow

function buildRow($rowName,$nameItem,$onclickItem) {
	var $elementId
	if ($nameItem) {
		if ($onclickItem) {
			$elementId = addElement($rowName,$nameItem,$btn.primary,"button","","","onclick",$onclickItem);
		} else {
			$elementId = addElement($rowName,$nameItem,$classNarrowContent);
		}; // end if firstButtonName
	}; // end if firstButtonName
	return $elementId
}; // end addRow

// Page parts
function abp($parentElement,$blogVar) {
var $blogPageVar = {
	"version" : "21JAN2018",
	"elements" : [
		{"elementParent": "parentElement","elementClass": $classSpacer},
		{"elementParent": "parentElement","elementClass": $classHalfDesktopFullMobileRnd,"id":"contentOuter"},
		{"elementParent": "contentOuter","elementClass": $classContentRow,"innerText":$blogVar.titleText},
		{"elementParent": "contentOuter","id":"contentInner"},
		{"elementParent": "contentInner","elementClass": $classInputField,"elementType": "p","innerText":$blogVar.headerText,"elementStyle":$style.BlackText},
		{"elementParent": "contentInner","elementClass": "bp","elementType": "p","innerText":$blogVar.bodyText,"elementStyle":$style.BlackText}
	]
}
rbp("bodyWrapper",$blogPageVar)
}; // end abp

function afp($formPost,$elementParent) {
// 
	var $wrapper = addElement($elementParent,$formPost,$classContentRow,"","","method","post");	
	addElement($wrapper,"",$classInputField,"input","","","placeholder","Email","emailInput");
	addElement($wrapper,"",$classInputField,"input","","","placeholder","Password","passwordInput");

	var $btnRow = addElement($wrapper,"",$classRow + $classInputField);
	addElement($btnRow,"Submit",$btn.success,"button");
		
}; // end addPage

function rbp($parentElement,$jsonVar) {

try {
	removeElement("headWrapper");
	removeElement("NavDDWrapper");
	removeElement("bodyWrapper");
	removeElement("footWrapper");
	window.clearInterval(timerInterval);
	
	cje("bodyWrapper",$wrapperVar);
	
	cje("footWrapper",$footerVar);
	cje("bodyWrapper",$pageMenuVar)
	cje($parentElement,$jsonVar);
	
	if ($GilMain.GilJSVersion > $GilMain.GilJSVersion) {
		document.getElementById("errDiv").innerText = "Version " + $GilMain.GilJSVersion + " of Gilgamech.js is available. Refresh the page to update.";
	}; // end if GilJSVersion
	
} catch(e){console.log(e)};
}; // end rbp

function cje($parentElement,$jsonVar) {
	if	($jsonVar) {
		
	$jsonVar = JSON.stringify($jsonVar);
	$jsonVar = $jsonVar.replace(/parentElement/g,$parentElement);
	$jsonVar = JSON.parse($jsonVar);
	
	try {
	if	($jsonVar.elements) {
		$jsonVar.elements.forEach(function($element){
			addElement($element.elementParent,$element.innerText,$element.elementClass,$element.elementType,$element.elementStyle,$element.href,$element.attributeType,$element.attributeAction,$element.id);
		}); // end foreach jsonVar
	}; // end if jsonVar.elements
	} catch(e) { 
		console.log(e);
		}; // end try

	try {
	if	($jsonVar.menu) {
		$jsonVar.menu.forEach(function($element){
			addMenuItem($element.elementParent,$element.innerText,$element.onclick,$element.elementClass,$element.href);
		}); // end foreach jsonVar
	}; // end if jsonVar.menu
	} catch(e) { 
		console.log(e);
		}; // end try
				
	try {
	if	($jsonVar.rows) {
		$jsonVar.rows.forEach(function($element){
			addRow($element.elementParent,$element.firstName,$element.firstOnclick,$element.secondName,$element.secondOnclick,$element.thirdName,$element.thirdOnclick,$element.fourthName,$element.fourthOnclick,$element.fifthName,$element.fifthOnclick,$element.sixthName,$element.sixthOnclick);
		}); // end foreach jsonVar
	}; // end if rows
	} catch(e) { 
		console.log(e);
		}; // end try

		try {
	if	($jsonVar.timers) {
		$jsonVar.timers.forEach(function($element){
	timerInterval = setInterval($element.callback,$element.interval);
		}); // end foreach jsonVar
	}; // end if timers
	} catch(e) { 
		console.log(e);
		}; // end try
	}; // end if jsonVar
}; // end cje

window.onload = function(){
	cje("head",$headerVar);
	cje("body",$navBarVar);
	rbp("bodyWrapper",$rgbColorVar);addRgbColorPage("bodyWrapper");
	initPage($pageSettingsJson);
}; // end window.onload

