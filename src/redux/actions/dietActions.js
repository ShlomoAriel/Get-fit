var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = remoteUrl
import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_DIET_FIELD,
        field: field, 
        value: value
    }
}

export function setDietList(dietList){
    return {
        type: types.SET_DIET_LIST,
        dietList: dietList
    }
}

export function setCurrentDiet(dietId){
    return {
        type: types.SET_CURRENT_DIET,
        dietId: dietId
    }
}

export function getDietList(){
    return (dispatch, getState) => {
        return http.get(currentUrl + '/api/getDiets')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setDietList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('getDietList in: ' + error)
        )
    }
}

export function getDietByTrainee(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.currentTrainee._id
        if(!traineeId){
            return
        }
        return http.get(currentUrl + '/api/getDietByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setDietList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('getDietByTrainee in: ' + error)
        )
    }
}

export function addDiet(){
    return (dispatch, getState) => {
        let form = R.clone(getState().diet.form)
        form.trainee = getState().trainee.currentTrainee._id
        form.date = Date()
        return http.post(currentUrl + '/api/addDiet',form)
        .then ( 
            response => {
                let newDiet = [...(getState().trainee.currentTrainee.Diet), response.data]
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'Diet',
                    list: newDiet
                })
                console.log('Success: ' + newDiet)
            }
        )
        .catch( 
            error => 
                console.log('error addDiet: ' + error)
        )
    }
}

export function updaeDiet(id, diet){
    return (dispatch, getState) => {
        let form = getState().diet.form
        return http.put(currentUrl + '/api/deleteDiet/'+id, diet)
        .then (
            response => {
                dispatch(getDietByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error updaeDiet: ' + error)
        )
    }
}

export function removeDiet(id){
    return (dispatch, getState) => {
        let form = getState().diet.form
        const jwt = localStorage.getItem('token');
        return http.remove(currentUrl + '/api/deleteDiet/'+id)
        .then ( 
            response => {
                let newDiet = (getState().trainee.currentTrainee.Diet).filter( item => item._id != id )
                dispatch({
                    type: types.SET_CURRENT_TRAINEE_LIST,
                    listName: 'Diet',
                    list: newDiet
                })
                console.log('Success: ' + newDiet)
            }
        )
        .catch( 
            error => 
                console.log('error removeDiet: ' + error)
        )
    }
}