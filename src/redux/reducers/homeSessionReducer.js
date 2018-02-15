import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
    form:{
            weekCount:1,
    },
    homeSessionList:[],
    homeSessionMap:{

    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_HOME_SESSION_FIELD:
            return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_HOME_SESSION:
            return R.assocPath(['form','homeSessionId'], action.homeSessionId, state )
        case types.SET_HOME_SESSION_LIST:
            return R.assoc('homeSessionList', action.homeSessionList, state )
        case types.SET_TRAINEE_HOMESESSION_LIST:
            return R.assocPath(['homeSessionMap',action.traineeId], action.list, state )
        default:
            return state;
    }
}

