import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import ExerciseList from'../container/ExerciseListComponent'

const Signup = ({form, authenticated, exerciseList, onInputFieldChange, addExercise, removeExercise}) => {
	let formFields = {}
	formFields['nameInput'] = { fieldClass:'',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }
    formFields['textInput'] = { fieldClass:'',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }
    formFields['linkInput'] = { fieldClass:'',field: 'link', name:'link', placeholder: 'link', value: form.link, onUpdate: onInputFieldChange }
	return (
		  <div className="trainee-dashboard">
			  <div className="training-package">
			  	<form onSubmit={addExercise}>
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
			  	<ExerciseList/>
			  </div>
		  </div>
);
}
export default Signup;
