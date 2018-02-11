import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as sessionNameActions from 'redux/actions/sessionNameActions'
import * as traineeActions from 'redux/actions/traineeActions'
import SessionNameList from '../display/SessionNameList';

class SessionNameListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getSessionNameByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getSessionNameByTrainee()
      }
    }

    render() {
        return <SessionNameList{...this.props}/>
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
        modalOpen:state.system.modalOpen["sessionName"],
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
        toggleModal(){
            dispatch(systemActions.toggleModal("sessionName"))
        },
        toggleCheckbox(field, sessionNameId, value){
            dispatch(sessionNameActions.toggleCheckbox(sessionNameId, value))
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

export default connect( mapStateToProps, mapDispatchToProps )(SessionNameListComponent)

