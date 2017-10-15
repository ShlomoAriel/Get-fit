import {combineReducers} from 'redux';
import system from './systemReducer'
import login from './loginReducer'
import trainee from './traineeReducer'
import trainingPackage from './trainingPackageReducer'
import exercise from './exerciseReducer'

export default combineReducers({
    system,
    login,
    trainee,
    trainingPackage,
    exercise,
});
