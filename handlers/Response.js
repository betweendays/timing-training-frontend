exports.responseHasErrors = function(body){
	return body.indexOf("errorCode")>=0;
};