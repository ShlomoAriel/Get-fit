import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    trainingPackageList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_TRAINING_PACKAGE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_TRAINING_PACKAGE:
            return R.assocPath(['form','trainingPackageId'], action.trainingPackageId, state )
        case types.SET_TRAINING_PACKAGE_LIST:
            return R.assoc('trainingPackageList', action.trainingPackageList, state )
        default:
            return state;
    }
}

