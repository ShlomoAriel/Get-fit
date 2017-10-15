import * as types from './actionTypes'
import axios from 'axios';
import * as http from '../../utils/axiosWrapper'

export function updateInputField(field, value){
    return {
        type: types.UPDATE_TRAINING_PACKAGE_FIELD,
        field: field, 
        value: value
    }
}

export function setTrainingPackageList(trainingPackageList){
    return {
        type: types.SET_TRAINING_PACKAGE_LIST,
        trainingPackageList: trainingPackageList
    }
}

export function getTrainingPackageList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getTrainingPackages')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTrainingPackageList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
export function addTrainingPackage(){
    return (dispatch, getState) => {
        let form = getState().trainingPackage.form
        return http.post('https://get-fit-server.herokuapp.com/api/addTrainingPackage',form)
        .then ( 
            response => {
                dispatch(getTrainingPackageList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeTrainingPackage(id, trainingPackage){
    return (dispatch, getState) => {
        let form = getState().trainingPackage.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteTrainingPackage/'+id, trainingPackage)
        .then (
            response => {
                dispatch(getTrainingPackageList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTrainingPackage(id){
    return (dispatch, getState) => {
        let form = getState().trainingPackage.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteTrainingPackage/'+id)
        .then ( 
            response => {
                dispatch(getTrainingPackageList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}