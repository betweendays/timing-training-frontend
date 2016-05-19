/******************************** GLOBAL VARIABLES ****************************************/

var request = require('request'),
	Response = require('./Response.js'),
	Session = require('./Session.js');

/*********************************** CONSTANTS *******************************************/

var BACK_END_SERVER_URL_BASE = 'http://localhost:9000';
var PATH_REGISTER = '/register';
var PATH_AUTHENTICATE = '/authenticate';

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
	if (Session.timeExpired(req)) {
		return res.redirect('/login');
	}
	return res.render('home');
};

var processLoginPost = function(req, res, next) {
	if (!req.body){
		return handleErrorMessage('400', res);
	}

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_AUTHENTICATE,
		formData: loginData(req)
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

  		var json = JSON.parse(body);
  		Session.storeUserToken(req, json);

  		console.log('Login OK');
  		res.redirect('/home');
	});
};

var processRegisterPost = function(req, res) {
	if (!req.body){
		handleErrorMessage('400', res);
	}

	var requestOptions = {
		url: BACK_END_SERVER_URL_BASE + PATH_REGISTER,
		formData: registerData(req)
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

/*********************************** PRIVATE METHODS **************************************/

function loginData(req) {
	return {
		email: req.body.email,
		password: req.body.password
	};
}

function registerData(req) {
	return {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		pwdcopied: req.body.pwdcopied,
		surname: req.body.surname,
		birthday: req.body.birthday,
		gender: req.body.gender
	};
}

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