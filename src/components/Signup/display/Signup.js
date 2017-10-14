import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'

const Signup = ({form, authenticated, onInputFieldChange, addTrainee}) => {
	let formFields = {}
    formFields['emailInput'] = { fieldClass:'form-control',field: 'email', name:'email', placeholder: 'email', value: form.email, onUpdate: onInputFieldChange }
    formFields['passwordInput'] = { type:'password', fieldClass:'form-control',field: 'password', name:'password', placeholder: 'password', value: form.password, onUpdate: onInputFieldChange }
    formFields['passwordConfirmInput'] = { type:'password', fieldClass:'form-control',field: 'passwordConfirm', name:'passwordConfirm', placeholder: 'passwordConfirm', value: form.passwordConfirm, onUpdate: onInputFieldChange }
    formFields['firstNameInput'] = {fieldClass:'form-control',field: 'firstName', name:'firstName', placeholder: 'firstName', value: form.firstName, onUpdate: onInputFieldChange }
    formFields['lastNameInput'] = {fieldClass:'form-control',field: 'lastName', name:'lastName', placeholder: 'lastName', value: form.lastName, onUpdate: onInputFieldChange }
    formFields['addressInput'] = {fieldClass:'form-control',field: 'address', name:'address', placeholder: 'address', value: form.address, onUpdate: onInputFieldChange }
    formFields['facebookInput'] = {fieldClass:'form-control',field: 'facebook', name:'facebook', placeholder: 'facebook', value: form.facebook, onUpdate: onInputFieldChange }
    formFields['heightInput'] = {fieldClass:'form-control',field: 'height', name:'height', placeholder: 'height', value: form.height, onUpdate: onInputFieldChange }
    formFields['phoneInput'] = {fieldClass:'form-control',field: 'phone', name:'phone', placeholder: 'phone', value: form.phone, onUpdate: onInputFieldChange }
    formFields['medicalStatusInput'] = {fieldClass:'form-control',field: 'medicalStatus', name:'medicalStatus', placeholder: 'medicalStatus', value: form.medicalStatus, onUpdate: onInputFieldChange }
    formFields['medicineInput'] = {fieldClass:'form-control',field: 'medicine', name:'medicine', placeholder: 'medicine', value: form.medicine, onUpdate: onInputFieldChange }
	return (
		  <div className="signup">
		  	<form onSubmit={addTrainee}>
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form">
				  	{
				  		Object.keys(formFields).map( fieldKey =>
					  		<div key={fieldKey} className="form__first">
						  		<TextInput {...formFields[fieldKey]}/>
						  	</div>	
				  		)
				  	}
				  	<button className="fa fa-arrow-circle-o-right login-button"></button>
			  	</div>
		  	</form>
		  </div>
);
}
export default Signup;
