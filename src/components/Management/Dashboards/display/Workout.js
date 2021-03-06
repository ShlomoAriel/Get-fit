import React from 'react';
import ScheduledExerciseListComponent from '../../ScheduledExercise/container/ScheduledExerciseListComponent'
import DietListComponent from '../../Diet/container/DietListComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import ScheduleComponent from '../../Schedule/container/ScheduleComponent'

const Workout = ({}) => {
	return (
		<div className="workout trainee-dashboard">
			<div>
				<div className="dashboard-header"> <div>מתאמן</div></div>
					<TrainingPackageComponent/>
				</div>
				<div>
					<ScheduledExerciseListComponent/>
					<DietListComponent/>
				</div>
				<div>
					<ScheduleComponent/>
				</div>  	
		</div>
);
}
export default Workout;
