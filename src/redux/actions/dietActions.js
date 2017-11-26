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
        return http.get('https://get-fit-server.herokuapp.com/api/getDiets')
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
        let traineeId = getState().trainee.form.traineeId
        if(!traineeId){
            return
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getDietByTrainee/' + traineeId)
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
        form.trainee = getState().trainee.form.traineeId
        form.date = Date()
        return http.post('https://get-fit-server.herokuapp.com/api/addDiet',form)
        .then ( 
            response => {
                dispatch(getDietByTrainee())
                console.log('Success: ' + response)
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
        return http.put('https://get-fit-server.herokuapp.com/api/deleteDiet/'+id, diet)
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
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteDiet/'+id)
        .then ( 
            response => {
                dispatch(getDietByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error removeDiet: ' + error)
        )
    }
}