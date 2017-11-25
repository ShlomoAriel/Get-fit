import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeStatusActions from 'redux/actions/traineeStatusActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeStatus from '../display/TraineeStatus';

function mapStateToProps(state, ownProps) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        traineeStatusList: state.traineeStatus.traineeStatusList,
        form: state.traineeStatus.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( traineeStatusActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
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
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeStatus)

