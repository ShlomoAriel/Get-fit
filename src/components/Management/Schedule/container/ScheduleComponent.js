import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionActions from 'redux/actions/sessionActions'
import * as sessionNameActions from 'redux/actions/sessionNameActions'
import * as homeSessionActions from 'redux/actions/homeSessionActions'
import Schedule from '../display/Schedule';
import moment from 'moment';

class ScheduleComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getSessionByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getSessionByTrainee()
         this.props.getHomeSessionByTrainee()
         this.props.getSessionNameByTrainee()
      }
    }

    render() {
        return <Schedule{...this.props}/>
    }
}

function mapStateToProps(state) {
    let sessions = state.session.sessionList
    let homeSessions = state.homeSession.homeSessionList
    if(sessions && state.session.sessionType == 'session'){
        sessions = sessions.map(session =>{ return {
            start:new Date(session.start),
            end:new Date(session.end),
            date:new Date(session.date),
            title: session.trainee.firstName + ' ' + session.trainee.lastName + (session.text ? (' ' + session.text): '') + (session.location ? (' ' + session.location.name): ''),
            allDay:session.allDay,
            text:session.text,
            firstName:session.trainee.firstName,
            lastName:session.trainee.lastName,
            _id:session._id,
            trainee:{_id:session.trainee._id},
            allDay:false,
            type:'session',
        }})
    }
    let sessionNameOptions = state.sessionName.sessionNameList.map( sessionName => {
        return { value:sessionName._id, label: sessionName.name }
    })
    if(homeSessions && state.session.sessionType == 'homeSession'){
        sessions = homeSessions.map(homeSession =>{ return {
            start:new Date(homeSession.date),
            end:new Date(homeSession.date),
            date:new Date(homeSession.date),
            trainee:{_id:homeSession.trainee._id},
            sessionName:{_id:homeSession.sessionName._id},
            _id:homeSession._id,
            title:(homeSession.sessionName ? homeSession.sessionName.name: '') + ' ' + homeSession.trainee.firstName + ' ' + homeSession.trainee.lastName,
            allDay:true,
            type:'homeSession',
        }})
    }

    return {
        homeSessionForm: state.homeSession.form,
        traineeId: state.trainee.currentTrainee._id,
        modalOpen:state.system.modalOpen["session"],
        sessionNameList: sessionNameOptions,
        sessionType:state.session.sessionType,
        sessions:sessions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( sessionActions.updateInputField(field, value) )
        },
        onHomeSessionInputFieldChange(field, value){
            dispatch( homeSessionActions.updateInputField(field, value) )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("session"))
        },
        setSessionType(type){
            dispatch( sessionActions.setSessionType(type) )
        },
        getSessionByTrainee(){
            dispatch( sessionActions.getSessionByTrainee() )
        },
        getHomeSessionByTrainee(){
            dispatch( homeSessionActions.getHomeSessionByTrainee() )
        },
        removeSession(id){
            dispatch( sessionActions.removeSession(id) )
        },
        editSession(id){
            dispatch( sessionActions.updateSession(id) )
        },
        addSession(e){
            e.preventDefault();
            dispatch( sessionActions.addSession() )
        },
        onSelectSessionSlot(slot){
            dispatch( sessionActions.updateInputField('start', moment(slot.start)) )
            dispatch( sessionActions.updateInputField('date', moment(slot.start)) )
            dispatch( sessionActions.updateInputField('_id', slot._id) )
            dispatch( sessionActions.updateInputField('end', moment(slot.end)) )    
            dispatch(systemActions.toggleModal("session"))
        },
        onSelectHomeSessionSlot(slot){
            dispatch( homeSessionActions.updateInputField('date', moment(slot.start)) )
            dispatch(systemActions.toggleModal("session"))
        },
        onSelectEvent(event, e){
            if(event.type == 'session'){
                dispatch( sessionActions.updateInputField('start', moment(event.start)) )
                dispatch( sessionActions.updateInputField('text', event.text) )
                dispatch( sessionActions.updateInputField('date', moment(event.start)) )
                dispatch( sessionActions.updateInputField('end', moment(event.end)) )
                dispatch( sessionActions.updateInputField('trainee', event.trainee) )
                dispatch( sessionActions.updateInputField('_id', event._id) )
            } else if(event.type == 'homeSession'){
                dispatch( homeSessionActions.updateInputField('_id', event._id) )
                dispatch( homeSessionActions.updateInputField('date', moment(event.date)) )
            }
            dispatch(systemActions.toggleModal("session"))
        },
        getSessionNameByTrainee(){
            dispatch( sessionNameActions.getSessionNameByTrainee() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduleComponent)

