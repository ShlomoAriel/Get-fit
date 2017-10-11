import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderComponent from 'components/common/Header/container/HeaderComponent';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillUpdate(prevProps, prevState) {
      if(!this.props.authenticated) {
        this.props.history.push('/login');
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

    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(App);
