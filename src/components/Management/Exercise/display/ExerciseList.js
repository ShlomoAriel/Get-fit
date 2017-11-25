import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Signup = ({exerciseList, removeExercise}) => {
	return (
		  <div className="exercise-list list-general-wrapper">
		  	<div>
		  		<div>
		  			<h3>exercises</h3>
		  			<div>
		  				{
		  					exerciseList.map( exercise =>
		  						<div key={exercise._id} className="custom-row">
		  							<div>{exercise.name}</div>
		  							<div>{exercise.text}</div>
		  							<div>{exercise.link}</div>
		  							<div>{exercise.sets}</div>
		  							<div>{exercise.reps}</div>
		  							<div><i className="fa fa-trash-o" onClick={()=>removeExercise(exercise._id)}></i></div>
		  							<div><i className="fa fa-pencil" onClick={()=>editExercise(exercise._id)}></i></div>
		  						</div>
		  						)
		  				}
		  			</div>
		  		</div>
		  	</div>
		  </div>
);
}
export default Signup;
