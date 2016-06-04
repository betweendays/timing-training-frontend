/******************************** GLOBAL VARIABLES ****************************************/

var request = require('request'),
	Response = require('./Response.js'),
	JSONHelper = require('./JSONHelper.js'),
	Session = require('./Session.js'),
	Training = require('./TrainingSetUp.js'),
	ViewDispatcher = require('./CriteriaViewDispatcher.js');

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

var processLoginPost = function(req, res, next) {
	if (!req.body){
		return handleErrorMessage('400', res);
	}

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_AUTHENTICATE,
		formData: JSONHelper.createJsonLogin(req)
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		console.log('Response: ' + body);

		if (err) {
			console.log('Error Login: ' + req);
			Session.clearUserToken(req);
			return handleErrorMessage(err, res);
		}

  		var json;
  		try {
  			json = JSON.parse(body);
  		} catch(e) {
  			return handleErrorMessage('Error handling data.', res);
  		}

  		if (Response.responseHasErrors(json)) {
  			return handleErrorMessage(json.errorMsg, res);
  		}

  		Session.storeUserToken(req, json);
  		console.log('Login OK');
  		return res.redirect('/home');
	});
};

var processRegisterPost = function(req, res) {
	if (!req.body){
		handleErrorMessage('400', res);
	}

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_REGISTER,
		formData: JSONHelper.createJson(req)
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		if (err) {
			return handleErrorMessage(err, res);
		}

  		if (Response.responseHasErrors(body)) {
  			return handleErrorMessage(body, res);
  		}

  		console.log('Register OK');
  		return processLoginPost(req, res);
	});
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

/*********************************** PRIVATE METHODS **************************************/

function handleErrorMessage(data, res) {
	// TODO: handle error
	console.error('Error:', data);
	return res.send(data);
}

/*********************************** EXPORTS **************************************/
exports.cover = cover;
exports.login = login;
exports.register = register;
exports.processLoginPost = processLoginPost;
exports.processRegisterPost = processRegisterPost;
exports.home = home;
exports.logout = logout;