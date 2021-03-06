import React from 'react';
import TrainingPackageComponent from '../../TrainingPackage/container/TrainingPackageComponent'
import ExerciseComponent from '../../Exercise/container/ExerciseComponent'
import LocationListComponent from 'components/Management/Location/container/LocationListComponent'
import GoalListComponent from 'components/Management/Trainee/container/GoalListComponent'

const Workout = ({}) => {
	return (
		  <div className="trainee-dashboard">
			  <div>
				<div className="dashboard-header"> <div>חבילות</div></div>
			  	<TrainingPackageComponent/>
			  </div>
			  <div>
				<div className="dashboard-header"> <div>תרגילים</div></div>
			  	<ExerciseComponent/>
			  </div>
			  <div>
				<div className="dashboard-header"> <div>מקומות</div></div>
			  	<LocationListComponent/>
			  </div>
			  <div>
				<div className="dashboard-header"> <div>מקומות</div></div>
			  	<GoalListComponent/>
			  </div>
		  </div>
);
}
export default Workout;
