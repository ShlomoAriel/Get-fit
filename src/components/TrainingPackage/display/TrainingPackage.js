import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'
import TrainingPackageList from'../container/TrainingPackageListComponent'

const Signup = ({form, authenticated, trainingPackageList, onInputFieldChange, addTrainingPackage, removeTrainingPackage}) => {
	let formFields = {}
    formFields['percentInput'] = { fieldClass:'form-control',field: 'percent', name:'percent', placeholder: 'percent', value: form.percent, onUpdate: onInputFieldChange }
    formFields['amountInput'] = { fieldClass:'form-control',field: 'amount', name:'amount', placeholder: 'amount', value: form.amount, onUpdate: onInputFieldChange }
    formFields['nameInput'] = {fieldClass:'form-control',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }
    formFields['sessionsInput'] = {fieldClass:'form-control',field: 'sessions', name:'sessions', placeholder: 'sessions', value: form.sessions, onUpdate: onInputFieldChange }
	return (
		  <div className="training-package">
		  	<form onSubmit={addTrainingPackage}>
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form">
				  	{
				  		Object.keys(formFields).map( fieldKey =>
					  		<div key={fieldKey} className="form__first">
						  		<TextInput {...formFields[fieldKey]}/>
						  	</div>	
				  		)
				  	}
				  	<div className="form__first">
				  		<input className="form-control"/>
				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
			  		</div>
			  	</div>
		  	</form>
		  	<TrainingPackageList/>
		  </div>
);
}
export default Signup;
