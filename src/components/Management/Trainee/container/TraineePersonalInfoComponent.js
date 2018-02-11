import React from 'react'
import {connect} from 'react-redux'
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineePersonalInfo from '../display/TraineePersonalInfo'

class TraineePersonalInfoComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount(){
        let traineeId = window.localStorage.getItem('currentTrainee')
        if(traineeId){
            this.props.setCurrentTrainee("",traineeId)
        }
    }
    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        return <TraineePersonalInfo{...this.props}/>
    }

}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    traineeOptions.push({ value:undefined, label: 'כולם' })
    let traineeId = state.trainee.currentTrainee._id
    // if(!traineeId && traineeOptions[0]){
    //     traineeId = traineeOptions[0].value
    // }
    return {
        isAdmin: state.login.isAdmin,
        currentTrainee: state.trainee.currentTrainee,
        traineeId: traineeId,
        traineeList: traineeOptions,
        isExpanded: state.system.personalInfoExpanded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        toggleExpand(){
          dispatch( systemActions.toggleExpand() )  
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineePersonalInfoComponent)

