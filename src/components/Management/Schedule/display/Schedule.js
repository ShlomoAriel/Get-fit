import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import SessionComponent from'../container/SessionComponent'
import HomeSessionComponent from'../../HomeSession/container/HomeSessionComponent'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Schedule = ({ homeSessionForm, isOpen, viewAll, isAdmin, sessions,setSessionStatus, modalOpen, sessionType, toggleModal, onHomeSessionInputFieldChange, sessionNameList, onSelectEvent, onSelectSessionSlot, onSelectHomeSessionSlot, setSessionType }) => {
	let sessionNameInput = {onSelect:onHomeSessionInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: homeSessionForm.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] }
	let selectSlot = onSelectSessionSlot
	if(sessionType == 'homeSession'){
		selectSlot = onSelectHomeSessionSlot
	}
	return (
		<div className="trainee-dashboard">
			<div>
		   		<div className="dashboard-header"> <div>יומן</div></div>
			</div>
			{ (modalOpen &&  sessionType == 'session') && <SessionComponent toggleModal={toggleModal} className="trainee-dashboard"/>}
			{ (modalOpen &&  sessionType == 'homeSession') && <HomeSessionComponent toggleModal={toggleModal} isView={false} className="trainee-dashboard"/>}
			<div>
			<div className="column-view">
				<div className="row-view">
					<div className="schedule-switch">
					   <div onClick={()=>setSessionStatus(viewAll,'session')} className={(sessionType == 'session'? "active" : "")}>
					   		אימון אישי
					   </div>
					   <div onClick={()=>setSessionStatus(viewAll,'homeSession')} className={(sessionType == 'homeSession'? "active" : "")}>
					   		אימון ביתי
					   </div>
				    </div>
				    { sessionType == 'session' &&
				    	<div className="schedule-switch">
						  <div onClick={()=>setSessionStatus(true, sessionType)} className={(viewAll == true? "active" : "")}>
						  	 כולם
					   	  </div>
						  <div onClick={()=>setSessionStatus(false, sessionType)} className={(viewAll == false? "active" : "")}>
						  	מתאמן נוכחי
					   	  </div>
				   	  </div>
				    }
				    
			   </div>
			   {
			   	<BigCalendar
				  min={new Date(2018, 1, 1, 6, 0, 0)}
				  max={new Date(2018, 1, 1, 23, 0, 0)}
				  events={sessions}
				  timeslots={1}
				  step={60}
				  onSelectEvent={isAdmin ? onSelectEvent : null}
				  onSelectSlot={isAdmin ? selectSlot : null}
				  selectable={isAdmin}
				  eventPropGetter={
				    (event, start, end, isSelected) => {
				      let newStyle = {
				        backgroundColor: "lightgreen",
				        color: 'black',
				        borderRadius: "0px",
				        border: "none"
				      };

				      if (event.title == 'תפוס'){
				        newStyle.backgroundColor = "lightgray"
				      }

				      return {
				        className: "",
				        style: newStyle
				      };
				    }
				  }
				/>
			   }
			</div>
			</div>
		</div>
);
}
export default Schedule;
