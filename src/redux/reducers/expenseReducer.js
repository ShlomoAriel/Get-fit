import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    expenseList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_EXPENSE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_EXPENSE:
            return R.assocPath(['form','expenseId'], action.expenseId, state )
        case types.SET_EXPENSE_LIST:
            return R.assoc('expenseList', action.expenseList, state )
        default:
            return state;
    }
}

