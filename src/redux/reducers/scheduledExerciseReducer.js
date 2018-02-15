import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
        weekDay:'2'
	},
    currentDay:2,
    scheduleWeek:0,
    scheduledExerciseList:[],
    scheduledExerciseMap:{

    }
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SCHEDULED_EXERCISE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_SCHEDULED_EXERCISE_LIST:
            return R.assoc('scheduledExerciseList', action.scheduledExerciseList, state )
        case types.SET_CURRENT_DAY:
            return R.assoc('currentDay', action.day, state )
        case types.SET_SCHEDULED_WEEK:
            return R.assoc('scheduleWeek', action.value, state )
        case types.SET_TRAINEE_SCHEDULEDEXERCISE_LIST:
            return R.assocPath(['scheduledExerciseMap',action.traineeId], action.list, state )
        default:
            return state;
    }
}

