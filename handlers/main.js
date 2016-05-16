var request = require('request'),
	Response = require('./Response.js'),
	Session = require('./Session.js');

/*********************************** CONSTANTS **************************************/
var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';
/*********************************** PUBLIC METHODS **************************************/
var cover = function(req, res){
	res.render('cover');
};

var login = function(req, res){
	res.render('login');
};

var register = function(req, res){
	res.render('register');
};

var home = function(req, res) {
	res.render('home');
};

var processLoginPost = function(req, res) {
	if (!req.body){
		return handleErrorMessage('400', res);
	}

	var formData = {
		email: req.body.email,
		password: req.body.password
	};

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_AUTHENTICATE,
		formData: formData
	};

	request.post(requestOptions, function optionalCallback(err, httpResponse, body) {
		if (err) {
			Session.clearUserToken(req);
			return handleErrorMessage(body, res);
		}

  		if (Response.responseHasErrors(body)) {
  			Session.clearUserToken(req);
  			return handleErrorMessage(body, res);
  		}

  		// store user token in session
  		Session.storeUserToken(req, body);

  		console.log('Login OK');
  		return home(req, res);
	});
};

var processRegisterPost = function(req, res) {
	if (!req.body){
		handleErrorMessage('400', res);
	}

	var formData = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		pwdcopied: req.body.pwdcopied,
		surname: req.body.surname,
		birthday: req.body.birthday,
		gender: req.body.gender
	};

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_REGISTER,
		formData: formData
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