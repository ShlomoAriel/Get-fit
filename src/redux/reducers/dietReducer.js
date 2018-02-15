import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    dietList:[],
    dietMap:{

    }
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_DIET_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_DIET:
            return R.assocPath(['form','dietId'], action.dietId, state )
        case types.SET_DIET_MAP_TRAINEE:
            return R.assocPath(['dietMap',action.traineeId], action.list, state )
        case types.SET_DIET_LIST:
            return R.assoc('dietList', action.dietList, state )
        default:
            return state;
    }
}

