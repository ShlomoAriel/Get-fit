import React from 'react'
import {connect} from 'react-redux'
import * as traineeActions from 'redux/actions/traineeActions'
import TraineePersonalInfo from '../display/TraineePersonalInfo'

class TraineePersonalInfoComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
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
    let traineeId = state.trainee.form.traineeId
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
            dispatch( traineeActions.getTraineePackageList() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineePersonalInfoComponent)

