var moment = require('moment');

exports.storeUserToken = function(req, data){
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
	if (req.session.expires === undefined || req.session.sessionId === undefined) {
		return true;
	}

	if (req.session.expires === "" || req.session.sessionId === "") {
		return true;
	}
	return moment().isAfter(req.session.expires);
};