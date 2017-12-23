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

export function setScheduledExerciseList(scheduledExerciseList){
    return {
        type: types.SET_SCHEDULED_EXERCISE_LIST,
        scheduledExerciseList: scheduledExerciseList
    }
}

export function getScheduledExerciseList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getScheduledExercises')
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
            trainee:getState().trainee.form.traineeId
        }
        if(!params.weekDay || !params.trainee){
            return
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeScheduledExercisesByDay',params)
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
            trainee:getState().trainee.form.traineeId
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeScheduledExercises',params)
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
        let form = getState().scheduledExercise.form
        form.trainee = getState().trainee.currentTrainee._id
        return http.post('https://get-fit-server.herokuapp.com/api/addScheduledExercise',form)
        .then ( 
            response => {
                dispatch(getTraineeScheduledExercisesByDay())
                console.log('Success: ' + response)
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
        return http.put('https://get-fit-server.herokuapp.com/api/deleteScheduledExercise/'+id, scheduledExercise)
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
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteScheduledExercise/'+id)
        .then ( 
            response => {
                dispatch(getTraineeScheduledExercisesByDay())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error removeScheduledExercise: ' + error)
        )
    }
}