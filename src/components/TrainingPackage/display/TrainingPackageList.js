import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'

const Signup = ({trainingPackageList, removeTrainingPackage}) => {
	return (
		  <div className="trainingPackage-list">
		  	<div>
		  		<div>
		  			<h3>trainingPackages</h3>
		  			<div>
		  				{
		  					trainingPackageList.map( trainingPackage =>
		  						<div key={trainingPackage._id} className="custom-row">
		  							<div>{trainingPackage.name}</div>
		  							<div>{trainingPackage.amount}</div>
		  							<div>{trainingPackage.sessions}</div>
		  							<div>{trainingPackage.percent}</div>
		  							<div><i className="fa fa-trash-o" onClick={()=>removeTrainingPackage(trainingPackage._id)}></i></div>
		  							<div><i className="fa fa-pencil" onClick={()=>editTrainingPackage(trainingPackage._id)}></i></div>
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
