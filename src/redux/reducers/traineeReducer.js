import * as types from '../actions/actionTypes';
import R from 'ramda';

const initialState = {
	form:{
		email:'',
        firstName:'',
        lastName:'',
        address:'',
        height:'',
        traineeId:''
	},
    traineeList:[],
    traineePackageMap:{},
    currentTrainee:{}
}

export default function(state = initialState, action) {
    switch (action.type) {
    	case types.UPDATE_TRAINEE_FIELD:
    		return R.assocPath(['form',action.field], action.value, state )
        case types.SET_CURRENT_TRAINEE:
            var newState =  R.assocPath(['form','traineeId'], action.trainee._id, state )
            return R.assoc('currentTrainee', action.trainee, newState )
        case types.SET_TRAINEE_PACKAGE_LIST:
            let traineeMap = R.clone(state.traineePackageMap)
            traineeMap[action.traineeId] = action.packageList
            return R.assoc('traineePackageMap', traineeMap, state )
        case types.SET_TRAINEE_LIST:
            return R.assoc('traineeList', action.traineeList, state )
        default:
            return state;
    }
}
