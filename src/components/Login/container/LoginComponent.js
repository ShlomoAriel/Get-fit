import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as loginActions from 'redux/actions/loginActions'
import Login from '../display/Login';

function mapStateToProps(state) {
    return {
    	username:state.login.username,
        password:state.login.password,
    	authenticated:state.login.authenticated,
    	menuOpen:state.system.menuOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu(){
            dispatch(systemActions.toggleMenu())
        },
        onInputFieldChange(field, value){
            dispatch( loginActions.updateInputField(field, value) )
        },
        login(){
            dispatch( loginActions.login() )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login)

