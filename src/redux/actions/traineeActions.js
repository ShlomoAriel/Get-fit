var localUrl = "http://localhost:3001"
var remoteUrl = "https://get-fit-server.herokuapp.com"
var currentUrl = remoteUrl

import * as types from './actionTypes'
import R from 'ramda';
import axios from 'axios';
import * as http from '../../utils/axiosWrapper'

export function updateInputField(field, value){
    return {
        type: types.UPDATE_TRAINEE_FIELD,
        field: field, 
        value: value
    }
}

export function setTraineeList(traineeList){
    return {
        type: types.SET_TRAINEE_LIST,
        traineeList: traineeList
    }
}

export function setCurrentTrainee(traineeId){
    return (dispatch, getState) => {
        // let trainee = R.find(R.propEq('_id', traineeId))(getState().trainee.traineeList);
        // if(trainee){
        //     dispatch({
        //         type: types.SET_CURRENT_TRAINEE,
        //         trainee: trainee
        //     })
        // } else{
                dispatch(getTrainee(traineeId))
        // }
    }
}

export function setEeditTrainee(traineeId){
    return (dispatch, getState) => {
        let trainee = R.find(R.propEq('_id', traineeId))(getState().trainee.traineeList);
        if(trainee){
            dispatch({
                type: types.SET_EDIT_TRAINEE,
                trainee: trainee
            })
        } else{
                dispatch(getTrainee(traineeId))
        }
    }
    return 
}

export function setTraineePackageList(packageList, traineeId){
    return {
        type: types.SET_TRAINEE_PACKAGE_LIST,
        traineeId: traineeId,
        packageList: packageList
    }
}

export function getTrainee(id){
    return (dispatch, getState) => {
        if(!id){
            return
        }
        return http.get(currentUrl + '/api/getTrainee/' + id)
        .then ( 
            response => {
                console.log('Success: ' + response)
                if(response.data.trainee){
                    response.data.trainee = {...response.data.trainee, ...response.data.models}
                    dispatch({
                        type: types.SET_CURRENT_TRAINEE,
                        trainee: response.data.trainee
                    })
                }
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function getTraineeList(){
    return (dispatch, getState) => {
        return http.get(currentUrl + '/api/getTrainees')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineeList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
export function getTraineePackageList(){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.currentTrainee._id
        return http.get(currentUrl + '/api/getTraineeTrainingPackageByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setTraineePackageList(response.data, traineeId))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}
export function addTrainee(){
    return (dispatch, getState) => {
        let form = R.clone(getState().trainee.form)
        form.role = '57d2837a13d468481b1fe133'
        return http.post(currentUrl + '/api/addTrainee',form)
        .then ( 
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addTraineeTrainingPackage(){
    return (dispatch, getState) => {
        let trainingPackage = 
        R.find(R.propEq('_id',getState().trainingPackage.form.trainingPackageId))(getState().trainingPackage.trainingPackageList)
        if(!trainingPackage){
            return
        }
        let form = {
            trainee : getState().trainee.currentTrainee._id,
            amount: trainingPackage.amount,
            name: trainingPackage.name,
            sessions: trainingPackage.sessions,
            date:Date(),
            quantity: getState().trainingPackage.form.quantity,
            percent: getState().trainingPackage.form.percent,
        }
        return http.post(currentUrl + '/api/addTraineeTrainingPackage',form)
        .then (
            response => {
                dispatch(getTraineePackageList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeTrainee(id){
    return (dispatch, getState) => {
        let form = getState().trainee.form
        return http.put(currentUrl + '/api/updateTrainee/'+id, form)
        .then (
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTrainee(id){
    return (dispatch, getState) => {
        let form = getState().trainee.form
        const jwt = localStorage.getItem('token');
        return http.remove(currentUrl + '/api/deleteTrainee/'+id)
        .then ( 
            response => {
                dispatch(getTraineeList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeTraineeTrainingPackage(id){
    return (dispatch, getState) => {
        return http.remove(currentUrl + '/api/deleteTraineeTrainingPackage/'+id)
        .then ( 
            response => {
                dispatch(getTraineePackageList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}