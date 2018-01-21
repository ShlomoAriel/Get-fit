import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const Session = ({form, traineeId, traineeList, sessionList, onInputFieldChange, onChange, addSession, removeSession, setCurrentTrainee, toggleModal}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['textInput'] = { type: 'input', fieldClass:'form-control',field: 'text', name:'text', placeholder: 'text', value: form.text, onUpdate: onInputFieldChange }
    formFields['startInput'] = { type: 'dateTime', fieldClass:'inline',startField: 'start', endField:'end', dateField:'date', name:'start', 
    							 placeholder: 'start', value: form.start, onUpdate: onInputFieldChange ,
    							 fromValue:form.start, toValue: form.end, date: form.date}

	return (
		  <div className="session form-modal fade-in">
		  	<form onSubmit={addSession}>
			  	<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
			  	{ form._id && <i className="fa fa-trash-o i-button" aria-hidden="true" onClick={()=>removeSession(form._id)}></i>}
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form slide-from-right">
			  		<InputWrapper {...formFields['textInput']}/>
			  		<div className="">
						  	<InputWrapper {...formFields['startInput']}/>
			  		</div>
				  	<div className="button-holder">
				  		<input className="form-control"/>
				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
			  		</div>
			  	</div>
		  	</form>
		  </div>
);
}
export default Session;
