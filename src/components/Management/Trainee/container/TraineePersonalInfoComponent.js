import React from 'react'
import {connect} from 'react-redux'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineePersonalInfo from '../display/TraineePersonalInfo'

class TraineePersonalInfoComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        if(this.props.traineeList[0]){
            this.props.setCurrentTrainee("",this.props.traineeList[0].value)    
        }
    }
    componentDidUpdate(prevProps, prevState) {
      if(!this.props.traineeId && this.props.traineeList && this.props.traineeList[0]){
        this.props.setCurrentTrainee("",this.props.traineeList[0].value)
      }
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
    let traineeId = state.trainee.form.traineeId
    // if(!traineeId && traineeOptions[0]){
    //     traineeId = traineeOptions[0].value
    // }
    return {
        currentTrainee: state.trainee.currentTrainee,
        traineeId: traineeId,
        traineeList: traineeOptions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineePersonalInfoComponent)

