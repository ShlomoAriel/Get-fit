import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    sessionList:[],
    sessionType:'session',
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SESSION_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_SESSION:
            return R.assocPath(['form','sessionId'], action.sessionId, state )
        case types.SET_SESSION_TYPE:
            return R.assoc('sessionType', action.sessionType, state )
        case types.SET_SESSION_LIST:
            return R.assoc('sessionList', action.sessionList, state )
        default:
            return state;
    }
}

