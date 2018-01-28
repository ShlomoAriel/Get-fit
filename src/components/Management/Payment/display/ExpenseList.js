import React from 'react';
import Expense from'./Expense'

const ExpenseList = ({expenseList, removeExpense, form, onInputFieldChange, addExpense}) => {
	return (
		  <div className="expense-list list-general-wrapper">
			  <div>
			  <div className="custom-row">
	  							<div>תיאור</div>
	  							<div>סכום</div>
	  							<div></div>
	  						</div>
			 	{ expenseList.map( expense =>
					<div key={expense._id} className="custom-row">
						<div>{expense.name}</div>
						<div>{expense.amount}</div>
						<div className="fa-button"><i className="fa fa-trash-o" onClick={()=>removeExpense(expense._id)}></i></div>
						<div className="fa-button"><i className="fa fa-pencil" onClick={()=>editExpense(expense._id)}></i></div>
					</div>
					)
			}
			  </div>
		  	<Expense
		  		form={form}
		  		onInputFieldChange={onInputFieldChange}
		  		addExpense={addExpense}
		  	/>
		  </div>
		
);
}
export default ExpenseList;
