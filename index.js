const express = require('express');
const port = 8000;



const app = express();

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running Express server ERROR:${ err }`);
    }
    console.log(`Express server is running on port:${ port }`);

});