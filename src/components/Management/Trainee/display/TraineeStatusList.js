import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import TraineeStatusComponent from'../container/TraineeStatusComponent'

const TraineeDashboard = ({traineeStatusList, removeTraineeStatus, onInputFieldChange, modalOpen, toggleModal}) => {
	let checkbox = { type:'checkbox',fieldClass:'form-control',field: 'checkbox', name:'text', onChange: onInputFieldChange }
	return (
			 <div className="trainee-status list-general-wrapper slide-from-right-hard">
			  	<div>
			  		{ modalOpen && <TraineeStatusComponent toggleModal={toggleModal}/>}
			  		<div>
			  			<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> תמונת מצב</h3>
			  			<div>
				  			<div className="custom-row">
	  							<div>טקסט</div>		
	  							<div>משקל</div>
	  							<div>מותן</div>
	  							<div>חזה</div>
	  							<div>ישבן</div>
	  							<div>זרוע</div>
	  							<div>רגל</div>
	  							<div>כתפיים</div>
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
			  							<div>{traineeStatus.waistCirc}</div>
			  							<div>{traineeStatus.chestCirc}</div>
			  							<div>{traineeStatus.assCirc}</div>
			  							<div>{traineeStatus.armCirc}</div>
			  							<div>{traineeStatus.legCirc}</div>
			  							<div>{traineeStatus.shoulderCirc}</div>
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
