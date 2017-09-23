import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from 'components/common/Header';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }

}
App.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(App);
