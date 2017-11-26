import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Diet = ({form, authenticated, dietList, onInputFieldChange, addDiet, removeDiet, toggleModal}) => {
	let formFields = {}
	formFields['textInput'] = { fieldClass:'form-control',field: 'text', name:'text', placeholder: 'פריט תזונה', value: form.text, onUpdate: onInputFieldChange }	
	return (
		   <div className="form-modal fade-in">
		  	<form onSubmit={addDiet}>
		  		<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		  		<h3>Login & Get Fit!</h3>
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
		  </div>
);
}
export default Diet;
