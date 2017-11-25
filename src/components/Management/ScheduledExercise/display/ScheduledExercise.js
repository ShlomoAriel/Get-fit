import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import ScheduledExerciseListComponent from'../container/ScheduledExerciseListComponent'

const ScheduledExercise = ({form, authenticated,traineeId, traineeList, exerciseList, weekDays, scheduledExerciseList, isView,
							onInputFieldChange, setCurrentTrainee,addScheduledExercise, removeScheduledExercise, onSelect}) => {
	let formFields = {}
	// if (!isView){
	// 	formFields['traineeInput'] = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }
	// }
	formFields['exerciseInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'exercise', placeholder: 'Exercise', value: form.exercise, type: 'picklist', options: exerciseList ? exerciseList : [] },
	// formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'weekDay', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] },
    formFields['orderInput'] = {type: 'input',fieldClass:'form-control',field: 'order', name:'order', placeholder: 'Order', value: form.order, onUpdate: onInputFieldChange }
    // formFields['weekDayInput'] = {type: 'input',fieldClass:'form-control',field: 'weekDay', name:'weekDay', placeholder: 'Week Day', value: form.weekDay, onUpdate: onInputFieldChange }
    formFields['setsInput'] = {type: 'input',fieldClass:'form-control',field: 'sets', name:'sets', placeholder: 'sets', value: form.sets, onUpdate: onInputFieldChange }
    formFields['setsInput'] = {type: 'input',fieldClass:'form-control',field: 'sets', name:'sets', placeholder: 'sets', value: form.sets, onUpdate: onInputFieldChange }
    formFields['repsInput'] = {type: 'input',fieldClass:'form-control',field: 'reps', name:'reps', placeholder: 'reps', value: form.reps, onUpdate: onInputFieldChange }
	return (
		  <div className="scheduled-exercise">
		  <ScheduledExerciseListComponent/>
		  { !isView &&
		  	<form onSubmit={addScheduledExercise}>
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
export default ScheduledExercise;
