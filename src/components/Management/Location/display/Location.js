import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Locaction = ({form, authenticated, locationList, onInputFieldChange, addLocation, removeLocaction, toggleModal}) => {
	let formFields = {}
	formFields['textInput'] = { fieldClass:'form-control',field: 'name', name:'name', placeholder: 'מיקום', value: form.name, onUpdate: onInputFieldChange }	
	return (
		  	<form onSubmit={addLocation}>
		  		<h3>הוספת מקום</h3>
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
export default Locaction;
