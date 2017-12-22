import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionActions from 'redux/actions/sessionActions'
import * as traineeActions from 'redux/actions/traineeActions'
import Session from '../display/Session';

class SessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getSessionByTrainee()
      }
    }

    render() {
        return <Session{...this.props}/>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( sessionActions.updateInputField(field, value) )
        },
        onChange(test){
            alert(test)
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
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
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(SessionComponent)

