import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
	},
    locationList:[],
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_LOCATION_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_LOCATION:
            return R.assocPath(['form','locationId'], action.locationId, state )
        case types.SET_LOCATION_LIST:
            return R.assoc('locationList', action.locationList, state )
        default:
            return state;
    }
}

