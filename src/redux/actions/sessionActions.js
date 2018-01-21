import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
import moment from 'moment'

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

export function setSessionType(sessionType){
    return {
        type: types.SET_SESSION_TYPE,
        sessionType: sessionType
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
        if(!traineeId){
            return
        }
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
        form.done = false
        let day = form.date
        form.date = R.clone(form.date.startOf('day'))
        day.hours(form.start.hours())
        day.minutes(form.start.minutes())
        form.start = day.toDate();
        day.hours(form.end.hours())
        day.minutes(form.end.minutes())
        form.end = day.toDate();
        return http.put('https://get-fit-server.herokuapp.com/api/upsertSession',form)
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