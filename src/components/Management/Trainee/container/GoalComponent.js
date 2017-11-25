import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as goalActions from 'redux/actions/goalActions'
import * as traineeActions from 'redux/actions/traineeActions'
import Goal from '../display/Goal';

class GoalComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getGoalByTrainee()
      }
    }

    render() {
        return <Goal{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        goalList: state.goal.goalList,
        form: state.goal.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( goalActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getGoalByTrainee(){
            dispatch( goalActions.getGoalByTrainee() )
        },
        removeGoal(id){
            dispatch( goalActions.removeGoal(id) )
        },
        editGoal(id){
            dispatch( goalActions.updateGoal(id) )
        },
        addGoal(e){
            e.preventDefault();
            dispatch( goalActions.addGoal() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(GoalComponent)

