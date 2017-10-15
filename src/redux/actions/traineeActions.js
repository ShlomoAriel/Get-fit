import * as types from './actionTypes'
import axios from 'axios';
import * as http from '../../utils/axiosWrapper'

export function updateInputField(field, value){
    return {
        type: types.UPDATE_TRAINEE_FIELD,
        field: field, 
        value: value
    }
}

export function setTraineeList(traineeList){
    return {
        type: types.SET_TRAINEE_LIST,
        traineeList: traineeList
    }
}

export function getTraineeList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getTrainees')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineeList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
export function addTrainee(){
    return (dispatch, getState) => {
        let form = getState().trainee.form
        return http.post('https://get-fit-server.herokuapp.com/api/addTrainee',form)
        .then ( 
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeTrainee(id, trainee){
    return (dispatch, getState) => {
        let form = getState().trainee.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteTrainee/'+id, trainee)
        .then (
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTrainee(id){
    return (dispatch, getState) => {
        let form = getState().trainee.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteTrainee/'+id)
        .then ( 
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}