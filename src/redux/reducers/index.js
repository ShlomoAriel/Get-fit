import {combineReducers} from 'redux';
import system from './systemReducer'
import login from './loginReducer'
import signup from './signupReducer'

export default combineReducers({
    system,
    login,
    signup,
});
