import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'
import DietList from'../container/DietListComponent'

const Diet = ({form, authenticated, dietList, onInputFieldChange, addDiet, removeDiet}) => {
	let formFields = {}
	formFields['textInput'] = { fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }	
	return (
		  <div className="training-package">
		  	<DietList/>
		  	<form onSubmit={addDiet}>
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
