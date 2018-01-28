import React from 'react';
import TextInput from'../../../Elements/TextInput/TextInput'
import TraineeList from'../container/TraineeListComponent'

const Signup = ({form, authenticated, traineeList, onInputFieldChange, addTrainee, removeTrainee}) => {
	let formFields = {}
    formFields['emailInput'] = { fieldClass:'form-control',field: 'email', name:'email', placeholder: 'דואר אלקטרוני', value: form.email, onUpdate: onInputFieldChange }
    formFields['passwordInput'] = { type:'password', fieldClass:'form-control',field: 'password', name:'password', placeholder: 'סיסמה', value: form.password, onUpdate: onInputFieldChange }
    formFields['passwordConfirmInput'] = { type:'password', fieldClass:'form-control',field: 'passwordConfirm', name:'passwordConfirm', placeholder: 'וידוא סיסמה', value: form.passwordConfirm, onUpdate: onInputFieldChange }
    
    formFields['identityNumberInput'] = {fieldClass:'form-control',field: 'identityNumber', name:'identityNumber', placeholder: 'ת.ז', value: form.identityNumber, onUpdate: onInputFieldChange }
    formFields['firstNameInput'] = {fieldClass:'form-control',field: 'firstName', name:'firstName', placeholder: 'שם פרטי', value: form.firstName, onUpdate: onInputFieldChange }
    formFields['lastNameInput'] = {fieldClass:'form-control',field: 'lastName', name:'lastName', placeholder: 'שם משפחה', value: form.lastName, onUpdate: onInputFieldChange }
    
    formFields['phoneInput'] = {fieldClass:'form-control',field: 'phone', name:'phone', placeholder: 'טלפון', value: form.phone, onUpdate: onInputFieldChange }
    formFields['addressInput'] = {fieldClass:'form-control',field: 'address', name:'address', placeholder: 'כתובת', value: form.address, onUpdate: onInputFieldChange }
    formFields['facebookInput'] = {fieldClass:'form-control',field: 'facebook', name:'facebook', placeholder: 'פייסבוק', value: form.facebook, onUpdate: onInputFieldChange }
    
    formFields['heightInput'] = {fieldClass:'form-control',field: 'height', name:'height', placeholder: 'גובה', value: form.height, onUpdate: onInputFieldChange }
    formFields['medicalStatusInput'] = {fieldClass:'form-control',field: 'medicalStatus', name:'medicalStatus', placeholder: 'מצב בריאותי', value: form.medicalStatus, onUpdate: onInputFieldChange }
    formFields['medicineInput'] = {fieldClass:'form-control',field: 'medicine', name:'medicine', placeholder: 'תרופות', value: form.medicine, onUpdate: onInputFieldChange }
    formFields['commentInput'] = {fieldClass:'form-control',field: 'comment', name:'comment', placeholder: 'הערה', value: form.comment, onUpdate: onInputFieldChange }
	return (
		  <div className="trainee-dashboard">
		  	<div class="fade-in">
		  					<div className="dashboard-header"> <div>מתאמנים</div></div>

			  <div className="trainee">
			  	<TraineeList/>
			  	<div>
				  	<form>
				  		<h3>משתמש</h3>
					  	<div className="form">
					  		<div>
						  		<TextInput {...formFields['emailInput']}/>
					  		</div>
						  	<div>
						  		<TextInput {...formFields['passwordInput']}/>
					  		</div>
						  	<div>
						  		<TextInput {...formFields['passwordConfirmInput']}/>
						  	</div>
					  	</div>
				  	</form>
				  	<form>
				  		<h3>אישיים</h3>
					  	<div className="form">
					  		<div>
						  		<TextInput {...formFields['identityNumberInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['firstNameInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['lastNameInput']}/>
						  	</div>
					  	</div>
				  	</form>
		  		</div>
			  	<div>
				  	<form>
				  		<h3>תקשורת</h3>
					  	<div className="form">
					  		<div>
						  		<TextInput {...formFields['phoneInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['addressInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['facebookInput']}/>
						  	</div>
					  	</div>
				  	</form>
				  	<form>
				  		<h3>מצב כללי</h3>
					  	<div className="form">
					  		<div>
						  		<TextInput {...formFields['medicalStatusInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['medicineInput']}/>
						  	</div>
					  		<div>
						  		<TextInput {...formFields['commentInput']}/>
						  	</div>
						  	<div className="button-holder">
  						  		<input className="form-control"/>
  						  		<button className="fa fa-arrow-circle-o-right login-button" onClick={addTrainee}></button>
  					  		</div>
					  	</div>
				  	</form>
			  	</div>
			  	{
			  		// <form onSubmit={addTrainee}>
			  		// 		  		<h3>הוספת מתאמנים</h3>
			  		// 			  	<div className="form">
			  		// 				  	{
			  		// 				  		Object.keys(formFields).map( fieldKey =>
			  		// 					  		<div key={fieldKey}>
			  		// 						  		<TextInput {...formFields[fieldKey]}/>
			  		// 						  	</div>	
			  		// 				  		)
			  		// 				  	}
			  		// 				  	<div className="button-holder">
			  		// 				  		<input className="form-control"/>
			  		// 				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
			  		// 			  		</div>
			  		// 			  	</div>
			  		// 		  	</form>
			  				  }
			  </div>
		  	</div>
		  </div>
);
}
export default Signup;
