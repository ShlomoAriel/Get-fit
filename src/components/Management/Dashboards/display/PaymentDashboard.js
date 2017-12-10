import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import PaymentComponent from '../../Payment/container/PaymentComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import TraineeTrainingPackageListComponent from'../../Trainee/container/TraineeTrainingPackageListComponent'

const PaymentDashboard = ({paymentList, removeGoal, onInputFieldChange, editMode}) => {
	
	return (
			 <div className="trainee-dashboard">
				<h2>תשלומים וחבילות</h2>
				<TraineePersonalInfoComponent/>
				<TraineeTrainingPackageListComponent/>
			  	<PaymentComponent/>
			  </div>
);
}
export default PaymentDashboard;
