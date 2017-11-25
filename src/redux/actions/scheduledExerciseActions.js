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
                console.log('error loging in: ' + error)
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
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeScheduledExercisesByDay',params)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setScheduledExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
//=============================================================================
export function getTraineeScheduledExercises(params){
    return (dispatch, getState) => {
        let scheduledExerciseState = getState().scheduledExercise
        let params={
            trainee:scheduledExerciseState.form.trainee
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
                console.log('error loging in: ' + error)
        )
    }
}
export function addScheduledExercise(){
    return (dispatch, getState) => {
        let form = getState().scheduledExercise.form
        form.trainee = getState().trainee.currentTrainee._id
        return http.post('http://localhost:3001/api/addScheduledExercise',form)
        .then ( 
            response => {
                dispatch(getTraineeScheduledExercisesByDay())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
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
                console.log('error loging in: ' + error)
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
                dispatch(getScheduledExerciseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}