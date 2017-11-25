import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import Trainee from '../display/Trainee';

function mapStateToProps(state) {
    return {
    	form: state.trainee.form,
        traineeList: state.trainee.traineeList,
    	authenticated: state.trainee.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( traineeActions.updateInputField(field, value) )
        },
        addTrainee(e){
            e.preventDefault();
            dispatch( traineeActions.addTrainee() )
        },
        removeTrainee(id){
            dispatch( traineeActions.removeTrainee(id) )
        },
        saveTrainee(id){
            dispatch( traineeActions.updateTrainee(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Trainee)

