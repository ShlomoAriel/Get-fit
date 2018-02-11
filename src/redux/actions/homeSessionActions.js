import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_HOME_SESSION_FIELD,
        field: field, 
        value: value
    }
}

export function setHomeSessionList(homeSessionList){
    return {
        type: types.SET_HOME_SESSION_LIST,
        homeSessionList: homeSessionList
    }
}

export function setCurrentHomeSession(HomeSessionId){
    return {
        type: types.SET_CURRENT_HOME_SESSION,
        HomeSessionId: HomeSessionId
    }
}

export function getHomeSessionList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getHomeSessions')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setHomeSessionList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getHomeSessionByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.currentTrainee._id
        if(!traineeId){
            return
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getHomeSessionByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setHomeSessionList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addHomeSession(){
    return (dispatch, getState) => {
        if(getState().homeSession.form._id){
            dispatch(updaeHomeSession())
        }
        else{
            let form = {}
            form.date = R.clone(getState().homeSession.form.date)
            form.sessionName = R.clone(getState().homeSession.form.sessionName)
            form.trainee = getState().trainee.currentTrainee._id
            form.done = form.done ? form.done : false
            let weekCount = getState().homeSession.form.weekCount
            let formArray2 = [...Array(weekCount-1)]
            let formArray = []
            formArray[0] = R.assoc('date',new Date(form.date), form)
            formArray2.forEach((_, i) => {
                formArray[i+1] = R.assoc('date',new Date(form.date.add(1, 'weeks')), form) ;
            });
            return http.post('https://get-fit-server.herokuapp.com/api/addHomeSessions',formArray)
            .then ( 
                response => {
                    dispatch(getHomeSessionByTrainee())
                    console.log('Success: ' + response)
                }
            )
            .catch( 
                error => 
                    console.log('error loging in: ' + error)
            )
        }
    }
}

export function updaeHomeSession(){
    return (dispatch, getState) => {
        let form = getState().homeSession.form
        return http.put('https://get-fit-server.herokuapp.com/api/upsertHomeSession/', form)
        .then (
            response => {
                dispatch(getHomeSessionByTrainee())
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
        let HomeSessionList = getState().HomeSession.HomeSessionList
        let HomeSession = R.find(R.propEq('_id',id))(HomeSessionList)
        HomeSession.achieved = value
        return http.put('https://get-fit-server.herokuapp.com/api/updateHomeSession/'+id, HomeSession)
        .then (
            response => {
                dispatch(getHomeSessionByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeHomeSession(id){
    return (dispatch, getState) => {
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteHomeSession/'+id)
        .then ( 
            response => {
                dispatch(getHomeSessionByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}