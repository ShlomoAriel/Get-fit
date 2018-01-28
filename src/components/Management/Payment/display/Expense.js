import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Expense = ({form, onInputFieldChange, addExpense}) => {
	let formFields = {}
	formFields['textInput'] = { fieldClass:'form-control',field: 'name', name:'name', placeholder: 'מיקום', value: form.name, onUpdate: onInputFieldChange }	
	formFields['amountInput'] = { fieldClass:'form-control',field: 'amount', name:'amount', placeholder: 'סכום', value: form.amount, onUpdate: onInputFieldChange }	
	return (
		  	<form onSubmit={addExpense}>
			  	<div className="form">
				  	{
				  		Object.keys(formFields).map( fieldKey =>
					  		<div key={fieldKey}>
						  		<TextInput {...formFields[fieldKey]}/>
						  	</div>	
				  		)
				  	}
				  	<div className="button-holder">
				  		<input className="form-control"/>
				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
			  		</div>
			  	</div>
		  	</form>
);
}
export default Expense;
