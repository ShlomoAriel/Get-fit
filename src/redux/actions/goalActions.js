import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_GOAL_FIELD,
        field: field, 
        value: value
    }
}

export function setGoalList(goalList){
    return {
        type: types.SET_GOAL_LIST,
        goalList: goalList
    }
}

export function setCurrentGoal(goalId){
    return {
        type: types.SET_CURRENT_GOAL,
        goalId: goalId
    }
}

export function getGoalList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getGoals')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setGoalList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getGoalByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.form.traineeId
        return http.get('https://get-fit-server.herokuapp.com/api/getGoalByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setGoalList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addGoal(){
    return (dispatch, getState) => {
        let form = R.clone(getState().goal.form)
        form.trainee = getState().trainee.form.traineeId
        form.date = Date()
        form.achieved = false
        return http.post('https://get-fit-server.herokuapp.com/api/addGoal',form)
        .then ( 
            response => {
                dispatch(getGoalByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeGoal(id, goal){
    return (dispatch, getState) => {
        let form = getState().goal.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteGoal/'+id, goal)
        .then (
            response => {
                dispatch(getGoalByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeGoal(id){
    return (dispatch, getState) => {
        let form = getState().goal.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteGoal/'+id)
        .then ( 
            response => {
                dispatch(getGoalByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}