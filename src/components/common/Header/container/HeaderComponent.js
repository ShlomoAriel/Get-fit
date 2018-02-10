import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import Header from '../display/Header';
import { hashHistory } from 'react-router-dom'

function mapStateToProps(state) {
    return {
        authenticated:state.login.authenticated,
        isAdmin: state.login.isAdmin,
    	menuOpen:state.system.menuOpen,
    	currentTab:state.system.currentTab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMenu(){
            dispatch(systemActions.toggleMenu())
        },
        goTo(tab){
        	dispatch(systemActions.setCurrentTab(tab))
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Header)

