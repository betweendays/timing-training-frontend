/*********************************** PUBLIC METHODS **************************************/

var createJsonLogin = function(req) {
	return {
		email: req.body.email,
		password: req.body.password
	};
};

 var createJson = function(req) {
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

var getObjectiveJson = function(data) {
	return {
		criteriaId: data.criteria,
		objectives: data.objectives,
		wLose: data.objectives[0].generalPrograms,
		toneUp: data.objectives[1].generalPrograms,
		betterShape: data.objectives[2].generalPrograms,
		impStrength: data.objectives[3].generalPrograms,
		impEndurance: data.objectives[4].generalPrograms,
		injuries: data.objectives[5].generalPrograms,
		sport: data.objectives[6].generalPrograms
	};
};

var getAvailabilityJson = function(data) {
	return {
		criteriaId: data.criteria,
		objectives: data.objectives,
		oneDay: data.objectives[0].programs,
		twoDays: data.objectives[1].programs,
		threeDays: data.objectives[2].programs,
		fourDays: data.objectives[3].programs,
		fiveDays: data.objectives[4].programs,
		sixDays: data.objectives[5].programs
	};
};

var getDurationJson = function(data) {
	return {
		criteriaId: data.criteria,
		objectives: data.objectives,
		fourW: data.objectives[0].programs,
		fiveW: data.objectives[1].programs,
		sixW: data.objectives[2].programs,
		eigthW: data.objectives[3].programs,
		tenW: data.objectives[4].programs,
		twelveW: data.objectives[5].programs,
		fourteenW: data.objectives[6].programs,
		fifteenW: data.objectives[7].programs,
		sixteenW: data.objectives[8].programs
	};
};

var getMaterialJson = function(data) {
	return {
		criteriaId: data.criteria,
		material: data.material
	};
};

var getActivityJson = function(data) {
	return {
		criteriaId: data.criteria,
		activities: data.activities,
		swim: data.activities[0].programs,
		run: data.activities[1].programs,
		cycle: data.activities[2].programs,
		lift: data.activities[3].programs,
		cardio: data.activities[4].programs,
		functional: data.activities[5].programs,
		home: data.activities[6].programs,
		outdoors: data.activities[7].programs,
		noCardio: data.activities[8].programs,
		noLift: data.activities[9].programs
	};
};

var getSetUpTrainingJson = function(data) {
	return {
		criterias: data.criterias,
		cWellness: data.categories[0].wellness,
		cFitness: data.categories[1].fitness,
		cSports: data.categories[2].sport
	};
};

var getSetProgramOptionsJson = function(data) {
	return {
		sessionId: data.session.sessionId,
		criteria: data.params.criteriaId,
		programId: data.params.programId
	};
};

var getWeigthLossJson = function(data) {
	return {
		question: data.question.value,
		options: data.question.option
	};
};
/*********************************** EXPORTS **************************************/

exports.createJsonLogin = createJsonLogin;
exports.createJson = createJson;
exports.getObjectiveJson = getObjectiveJson;
exports.getAvailabilityJson = getAvailabilityJson;
exports.getDurationJson = getDurationJson;
exports.getMaterialJson = getMaterialJson;
exports.getActivityJson = getActivityJson;
exports.getSetUpTrainingJson = getSetUpTrainingJson;
exports.getSetProgramOptionsJson = getSetProgramOptionsJson;
exports.getWeigthLossJson = getWeigthLossJson;