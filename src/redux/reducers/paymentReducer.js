import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    paymentList:[],
    paymentMap:{},
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_PAYMENT_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_PAYMENT:
            return R.assocPath(['form','paymentId'], action.paymentId, state )
        case types.SET_PAYMENT_LIST:
            return R.assoc('paymentList', action.paymentList, state )
        case types.SET_PAYMENT_MAP:
            let traineePaymentMap = R.clone(state.paymentMap)
            traineePaymentMap[action.traineeId] = action.paymentList
            return R.assoc('paymentMap', traineePaymentMap, state )
        default:
            return state;
    }
}

