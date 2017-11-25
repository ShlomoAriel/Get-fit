import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as scheduledExerciseActions from 'redux/actions/scheduledExerciseActions'
import * as traineeActions from 'redux/actions/traineeActions'
import ScheduledExerciseList from '../display/ScheduledExerciseList';

class ScheduledExerciseListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId || this.props.form.weekDay != prevProps.form.weekDay){
         this.props.getTraineeScheduledExercisesByDay()
      }
    }

    render() {
        return <ScheduledExerciseList{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        form: state.scheduledExercise.form,
        scheduledExerciseList: state.scheduledExercise.scheduledExerciseList,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        weekDays: [{value:1,label:"ראשון"}, {value:2,label:"שני"}, {value:3,label:"שלישי"}, {value:4,label:"רביעי"}, {value:5,label:"חמישי"}, {value:6,label:"שישי"}, {value:7,label:"שבע"},],


    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        onInputFieldChange(field, value){
            dispatch( scheduledExerciseActions.updateInputField(field, value) )
        },
        getTraineeScheduledExercisesByDay(){
            dispatch( scheduledExerciseActions.getTraineeScheduledExercisesByDay() )
        },
        removeScheduledExercise(id){
            dispatch( scheduledExerciseActions.removeScheduledExercise(id) )
        },
        editScheduledExercise(id){
            dispatch( scheduledExerciseActions.updateScheduledExercise(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduledExerciseListComponent)

