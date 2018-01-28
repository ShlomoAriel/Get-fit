import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as expenseActions from 'redux/actions/expenseActions'
import ExpenseList from '../display/ExpenseList';

class ExpenseListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getExpenseList()
    }
    componentDidUpdate(prevProps, prevState) {}

    render() {
        return <ExpenseList{...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        traineeId: state.trainee.form.traineeId,
        expenseList: state.expense.expenseList,
        form: state.expense.form,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( expenseActions.updateInputField(field, value) )
        },
        removeExpense(id){
            dispatch( expenseActions.removeExpense(id) )
        },
        getExpenseList(){
            dispatch( expenseActions.getExpenseList() )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("expense"))
        },
        editExpense(id){
            dispatch( expenseActions.updateExpense(id) )
        },
        addExpense(e){
            e.preventDefault();
            dispatch( expenseActions.addExpense() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(ExpenseListComponent)

