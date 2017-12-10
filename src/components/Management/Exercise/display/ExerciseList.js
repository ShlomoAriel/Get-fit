import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Signup = ({exerciseList, removeExercise}) => {
	return (
		  <div className="exercise-list list-general-wrapper right-margin">
	  			<h3>תרגילים</h3>
	  			<div>
	  				{
	  					exerciseList.map( exercise =>
	  						<div key={exercise._id} className="custom-row">
	  							<div>{exercise.name}</div>
	  							<div>{exercise.text}</div>
	  							<div><a target="_blanc" href={exercise.link}>סרטון</a></div>
	  							<div><i className="fa fa-trash-o" onClick={()=>removeExercise(exercise._id)}></i></div>
	  							<div><i className="fa fa-pencil" onClick={()=>editExercise(exercise._id)}></i></div>
	  						</div>
	  						)
	  				}
	  			</div>
		  </div>
);
}
export default Signup;
