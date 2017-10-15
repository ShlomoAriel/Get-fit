import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    exerciseList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_EXERCISE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_EXERCISE_LIST:
            return R.assoc('exerciseList', action.exerciseList, state )
        default:
            return state;
    }
}

