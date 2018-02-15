import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    goalList:[],
    traineeGoalMap:{}
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_GOAL_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_GOAL:
            return R.assocPath(['form','goalId'], action.goalId, state )
        case types.SET_GOAL_LIST:
            return R.assoc('goalList', action.goalList, state )
        case types.SET_TRAINEE_GOAL_LIST:
            return R.assocPath(['traineeGoalMap',action.traineeId], action.list, state )
        default:
            return state;
    }
}

