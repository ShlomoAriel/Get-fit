import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
		email:'',
        firstName:'',
        lastName:'',
        address:'',
        height:'',
	},
    traineeList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_TRAINEE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_TRAINEE_LIST:
            return R.assoc('traineeList', action.traineeList, state )
        default:
            return state;
    }
}

