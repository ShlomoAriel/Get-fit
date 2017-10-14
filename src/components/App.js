import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as systemActions from 'redux/actions/systemActions'
import HeaderComponent from 'components/common/Header/container/HeaderComponent';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate(prevProps, prevState) {
      if( !(this.props.authenticated) && !(this.props.location.pathname === '/login')) {
         this.props.history.push('/login');
         this.props.goTo('login');
      }
    }

    render() {
        return (
            <div className="container">
                <HeaderComponent />
                {this.props.children}
            </div>
        );
    }

}
App.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {
        authenticated:state.login.authenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
       goTo(tab){
            dispatch(systemActions.setCurrentTab(tab))
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(App));
