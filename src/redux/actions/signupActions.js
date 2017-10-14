import * as types from './actionTypes'
import axios from 'axios';

export function updateInputField(field, value){
    return {
        type: types.UPDATE_SIGNUP_FIELD,
        field: field, 
        value: value
    }
}
export function addTrainee(field, value){
    return (dispatch, getState) => {
        let form = getState().signup.form
        return axios.post('http://localhost:3001/api/addTrainee',form)
        // return axios.post('https://get-fit-server.herokuapp.com/api/signup',form)
        .then ( 
            response => {
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}