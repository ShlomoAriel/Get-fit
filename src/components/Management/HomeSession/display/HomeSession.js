import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

const HomeSession = ({form, traineeId, sessionNameList, traineeList,sessionNameId, onInputFieldChange, addHomeSession, removeHomeSession, setCurrentTrainee, toggleModal}) => {
	let formFields = {}
	formFields['sessionNameInput'] = {onSelect:onInputFieldChange,type: 'picklist', fieldClass:'',field: 'sessionName', placeholder: 'סוג אימון', value: form.sessionName, type: 'picklist', options: sessionNameList ? sessionNameList : [] }
    formFields['dateInput'] = { type: 'date', fieldClass:'form-control',field: 'date', name:'date', placeholder: 'date', value: form.date, onUpdate: onInputFieldChange }
    if(!form._id){
    	formFields['weekCounterInput'] = { type: 'input', fieldClass:'form-control',field: 'weekCount', name:'weekCount', placeholder: 'weekCount', value: form.weekCount, onUpdate: onInputFieldChange }
    }
    function remove(id){
    	toggleModal()
    	removeHomeSession(id)
    }
	return (
		  <div className="form-modal fade-in">
		  	<form onSubmit={addHomeSession}>
			  	<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
			  	{ form._id && <i className="fa fa-trash-o i-button" aria-hidden="true" onClick={()=>remove(form._id)}></i>}
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form slide-from-right">
			  	{ Object.keys(formFields).map( fieldKey =>
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
		  </div>
);
}
export default HomeSession;
