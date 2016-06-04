/******************************** GLOBAL VARIABLES ****************************************/

var request = require('request'),
	Response = require('./Response.js'),
	JSONHelper = require('./JSONHelper.js'),
	Session = require('./Session.js');

/*********************************** CONSTANTS *******************************************/

var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';
var PATH_TRAINING_SET_UP = '/trainingSetup/';
var PATH_GET_CRITERIA_OPTIONS = 'getCriteriaOptions';

/*********************************** PUBLIC METHODS **************************************/

var login = function(req, res) {
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

var register = function(req, res) {
	if (!req.body){
		handleErrorMessage('400', res);
	}

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_REGISTER,
		formData: JSONHelper.createJson(req)
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		console.log('Response: ' + body);
		
		if (err) {
			console.log('Error Register: ' + req);
			return handleErrorMessage(err, res);
		}

		if (body.length <= 0) {
			console.log('Register OK');
  			return login(req, res);
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
	});
};

/*********************************** PRIVATE METHODS **************************************/

function handleErrorMessage(data, res) {
	// TODO: handle error
	console.error('Error:', data);
	return res.send(data);
}

/*********************************** EXPORTS **************************************/
exports.login = login;
exports.register = register;