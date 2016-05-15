var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars') .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set server port
app.set('port', process.env.PORT || 3000);


/************************************* ROUTES ********************************************/
app.get('/', function(req, res){ res.type('text/plain');
            res.send('Meadowlark Travel');
});
app.get('/about', function(req, res){
            res.type('text/plain');
            res.send('About Meadowlark Travel');
});

// custom 404 page
app.use(function(req, res){
	res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){ console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

/************************************* END ROUTES *****************************************/

// start app
app.listen(app.get('port'), function(){
	console.log( 'Started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
