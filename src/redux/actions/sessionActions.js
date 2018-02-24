var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = localUrl

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
        return http.get(currentUrl+ '/api/getSessions')
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
        let traineeId = getState().trainee.currentTrainee._id
        if(!traineeId){
            return
        }
        return http.get(currentUrl+ '/api/getSessionByTrainee/' + traineeId)
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

export function getSessionByTraineeId(traineeId){
    return (dispatch, getState) => {
        if(!traineeId){
            return
        }
        if(getState().session.sessionMap[traineeId]){
            dispatch(setSessionList(getState().session.sessionMap[traineeId]))
            return
        }
        return http.get(currentUrl+ '/api/getSessionByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch({type:'SET_TRAINEE_SESSION_LIST',traineeId:traineeId, list:response.data})
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
        form.trainee = getState().trainee.currentTrainee._id
        form.done = false
        let day = form.date
        form.date = R.clone(form.date.startOf('day'))
        day.hours(form.start.hours())
        day.minutes(form.start.minutes())
        form.start = day.toDate();
        day.hours(form.end.hours())
        day.minutes(form.end.minutes())
        form.end = day.toDate();
        return http.put(currentUrl+ '/api/upsertSession',form)
        .then ( 
            response => {
                let trainneeSession = [...(getState().trainee.currentTrainee.Session), response.data]
                    dispatch({
                        type: types.SET_CURRENT_TRAINEE_LIST,
                        listName: 'Session',
                        list: trainneeSession
                    })
                    console.log('Success: ' + trainneeSession)
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
        return http.put(currentUrl+ '/api/updateSession/'+id, session)
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
        return http.remove(currentUrl+ '/api/deleteSession/'+id)
        .then ( 
            response => {
                let newSession = (getState().trainee.currentTrainee.Session).filter( item => item._id != id )
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'Session',
                    list: newSession
                })
                console.log('Success: ' + newSession)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}