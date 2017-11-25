import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import TrainingPackage from '../display/TrainingPackage';

function mapStateToProps(state) {
    return {
    	form: state.trainingPackage.form,
        trainingPackageList: state.trainingPackage.trainingPackageList,
    	authenticated: state.trainingPackage.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( trainingPackageActions.updateInputField(field, value) )
        },
        addTrainingPackage(e){
            e.preventDefault();
            dispatch( trainingPackageActions.addTrainingPackage() )
        },
        removeTrainingPackage(id){
            dispatch( trainingPackageActions.removeTrainingPackage(id) )
        },
        saveTrainingPackage(id){
            dispatch( trainingPackageActions.updateTrainingPackage(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TrainingPackage)

