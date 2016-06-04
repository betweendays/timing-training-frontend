/******************************** GLOBAL VARIABLES ****************************************/

var request = require('request'),
	Response = require('./Response.js'),
	JSONHelper = require('./JSONHelper.js'),
	ViewDispatcher = require('./CriteriaViewDispatcher.js');

/*********************************** CONSTANTS *******************************************/

var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';
var PATH_TRAINING_SET_UP = '/trainingSetup/';
var PATH_GET_CRITERIA_OPTIONS = 'getCriteriaOptions';

/*********************************** PUBLIC METHODS **************************************/

var setUp = function(req, res) {
	var url = BACK_END_SERVER_URL_BASE + PATH_TRAINING_SET_UP + req.session.sessionId;
	request.get(url, function optionalCallback(err, httpResponse, body) {
		console.log('Response: ' + body);

		if (err) {
			console.log('Error Home Page: ' + err);
			return handleErrorMessage(err, res);
		}

		var json;
		try {
			json = JSON.parse(body);
		} catch(e) {
			console.log(e);
			return handleErrorMessage('Internal Error', res);
		}

		if (Response.responseHasErrors(json)) {
			if (json.errorCode == 403) {
				return res.redirect('/login');
			}
  			return handleErrorMessage(json.errorMsg, res);
  		}

		return res.render('setUpTraining/setUpTraining', JSONHelper.getSetUpTrainingJson(json));
	});
};

var setUpCriteria = function(req, res) {
	var id = req.params.id;
	var sessionId = req.session.sessionId;

	var url = BACK_END_SERVER_URL_BASE + PATH_TRAINING_SET_UP + PATH_GET_CRITERIA_OPTIONS + '/' + sessionId + '/' + id;
	request.get(url, function optionalCallback(err, httpResponse, body) {
		console.log('Response: ' + body);

		if (err) {
			console.log('Error Home Page: ' + err);
			return handleErrorMessage(err, res);
		}

		var json;
		try {
			json = JSON.parse(body);
		} catch(e) {
			console.log(e);
			return handleErrorMessage('Internal Error', res);
		}

		if (Response.responseHasErrors(json)) {
			if (json.errorCode == 403) {
				return res.redirect('/login');
			}
  			return handleErrorMessage(json.errorMsg, res);
  		}

  		return ViewDispatcher.dispatch(res, json);
	});
};

/*********************************** EXPORTS **************************************/

exports.setUp = setUp;
exports.setUpCriteria = setUpCriteria;