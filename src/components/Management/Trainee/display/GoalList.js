import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'

const TraineeDashboard = ({goalList, removeGoal, onInputFieldChange, editMode}) => {
	let checkbox = { type:'checkbox',fieldClass:'form-control',field: 'checkbox', name:'text', onChange: onInputFieldChange }
	return (
			 <div className="training-package-list list-general-wrapper">
	  			<div>
	  				<h3>מטרות</h3>
		  			<div className="custom-row">
							<div>טקסט</div>		
							<div>הושג</div>
							<div>תאריך</div>
							<div></div>
						</div>
	  				{ 
	  					goalList.map( goal =>{
							checkbox['value'] = goal.achieved
	  						return(
	  						<div key={goal._id} className="custom-row">
	  							<div>{goal.text}</div>
	  							{ editMode && <InputWrapper {...checkbox}/>}
	  							<div>{moment(goal.date).format("MMM Do YYYY")}</div>
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
