import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const Signup = ({form,scheduledExerciseList,traineeList,traineeId, weekDays, removeScheduledExercise,onInputFieldChange, setCurrentTrainee}) => {
	let formFields = {}
	// formFields['traineeInput'] = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'form-control',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }
	formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'Week Day', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] }

	return (
		  <div className="scheduledExercise-list list-general-wrapper">
  			<h3>scheduledExercises</h3>
  			<div className="form">
		  	{
		  		Object.keys(formFields).map( fieldKey =>
			  		<div key={fieldKey} className="form__first">
				  		<InputWrapper {...formFields[fieldKey]}/>
				  	</div>	
		  		)
		  	}
	  		</div>
  			<div>
  				<div className="custom-row">
						<div>#</div>
						<div>תרגיל</div>
						<div>סרטון</div>
						<div>סטים</div>
						<div>חזרות</div>
						<div></div>
						<div></div>
					</div>
  				{ scheduledExerciseList.map( scheduledExercise =>
						<div key={scheduledExercise._id} className="custom-row">
							<div>{scheduledExercise.order}</div>
							<div>{scheduledExercise.exercise.name}</div>
							<div><a target="_blanc" href={scheduledExercise.exercise.link}>סרטון</a></div>
							<div>{scheduledExercise.sets}</div>
							<div>{scheduledExercise.reps}</div>
							<div><i className="fa fa-trash-o" onClick={()=>removeScheduledExercise(scheduledExercise._id)}></i></div>
							<div><i className="fa fa-pencil" onClick={()=>editScheduledExercise(scheduledExercise._id)}></i></div>
						</div>
						)
  				}
  			</div>
		  </div>
		  );
}
export default Signup;
