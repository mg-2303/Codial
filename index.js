const express = require('express');
const port = 8000;
const app = express();


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