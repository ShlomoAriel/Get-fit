import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import TrainingPackageList from '../display/TrainingPackageList';

function mapStateToProps(state) {
    return {
        trainingPackageList: state.trainingPackage.trainingPackageList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeTrainingPackage(id){
            dispatch( trainingPackageActions.removeTrainingPackage(id) )
        },
        editTrainingPackage(id){
            dispatch( trainingPackageActions.updateTrainingPackage(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TrainingPackageList)

