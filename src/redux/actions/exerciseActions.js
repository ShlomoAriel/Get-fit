import * as types from './actionTypes'
import axios from 'axios';
import * as http from '../../utils/axiosWrapper'

export function updateInputField(field, value){
    return {
        type: types.UPDATE_EXERCISE_FIELD,
        field: field, 
        value: value
    }
}

export function setExerciseList(exerciseList){
    return {
        type: types.SET_EXERCISE_LIST,
        exerciseList: exerciseList
    }
}

export function getExerciseList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getExercises')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setExerciseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
export function addExercise(){
    return (dispatch, getState) => {
        let form = getState().exercise.form
        return http.post('http://localhost:3001/api/addExercise',form)
        .then ( 
            response => {
                dispatch(getExerciseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeExercise(id, exercise){
    return (dispatch, getState) => {
        let form = getState().exercise.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteExercise/'+id, exercise)
        .then (
            response => {
                dispatch(getExerciseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeExercise(id){
    return (dispatch, getState) => {
        let form = getState().exercise.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteExercise/'+id)
        .then ( 
            response => {
                dispatch(getExerciseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}