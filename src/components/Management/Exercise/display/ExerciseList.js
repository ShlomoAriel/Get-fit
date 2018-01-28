import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Signup = ({exerciseList, removeExercise}) => {
	return (
		  <div className="exercise-list list-general-wrapper right-margin">
	  			<div>
	  			<div className="custom-row">
	  							<div>שם</div>
	  							<div>תיאור</div>
	  							<div></div>
	  						</div>
	  				{
	  					exerciseList.map( exercise =>
	  						<div key={exercise._id} className="custom-row">
	  							<div>{exercise.name}</div>
	  							<div>{exercise.text}</div>
	  							<div><a target="_blanc" href={exercise.link}><i className="fa fa-film"></i></a></div>
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
