var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());

app.use('/admin', express.static(__dirname + '/dist'));

var port = process.env.CUSTOM_PORT ? process.env.CUSTOM_PORT : 11001;

app.listen(port, function() {
    console.log('Example app listening on port ' + port + ' !');
});