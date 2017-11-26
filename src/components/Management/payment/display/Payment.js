import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import PaymentListComponent from'../container/PaymentListComponent'

const Payment = ({ form, traineeId, traineeList, onInputFieldChange, addPayment, setCurrentTrainee}) => {
	let formFields = {}
	// formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }
	formFields['amountInput'] = { type: 'input', field: 'amount', name:'amount', placeholder: 'amount', value: form.amount, onUpdate: onInputFieldChange }
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }
    formFields['typeInput'] = { type: 'input', fieldClass:'form-control',field: 'type', name:'type', placeholder: 'type', value: form.type, onUpdate: onInputFieldChange }
	return (
		  <div className="payment">
		  	<form onSubmit={addPayment}>
		  		<h3>הוספת תשלום</h3>
			  	<div className="form">
				  	{
				  		Object.keys(formFields).map( fieldKey =>
					  		<div key={fieldKey}>
						  		<InputWrapper {...formFields[fieldKey]}/>
						  	</div>	
				  		)
				  	}
				  	<div className="button-holder">
				  		<input className="form-control"/>
				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
			  		</div>
			  	</div>
		  	</form>
		  	<PaymentListComponent/>
		  </div>
);
}
export default Payment;
