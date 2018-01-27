import * as types from './actionTypes'
import * as http from '../../utils/axiosWrapper'
import axios from 'axios'
import R from 'ramda'
export function updateInputField(field, value){
    return {
        type: types.UPDATE_LOCATION_FIELD,
        field: field, 
        value: value
    }
}

export function setLocationList(locationList){
    return {
        type: types.SET_LOCATION_LIST,
        locationList: locationList
    }
}

export function setCurrentLocation(locationId){
    return {
        type: types.SET_CURRENT_LOCATION,
        locationId: locationId
    }
}

export function getLocationList(){
    return (dispatch, getState) => {
        return http.get('https://get-fit-server.herokuapp.com/api/getLocations')
        .then ( 
            response => {
                console.log('Success: ' + response)
                dispatch(setLocationList(response.data))
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function addLocation(){
    return (dispatch, getState) => {
        let form = R.clone(getState().location.form)
        return http.post('https://get-fit-server.herokuapp.com/api/addLocation',form)
        .then ( 
            response => {
                dispatch(getLocationList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function updaeLocation(id, location){
    return (dispatch, getState) => {
        let form = getState().location.form
        return http.put('https://get-fit-server.herokuapp.com/api/deleteLocation/'+id, location)
        .then (
            response => {
                dispatch(getLocationList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}

export function removeLocation(id){
    return (dispatch, getState) => {
        let form = getState().location.form
        const jwt = localStorage.getItem('token');
        return http.remove('https://get-fit-server.herokuapp.com/api/deleteLocation/'+id)
        .then ( 
            response => {
                dispatch(getLocationList())
                console.log('Success: ' + response)
            }
        )
        .catch( 
            error => 
                console.log('error loging in: ' + error)
        )
    }
}