const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// If you like to place all the script blocks at the end, you can do it like this:
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Use Express Router
app.use('/', require('./routes'));

// setup view engine and views folder
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running Express server ERROR:${ err }`);
    }
    console.log(`Express server is running on port:${ port }`);

});