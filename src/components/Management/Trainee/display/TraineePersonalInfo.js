import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const TraineePersonalInfo = ({isAdmin, currentTrainee, traineeList, traineeId, setCurrentTrainee, isExpanded, toggleExpand}) => {
	let traineeInput = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }

	return (
		currentTrainee && currentTrainee.firstName ?
		<div className="personal-info">
			<div className="shine personal-info-header" onClick={toggleExpand}>
				<div>{currentTrainee.firstName} {currentTrainee.lastName}</div>
			</div>
			<div className={"collapse-info slide-from-top " + (isExpanded ? "open" : "" )}>
			{ isAdmin &&
				<div>
					<div className="dashboard-picklist"><InputWrapper {...traineeInput}/></div>
				</div>
			}
				<div>
					<h2>פרטים אישיים</h2>
					<div>{currentTrainee.firstName} {currentTrainee.lastName}</div>
					<div>{currentTrainee.identityNumber}</div>
				</div>
				<div>
					<h2>פרטי תקשורת</h2>
					<div>{currentTrainee.email}</div>
					<div>{currentTrainee.phone}</div>
					<div>{currentTrainee.address}</div>
					{currentTrainee.facebook &&  <div><a target="_blanc" href={currentTrainee.facebook}>פייסבוק</a></div>}
				</div>
				<div>
					<h2>נתונים</h2>
					<div>{currentTrainee.medicalStatus}</div>
					<div>{currentTrainee.medicine}</div>
					<div>{currentTrainee.comment}</div>
				</div>
			</div>
		</div>
		:
		null
);
}
export default TraineePersonalInfo;
