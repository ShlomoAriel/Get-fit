import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeList from '../display/TraineeList';

function mapStateToProps(state) {
    return {
        traineeList: state.trainee.traineeList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeTrainee(id){
            dispatch( traineeActions.removeTrainee(id) )
        },
        editTrainee(id){
            dispatch( traineeActions.updateTrainee(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeList)

