import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as signupActions from 'redux/actions/signupActions'
import Signup from '../display/Signup';

function mapStateToProps(state) {
    return {
    	form:state.signup.form,
    	authenticated:state.signup.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu(){
            dispatch(systemActions.toggleMenu())
        },
        onInputFieldChange(field, value){
            dispatch( signupActions.updateInputField(field, value) )
        },
        addTrainee(){
            dispatch( signupActions.addTrainee() )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Signup)

