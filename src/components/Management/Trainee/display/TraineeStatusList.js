import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import TraineeStatusComponent from'../container/TraineeStatusComponent'

const TraineeDashboard = ({traineeStatusList, isAdmin, removeTraineeStatus, onInputFieldChange, modalOpen, toggleModal}) => {
	let checkbox = { type:'checkbox',fieldClass:'form-control',field: 'checkbox', name:'text', onChange: onInputFieldChange }
	return (
			 <div className="trainee-status list-general-wrapper slide-from-right-hard">
			  		{ modalOpen && <TraineeStatusComponent toggleModal={toggleModal}/>}
			  		<div>
			  			<h3>
			  				{ isAdmin &&
			  					<i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
			  				}
			  				תמונת מצב
			  				</h3>
			  			<div className="status-table">
				  			<div className="custom-row">
	  							<div>תיאור</div>		
	  							<div>משקל</div>
	  							<div>זרוע</div>
	  							<div>חזה</div>
	  							<div>מותן</div>
	  							<div>ישבן</div>
	  							<div>רגל</div>
	  							<div>חולצה</div>
	  							<div>מכנסיים</div>
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
			  							<div>{traineeStatus.armCirc}</div>
			  							<div>{traineeStatus.chestCirc}</div>
			  							<div>{traineeStatus.waistCirc}</div>
			  							<div>{traineeStatus.assCirc}</div>
			  							<div>{traineeStatus.legCirc}</div>
			  							<div>{traineeStatus.shirtSize}</div>
			  							<div>{traineeStatus.pantsSize}</div>
			  							<div>{traineeStatus.shoulderCirc}</div>
			  							<div>{moment(traineeStatus.date).format("DD/MM/YYYY")}</div>
			  							{ isAdmin &&
			  								<div><i className="fa fa-trash-o" onClick={()=>removeTraineeStatus(traineeStatus._id)}></i></div>
			  							}
			  							
			  						</div>)
			  					}
			  						)
			  				}
			  			</div>
			  		</div>
			  </div>
);
}
export default TraineeDashboard;
