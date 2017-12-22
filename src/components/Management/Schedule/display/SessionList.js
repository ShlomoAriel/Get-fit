import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import SessionComponent from'../container/SessionComponent'

const TraineeDashboard = ({sessionList, removeSession, onInputFieldChange, modalOpen, toggleModal, toggleCheckbox}) => {
	let checkbox = { type:'checkbox',fieldClass:'',field: 'checkbox', name:'text', onChange: toggleCheckbox }
	return (
			 <div className="session-list list-general-wrapper slide-from-right">
			 	{ modalOpen && <SessionComponent toggleModal={toggleModal}/>}
	  			<div>
	  				<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> מטרות</h3>
		  			<div className="custom-row">
							<div>טקסט</div>		
							<div>הושג</div>
							<div>תאריך</div>
							<div>תאריך</div>
							<div>תאריך</div>
							<div></div>
						</div>
	  				{ 
	  					sessionList.map( session =>{
							checkbox['value'] = session.achieved
	  						return(
	  						<div key={session._id} className="custom-row">
	  							<div>{session.title}</div>
	  							<InputWrapper {...checkbox}
	  										id={ session._id}/>
	  							<div>{moment(session.date).format("MMM Do YYYY")}</div>
	  							<div>{moment(session.start).format("HH:mm")}</div>
	  							<div>{moment(session.end).format("HH:mm")}</div>
	  							<div><i className="fa fa-trash-o" onClick={()=>removeSession(session._id)}></i></div>
	  						</div>)
	  					}
	  						)
	  				}
	  			</div>
			  </div>
);
}
export default TraineeDashboard;
