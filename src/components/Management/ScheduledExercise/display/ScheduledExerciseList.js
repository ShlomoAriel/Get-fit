import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import ScheduledExerciseComponent from'../container/ScheduledExerciseComponent'

const Signup = ({form,scheduledExerciseList,traineeList,traineeId, weekDays, removeScheduledExercise,onInputFieldChange, setCurrentTrainee, modalOpen, toggleModal}) => {
	let formFields = {}
	// formFields['traineeInput'] = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'form-control',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }
	formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'Week Day', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] }

	return (
		  <div className="scheduled-exercise-list list-general-wrapper">
			 { modalOpen && <ScheduledExerciseComponent toggleModal={toggleModal}/>}
		  	<div>
	  			<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> תכנית אימון</h3>
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
							<div>סטים</div>
							<div>חזרות</div>
							<div>סרטון</div>
							<div></div>
							<div></div>
						</div>
	  				{ scheduledExerciseList.map( scheduledExercise =>
							<div key={scheduledExercise._id} className="custom-row">
								<div>{scheduledExercise.order}</div>
								<div>{scheduledExercise.exercise && scheduledExercise.exercise.name}</div>
								<div>{scheduledExercise.sets}</div>
								<div>{scheduledExercise.reps}</div>
								<div><a target="_blanc" href={scheduledExercise.exercise && scheduledExercise.exercise.link}>סרטון</a></div>
								<div><i className="fa fa-trash-o" onClick={()=>removeScheduledExercise(scheduledExercise._id)}></i></div>
								<div><i className="fa fa-pencil" onClick={()=>editScheduledExercise(scheduledExercise._id)}></i></div>
								{
									// <iframe width="420" height="315" src={scheduledExercise.exercise.link}>
									// </iframe>
								}
							</div>
							)
	  				}
	  			</div>
  			</div>
		  </div>
		  );
}
export default Signup;
