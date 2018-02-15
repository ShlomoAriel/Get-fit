import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    traineeStatusList:[],
    traineeStatusMap:{}
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_TRAINEE_STATUS_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_TRAINEE_STATUS:
            return R.assocPath(['form','traineeStatusId'], action.traineeStatusId, state )
        case types.SET_TRAINEE_STATUS_LIST:
            return R.assoc('traineeStatusList', action.traineeStatusList, state )
          case types.SET_TRAINEE_STATUS_LISTֹ_MAP:
            return R.assocPath(['traineeStatusMap',action.traineeId], action.list, state )
        default:
            return state;
    }
}

