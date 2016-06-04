/******************************** GLOBAL VARIABLES ****************************************/

var bodyParser = require('body-parser'),
	training = require('./handlers/Training.js'),
	user = require('./handlers/User.js'),
	main = require('./handlers/main.js');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/************************************* ROUTES ********************************************/

module.exports = function(app){
	// Main routes
	app.get('/', main.cover);
	app.get('/login', main.login);
	app.get('/register', main.register);
	app.get('/home', main.home);
	app.get('/logout', main.logout);

	// User routes
	app.post('/login', urlencodedParser, user.login);
	app.post('/register', urlencodedParser, user.register);
	
	// Training routes
	app.get('/trainingSetupCriteria/:id', training.setUpCriteria);
	app.get('/trainingSetup/setProgramOptions/:programId/:criteriaId', training.setProgramOptions);
	app.get('/trainingSetup/setSpecificOptions/:questionId/:optionId', training.setSpecificOptions);
};