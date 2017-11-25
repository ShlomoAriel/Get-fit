import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import * as systemActions from 'redux/actions/systemActions'
import * as loginActions from 'redux/actions/loginActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import * as scheduledExerciseActions from 'redux/actions/scheduledExerciseActions'
import * as exerciseActions from 'redux/actions/exerciseActions'
import * as goalActions from 'redux/actions/goalActions'
import HeaderComponent from 'components/common/Header/container/HeaderComponent'


class App extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
      if( !(this.props.authenticated)){
          const jwt = localStorage.getItem('token')
          if(!jwt){
            this.props.history.push('/login')
            this.props.goTo('login') 
          } else{
            this.props.setToken(jwt)
          }
      }  
    }
    componentDidUpdate(prevProps, prevState) {
      if( !(this.props.authenticated) && !(this.props.location.pathname === '/login')) {
         this.props.history.push('/login')
         this.props.goTo('login')
      }
    }

    render() {
        return (
            <div className="container">
                <HeaderComponent />
                {this.props.children}
            </div>
        )
    }

}
App.propTypes = {

}

function mapStateToProps(state, ownProps) {
    return {
        authenticated:state.login.authenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
       goTo(tab){
            dispatch(systemActions.setCurrentTab(tab))
        },
        setToken(token){
            dispatch(loginActions.setToken(token))
            dispatch(traineeActions.getTraineeList())
            dispatch(trainingPackageActions.getTrainingPackageList())
            dispatch(exerciseActions.getExerciseList())
            dispatch(goalActions.getGoalList())
            dispatch(scheduledExerciseActions.getScheduledExerciseList())
        }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(App))
