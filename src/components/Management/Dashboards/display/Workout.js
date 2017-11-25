import React from 'react';
import ScheduledExerciseComponent from '../../ScheduledExercise/container/ScheduledExerciseComponent'
import DietComponent from '../../../Diet/container/DietComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'

const Workout = ({}) => {
	return (
		  <div className="workout trainee-dashboard">
		  	<h2>תכנית אימון</h2>
		  	{
		  		<TraineePersonalInfoComponent/>
		  	}
		  	<ScheduledExerciseComponent/>
		  	<DietComponent/>
		  </div>
);
}
export default Workout;
