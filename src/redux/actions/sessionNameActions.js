var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = remoteUrl

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
        return http.get(currentUrl + '/api/getSessionNames')
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
        let traineeId = getState().trainee.currentTrainee._id
        if(!traineeId){
            return
        }
        return http.get(currentUrl + '/api/getSessionNameByTrainee/' + traineeId)
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
        form.trainee = getState().trainee.currentTrainee._id
        return http.post(currentUrl + '/api/addSessionName',form)
        .then ( 
            response => {
                let newSessionName = [...(getState().trainee.currentTrainee.SessionName), response.data]
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'SessionName',
                    list: newSessionName
                })
                console.log('Success: ' + newSessionName)
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
        return http.put(currentUrl + '/api/deleteSessionName/'+id, sessionName)
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
        return http.put(currentUrl + '/api/updateSessionName/'+id, sessionName)
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
        return http.remove(currentUrl + '/api/deleteSessionName/'+id)
        .then ( 
            response => {
                let newSessionName = (getState().trainee.currentTrainee.SessionName).filter( item => item._id != id )
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'SessionName',
                    list: newSessionName
                })
                console.log('Success: ' + newSessionName)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}