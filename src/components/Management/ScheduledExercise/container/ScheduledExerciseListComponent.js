import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import moment from 'moment'
import * as systemActions from 'redux/actions/systemActions'
import * as scheduledExerciseActions from 'redux/actions/scheduledExerciseActions'
import * as sessionActions from 'redux/actions/sessionActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as homeSessionActions from 'redux/actions/homeSessionActions'
import * as sessionNameActions from 'redux/actions/sessionNameActions'
import ScheduledExerciseList from '../display/ScheduledExerciseList';
import * as modelUtils from 'utils/modelUtils'
class ScheduledExerciseListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        // this.props.getHomeSessionByTrainee()
        // this.props.getSessionByTrainee()
        //  this.props.getTraineeScheduledExercises()
    }
    componentDidUpdate(prevProps, prevState) {
      // if(this.props.traineeId != prevProps.traineeId || this.props.form.weekDay != prevProps.form.weekDay){
         // this.props.getHomeSessionByTrainee()
         // this.props.getSessionByTrainee()
         // this.props.getTraineeScheduledExercises()
      // }
    }

    render() {
        return <ScheduledExerciseList{...this.props}/>
    }
}

function mapStateToProps(state) {
    let currentTrainee = state.trainee.currentTrainee
    let scheduledExerciseList = modelUtils.populateModelList(currentTrainee.ScheduledExercise, 'exercise', state.exercise.exerciseList)
    let homeSessions = modelUtils.populateModelList(currentTrainee.HomeSesssion, 'sessionName', currentTrainee.SessionName)
    let sessions = modelUtils.populateModelList(currentTrainee.Session, 'location', state.location.locationList)
    
    let sessionNameOptions = []
    if(currentTrainee.SessionName){
        sessionNameOptions = currentTrainee.SessionName.map( sessionName => {
            return { value:sessionName._id, label: sessionName.name }
        })
    }
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    
    let weekDays = [{value:1,label:'ראשון'}, {value:2,label:"שני"}, {value:3,label:"שלישי"}, {value:4,label:"רביעי"}, {value:5,label:"חמישי"}, {value:6,label:"שישי"}, {value:7,label:"שבת"}]
    let weekDayNames = [{value:0,label:'ראשון'}, {value:1,label:"שני"}, {value:2,label:"שלישי"}, {value:3,label:"רביעי"}, {value:4,label:"חמישי"}, {value:5,label:"שישי"}, {value:6,label:"שבת"}]
    let currentDate = moment(weekStart).add(state.scheduledExercise.scheduleWeek, 'weeks')
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');
    let days = []
    let daylList = []
    let exerciseList = []
    if(homeSessions){
        for (var i = 0; i <= 6; i++) {
            let day = moment(weekStart).add(i, 'days').format()
            let newDay = {name:weekDayNames[i].label+' '+ moment(day).format('DD/MM'), value:i+1, date:moment(day)}
            homeSessions.forEach(homeSession =>{
                if(moment(day).isSame(moment(homeSession.date), 'day')){
                    newDay['homeSession'] = homeSession.sessionName.name
                    newDay['homeSessionValue'] = homeSession.sessionName._id
                }
            })
            sessions.forEach(session =>{
                if(moment(day).isSame(moment(session.date), 'day')){
                    newDay['session'] = ' אימון אישי\n' + moment(session.start).format('HH:mm')+' - '+moment(session.end).format('HH:mm')
                    // delete newDay['homeSessionValue']
                }
            })
            // newDay['text'] = newDay['text'] ? newDay['text'] : ''
            days.push(newDay)
        }
        daylList = R.filter(R.propEq('weekDay',state.scheduledExercise.currentDay))(scheduledExerciseList)
        exerciseList = R.filter(R.propEq('sessionName',state.homeSession.form.sessionName))(scheduledExerciseList)
    }
    return {
        isAdmin: state.login.isAdmin,
        weekStart:weekStart,
        weekEnd:weekEnd,
        form: state.scheduledExercise.form,
        homeSessionForm: state.homeSession.form,
        scheduledExerciseList: exerciseList,
        sessionNameList: sessionNameOptions,
        traineeId: state.trainee.currentTrainee._id,
        modalOpen:state.system.modalOpen["scheduledExercise"],
        traineeList: traineeOptions,
        weekDays: days,
        currentDay: state.scheduledExercise.currentDay,
        scheduleWeek: state.scheduledExercise.scheduleWeek,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        setScheduledWeek(value){
            dispatch( scheduledExerciseActions.setScheduledWeek(value) )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("scheduledExercise"))
        },
        onInputFieldChange(field, value){
            dispatch( scheduledExerciseActions.updateInputField(field, value) )
        },
        onHomeSessionInputFieldChange(field, value){
            dispatch( homeSessionActions.updateInputField(field, value) )
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
        },
        getSessionByTrainee(){
            dispatch( sessionActions.getSessionByTrainee() )
        },
        getHomeSessionByTrainee(){
            dispatch( homeSessionActions.getHomeSessionByTrainee() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduledExerciseListComponent)

