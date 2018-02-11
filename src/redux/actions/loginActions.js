var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = remoteUrl

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
        return axios.post(currentUrl + '/api/authenticate',form)
        .then ( 
            response => {
                dispatch( storeUserCredentials(response.data) )
                if(response.data.trainee){
                    dispatch({
                        type: types.SET_CURRENT_TRAINEE,
                        trainee: response.data.trainee
                    })
                }
                dispatch( setToken(response.data.token) )
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
        if(data.trainee){
	       window.localStorage.setItem('currentTrainee', data.trainee._id); 
        }
	}
}
export function logout(){
    return dispatch =>{
        dispatch( setToken('') )
        dispatch( removeUserCredentials() )
        dispatch({
                    type: types.SET_CURRENT_TRAINEE,
                    trainee: {}
                })
    }
}
function removeUserCredentials() {
    return dispatch =>{
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('currentUser');
        window.localStorage.removeItem('currentUserRole');
        window.localStorage.removeItem('currentTrainee');
    }
}