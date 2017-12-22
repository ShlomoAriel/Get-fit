import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionActions from 'redux/actions/sessionActions'
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
      }
    }

    render() {
        return <Schedule{...this.props}/>
    }
}

function mapStateToProps(state) {
    let sessions = state.session.sessionList
    if(sessions){
        sessions = sessions.map(session =>{ return {
            start:new Date(session.start),
            end:new Date(session.end),
            title:session.title,
            allDay:session.allDay
        }})
    }

    return {
        traineeId: state.trainee.form.traineeId,
        modalOpen:state.system.modalOpen["session"],
        sessions:sessions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( sessionActions.updateInputField(field, value) )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("session"))
        },
        getSessionByTrainee(){
            dispatch( sessionActions.getSessionByTrainee() )
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
        onSelectSlot(slot){
            dispatch( sessionActions.updateInputField('start', moment(slot.start)) )
            dispatch( sessionActions.updateInputField('date', moment(slot.start)) )
            dispatch( sessionActions.updateInputField('end', moment(slot.end)) )
            dispatch(systemActions.toggleModal("session"))
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduleComponent)

