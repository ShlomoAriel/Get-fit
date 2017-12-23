import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeStatusActions from 'redux/actions/traineeStatusActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeStatus from '../display/TraineeStatus';

class TraineeStatusComponent extends React.Component {
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
        return <TraineeStatus{...this.props}/>
    }
}

function mapStateToProps(state, ownProps) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        traineeStatusList: state.traineeStatus.traineeStatusList,
        form: state.traineeStatus.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        modalOpen:state.system.modalOpen,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onInputFieldChange(field, value){
            dispatch( traineeStatusActions.updateInputField(field, value) )
        },
        getTraineeStatusByTrainee(){
            dispatch( traineeStatusActions.getTraineeStatusByTrainee() )
        },
        removeTraineeStatus(id){
            dispatch( traineeStatusActions.removeTraineeStatus(id) )
        },
        editTraineeStatus(id){
            dispatch( traineeStatusActions.updateTraineeStatus(id) )
        },
        addTraineeStatus(e){
            e.preventDefault();
            dispatch( traineeStatusActions.addTraineeStatus() )
        },
        holdImages(image){
            let reader = new FileReader();
            // dispatch( traineeStatusActions.updateInputField('initialFile', {}) )
            let initialFile = R.clone(image[0])
            // dispatch( traineeStatusActions.updateInputField('initialFile', e.target.files[0]) )
            reader.onloadend = () => {
                let readerResult = R.clone(reader.result)
                // dispatch( traineeStatusActions.updateInputField('initialFile', initialFile) )
                dispatch( traineeStatusActions.updateInputField('image', readerResult) )
            }

            reader.readAsDataURL(initialFile)
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeStatusComponent)

