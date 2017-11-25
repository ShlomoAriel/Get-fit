import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import GoalList from'./GoalList'

const Signup = ({form, traineeId, traineeList, goalList, onInputFieldChange, addGoal, removeGoal, setCurrentTrainee, isEdit}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'form-control',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }

	return (
		  <div className="trainee">
		  { isEdit &&
		  	<form onSubmit={addGoal}>
		  		<h3>Login & Get Fit!</h3>
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
		  }
		  	<GoalList goalList={goalList}
		  				onInputFieldChange={onInputFieldChange}
		  				removeGoal={removeGoal}/>
		  </div>
);
}
export default Signup;
