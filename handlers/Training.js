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
var PATH_SET_PROGRAM_OPTIONS = "/trainingSetup/setProgramOptions";

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

var setProgramOptions = function(req, res) {
	var jsonData = JSONHelper.getSetProgramOptionsJson(req);
	console.log("JSON: " + JSON.stringify(jsonData)); 

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_SET_PROGRAM_OPTIONS,
		formData: jsonData
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		console.log('Response: ' + body);

		if (err) {
			console.log('Error: ' + req);
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
  
  		return ViewDispatcher.dispatch2(res, json);
	});
};

var setSpecificOptions = function(req, res) {
	var questionId = req.params.questionId;
	var optionId = req.params.optionId;

	res.send('TODO: Not Finished! QuestionId: ' + questionId + ", optionId: " + optionId);
};
/*********************************** PRIVATE METHODS **************************************/

function handleErrorMessage(data, res) {
	// TODO: handle error
	console.error('Error:', data);
	return res.send(data);
}

/*********************************** EXPORTS **************************************/

exports.setUp = setUp;
exports.setUpCriteria = setUpCriteria;
exports.setProgramOptions = setProgramOptions;
exports.setSpecificOptions = setSpecificOptions;