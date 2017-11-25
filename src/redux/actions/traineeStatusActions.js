import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_TRAINEE_STATUS_FIELD,
        field: field, 
        value: value
    }
}

export function setTraineeStatusList(traineeStatusList){
    return {
        type: types.SET_TRAINEE_STATUS_LIST,
        traineeStatusList: traineeStatusList
    }
}

export function setCurrentTraineeStatus(traineeStatusId){
    return {
        type: types.SET_CURRENT_TRAINEE_STATUS,
        traineeStatusId: traineeStatusId
    }
}

export function getTraineeStatusList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeStatuss')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineeStatusList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getTraineeStatusByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.form.traineeId
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeStatusByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineeStatusList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addTraineeStatus(){
    return (dispatch, getState) => {
        let form = R.clone(getState().traineeStatus.form)
        form.trainee = getState().trainee.form.traineeId
        form.date = Date()
        return http.post('http://localhost:3001/api/addTraineeStatus',form)
        .then ( 
            response => {
                dispatch(getTraineeStatusByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeTraineeStatus(id, traineeStatus){
    return (dispatch, getState) => {
        let form = getState().traineeStatus.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteTraineeStatus/'+id, traineeStatus)
        .then (
            response => {
                dispatch(getTraineeStatusByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTraineeStatus(id){
    return (dispatch, getState) => {
        let form = getState().traineeStatus.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteTraineeStatus/'+id)
        .then ( 
            response => {
                dispatch(getTraineeStatusByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}