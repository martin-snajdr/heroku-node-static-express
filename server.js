// Reguire modules
//var newrelic = require('newrelic');
var express = require('express');
var compress = require('compression')();
var http_auth = require('express-http-auth');

// Create app
var app = express();

process.env.PWD = process.cwd()
app.set('port', (process.env.PORT || 3333))

// Require http auth
app.use(http_auth.realm('Protected Area'));
app.use(function (req, res, next) {
    if (req.username == 'john.doe' && req.password == 'topsecret123') {
        next();
    } else {
        res.sendStatus(403);
    }
});

// Compress and serve content
app.use(compress);

// Redirect root to phoenix
/*app.get('/', function(req, res, next) {
 res.redirect(302, '/index.html');
 });*/

// Serve static files as default
dirname = (__dirname == "/app") ? process.env.PWD : __dirname;
app.use(express.static(dirname + '/build'));

app.listen(app.get('port'), function () {
    console.log("Node app is running on port " + app.get('port'));
});