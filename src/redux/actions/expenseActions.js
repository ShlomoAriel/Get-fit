import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_EXPENSE_FIELD,
        field: field, 
        value: value
    }
}

export function setExpenseList(expenseList){
    return {
        type: types.SET_EXPENSE_LIST,
        expenseList: expenseList
    }
}

export function setCurrentExpense(expenseId){
    return {
        type: types.SET_CURRENT_EXPENSE,
        expenseId: expenseId
    }
}

export function getExpenseList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getExpenses')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setExpenseList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addExpense(){
    return (dispatch, getState) => {
        let form = R.clone(getState().expense.form)
        form.date = Date()
        return http.post('https://get-fit-server.herokuapp.com/api/addExpense',form)
        .then ( 
            response => {
                dispatch(getExpenseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeExpense(id, expense){
    return (dispatch, getState) => {
        let form = getState().expense.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteExpense/'+id, expense)
        .then (
            response => {
                dispatch(getExpenseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeExpense(id){
    return (dispatch, getState) => {
        let form = getState().expense.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteExpense/'+id)
        .then ( 
            response => {
                dispatch(getExpenseList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}