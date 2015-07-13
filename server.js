var express = require('express'),
    serveIndex = require('serve-index'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static('www'));
app.use(serveIndex('www'));

app.get('/woah', function(req, res){
    res.type('text/plain');
    res.send('woah');
});

app.listen(port);
console.log('server started at http://localhost:' + port);
