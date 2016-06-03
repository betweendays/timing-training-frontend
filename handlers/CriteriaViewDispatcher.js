/*********************************** CONSTANTS *******************************************/
var CRITERIA_OBJECTIVE = 0;
var CRITERIA_AVAILABILITY = 1;
var CRITERIA_DURATION = 2;
var CRITERIA_MATERIAL = 3;
var CRITERIA_ACTIVITY = 4;

/*********************************** PUBLIC METHODS **************************************/

var dispatch = function(res, json) {
	switch (json.criteria) {
		case CRITERIA_OBJECTIVE:
			return res.render('setUpTrainingObjective', {
				criteriaId: json.criteria,
				objectives: json.objectives,
				wLose: json.objectives[0].generalPrograms,
				toneUp: json.objectives[1].generalPrograms,
				betterShape: json.objectives[2].generalPrograms,
				impStrength: json.objectives[3].generalPrograms,
				impEndurance: json.objectives[4].generalPrograms,
				injuries: json.objectives[5].generalPrograms,
				sport: json.objectives[6].generalPrograms
			});
		case CRITERIA_AVAILABILITY:
			return res.render('setUpTrainingAvailability', {
				criteriaId: json.criteria,
				objectives: json.objectives,
				oneDay: json.objectives[0].programs,
				twoDays: json.objectives[1].programs,
				threeDays: json.objectives[2].programs,
				fourDays: json.objectives[3].programs,
				fiveDays: json.objectives[4].programs,
				sixDays: json.objectives[5].programs,
			});
		case CRITERIA_DURATION:
			return res.render('setUpTrainingDuration', {
				criteriaId: json.criteria,
				objectives: json.objectives,
				fourW: json.objectives[0].programs,
				fiveW: json.objectives[1].programs,
				sixW: json.objectives[2].programs,
				eigthW: json.objectives[3].programs,
				tenW: json.objectives[4].programs,
				twelveW: json.objectives[5].programs,
				fourteenW: json.objectives[6].programs,
				fifteenW: json.objectives[7].programs,
				sixteenW: json.objectives[8].programs
			});
		case CRITERIA_MATERIAL:
			return res.render('setUpTrainingMaterial', {
				criteriaId: json.criteria,
				material: json.material
			});
		case CRITERIA_ACTIVITY:
			return res.render('setUpTrainingActivity', {
				criteriaId: json.criteria,
				activities: json.activities,
				swim: json.activities[0].programs,
				run: json.activities[1].programs,
				cycle: json.activities[2].programs,
				lift: json.activities[3].programs,
				cardio: json.activities[4].programs,
				functional: json.activities[5].programs,
				home: json.activities[6].programs,
				outdoors: json.activities[7].programs,
				noCardio: json.activities[8].programs,
				noLift: json.activities[9].programs
			});
		default:
			console.log('Criteria Unknown.');
			return handleErrorMessage('Criteria Unknown', res);
	}
};

/*********************************** EXPORTS **************************************/
exports.dispatch = dispatch;