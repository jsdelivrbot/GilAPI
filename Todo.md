0. Make mobile/desktop CSS not take separate pages.
- Merge Mobile and Web pages back into Pages. 
- Create call that sends Mobile vs Web CSS.
- Replace ElseIf with Switch.
- Determine how much of each partial and page I want to dynamically generate, based on UA, foreach, etc. (Compute vs Storage, consider building a page as an API response - if they don't append anything send full HTML, if outputquery = 'JSON' simply respond with JSON, etc)
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
- Database
- Passport
- Chat

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


- Add enter button detection.
- Make chat auto-refresh.

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