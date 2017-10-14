import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
		email:'',
        firstName:'',
        lastName:'',
        address:'',
        height:'',
	}
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_SIGNUP_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        default:
            return state;
    }
}

