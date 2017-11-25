import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as exerciseActions from 'redux/actions/exerciseActions'
import ExerciseList from '../display/ExerciseList';

function mapStateToProps(state) {
    return {
        exerciseList: state.exercise.exerciseList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeExercise(id){
            dispatch( exerciseActions.removeExercise(id) )
        },
        editExercise(id){
            dispatch( exerciseActions.updateExercise(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ExerciseList)

