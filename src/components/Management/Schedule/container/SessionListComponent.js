import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionActions from 'redux/actions/sessionActions'
import * as traineeActions from 'redux/actions/traineeActions'
import SessionList from '../display/SessionList';

class SessionListComponent extends React.Component {
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
        return <SessionList{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        sessionList: state.session.sessionList,
        form: state.session.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        modalOpen:state.system.modalOpen["session"],
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( sessionActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getSessionByTrainee(){
            dispatch( sessionActions.getSessionByTrainee() )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("session"))
        },
        toggleCheckbox(field, sessionId, value){
            dispatch(sessionActions.toggleCheckbox(sessionId, value))
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
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(SessionListComponent)

