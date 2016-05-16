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
		console.error('Error:', err);
		return res.send(err);
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
			console.error('Error:', err);
			return res.send(err);
		}

  		if (Response.responseHasErrors(body)) {
  			return res.send(body);
  		}

  		console.log('Login OK');

  		// store user token in session
  		Session.storeUserToken(body);
  		
  		// redirect user to home page
  		return home(req, res);
	});
};

var processRegisterPost = function(req, res) {
	if (!req.body){
		return res.sendStatus(400);
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
			console.error('Error:', err);
			return res.send(err);
		}

  		if (Response.responseHasErrors(body)) {
  			return res.send(body);
  		}

  		console.log('Register OK');
  		return processLoginPost(req, res);
	});
};

/*********************************** EXPORTS **************************************/
exports.cover = cover;
exports.login = login;
exports.register = register;
exports.processLoginPost = processLoginPost;
exports.processRegisterPost = processRegisterPost;
exports.home = home;