import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import ScheduledExerciseComponent from'../container/ScheduledExerciseComponent'
import HomeSessionComponent from'../../HomeSession/container/HomeSessionComponent'
import moment from 'moment'
import YouTube from 'react-youtube';
import * as utils from 'utils/systemUtils'
const ScheduledExerciseList = ({form,weekEnd, isAdmin, weekStart, homeSessionForm, scheduleWeek, setScheduledWeek, toggleSessionNameModal, onHomeSessionInputFieldChange, scheduledExerciseList,traineeList,traineeId, currentDay, weekDays, setCurrentDay,removeScheduledExercise,onInputFieldChange, setCurrentTrainee, modalOpen, 	sessionNameList, toggleModal}) => {
	let formFields = {}
	let opts = {
		height: '390',
		width: '640',
		playerVars: { // https://developers.google.com/youtube/player_parameters
			autoplay: 1
		}
	}
	formFields['weekDayInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'weekDay', placeholder: 'Week Day', value: form.weekDay, type: 'picklist', options: weekDays ? weekDays : [] }
	let weekField = {type: 'input',fieldClass:'form-control',field: 'description', name:'description', placeholder: 'תיאור', value: form.description, onUpdate: onInputFieldChange }
	let sessionNameInput = {onSelect:onHomeSessionInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: homeSessionForm.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] }
	function setCurrentHeader(fieldKey){
		setCurrentDay(fieldKey.value)
		onHomeSessionInputFieldChange('sessionName',fieldKey.homeSessionValue)
	}
	function setCurrent(fieldKey){
		if(!fieldKey.homeSessionValue){
			onHomeSessionInputFieldChange('date',fieldKey.date)
			toggleModal()
		}
		setCurrentHeader(fieldKey)
	}

	return (
		<div className="scheduled-exercise-list list-general-wrapper">
			 { isAdmin && modalOpen && <HomeSessionComponent toggleModal={toggleModal}/>}
			<div>
				<div className="week-header">
					<div className="arrow-button" onClick={()=>setScheduledWeek(scheduleWeek-1)}> <i className="fa fa-chevron-right" aria-hidden="true"></i> </div>
					<div> {moment(weekStart).format('DD/MM/YYYY')} - {moment(weekEnd).format('DD/MM/YYYY')} </div>
					<div className="arrow-button"onClick={()=>setScheduledWeek(scheduleWeek+1)}> <i className="fa fa-chevron-left" aria-hidden="true"></i> </div>
				</div>
				<div className="schedule-wrapper">
					<div className="weekdays-wrapper">
					{
						(weekDays).map( fieldKey =>
							<div key={fieldKey.value}>
						  		<label 	key={fieldKey.value} className={"" + (fieldKey.value == currentDay ? ' active' : '')} 
						  				onClick={()=>setCurrentHeader(fieldKey)}>
							  		{fieldKey.name}
							  	</label>
								  	<div onClick={()=>setCurrent(fieldKey)}>
								  		{fieldKey.session && <span className="weekday-session">{fieldKey.session}</span>}
								  		{fieldKey.homeSession && <span>{fieldKey.homeSession}</span>}
								  	</div>
						  	</div>
						)
					}
					</div>
				</div>
				
				<div className="session-program">
						<div className="program-header">
							<div className="dashboard-picklist">
								<InputWrapper {...sessionNameInput}/>		  			
							</div>
							{ isAdmin &&
								<i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
							}
						</div>
						{ scheduledExerciseList.length > 0 &&
							<div className="custom-row">
								<div>#</div>
								<div>תרגיל</div>
								<div>סטים</div>
								<div>חזרות</div>
								<div>סרטון</div>
								<div></div>
								<div></div>
							</div>
						}
						{ 
							scheduledExerciseList.map( scheduledExercise =>
							<div key={scheduledExercise._id} className="custom-row">
								<div>{scheduledExercise.order}</div>
								<div>{scheduledExercise.exercise && scheduledExercise.exercise.name}</div>
								<div>{scheduledExercise.sets}</div>
								<div>{scheduledExercise.reps}</div>
	  							<div><a target="_blanc" href={scheduledExercise.exercise && scheduledExercise.exercise.link}><i className="fa fa-film"></i></a></div>
								{
									isAdmin &&
									<div><i className="fa fa-trash-o" onClick={()=>removeScheduledExercise(scheduledExercise._id)}></i></div>
								}
								{
									isAdmin &&
									<div><i className="fa fa-pencil" onClick={()=>editScheduledExercise(scheduledExercise._id)}></i></div>
								}
								{ 
									// scheduledExercise.exercise.link && 
									//  <YouTube
								 //        videoId={utils.getYoutubeId(scheduledExercise.exercise.link)}
								 //        opts={opts}
								 //        onReady={1}
								 //      />
								}
							</div>
							)
						}
					{ isAdmin &&
						<div className="program-header">
				 			{<ScheduledExerciseComponent toggleModal={toggleModal}className="form-modal fade-in" />}
				 		</div>
					}
			 	</div>
			</div>
		</div>
	  );
}
export default ScheduledExerciseList;
