import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import TraineeStatusList from'./TraineeStatusList'

const Signup = ({form, traineeId, traineeList, traineeStatusList, onInputFieldChange, addTraineeStatus, removeTraineeStatus, setCurrentTrainee, isEdit}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['weightInput'] = { type: 'input', fieldClass:'form-control',field: 'weight', name:'weight', placeholder: 'weight', value: form.weight, onUpdate: onInputFieldChange }
    formFields['nameInput'] = { type: 'input', fieldClass:'form-control',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }

	return (
		  <div className="trainee">
		  	<TraineeStatusList traineeStatusList={traineeStatusList}
		  				onInputFieldChange={onInputFieldChange}
		  				removeTraineeStatus={removeTraineeStatus}/>
		  { !isEdit &&
		  	<form onSubmit={addTraineeStatus}>
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
		  </div>
);
}
export default Signup;
