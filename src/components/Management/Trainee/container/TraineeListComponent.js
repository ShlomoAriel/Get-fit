import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeList from '../display/TraineeList';

function mapStateToProps(state) {
    return {
        traineeList: state.trainee.traineeList,
        currentTraineeId: state.trainee.form._id,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeTrainee(id){
            dispatch( traineeActions.removeTrainee(id) )
        },
        setEeditTrainee(id){
            dispatch( traineeActions.setEeditTrainee(id) )
        },
        updaeTrainee(id){
            dispatch( traineeActions.updaeTrainee(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeList)

