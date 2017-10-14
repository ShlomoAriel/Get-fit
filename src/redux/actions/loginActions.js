import * as types from './actionTypes'
import axios from 'axios';

export function updateInputField(field, value){
    return {
        type: types.UPDATE_LOGIN_FIELD,
        field: field, 
        value: value
    }
}
export function setToken(token){
    return {
        type: types.SET_TOKEN,
        token: token
    }
}
export function login(field, value){
    return (dispatch, getState) => {
        let form = getState().login.form
        return axios.post('https://get-fit-server.herokuapp.com/api/authenticate',form)
        .then ( 
            response => {
                dispatch( storeUserCredentials(response.data) )
                dispatch( setToken(response.token) )
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
function storeUserCredentials(data) {
	return dispatch =>{
	    window.localStorage.setItem('token', data.token);
	    window.localStorage.setItem('currentUser', data.user._id);
	    window.localStorage.setItem('currentUserRole', data.user.role._id);
	    // this.useCredentials(data.token);
	}
}