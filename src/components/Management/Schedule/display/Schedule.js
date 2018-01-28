import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import SessionComponent from'../container/SessionComponent'
import HomeSessionComponent from'../../HomeSession/container/HomeSessionComponent'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Schedule = ({ homeSessionForm, sessions, modalOpen, sessionType, toggleModal, onHomeSessionInputFieldChange, sessionNameList, onSelectEvent, onSelectSessionSlot, onSelectHomeSessionSlot, setSessionType }) => {
	let sessionNameInput = {onSelect:onHomeSessionInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: homeSessionForm.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] }
	let selectSlot = onSelectSessionSlot
	if(sessionType == 'homeSession'){
		selectSlot = onSelectHomeSessionSlot
	}
	return (
		<div className="trainee-dashboard">
			<div>
				<div className="dashboard-header"> <div>מתאמן</div></div>
				<TraineePersonalInfoComponent/>   		
			</div>
			<div>
		   		<div className="dashboard-header"> <div>יומן</div></div>
				{
					// <div>
					// 	<i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
					// </div>
				}
			   		{ 
			   // 			sessionType == 'homeSession' &&
			   // 			<div className="personal-info slide-from-top">
						// 	<div className="dashboard-picklist"><InputWrapper {...sessionNameInput}/></div>
						// </div>
			   		}
			</div>
			{ (modalOpen &&  sessionType == 'session') && <SessionComponent toggleModal={toggleModal} className="trainee-dashboard"/>}
			{ (modalOpen &&  sessionType == 'homeSession') && <HomeSessionComponent toggleModal={toggleModal} isView={false} className="trainee-dashboard"/>}
			<div>
			<div className="column-view">
				<div>
				<div className="schedule-switch">
				   <div onClick={()=>setSessionType('session')} className={(sessionType == 'session'? "active" : "")}>
				   		Sessions
				   </div>
				   <div onClick={()=>setSessionType('homeSession')} className={(sessionType == 'homeSession'? "active" : "")}>
				   		Home Sessions
				   </div>
			   </div>
			   </div>
				<BigCalendar
				  min={new Date(2018, 1, 1, 6, 0, 0)}
				  max={new Date(2018, 1, 1, 23, 0, 0)}
				  events={sessions}
				  timeslots={1}
				  step={60}
				  onSelectEvent={onSelectEvent}
				  onSelectSlot={selectSlot}
				  selectable={true}
				/>
			</div>
			</div>
		</div>
);
}
export default Schedule;
