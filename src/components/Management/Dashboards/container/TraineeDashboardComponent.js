import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as trainingPackageActions from 'redux/actions/trainingPackageActions'
import TraineeDashboard from '../display/TraineeDashboard'

class TraineeDashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
      }
    }

    render() {
        return <TraineeDashboard{...this.props}/>
    }

}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let traineeId = state.trainee.form.traineeId
    return {
        isAdmin: state.login.isAdmin,
        currentTrainee: state.trainee.currentTrainee,
        quantity: state.trainingPackage.form.quantity,
        traineeId: traineeId,
        traineeList: traineeOptions,
        weekDays: [ {value:1,label:"ראשון"}, {value:2,label:"שני"},
                    {value:3,label:"שלישי"}, {value:4,label:"רביעי"},
                    {value:5,label:"חמישי"}, {value:6,label:"שישי"}, {value:7,label:"שבע"}],
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( trainingPackageActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
            dispatch( traineeActions.getTraineePackageList() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(TraineeDashboardComponent)

