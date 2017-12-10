import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'

const Signup = ({traineeList, removeTrainee}) => {
	return (
		  <div className="trainee-list list-general-wrapper">
		  	<div>
		  		<div>
		  			<h3>מתאמנים</h3>
		  			<div>
		  				{
		  					traineeList.map( trainee =>
		  						<div key={trainee._id} className="custom-row">
		  							<div>{trainee.firstName}</div>
		  							<div>{trainee.lastName}</div>
		  							<div><i className="fa fa-trash-o" onClick={()=>removeTrainee(trainee._id)}></i></div>
		  							<div><i className="fa fa-pencil" onClick={()=>editTrainee(trainee._id)}></i></div>
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
