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
        let trainee = R.find(R.propEq('_id', traineeId))(getState().trainee.traineeList);
        if(trainee){
            dispatch({
                type: types.SET_CURRENT_TRAINEE,
                trainee: trainee
            })
        } else{
                dispatch(getTrainee(traineeId))
        }
    }
    return 
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
        return http.get('https://get-fit-server.herokuapp.com/api/getTrainee/' + id)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setCurrentTrainee(id))
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
        return http.get('https://get-fit-server.herokuapp.com/api/getTrainees')
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
        let traineeId = getState().trainee.form.traineeId
        return http.get('https://get-fit-server.herokuapp.com/api/getTraineeTrainingPackageByTrainee/' + traineeId)
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
        let form = getState().trainee.form
        return http.post('https://get-fit-server.herokuapp.com/api/addTrainee',form)
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
            trainee : getState().trainee.form.traineeId,
            amount: trainingPackage.amount,
            name: trainingPackage.name,
            sessions: trainingPackage.sessions,
            date:Date(),
            quantity: getState().trainingPackage.form.quantity,
            percent: getState().trainingPackage.form.percent,
        }
        return http.post('https://get-fit-server.herokuapp.com/api/addTraineeTrainingPackage',form)
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
        return http.put('https://get-fit-server.herokuapp.com/api/updateTrainee/'+id, form)
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
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteTrainee/'+id)
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
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteTraineeTrainingPackage/'+id)
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