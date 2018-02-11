import React from 'react'
import {connect} from 'react-redux'
import R from 'ramda'
import * as systemActions from 'redux/actions/systemActions'
import * as traineeActions from 'redux/actions/traineeActions'
import * as paymentActions from 'redux/actions/paymentActions'
import Payment from '../display/Payment'

class PaymentComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
      }
    }

    render() {
        return <Payment{...this.props}/>
    }

}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    
    
    return {
        currentTrainee: state.trainee.currentTrainee,
        form: state.payment.form,
        traineeId: state.trainee.currentTrainee._id,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( paymentActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
            dispatch( traineeActions.getTraineePackageList() )
        },
        addPayment(e){
            e.preventDefault();
            dispatch( paymentActions.addPayment() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(PaymentComponent)

