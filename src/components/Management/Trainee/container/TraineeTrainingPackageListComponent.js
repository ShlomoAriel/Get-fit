import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import TraineeTrainingPackageList from '../display/TraineeTrainingPackageList';

function mapStateToProps(state) {
	let trainingPackageOptions = state.trainingPackage.trainingPackageList.map( trainingPackage => {
        return { value:trainingPackage._id, label: trainingPackage.name }
    })
    let traineeId = state.trainee.form.traineeId
    let traineePackageList = state.trainee.traineePackageMap[traineeId] ? state.trainee.traineePackageMap[traineeId] : []
    let trainingPackageId   = state.trainingPackage.form.trainingPackageId
    let currentPackcage = R.find(R.propEq('_id',trainingPackageId))(state.trainingPackage.trainingPackageList)
    currentPackcage = currentPackcage ? currentPackcage : {}
    return {
    	quantity: state.trainingPackage.form.quantity,
    	traineePackageList: traineePackageList,
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
        addTraineeTrainingPackage(e){
            e.preventDefault();
            dispatch( traineeActions.addTraineeTrainingPackage() )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeTrainingPackageList)

