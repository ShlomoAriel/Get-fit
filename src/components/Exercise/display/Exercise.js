import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'
import ExerciseList from'../container/ExerciseListComponent'

const Signup = ({form, authenticated, exerciseList, onInputFieldChange, addExercise, removeExercise}) => {
	let formFields = {}
    formFields['textInput'] = { fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }
    formFields['linkInput'] = { fieldClass:'form-control',field: 'link', name:'link', placeholder: 'link', value: form.link, onUpdate: onInputFieldChange }
    formFields['setsInput'] = {fieldClass:'form-control',field: 'sets', name:'sets', placeholder: 'sets', value: form.sets, onUpdate: onInputFieldChange }
    formFields['repsInput'] = {fieldClass:'form-control',field: 'reps', name:'reps', placeholder: 'reps', value: form.reps, onUpdate: onInputFieldChange }
	return (
		  <div className="training-package">
		  	<form onSubmit={addExercise}>
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
		  	<ExerciseList/>
		  </div>
);
}
export default Signup;
