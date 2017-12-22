import React from 'react';
import TrainingPackageComponent from '../../TrainingPackage/container/TrainingPackageComponent'
import ExerciseComponent from '../../Exercise/container/ExerciseComponent'

const Workout = ({}) => {
	return (
		  <div className="trainee-dashboard">
		  	<h2>הגדרות</h2>
		  	<TrainingPackageComponent/>
		  	<ExerciseComponent/>
		  </div>
);
}
export default Workout;
