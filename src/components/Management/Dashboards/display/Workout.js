import React from 'react';
import ScheduledExerciseListComponent from '../../ScheduledExercise/container/ScheduledExerciseListComponent'
import DietListComponent from '../../Diet/container/DietListComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'

const Workout = ({}) => {
	return (
		  <div className="workout trainee-dashboard">
		  	<h2>תכנית אימון</h2>
		  	{
		  		<TraineePersonalInfoComponent/>
		  	}
		  	<ScheduledExerciseListComponent/>
		  	<DietListComponent/>
		  </div>
);
}
export default Workout;
