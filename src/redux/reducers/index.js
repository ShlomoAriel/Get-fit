import {combineReducers} from 'redux';
import system from './systemReducer'
import login from './loginReducer'
import trainee from './traineeReducer'
import trainingPackage from './trainingPackageReducer'
import exercise from './exerciseReducer'
import scheduledExercise from './scheduledExerciseReducer'
import goal from './goalReducer'
import payment from './paymentReducer'
import diet from './dietReducer'
import traineeStatus from './traineeStatusReducer'

export default combineReducers({
    system,
    login,
    trainee,
    trainingPackage,
    exercise,
    scheduledExercise,
    goal,
    traineeStatus,
    payment,
    diet,
});
