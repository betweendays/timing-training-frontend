var bodyParser = require('body-parser'),
	main = require('./handlers/main.js');

// create application/json parser 
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/************************************* ROUTES ********************************************/
module.exports = function(app){
	app.get('/', main.cover);
	app.get('/login', main.login);
	app.post('/login', urlencodedParser, main.processLoginPost);
	app.get('/register', main.register);
	app.post('/register', urlencodedParser, main.processRegisterPost);
	app.get('/home', main.home);
	app.get('/logout', main.logout);
	app.get('/trainingSetupCriteria/:id', main.trainingSetupCriteria);
};