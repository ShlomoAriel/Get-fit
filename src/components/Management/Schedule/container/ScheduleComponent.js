import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionActions from 'redux/actions/sessionActions'
import * as webUIActions from 'redux/actions/webUIActions'
import * as sessionNameActions from 'redux/actions/sessionNameActions'
import * as homeSessionActions from 'redux/actions/homeSessionActions'
import Schedule from '../display/Schedule';
import moment from 'moment';
import * as scheduleUtils from 'utils/scheduleUtils'

class ScheduleComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.setSessionStatus = this.setSessionStatus.bind(this)
        this.setSessionType = this.setSessionType.bind(this)
    }
    state = {
        traineeId: null,
        viewAll: true,
        sessionType: 'session',
        sessions: [],
    }
    componentWillMount(){
        this.state.sessions = this.props.allSessions
        this.props.getSessionList()
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.allSessions != prevProps.allSessions || this.props.currentTrainee != prevProps.currentTrainee){
            this.setSessionStatus(this.state.viewAll, this.state.sessionType)
        }
    }
    setSessionType(sessionType){
        this.setState({sessionType})
        this.setSessionStatus(this.state.viewAll)
    }
    setSessionStatus(viewAll, sessionType){
        this.setState({viewAll, sessionType})
        this.state.sessions = scheduleUtils.getScheduleSessions(this.props.allSessions, this.props.currentTrainee, sessionType, this.props.isAdmin, viewAll)
        return true
    }
    render() {
        return <Schedule
            {...this.props}
            setSessionStatus={this.setSessionStatus}
            setSessionType={this.setSessionType}
            sessionType={this.state.sessionType}
            sessions={this.state.sessions}
            viewAll={this.state.viewAll}
            />
    }
}

function mapStateToProps(state) {
    // let sessions = scheduleUtils.getScheduleSessions(state)
    let sessionNameOptions = state.sessionName.sessionNameList.map( sessionName => {
        return { value:sessionName._id, label: sessionName.name }
    })
    return {
        isAdmin: state.login.isAdmin,
        currentTrainee: state.trainee.currentTrainee,
        homeSessionForm: state.homeSession.form,
        modalOpen:state.system.modalOpen["session"],
        sessionNameList: sessionNameOptions,
        allSessions:state.session.sessionList,
        isOpen: state.webUI.isOpen['schedule'],
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
        // setSessionType(type){
        //     dispatch( sessionActions.setSessionType(type) )
        // },
        getSessionByTraineeId(id){
            dispatch( sessionActions.getSessionByTraineeId(id) )
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
        getSessionList(){
            dispatch( sessionActions.getSessionList() )
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
        getSessionByTrainee(id){
            dispatch( sessionActions.getSessionyTraineeId(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ScheduleComponent)

