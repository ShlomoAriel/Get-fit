var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = localUrl
import * as types from './actionTypes'
import axios from 'axios';
import * as http from '../../utils/axiosWrapper'

export function updateInputField(field, value){
    return {
        type: types.UPDATE_SCHEDULED_EXERCISE_FIELD,
        field: field, 
        value: value
    }
}

export function setCurrentDay(day){
    return {
        type: types.SET_CURRENT_DAY,
        day: day
    }
}

export function setScheduledWeek(value){
    return {
        type: types.SET_SCHEDULED_WEEK,
        value: value
    }
}

export function setScheduledExerciseList(scheduledExerciseList){
    return {
        type: types.SET_SCHEDULED_EXERCISE_LIST,
        scheduledExerciseList: scheduledExerciseList
    }
}

export function getScheduledExerciseList(){
    return (dispatch, getState) => {
        return http.get(currentUrl + '/api/getScheduledExercises')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setScheduledExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error getScheduledExerciseList: ' + error)
        )
    }
}
//=============================================================================
export function getTraineeScheduledExercisesByDay(params){
    return (dispatch, getState) => {
        let params={
            weekDay:getState().scheduledExercise.form.weekDay,
            trainee:getState().trainee.currentTrainee._id
        }
        if(!params.weekDay || !params.trainee){
            return
        }
        return http.get(currentUrl + '/api/getTraineeScheduledExercisesByDay',params)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setScheduledExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error getTraineeScheduledExercisesByDay: ' + error)
        )
    }
}
//=============================================================================
export function getTraineeScheduledExercisesBySessionName(params){
    return (dispatch, getState) => {
        let params={
            sessionName:getState().homeSession.form.sessionName,
            trainee:getState().trainee.currentTrainee._id
        }
        if(!params.sessionName || !params.trainee){
            return
        }
        return http.get(currentUrl + '/api/getTraineeScheduledExercisesBySessionName',params)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setScheduledExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error getTraineeScheduledExercisesByDay: ' + error)
        )
    }
}
//=============================================================================
export function getTraineeScheduledExercises(){
    return (dispatch, getState) => {
        let scheduledExerciseState = getState().scheduledExercise
        let params={
            trainee:getState().trainee.currentTrainee._id
        }
        if(!params.trainee){
            return
        }
        return http.get(currentUrl + '/api/getTraineeScheduledExercises',params)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setScheduledExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error getTraineeScheduledExercises: ' + error)
        )
    }
}
export function addScheduledExercise(){
    return (dispatch, getState) => {
        let form = {...getState().scheduledExercise.form}
        form.trainee = getState().trainee.currentTrainee._id
        form.sessionName = getState().homeSession.form.sessionName
        return http.post(currentUrl + '/api/addScheduledExercise',form)
        .then ( 
            response => {
                let newScheduledExercise = [...(getState().trainee.currentTrainee.ScheduledExercise), response.data]
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'ScheduledExercise',
                    list: newScheduledExercise
                })
                console.log('Success: ' + newScheduledExercise)
            }
        )
        .catch( 
            error => 
                console.log('error addScheduledExercise: ' + error)
        )
    }
}

export function updaeScheduledExercise(id, scheduledExercise){
    return (dispatch, getState) => {
        let form = getState().scheduledExercise.form
        form.trainee = getState().trainee.currentTrainee._id
        return http.put(currentUrl + '/api/deleteScheduledExercise/'+id, scheduledExercise)
        .then (
            response => {
                dispatch(getScheduledExerciseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error updaeScheduledExercise: ' + error)
        )
    }
}

export function removeScheduledExercise(id){
    return (dispatch, getState) => {
        let form = getState().scheduledExercise.form
        return http.remove(currentUrl + '/api/deleteScheduledExercise/'+id)
        .then ( 
            response => {
                let newScheduledExercise = (getState().trainee.currentTrainee.ScheduledExercise).filter( item => item._id != id )
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'ScheduledExercise',
                    list: newScheduledExercise
                })
                console.log('Success: ' + newScheduledExercise)
            }
        )
        .catch( 
            error => 
                console.log('error removeScheduledExercise: ' + error)
        )
    }
}