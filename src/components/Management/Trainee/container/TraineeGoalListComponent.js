import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as goalActions from 'redux/actions/goalActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineeGoalList from '../display/TraineeGoalList';
import * as modelUtils from 'utils/modelUtils'

class TraineeGoalListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidlMount(){
        // this.props.getGoalByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      // if(this.props.traineeId != prevProps.traineeId){
      //    this.props.getGoalByTrainee()
      // }
    }

    render() {
        return <TraineeGoalList{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let currentTrainee = state.trainee.currentTrainee
    let traineeGoalList = currentTrainee.TraineeGoal ? currentTrainee.TraineeGoal : []
    //modelUtils.populateModelList(currentTrainee.TraineeGoal, 'goal', state.goal.goalLists)
    // let traineeGoalList =  state.trainee.currentTrainee._id && state.goal.traineeGoalMap[state.trainee.currentTrainee._id] ? state.goal.traineeGoalMap[state.trainee.currentTrainee._id] : []
    return {
        isAdmin: state.login.isAdmin,
        traineeGoalList: traineeGoalList,
        form: state.goal.form,
        traineeId: state.trainee.currentTrainee._id,
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
            dispatch( goalActions.removeTraineeGoal(id) )
        },
        editGoal(id){
            dispatch( goalActions.updateGoal(id) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeGoalListComponent)

