import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_PAYMENT_FIELD,
        field: field, 
        value: value
    }
}

export function setPaymentList(paymentList){
    return {
        type: types.SET_PAYMENT_LIST,
        paymentList: paymentList
    }
}

export function setCurrentPayment(paymentId){
    return {
        type: types.SET_CURRENT_PAYMENT,
        paymentId: paymentId
    }
}

export function getPaymentByTrainee(local){
    return (dispatch, getState) => {
        let traineeId = getState().trainee.currentTrainee._id
        if(local && getState().payment.paymentMap[traineeId]){
            return
        }
        return http.get('https://get-fit-server.herokuapp.com/api/getPaymentByTrainee/' + traineeId)
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setPaymentMap(response.data, traineeId))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function setPaymentMap(paymentList, traineeId){
    return {
        type: types.SET_PAYMENT_MAP,
        traineeId: traineeId,
        paymentList: paymentList
    }
}

export function getPaymentList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getPayments')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setPaymentList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addPayment(){
    return (dispatch, getState) => {
        let form = R.clone(getState().payment.form)
        form.trainee = getState().trainee.currentTrainee._id
        form.date = Date()
        form.achieved = false
        return http.post('https://get-fit-server.herokuapp.com/api/addPayment',form)
        .then ( 
            response => {
                dispatch(getPaymentByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaePayment(id, payment){
    return (dispatch, getState) => {
        let form = getState().payment.form
        return http.put('https://get-fit-server.herokuapp.com/api/deletePayment/'+id, payment)
        .then (
            response => {
                dispatch(getPaymentByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removePayment(id){
    return (dispatch, getState) => {
        let form = getState().payment.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deletePayment/'+id)
        .then ( 
            response => {
                dispatch(getPaymentByTrainee())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}