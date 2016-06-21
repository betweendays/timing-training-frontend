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
var PATH_SET_PROGRAM_OPTIONS = '/trainingSetup/setProgramOptions';
var PATH_SET_PROGRAM_SPECIFIC_OPTIONS ='/trainingSetup/setSpecificOptions';

/*********************************** PUBLIC METHODS **************************************/

function setUp(req, res) {
	var url = BACK_END_SERVER_URL_BASE + PATH_TRAINING_SET_UP + req.session.sessionId;
	request.get(url, function(err, httpResponse, body) {
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

		// show set up training generic view
		var dataToBeShown = JSONHelper.getSetUpTrainingJson(json);
		return res.render('setUpTraining/setUpTraining', dataToBeShown);
	});
};

function setUpCriteria(req, res) {
	var id = req.params.id;
	var sessionId = req.session.sessionId;

	var url = BACK_END_SERVER_URL_BASE + PATH_TRAINING_SET_UP + PATH_GET_CRITERIA_OPTIONS + '/' + sessionId + '/' + id;
	request.get(url, function optionalCallback(err, httpResponse, body) {
		if (err) {
			return handleErrorMessage(err, res);
		}

		var json;
		try {
			json = JSON.parse(body);
		} catch(e) {
			return handleErrorMessage('Internal Error', res);
		}

		if (Response.responseHasErrors(json)) {
			if (json.errorCode == 403) {
				return res.redirect('/login');
			}
  			return handleErrorMessage(json.errorMsg, res);
  		}
		
		// show set up a training according to the selected criteria
  		return ViewDispatcher.dispatchByCriteria(res, json);
	});
};

function setProgramOptions(req, res) {
	var jsonData = JSONHelper.getSetProgramOptionsJson(req);

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_SET_PROGRAM_OPTIONS,
		formData: jsonData
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		if (err) {
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

		req.session.criteriaId = jsonData.criteria;
		
  		return res.render('setUpTraining/trainingOptions', json);
	});
};

function setSpecificOptions(req, res) {
	if (!req.session.sessionId) {
		return handleErrorMessage('Invalid Session Id', res);
	}

	var jsonData = JSONHelper.getSpecificOptionsJson(req);

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_SET_PROGRAM_SPECIFIC_OPTIONS,
		formData: jsonData
	};

	request.post(requestOptions, function(err, httpResponse, body) {
		if (err) {
			return handleErrorMessage(err, res);
		}

		if (responseIsEmpty(body)) {
			// TODO: define what to do when user already have a training
			return res.send('Done!!!');
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

		return res.render('setUpTraining/trainingOptions', json);
	});
};
/*********************************** PRIVATE METHODS **************************************/

function responseIsEmpty(response) {
	return response.length <= 0;
}

function handleErrorMessage(data, res) {
	console.error('Error: ', data.red);
	return res.send(data);
}

/*********************************** EXPORTS **************************************/

module.exports.setUp = setUp;
module.exports.setUpCriteria = setUpCriteria;
module.exports.setProgramOptions = setProgramOptions;
module.exports.setSpecificOptions = setSpecificOptions;