import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as paymentActions from 'redux/actions/paymentActions'
import * as traineeActions from 'redux/actions/traineeActions'
import PaymentList from '../display/PaymentList';

class PaymentListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getPaymentByTrainee()
      }
    }

    render() {
        return <PaymentList{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeId = state.trainee.form.traineeId
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let paymentList = state.payment.paymentMap[traineeId] ? state.payment.paymentMap[traineeId] : []
    return {
        form: state.goal.form,
        traineeId: state.trainee.form.traineeId,
        traineeList: traineeOptions,
        paymentList: paymentList,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( paymentActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
        },
        getPaymentByTrainee(){
            dispatch( paymentActions.getPaymentByTrainee(true) )
        },
        removePayment(id){
            dispatch( paymentActions.removePayment(id) )
        },
        editPayment(id){
            dispatch( paymentActions.updatePayment(id) )
        },
        addPayment(e){
            e.preventDefault();
            dispatch( paymentActions.addPayment() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(PaymentListComponent)

