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
    let traineeId = state.trainee.currentTrainee._id
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    let totalBill = 0
    let packages = state.trainee.traineePackageMap[traineeId]
    if(packages){
        totalBill = packages.reduce( (total, current )=>
            total + current.quantity*current.amount*(current.percent*0.08)
        , 0)
    }
    let paymentList = state.payment.paymentMap[traineeId] ? state.payment.paymentMap[traineeId] : []
    let totalPayed = paymentList.reduce( (total, current )=>
        total + current.amount
    , 0)
    return {
        isAdmin: state.login.isAdmin,
        form: state.goal.form,
        traineeId: state.trainee.currentTrainee._id,
        traineeList: traineeOptions,
        paymentList: paymentList,
        totalPayed:totalPayed,
        totalBill:totalBill,
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

