/******************************** GLOBAL VARIABLES ****************************************/

var JSONHelper = require('./JSONHelper.js');

/*********************************** CONSTANTS *******************************************/

var CRITERIA_OBJECTIVE = 0;
var CRITERIA_AVAILABILITY = 1;
var CRITERIA_DURATION = 2;
var CRITERIA_MATERIAL = 3;
var CRITERIA_ACTIVITY = 4;

/*********************************** PUBLIC METHODS **************************************/

function dispatchByCriteria(res, json) {
	switch (json.criteria) {
		case CRITERIA_OBJECTIVE:
			return res.render('setUpTraining/setUpTrainingObjective', JSONHelper.getObjectiveJson(json));
		case CRITERIA_AVAILABILITY:
			return res.render('setUpTraining/setUpTrainingAvailability', JSONHelper.getAvailabilityJson(json));
		case CRITERIA_DURATION:
			return res.render('setUpTraining/setUpTrainingDuration', JSONHelper.getDurationJson(json));
		case CRITERIA_MATERIAL:
			return res.render('setUpTraining/setUpTrainingMaterial', JSONHelper.getMaterialJson(json));
		case CRITERIA_ACTIVITY:
			return res.render('setUpTraining/setUpTrainingActivity', JSONHelper.getActivityJson(json));
		default:
			return handleErrorMessage('Criteria Unknown', res);
	}
};

/*********************************** EXPORTS **************************************/

module.exports.dispatchByCriteria = dispatchByCriteria;