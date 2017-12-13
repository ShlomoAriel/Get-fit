import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_SESSION_FIELD,
        field: field, 
        value: value
    }
}

export function setSessionList(sessionList){
    return {
        type: types.SET_SESSION_LIST,
        sessionList: sessionList
    }
}

export function setCurrentSession(sessionId){
    return {
        type: types.SET_CURRENT_SESSION,
        sessionId: sessionId
    }
}

export function getSessionList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getSessions')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setSessionList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getSessionByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.form.traineeId
        return http.get('https://get-fit-server.herokuapp.com/api/getSessionByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setSessionList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addSession(){
    return (dispatch, getState) => {
        let form = R.clone(getState().session.form)
        form.trainee = getState().trainee.form.traineeId
        form.date = Date()
        form.achieved = false
        return http.post('https://get-fit-server.herokuapp.com/api/addSession',form)
        .then ( 
            response => {
                dispatch(getSessionByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeSession(id, session){
    return (dispatch, getState) => {
        let form = getState().session.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteSession/'+id, session)
        .then (
            response => {
                dispatch(getSessionByTrainee())
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
        let sessionList = getState().session.sessionList
        let session = R.find(R.propEq('_id',id))(sessionList)
        session.achieved = value
        return http.put('https://get-fit-server.herokuapp.com/api/updateSession/'+id, session)
        .then (
            response => {
                dispatch(getSessionByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeSession(id){
    return (dispatch, getState) => {
        let form = getState().session.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteSession/'+id)
        .then ( 
            response => {
                dispatch(getSessionByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}