import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
const Signup = ({form, traineeId, traineeList,addTraineeGoals, goalOptions, goalList, onInputFieldChange, addGoal, removeGoal, setCurrentTrainee, toggleModal,value,onChange}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }

	return (
		  <div className="form-modal fade-in">
		  	<form>
			  	<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		  		
			  	<div className="form slide-from-right">
			  	<Select
			        name="form-field-name"
			        value={value}
			        onChange={onChange}
			        closeOnSelect={false}
			        multi={true}
			        removeSelected={true}
			        simpleValue={true}
			        options={goalOptions}
			      />
			  	{ Object.keys(formFields).map( fieldKey =>
			  		<div key={fieldKey}>
				  		<InputWrapper {...formFields[fieldKey]}/>
				  	</div>	
			  		)
			  	}
				  	<div className="button-holder">
				  		<input className="form-control"/>
				  		<button type="button" className="fa fa-arrow-circle-o-right login-button" onClick={addTraineeGoals}></button>
			  		</div>
			  	</div>
		  	</form>
		  </div>
);
}
export default Signup;
