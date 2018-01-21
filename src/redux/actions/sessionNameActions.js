import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_SESSION_NAME_FIELD,
        field: field, 
        value: value
    }
}

export function setSessionNameList(sessionNameList){
    return {
        type: types.SET_SESSION_NAME_LIST,
        sessionNameList: sessionNameList
    }
}

export function setCurrentSessionName(sessionNameId){
    return {
        type: types.SET_CURRENT_SESSION_NAME,
        sessionNameId: sessionNameId
    }
}

export function getSessionNameList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getSessionNames')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setSessionNameList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getSessionNameByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.form.traineeId
        if(!traineeId){
            return
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getSessionNameByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setSessionNameList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addSessionName(){
    return (dispatch, getState) => {
        let form = R.clone(getState().sessionName.form)
        form.trainee = getState().trainee.form.traineeId
        return http.post('https://get-fit-server.herokuapp.com/api/addSessionName',form)
        .then ( 
            response => {
                dispatch(getSessionNameByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeSessionName(id, sessionName){
    return (dispatch, getState) => {
        let form = getState().sessionName.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteSessionName/'+id, sessionName)
        .then (
            response => {
                dispatch(getSessionNameByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function toggleCheckbox(id, value){
    return (dispatch, getState) => {
        let sessionNameList = getState().sessionName.sessionNameList
        let sessionName = R.find(R.propEq('_id',id))(sessionNameList)
        sessionName.achieved = value
        return http.put('https://get-fit-server.herokuapp.com/api/updateSessionName/'+id, sessionName)
        .then (
            response => {
                dispatch(getSessionNameByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeSessionName(id){
    return (dispatch, getState) => {
        let form = getState().sessionName.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteSessionName/'+id)
        .then ( 
            response => {
                dispatch(getSessionNameByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}