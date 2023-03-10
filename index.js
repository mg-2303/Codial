const express = require('express')
const app = express()
const port = 8000;

// use express router  , both are working routes and index.js
app.use('/', require('./routes'));

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in Starting Server:${ err }`);
    }
    console.log(`Express Server is running on port:${ port }`);
});