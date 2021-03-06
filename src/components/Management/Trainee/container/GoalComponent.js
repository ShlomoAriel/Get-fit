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
        traineeId: state.trainee.currentTrainee._id,
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
        addGoal(name){
            dispatch( goalActions.addGoal(name) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(GoalComponent)

