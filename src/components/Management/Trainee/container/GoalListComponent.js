import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as goalActions from 'redux/actions/goalActions'
import * as traineeActions from 'redux/actions/traineeActions'
import GoalList from '../display/GoalList';

class GoalListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getGoalByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getGoalByTrainee()
      }
    }

    render() {
        return <GoalList{...this.props}/>
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
        modalOpen:state.system.modalOpen["goal"],
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
        toggleModal(){
            dispatch(systemActions.toggleModal("goal"))
        },
        toggleCheckbox(field, goalId, value){
            dispatch(goalActions.toggleCheckbox(goalId, value))
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

export default connect( mapStateToProps, mapDispatchToProps )(GoalListComponent)

