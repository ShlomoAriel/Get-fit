import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
        weekDay:2
	},
    scheduledExerciseList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SCHEDULED_EXERCISE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_SCHEDULED_EXERCISE_LIST:
            return R.assoc('scheduledExerciseList', action.scheduledExerciseList, state )
        default:
            return state;
    }
}

