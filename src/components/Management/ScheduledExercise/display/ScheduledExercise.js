import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const ScheduledExercise = ({form, authenticated,traineeId, traineeList, exerciseList, weekDays, scheduledExerciseList, isView, sessionNameList, 
							onInputFieldChange, setCurrentTrainee,addScheduledExercise, removeScheduledExercise, onSelect, toggleModal}) => {
	let formFields = {}
	formFields['exerciseInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'exercise', placeholder: 'תרגיל', value: form.exercise, type: 'picklist', options: exerciseList ? exerciseList : [] },
	// formFields['sessionNameInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: form.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] },
	// formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'יום', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] },
    formFields['orderInput'] = {type: 'input',fieldClass:'form-control',field: 'order', name:'order', placeholder: 'סדר', value: form.order, onUpdate: onInputFieldChange }
    formFields['setsInput'] = {type: 'input',fieldClass:'form-control',field: 'sets', name:'sets', placeholder: 'סטים', value: form.sets, onUpdate: onInputFieldChange }
    formFields['repsInput'] = {type: 'input',fieldClass:'form-control',field: 'reps', name:'reps', placeholder: 'חזרות', value: form.reps, onUpdate: onInputFieldChange }
	return (
		  <div>
		  	<form onSubmit={addScheduledExercise}>
		  		{
		  			// <i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		  			// <h3>Login & Get Fit!</h3>
		  		}
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
		  </div>
);
}
export default ScheduledExercise;
