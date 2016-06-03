/******************************** GLOBAL VARIABLES ****************************************/

var bodyParser = require('body-parser'),
	training = require('./handlers/TrainingSetUp.js'),
	main = require('./handlers/main.js');

var jsonParser = bodyParser.json();
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
	app.get('/trainingSetupCriteria/:id', training.setUpCriteria);
};