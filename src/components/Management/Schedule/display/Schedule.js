import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import SessionComponent from'../container/SessionComponent'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Schedule = ({ sessions, modalOpen, toggleModal, onSelectSlot }) => {

	return (
		   <div className="">
		   <div className="schedule-header">
	  			<i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
		   		<TraineePersonalInfoComponent/>
		   </div>
		   { modalOpen && <SessionComponent toggleModal={toggleModal} className="trainee-dashboard"/>}
		    <BigCalendar
		      events={sessions}
		      timeslots={2}
		      onSelectSlot={onSelectSlot}
		      selectable={true}
		    />
		  </div>
);
}
export default Schedule;
