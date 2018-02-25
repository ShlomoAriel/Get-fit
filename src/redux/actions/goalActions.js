var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = remoteUrl

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

export function setTraineeGoalList(goalList, traineeId){
    return {
        type: types.SET_TRAINEE_GOAL_LIST,
        goalList: goalList,
        traineeId: traineeId,
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
        return http.get(currentUrl + '/api/getGoals')
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
        let traineeId = getState().trainee.currentTrainee._id
        if(!traineeId){
            return
        }
        return http.get(currentUrl + '/api/getTraineeGoals/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineeGoalList(response.data, traineeId))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addGoal(name){
    return (dispatch, getState) => {
        let form = {name:name}
        return http.post(currentUrl + '/api/addGoal',form)
        .then ( 
            response => {
                dispatch(getGoalList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addTraineeGoals(values){
    return (dispatch, getState) => {
        let form = R.clone(getState().goal.form)
        form.trainee = getState().trainee.currentTrainee._id
        form.date = Date()
        form.achieved = false
        form.values = values
        if(form.text){
            form.values += form.values != '' ? ',' + form.text : form.text
        }
        return http.post(currentUrl + '/api/addTraineeGoals',form)
        .then ( 
            response => {
                let newTraineeGoal = [...(getState().trainee.currentTrainee.TraineeGoal), ...response.data]
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'TraineeGoal',
                    list: newTraineeGoal
                })
                console.log('Success: ' + newTraineeGoal)
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
        return http.put(currentUrl + '/api/deleteGoal/'+id, goal)
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

export function toggleCheckbox(id, value){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.currentTrainee._id 
        let goalList = getState().goal.traineeGoalMap[traineeId]
        let goal = R.clone(R.find(R.propEq('_id',id))(goalList))
        goal.achieved = value
        return http.put(currentUrl + '/api/updateTraineeGoal/'+id, goal)
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
        return http.remove(currentUrl + '/api/deleteGoal/'+id)
        .then ( 
            response => {
                dispatch(getGoalList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTraineeGoal(id){
    return (dispatch, getState) => {
        let form = getState().goal.form
        const jwt = localStorage.getItem('token');
        return http.remove(currentUrl + '/api/deleteTraineeGoal/'+id)
        .then ( 
            response => {
                let newTraineeGoals = (getState().trainee.currentTrainee.TraineeGoal).filter( item => item._id != id )
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'TraineeGoal',
                    list: newTraineeGoals
                })
                console.log('Success: ' + newTraineeGoals)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}