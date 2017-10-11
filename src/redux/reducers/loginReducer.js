import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
		email:'',
		password:'',
	},
    authenticated:false,
	token:'',

}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_LOGIN_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
    	case types.SET_TOKEN:
            let newState = R.assoc('token', action.token, state )
    		return R.assoc('authenticated', newState.token !== '', newState )
        default:
            return state;
    }
}

