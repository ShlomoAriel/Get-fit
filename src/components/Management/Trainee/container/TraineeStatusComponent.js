import React from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeStatusActions from 'redux/actions/traineeStatusActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeStatus from '../display/TraineeStatus';

class TraineeStatusComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.uploadImageToField = this.uploadImageToField.bind(this)
        this.addTraineeStatus = this.addTraineeStatus.bind(this)
    }
    state = {
        image:"{}",
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
        return <TraineeStatus {...this.props}
                    uploadImageToField ={this.uploadImageToField}
                    addTraineeStatus ={this.addTraineeStatus}
        />
    }
    uploadBackImage(acceptedFiles, rejectedFiles){
        this.uploadImageToField(acceptedFiles[0], 'backPhoto')
    }

    uploadImageToField(file, fieldName){
        let image = this.state.image
        let reader = new FileReader()
        let initialFile = R.clone(file[0])
        reader.onloadend = () => {
            let readerResult = R.clone(reader.result)
            image = readerResult
            this.setState({image})
        }
        reader.readAsDataURL(initialFile)
    }
    addTraineeStatus(){
        this.props.userActions.addTraineeStatus(this.state.image)
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
        userActions:  bindActionCreators(traineeStatusActions, dispatch),
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
        // addTraineeStatus(e){
        //     e.preventDefault();
        //     dispatch( traineeStatusActions.addTraineeStatus() )
        // },
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

