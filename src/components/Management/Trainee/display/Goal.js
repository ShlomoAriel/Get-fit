import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const Signup = ({form, goalList, onInputFieldChange, addGoal, toggleModal}) => {
	let formFields = {}
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }

	return (
		  <div className="form-modal fade-in">
		  	<form>
			  	<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		  		
			  	<div className="form slide-from-right">
			  	{ Object.keys(formFields).map( fieldKey =>
			  		<div key={fieldKey}>
				  		<InputWrapper {...formFields[fieldKey]}/>
				  	</div>	
			  		)
			  	}
				  	<div className="button-holder">
				  		<input className="form-control"/>
				  		<button onClick={()=>addGoal(form.name)} type="button" className="fa fa-arrow-circle-o-right login-button"></button>
			  		</div>
			  	</div>
		  	</form>
		  </div>
);
}
export default Signup;
