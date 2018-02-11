import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import TraineeTrainingPackageList from '../display/TraineeTrainingPackageList';

class TraineeTrainingPackageListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getTraineePackageList()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getTraineePackageList()
      }
    }

    render() {
        return <TraineeTrainingPackageList{...this.props}/>
    }
}

function mapStateToProps(state) {
	let trainingPackageOptions = state.trainingPackage.trainingPackageList.map( trainingPackage => {
        return { value:trainingPackage._id, label: trainingPackage.name }
    })
    let traineeId = state.trainee.currentTrainee._id
    let traineePackageList = state.trainee.traineePackageMap[traineeId] ? state.trainee.traineePackageMap[traineeId] : []
    let trainingPackageId   = state.trainingPackage.form.trainingPackageId
    let currentPackcage = R.find(R.propEq('_id',trainingPackageId))(state.trainingPackage.trainingPackageList)
    currentPackcage = currentPackcage ? currentPackcage : {}
    return {
        quantity: state.trainingPackage.form.quantity,
    	percent: state.trainingPackage.form.percent,
    	traineePackageList: traineePackageList,
        traineeId: state.trainee.currentTrainee._id,
        trainingPackageList: trainingPackageOptions,
        trainingPackageId: trainingPackageId,
        currentPackcage:currentPackcage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeTraineeTrainingPackage(id){
            dispatch( traineeActions.removeTraineeTrainingPackage(id) )
        },
        onInputFieldChange(field, value){
            dispatch( trainingPackageActions.updateInputField(field, value) )
        },
        setCurrentTrainingPackage(field, trainingPackageId){
            dispatch( trainingPackageActions.setCurrentTrainingPackage(trainingPackageId) )
        },
        getTraineePackageList(){
            dispatch( traineeActions.getTraineePackageList() )
        },
        addTraineeTrainingPackage(e){
            e.preventDefault();
            dispatch( traineeActions.addTraineeTrainingPackage() )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeTrainingPackageListComponent)

