var app = require('express')();
var port = parseInt(process.argv[2]);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
    res.sendFile(__dirname + '/app.js');
});

app.get('/lib/css/:id', function(req, res) {
    res.sendFile(__dirname + '/lib/css/' + req.params.id);
});

app.get('/lib/fonts/:id', function(req, res) {
    res.sendFile(__dirname + '/lib/fonts/' + req.params.id);
});

app.listen(port, function() {
    console.log('listening on *:' + port);
});
