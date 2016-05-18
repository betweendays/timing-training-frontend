var moment = require('moment');

exports.storeUserToken = function(req, data){
	console.log('Save User Session: ' + data.sessionId);
	req.session.sessionId = data.sessionId;
	req.session.expires = data.expTime;
};

exports.getExpirationTime = function(req) {
	return req.session.expires;
};

exports.clearUserToken = function(req) {
	req.session.sessionId = '';
	req.session.expires = '';	
};

exports.timeExpired = function(req) {
	return moment().isAfter(req.session.expires);
};