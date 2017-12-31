import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import moment from 'moment'
import * as systemActions from 'redux/actions/systemActions'
import * as scheduledExerciseActions from 'redux/actions/scheduledExerciseActions'
import * as traineeActions from 'redux/actions/traineeActions'
import ScheduledExerciseList from '../display/ScheduledExerciseList';

class ScheduledExerciseListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        // this.props.getTraineeScheduledExercises()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId || this.props.form.weekDay != prevProps.form.weekDay){
         this.props.getTraineeScheduledExercises()
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
    let scheduledExerciseList = state.scheduledExercise.scheduledExerciseList ? state.scheduledExercise.scheduledExerciseList : []
    let weekDays = [{value:1,label:'ראשון'}, {value:2,label:"שני"}, {value:3,label:"שלישי"}, {value:4,label:"רביעי"}, {value:5,label:"חמישי"}, {value:6,label:"שישי"}, {value:7,label:"שבת"}]
    // weekDays = scheduledExerciseList.map(exercise=>{
    //     let weekday = R.find(R.propEq('value',exercise.weekDay))(weekDays)
    //     return weekday
    // })
    let weekNumber = moment().isoWeek();
    let test = moment().isoWeek(weekNumber);
    let daylList = R.filter(R.propEq('weekDay',state.scheduledExercise.currentDay))(scheduledExerciseList)
    return {
        form: state.scheduledExercise.form,
        scheduledExerciseList: daylList,
        traineeId: state.trainee.form.traineeId,
        modalOpen:state.system.modalOpen["scheduledExercise"],
        traineeList: traineeOptions,
        weekDays: weekDays,
        currentDay: state.scheduledExercise.currentDay,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("scheduledExercise"))
        },
        onInputFieldChange(field, value){
            dispatch( scheduledExerciseActions.updateInputField(field, value) )
        },
        setCurrentDay(day){
            dispatch( scheduledExerciseActions.setCurrentDay(day) )
        },
        getTraineeScheduledExercisesByDay(){
            dispatch( scheduledExerciseActions.getTraineeScheduledExercisesByDay() )
        },
        getTraineeScheduledExercises(){
            dispatch( scheduledExerciseActions.getTraineeScheduledExercises() )
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

