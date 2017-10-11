import * as types from './actionTypes'

export function toggleMenu(){
    return {
        type: types.TOGGLE_MENU
    }
}

export function setCurrentTab(tab){
    return {
        type: types.SET_CURRENT_TAB,
        tab: tab
    }
}

export function updateInputField(state, field, value){
    return {
        type: types.UPDATE_INPUT_FIELD,
        field: field, 
        value: value
    }
}