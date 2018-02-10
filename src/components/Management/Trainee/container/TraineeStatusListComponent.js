import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeStatusActions from 'redux/actions/traineeStatusActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeStatusList from '../display/TraineeStatusList';

class TraineeStatusListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getTraineeStatusByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getTraineeStatusByTrainee()
      }
    }

    render() {
        return <TraineeStatusList{...this.props}/>
    }
}

function mapStateToProps(state, ownProps) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        isAdmin: state.login.isAdmin,
        traineeStatusList: state.traineeStatus.traineeStatusList ? state.traineeStatus.traineeStatusList : [],
        form: state.traineeStatus.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        modalOpen:state.system.modalOpen["traineeStatus"],
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( traineeStatusActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getTraineeStatusByTrainee(){
            dispatch( traineeStatusActions.getTraineeStatusByTrainee() )
        },
        removeTraineeStatus(id){
            dispatch( traineeStatusActions.removeTraineeStatus(id) )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("traineeStatus"))
        },
        editTraineeStatus(id){
            dispatch( traineeStatusActions.updateTraineeStatus(id) )
        },
        addTraineeStatus(e){
            e.preventDefault();
            dispatch( traineeStatusActions.addTraineeStatus() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeStatusListComponent)

