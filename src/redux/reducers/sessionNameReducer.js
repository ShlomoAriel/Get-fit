import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    sessionNameList:[],
    sessionNameMap:{

    }
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SESSION_NAME_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_SESSION_NAME:
            return R.assocPath(['form','sessionNameId'], action.sessionNameId, state )
        case types.SET_SESSION_NAME_LIST:
            return R.assoc('sessionNameList', action.sessionNameList, state )
        case types.SET_TRAINEE_SESSIONNAME_LIST:
            return R.assocPath(['sessionNameMap',action.traineeId], action.list, state )
        default:
            return state;
    }
}

