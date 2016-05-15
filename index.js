var express = require('express');
var bodyParser = require('body-parser');

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

// create application/json parser 
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/************************************* ROUTES ********************************************/
app.get('/', function(req, res){
    res.render('cover');
});

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', urlencodedParser, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  res.send('Welcome, ' + req.body.name);
});

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
app.listen(app.get('port'), function(){
	console.log( 'Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
