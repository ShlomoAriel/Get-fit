import {combineReducers} from 'redux';
import system from './systemReducer'
import login from './loginReducer'

export default combineReducers({
    system,
    login,
});
