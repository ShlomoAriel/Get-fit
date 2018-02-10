import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'
import PaymentComponent from '../../Payment/container/PaymentComponent'
import ExpenseComponent from '../../Payment/container/ExpenseComponent'
import TraineePersonalInfoComponent from '../../Trainee/container/TraineePersonalInfoComponent'
import TraineeTrainingPackageListComponent from'../../Trainee/container/TraineeTrainingPackageListComponent'

const PaymentDashboard = ({paymentList, isAdmin, removeGoal, onInputFieldChange, editMode}) => {
	
	return (
		<div className="trainee-dashboard">
			<div>
				<div className="dashboard-header"> <div>תשלומים</div></div>
				<PaymentComponent/>
			</div>
			{ isAdmin &&
				<div>
					<div className="dashboard-header"> <div>חבילות</div></div>
					<TraineeTrainingPackageListComponent/>
				</div>
			}
			{ isAdmin &&
				<div>
					<div className="dashboard-header"> <div>הוצאות</div></div>
					<ExpenseComponent/>
				</div>
			}
		</div>
);
}
export default PaymentDashboard;
