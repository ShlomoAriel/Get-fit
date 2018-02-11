import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as homeSessionActions from 'redux/actions/homeSessionActions'
import * as traineeActions from 'redux/actions/traineeActions'
import HomeSession from '../display/HomeSession';

class HomeSessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getHomeSessionByTrainee()
          this.props.getSessionNameByTrainee()

      }
    }

    render() {
        return <HomeSession{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let sessionNameOptions = state.sessionName.sessionNameList.map( sessionName => {
        return { value:sessionName._id, label: sessionName.name }
    })
    return {
        form: state.homeSession.form,
        traineeId: state.trainee.currentTrainee._id,
        traineeList: traineeOptions,
        sessionNameList: sessionNameOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( homeSessionActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getHomeSessionByTrainee(){
            dispatch( homeSessionActions.getHomeSessionByTrainee() )
        },
        removeHomeSession(id){
            dispatch( homeSessionActions.removeHomeSession(id) )
        },
        editHomeSession(id){
            dispatch( homeSessionActions.updateHomeSession(id) )
        },
        addHomeSession(e){
            e.preventDefault();
            dispatch( homeSessionActions.addHomeSession() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(HomeSessionComponent)

