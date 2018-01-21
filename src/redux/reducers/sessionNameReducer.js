import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    sessionNameList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SESSION_NAME_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_SESSION_NAME:
            return R.assocPath(['form','sessionNameId'], action.sessionNameId, state )
        case types.SET_SESSION_NAME_LIST:
            return R.assoc('sessionNameList', action.sessionNameList, state )
        default:
            return state;
    }
}

