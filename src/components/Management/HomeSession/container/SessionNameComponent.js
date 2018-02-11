import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionNameActions from 'redux/actions/sessionNameActions'
import * as traineeActions from 'redux/actions/traineeActions'
import SessionName from '../display/SessionName';

class SessionNameComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getSessionNameByTrainee()
      }
    }

    render() {
        return <SessionName{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        sessionNameList: state.sessionName.sessionNameList,
        form: state.sessionName.form,
        traineeId: state.trainee.currentTrainee._id,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( sessionNameActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getSessionNameByTrainee(){
            dispatch( sessionNameActions.getSessionNameByTrainee() )
        },
        removeSessionName(id){
            dispatch( sessionNameActions.removeSessionName(id) )
        },
        editSessionName(id){
            dispatch( sessionNameActions.updateSessionName(id) )
        },
        addSessionName(e){
            e.preventDefault();
            dispatch( sessionNameActions.addSessionName() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(SessionNameComponent)

