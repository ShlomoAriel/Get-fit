import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const TraineePersonalInfo = ({currentTrainee, traineeList, traineeId, setCurrentTrainee}) => {
	let traineeInput = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }

	return (
		<div className="personal-info slide-from-top">
			<div className="dashboard-picklist"><InputWrapper {...traineeInput}/></div>
			<div>{currentTrainee.email}</div>
			<div>{currentTrainee.phone}</div>				
			<div></div>
			<div></div>
			<div></div>
		</div>
);
}
export default TraineePersonalInfo;
