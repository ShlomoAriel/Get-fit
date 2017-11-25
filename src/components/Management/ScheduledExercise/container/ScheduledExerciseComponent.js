import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as scheduledExerciseActions from 'redux/actions/scheduledExerciseActions'
import * as traineeActions from 'redux/actions/traineeActions'
import ScheduledExercise from '../display/ScheduledExercise';

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let exerciseOptions = state.exercise.exerciseList.map( exercise => {
        return { value:exercise._id, label: exercise.name }
    })
    return {
    	form: state.scheduledExercise.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        exerciseList:exerciseOptions,
        scheduledExerciseList: state.scheduledExercise.scheduledExerciseList,
        weekDays: [{value:1,label:"ראשון"}, {value:2,label:"שני"}, {value:3,label:"שלישי"}, {value:4,label:"רביעי"}, {value:5,label:"חמישי"}, {value:6,label:"שישי"}, {value:7,label:"שבע"},],
    	authenticated: state.scheduledExercise.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( scheduledExerciseActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        addScheduledExercise(e){
            e.preventDefault();
            dispatch( scheduledExerciseActions.addScheduledExercise() )
        },
        removeScheduledExercise(id){
            dispatch( scheduledExerciseActions.removeScheduledExercise(id) )
        },
        saveScheduledExercise(id){
            dispatch( scheduledExerciseActions.updateScheduledExercise(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduledExercise)

