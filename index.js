var http = require('http'),
    express = require('express'),
    credentials = require('./credentials.js'),
    session = require('client-sessions');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars') .create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set server port
app.set('port', process.env.PORT || 3000);

// static directory
app.use(express.static(__dirname + '/public'));

// middleware for cookies and sessions
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

// add routes
require('./routes.js')(app);
/*********************************** ERROR HANDLERS **************************************/
// custom 404 page
app.use(function(req, res){
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
    console.log(err);
    var error = {
        msg: err,
        code: res.status
    };
    res.render('500', error);
});

/************************************** START APP ****************************************/
var server;

function startServer() {
    server = http.createServer(app).listen(app.get('port'), function(){
      console.log( 'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.' );
    });
}

if(require.main === module){
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
