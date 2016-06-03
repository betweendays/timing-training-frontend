/******************************** GLOBAL VARIABLES ****************************************/

var request = require('request'),
	Response = require('./Response.js'),
	JSONHelper = require('./JSONHelper.js'),
	Session = require('./Session.js'),
	url = require('url');

/*********************************** CONSTANTS *******************************************/

var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';
var PATH_TRAINING_SET_UP = '/trainingSetup/';
var PATH_GET_CRITERIA_OPTIONS = 'getCriteriaOptions';

var CRITERIA_OBJECTIVE = 0;
var CRITERIA_AVAILABILITY = 1;
var CRITERIA_DURATION = 2;
var CRITERIA_MATERIAL = 3;
var CRITERIA_ACTIVITY = 4;

/*********************************** PUBLIC METHODS **************************************/
var cover = function(req, res){
	console.log('Cover');
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
	console.log('logout');
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

		return res.render('setUpTraining', {
			criterias: json.criterias,
			cWellness: json.categories[0].wellness,
			cFitness: json.categories[1].fitness,
			cSports: json.categories[2].sport
		});
	});
};

var trainingSetupCriteria = function(req, res) {
	// get criteriaId and sessionId
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

  		return dispatchView(res, json);
	});
};

/*********************************** PRIVATE METHODS **************************************/

function handleErrorMessage(data, res) {
	// TODO: handle error
	console.error('Error:', data);
	return res.send(data);
}

function dispatchView(res, json) {
	switch (json.criteria) {
		case CRITERIA_OBJECTIVE:
			console.log('Dispatch Objective view.');
			return res.render('setUpTrainingObjective', {
				criteriaId: json.criteria,
				objectives: json.objectives,
				wLose: json.objectives[0].generalPrograms,
				toneUp: json.objectives[1].generalPrograms,
				betterShape: json.objectives[2].generalPrograms,
				impStrength: json.objectives[3].generalPrograms,
				impEndurance: json.objectives[4].generalPrograms,
				injuries: json.objectives[5].generalPrograms,
				sport: json.objectives[6].generalPrograms
			});
		case CRITERIA_AVAILABILITY:
			// TODO: not finished yet
			console.log('Dispatch Availability view: ' + json.objectives[0].daysWeek);
			return res.render('setUpTrainingAvailability', {
				criteriaId: json.criteria,
				objectives: json.objectives,
				oneDay: json.objectives[0].programs,
				twoDays: json.objectives[1].programs,
				threeDays: json.objectives[2].programs,
				fourDays: json.objectives[3].programs,
				fiveDays: json.objectives[4].programs,
				sixDays: json.objectives[5].programs,
			});
		case CRITERIA_DURATION:
			// TODO: not finished yet
			console.log('Dispatch Duration view.');
			return res.send('duration');
		case CRITERIA_MATERIAL:
			// TODO: not finished yet
			console.log('Dispatch Material view.');
			return res.send('material');
		case CRITERIA_ACTIVITY:
			// TODO: not finished yet
			console.log('Dispatch Activity view.');
			return res.send('activity');
		default:
			console.log('Criteria Unknown.');
			return handleErrorMessage('Criteria Unknown', res);
	}
}
/*********************************** EXPORTS **************************************/
exports.cover = cover;
exports.login = login;
exports.register = register;
exports.processLoginPost = processLoginPost;
exports.processRegisterPost = processRegisterPost;
exports.home = home;
exports.logout = logout;
exports.trainingSetupCriteria = trainingSetupCriteria;