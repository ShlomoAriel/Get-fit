import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import TrainingPackageList from'../../TrainingPackage/container/TrainingPackageListComponent'
import ScheduledExerciseComponent from '../../ScheduledExercise/container/ScheduledExerciseComponent'
import ScheduledExerciseListComponent from '../../ScheduledExercise/container/ScheduledExerciseListComponent'
import GoalListComponent from '../../Trainee/container/GoalListComponent'
import TraineeStatusListComponent from '../../Trainee/container/TraineeStatusListComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import DietListComponent from '../../Diet/container/DietListComponent'
import SessionNameListComponent from '../../HomeSession/container/SessionNameListComponent'
// import TraineeTrainingPackageListComponent from'../container/TraineeTrainingPackageListComponent'
const TraineeDashboard = ({currentTrainee,form, traineeList, traineeId, trainingPackageList, trainingPackageId, traineePackageList, quantity,
							setCurrentTrainingPackage, onInputFieldChange, setCurrentTrainee, addTraineeTrainingPackage,}) => {
	let formFields = {}
	let traineeInput = {onSelect:setCurrentTrainee,type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] }
    formFields['quantityInput'] = {fieldClass:'form-control',type:'input',field: 'quantity', name:'quantity', placeholder: 'quantity', value: quantity, onUpdate: onInputFieldChange }
	formFields['trainingPackageInput'] = {onSelect:setCurrentTrainingPackage,type: 'picklist', fieldClass:'',field: 'trainingPackage', placeholder: 'Training Package', value: trainingPackageId, type: 'picklist', options: trainingPackageList ? trainingPackageList : [] }

	return (
		<div className="trainee-dashboard">
			<div>
				<div className="dashboard-header"> <div>מתאמן</div></div>
				<TraineePersonalInfoComponent/>
			</div>
			<div className="fade-in">
				<div className="dashboard-header"> <div>תכנית שבועית</div></div>
				<ScheduledExerciseListComponent/>
			</div>
			<div>
				<div className="dashboard-header"> <div>שונות</div></div>
				<div>
				  	<GoalListComponent/>
				  	<DietListComponent/>
			  	</div>
		  	</div>
		  	<div>
		  		<div className="dashboard-header"> <div>תכנית שבועית</div></div>
				<TraineeStatusListComponent/>
			</div>
			<div>
				<div className="dashboard-header"> <div>תכנית שבועית</div></div>
				<SessionNameListComponent/>
			</div>
		</div>
);
}
export default TraineeDashboard;
