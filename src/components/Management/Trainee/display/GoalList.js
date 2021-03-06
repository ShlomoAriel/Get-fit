import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import GoalComponent from'../container/GoalComponent'

const TraineeDashboard = ({goalList, removeGoal, onInputFieldChange, modalOpen, toggleModal, toggleCheckbox}) => {
	let checkbox = { type:'checkbox',fieldClass:'',field: 'checkbox', name:'text', onChange: toggleCheckbox }
	return (
			 <div className="goal-list list-general-wrapper slide-from-right">
			 	{ modalOpen && <GoalComponent toggleModal={toggleModal}/>}
	  			<div>
	  				<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> מטרות</h3>
	  				{ goalList.lebgth > 0 &&
	  					<div className="custom-row">
							<div>תיאור</div>		
							<div>הושג</div>
							<div></div>
						</div>
	  				}
	  				{ 
	  					goalList.map( goal =>{
							checkbox['value'] = goal.achieved
	  						return(
	  						<div key={goal._id} className="custom-row">
	  							<div>{goal.name}</div>
	  							<div><i className="fa fa-trash-o" onClick={()=>removeGoal(goal._id)}></i></div>
	  						</div>)
	  					}
	  						)
	  				}
	  			</div>
			  </div>
);
}
export default TraineeDashboard;
