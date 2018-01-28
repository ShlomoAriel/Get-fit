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
import session from './sessionReducer'
import homeSession from './homeSessionReducer'
import sessionName from './sessionNameReducer'
import expense from './expenseReducer'
import location from './locationReducer'

export default combineReducers({
    system,
    login,
    trainee,
    trainingPackage,
    exercise,
    scheduledExercise,
    goal,
    traineeStatus,
    session,
    payment,
    expense,
    homeSession,
    location,
    sessionName,
    diet,
});
