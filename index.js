var express = require('express');

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

/************************************* ROUTES ********************************************/
app.get('/', function(req, res){
    res.render('cover');
});

/*********************************** ERROR HANDLERS **************************************/
// custom 404 page
app.use(function(req, res){
	res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
    res.render('500');
});

/************************************** START APP ****************************************/
app.listen(app.get('port'), function(){
	console.log( 'Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
