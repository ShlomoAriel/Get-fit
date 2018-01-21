import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import ScheduledExerciseComponent from'../container/ScheduledExerciseComponent'
import HomeSessionComponent from'../../HomeSession/container/HomeSessionComponent'
import moment from 'moment'

const ScheduledExerciseList = ({form,weekEnd,weekStart, homeSessionForm, scheduleWeek, setScheduledWeek, toggleSessionNameModal, onHomeSessionInputFieldChange, scheduledExerciseList,traineeList,traineeId, currentDay, weekDays, setCurrentDay,removeScheduledExercise,onInputFieldChange, setCurrentTrainee, modalOpen, 	sessionNameList, toggleModal}) => {
	let formFields = {}
	formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'Week Day', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] }
	let weekField = {type: 'input',fieldClass:'form-control',field: 'description', name:'description', placeholder: 'תיאור', value: form.description, onUpdate: onInputFieldChange }
	let sessionNameInput = {onSelect:onHomeSessionInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: homeSessionForm.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] }
	
	function setCurrent(fieldKey){
		setCurrentDay(fieldKey.value)
		if(fieldKey.homeSessionValue){
			onHomeSessionInputFieldChange('sessionName',fieldKey.homeSessionValue)
		}
	}

	return (
		<div className="scheduled-exercise-list list-general-wrapper">
			 { modalOpen && <HomeSessionComponent toggleModal={toggleModal}/>}
			<div>
				<div className="week-header">
					<div className="arrow-button" onClick={()=>setScheduledWeek(scheduleWeek-1)}> <i className="fa fa-chevron-right" aria-hidden="true"></i> </div>
					<div> {moment(weekStart).format('DD/MM/YYYY')} - {moment(weekEnd).format('DD/MM/YYYY')} </div>
					<div className="arrow-button"onClick={()=>setScheduledWeek(scheduleWeek+1)}> <i className="fa fa-chevron-left" aria-hidden="true"></i> </div>
				</div>
				<div className="weekdays-wrapper">
				{
					(weekDays).map( fieldKey =>
						<div>
				  		<label 	key={fieldKey.value} className={"" + (fieldKey.value == currentDay ? ' active' : '')} 
				  				onClick={()=>setCurrent(fieldKey)}>
					  		{fieldKey.name}
					  	</label>
						  	<div onClick={()=>setCurrent(fieldKey)}>
						  		{fieldKey.text}
						  	</div>
				  	</div>
					)
				}
				</div>
				<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> תכנית אימון</h3>
				<div className="dashboard-picklist">
					<InputWrapper {...sessionNameInput}/>		  			
				</div>
				<div className="session-program">
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
						{ 
							scheduledExerciseList.map( scheduledExercise =>
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
			 		{<ScheduledExerciseComponent toggleModal={toggleModal}className="form-modal fade-in" />}
			 	</div>
			</div>
		</div>
	  );
}
export default ScheduledExerciseList;
