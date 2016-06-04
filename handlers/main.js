/******************************** GLOBAL VARIABLES ****************************************/

var Session = require('./Session.js'),
	Training = require('./Training.js');

/*********************************** CONSTANTS *******************************************/

var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';
var PATH_TRAINING_SET_UP = '/trainingSetup/';
var PATH_GET_CRITERIA_OPTIONS = 'getCriteriaOptions';

/*********************************** PUBLIC METHODS **************************************/

var cover = function(req, res){
	res.render('cover');
};

var login = function(req, res){
	if (!Session.timeExpired(req)) {
		return res.redirect('/home');
	}
	res.render('login');
};

var register = function(req, res){
	res.render('register');
};

var logout = function(req, res) {
	Session.clearUserToken(req);
	res.redirect('/');
};

var home = function(req, res) {
	// TODO: retrieve user data from the backEnd. At the moment, is assumed that user has subscription and no trainings
	var userHasNoTraining = true;
	
	if (userHasNoTraining) {
		return Training.setUp(req, res);
	}

	// TODO: get user trainings and show home page
	return res.render('home');
};

/*********************************** EXPORTS **************************************/
exports.cover = cover;
exports.login = login;
exports.register = register;
exports.home = home;
exports.logout = logout;