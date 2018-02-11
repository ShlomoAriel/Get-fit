import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as paymentActions from 'redux/actions/paymentActions'
import PaymentDashboard from '../display/PaymentDashboard'

class PaymentDashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
      }
    }

    render() {
        return <PaymentDashboard{...this.props}/>
    }

}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let traineeId = state.trainee.currentTrainee._id
    let paymentList = state.payment.paymentMap[traineeId] ? state.payment.paymentMap[traineeId] : []
    return {
        isAdmin: state.login.isAdmin,
        currentTrainee: state.trainee.currentTrainee,
        form: state.payment.form,
        paymentList: paymentList,
        traineeId: traineeId,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( paymentActions.updateInputField(field, value) )
        },
        addPayment(e){
            e.preventDefault();
            dispatch( paymentActions.addPayment() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(PaymentDashboardComponent)

