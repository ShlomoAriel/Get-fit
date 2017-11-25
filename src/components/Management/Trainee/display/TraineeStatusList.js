import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'

const TraineeDashboard = ({traineeStatusList, removeTraineeStatus, onInputFieldChange, editMode}) => {
	let checkbox = { type:'checkbox',fieldClass:'form-control',field: 'checkbox', name:'text', onChange: onInputFieldChange }
	return (
			 <div className="training-package-list list-general-wrapper">
			  	<div>
			  		<div>
			  			<h3>תמונת מצב</h3>
			  			<div>
				  			<div className="custom-row">
	  							<div>טקסט</div>		
	  							<div>משקל</div>		
	  							{ editMode &&<div>הושג</div>}
	  							<div>תאריך</div>
	  							<div></div>
	  						</div>
			  				{ 
			  					traineeStatusList.map( traineeStatus =>{
    								checkbox['value'] = traineeStatus.achieved
			  						return(
			  						<div key={traineeStatus._id} className="custom-row">
			  							<div>{traineeStatus.name}</div>
			  							<div>{traineeStatus.weight}</div>
			  							{ editMode && <InputWrapper {...checkbox}/>}
			  							<div>{moment(traineeStatus.date).format("MMM Do YYYY")}</div>
			  							<div><i className="fa fa-trash-o" onClick={()=>removeTraineeStatus(traineeStatus._id)}></i></div>
			  						</div>)
			  					}
			  						)
			  				}
			  			</div>
			  		</div>
			  	</div>
			  </div>
);
}
export default TraineeDashboard;
