import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as exerciseActions from 'redux/actions/exerciseActions'
import Exercise from '../display/Exercise';

function mapStateToProps(state) {
    return {
    	form: state.exercise.form,
        exerciseList: state.exercise.exerciseList,
    	authenticated: state.exercise.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( exerciseActions.updateInputField(field, value) )
        },
        addExercise(e){
            e.preventDefault();
            dispatch( exerciseActions.addExercise() )
        },
        removeExercise(id){
            dispatch( exerciseActions.removeExercise(id) )
        },
        saveExercise(id){
            dispatch( exerciseActions.updateExercise(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Exercise)

