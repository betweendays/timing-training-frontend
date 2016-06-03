exports.createJsonLogin = function(req) {
	return {
		email: req.body.email,
		password: req.body.password
	};
};

exports.createJson = function(req) {
	return {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		pwdcopied: req.body.pwdcopied,
		surname: req.body.surname,
		birthday: req.body.birthday,
		gender: req.body.gender
	};
};