import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as goalActions from 'redux/actions/goalActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeGoal from '../display/TraineeGoal';

class GoalComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.addTraineeGoals = this.addTraineeGoals.bind(this)
    }
    componentWillMount(){
        this.props.getGoalByTrainee()
        this.props.getGoalList()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
        this.props.getGoalByTrainee()
         this.props.getGoalList()
      }
    }
     state = {
        values: '',
      }
      addTraineeGoals = () =>{
        this.props.addTraineeGoals(this.state.values)
      }
      handleChange = (values) => {
        this.setState({ values })
      }
    render() {
        const { values } = this.state;
        const value = values ;
        return <TraineeGoal
                    {...this.props}
                    value={value}
                    onChange={this.handleChange}
                    addTraineeGoals={this.addTraineeGoals}
                />
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let goalOptions = state.goal.goalList.map( goal => {
        return { value:goal.name, label: goal.name }
    })
    let traineeGoalList =  state.trainee.form.traineeId && state.goal.traineeGoalMap[state.trainee.form.traineeId] ? state.goal.traineeGoalMap[state.trainee.form.traineeId] : []
    traineeGoalList = traineeGoalList.map( goal => {
        return { value:goal.name, label: goal.name }
    })
    goalOptions = R.without(traineeGoalList,goalOptions)
    return {
        traineeGoalList: traineeGoalList,
        form: state.goal.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        goalOptions: goalOptions
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
        getGoalList(){
            dispatch( goalActions.getGoalList() )
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
        addTraineeGoals(values){
            dispatch( goalActions.addTraineeGoals(values) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(GoalComponent)

