exports.storeUserToken = function(req, data){
	console.log('Save User Session');
	req.session.sessionId = data.sessionId;
	req.session.expTime = data.expTime;
};

exports.clearUserToken = function(req) {
	console.log('Clear User Session');
	req.session.sessionId = '';
	req.session.expTime = '';	
};