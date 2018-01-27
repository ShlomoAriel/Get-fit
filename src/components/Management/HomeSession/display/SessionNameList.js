import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import SessionNameComponent from'../container/SessionNameComponent'

const TraineeDashboard = ({sessionNameList, removeSessionName, onInputFieldChange, modalOpen, toggleModal, toggleCheckbox}) => {
	let checkbox = { type:'checkbox',fieldClass:'',field: 'checkbox', name:'text', onChange: toggleCheckbox }
	return (
			 <div className="sessionName-list list-general-wrapper slide-from-right">
			 	{ modalOpen && <SessionNameComponent toggleModal={toggleModal}/>}
	  			<div>
	  				<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> סוג אימון</h3>
		  			<div className="custom-row">
							<div>טקסט</div>		
							<div>תאריך</div>
							<div></div>
						</div>
	  				{ 
	  					sessionNameList.map( sessionName =>{
							checkbox['value'] = sessionName.achieved
	  						return(
	  						<div key={sessionName._id} className="custom-row">
	  							<div>{sessionName.name}</div>
	  							<div>{moment(sessionName.date).format("DD/MM/YYYY")}</div>
	  							<div><i className="fa fa-trash-o" onClick={()=>removeSessionName(sessionName._id)}></i></div>
	  						</div>)
	  					}
	  						)
	  				}
	  			</div>
			  </div>
);
}
export default TraineeDashboard;
