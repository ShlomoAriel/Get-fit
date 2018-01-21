import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const Signup = ({form, traineeId, traineeList, sessionNameList, onInputFieldChange, addSessionName, removeSessionName, setCurrentTrainee, toggleModal}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }

	return (
		  <div className="form-modal fade-in">
		  	<form onSubmit={addSessionName}>
			  	<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form slide-from-right">
			  	{ Object.keys(formFields).map( fieldKey =>
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
		  </div>
);
}
export default Signup;
