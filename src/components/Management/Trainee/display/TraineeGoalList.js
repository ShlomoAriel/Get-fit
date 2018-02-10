import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import TraineeGoalComponent from'../container/TraineeGoalComponent'

const TraineeDashboard = ({traineeGoalList, isAdmin, removeGoal, onInputFieldChange, modalOpen, toggleModal, toggleCheckbox}) => {
	let checkbox = { type:'checkbox',fieldClass:'',field: 'checkbox', name:'name', onChange: toggleCheckbox }
	return (
			 <div className="goal-list list-general-wrapper slide-from-right">
			 	{ modalOpen && <TraineeGoalComponent toggleModal={toggleModal}/>}
	  			<div>
	  				<h3>
	  					{ isAdmin &&
	  						<i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> 
	  					}
	  					מטרות
	  				</h3>
	  				{ traineeGoalList && traineeGoalList.length > 0 &&
	  					<div className="custom-row">
							<div>תיאור</div>		
							<div>הושג</div>
							<div></div>
						</div>
	  				}
	  				{ 
	  					traineeGoalList.map( goal =>{
							checkbox['value'] = goal.achieved
	  						return(
	  						<div key={goal._id} className="custom-row">
	  							<div>{goal.name}</div>
	  							<InputWrapper {...checkbox}
	  										id={ goal._id}/>
	  							{ isAdmin &&
	  								<div><i className="fa fa-trash-o" onClick={()=>removeGoal(goal._id)}></i></div>
	  							}
	  						</div>)
	  					}
	  						)
	  				}
	  			</div>
			  </div>
);
}
export default TraineeDashboard;
