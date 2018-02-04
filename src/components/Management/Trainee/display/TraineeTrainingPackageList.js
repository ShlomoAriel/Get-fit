import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import TrainingPackageList from'../../TrainingPackage/container/TrainingPackageListComponent'
import ScheduledExerciseComponent from '../../ScheduledExercise/container/ScheduledExerciseComponent';

const TraineeDashboard = ({traineePackageList, quantity, percent,trainingPackageId, trainingPackageList, currentPackcage,
							onInputFieldChange, setCurrentTrainingPackage, removeTraineeTrainingPackage, addTraineeTrainingPackage}) => {
	let formFields = {}
	formFields['quantityInput'] = {fieldClass:'form-control quantity',type:'input',field: 'quantity', name:'quantity', placeholder: 'quantity', value: quantity, onUpdate: onInputFieldChange }
	formFields['percentInput'] = {fieldClass:'form-control percent',type:'input',field: 'percent', name:'percent', placeholder: 'percent', value: percent, onUpdate: onInputFieldChange }
	formFields['trainingPackageInput'] = {onSelect:setCurrentTrainingPackage,type: 'picklist', fieldClass:'',field: 'trainingPackage', placeholder: 'Training Package', value: trainingPackageId, type: 'picklist', options: trainingPackageList ? trainingPackageList : [] }
	return (
		  	<div>
			<div className="training-package-list list-general-wrapper">
					<h3>חבילות</h3>
					{ traineePackageList.length > 0 &&
						<div className="custom-row">
							<div>חבילה</div>	
							<div>יחידות</div>  							
							<div>מחיר</div>
							<div>אחוז</div>
							<div>אימונים</div>
							<div></div>
						</div>
					}
					{
						traineePackageList.map( trainingPackage =>
							<div key={trainingPackage._id} className="custom-row">
								<div>{trainingPackage.name}</div>
								<div>{trainingPackage.quantity}</div>
								<div>{trainingPackage.amount}</div>
								<div>{trainingPackage.percent}</div>
								<div>{trainingPackage.sessions}</div>
								<div><i className="fa fa-trash-o" onClick={()=>removeTraineeTrainingPackage(trainingPackage._id)}></i></div>
							</div>
							)
					}
			</div>
				{
					<form onSubmit={addTraineeTrainingPackage}>
						<h3>הוספת חבילה</h3>
						<div className="form">
						{
					  		Object.keys(formFields).map( fieldKey =>
						  		<div key={fieldKey}>
							  		<InputWrapper {...formFields[fieldKey]}/>
							  	</div>	
					  		)
					  	}
					  		<div className="button-holder">
						  		<input className="form-control"/>
						  		<button className="fa fa-arrow-circle-o-right login-button"></button>
					  		</div>
					  	</div>
					</form>
				}
			</div>
);
}
export default TraineeDashboard;
