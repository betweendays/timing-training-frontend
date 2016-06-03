exports.responseHasErrors = function(body){
	return body.hasOwnProperty('errorCode');
};