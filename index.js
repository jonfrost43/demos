var express = require('express'),
    app = express(),
    port = process.env.port || 3000;

app.get('/', function(req, res){
    res.type('text/plain');
    res.send('woah');
});

app.listen(port);
console.log('server started at http://localhost:' + port);
