import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import ImageUploader from 'react-images-upload';



const TraineeStatus = ({ form, traineeId, traineeList, traineeStatusList, modalOpen, holdImages, uploadImageToField,
				  toggleModal, onInputFieldChange, addTraineeStatus, removeTraineeStatus, setCurrentTrainee}) => {
	let formFields = {}
	formFields['traineeInput'] = {onSelect:setCurrentTrainee, type: 'picklist', fieldClass:'',field: 'trainee', placeholder: 'Trainee', value: traineeId, type: 'picklist', options: traineeList ? traineeList : [] },
    formFields['weightInput'] = { type: 'input', fieldClass:'form-control',field: 'weight', name:'weight', placeholder: 'weight', value: form.weight, onUpdate: onInputFieldChange }
    formFields['armCircInput'] = { type: 'input', fieldClass:'form-control',field: 'armCirc', name:'armCirc', placeholder: 'armCirc', value: form.armCirc, onUpdate: onInputFieldChange }
    formFields['chestCircInput'] = { type: 'input', fieldClass:'form-control',field: 'chestCirc', name:'chestCirc', placeholder: 'chestCirc', value: form.chestCirc, onUpdate: onInputFieldChange }
    formFields['legCircInput'] = { type: 'input', fieldClass:'form-control',field: 'legCirc', name:'legCirc', placeholder: 'legCirc', value: form.legCirc, onUpdate: onInputFieldChange }
    formFields['waistCircInput'] = { type: 'input', fieldClass:'form-control',field: 'waistCirc', name:'waistCirc', placeholder: 'waistCirc', value: form.waistCirc, onUpdate: onInputFieldChange }
    formFields['assCircInput'] = { type: 'input', fieldClass:'form-control',field: 'assCirc', name:'assCirc', placeholder: 'assCirc', value: form.assCirc, onUpdate: onInputFieldChange }
    formFields['shoulderCircInput'] = { type: 'input', fieldClass:'form-control',field: 'shoulderCirc', name:'shoulderCirc', placeholder: 'shoulderCirc', value: form.shoulderCirc, onUpdate: onInputFieldChange }
    formFields['pantsSizeInput'] = { type: 'input', fieldClass:'form-control',field: 'pantsSize', name:'pantsSize', placeholder: 'pantsSize', value: form.pantsSize, onUpdate: onInputFieldChange }
    formFields['shirtSizeInput'] = { type: 'input', fieldClass:'form-control',field: 'shirtSize', name:'shirtSize', placeholder: 'shirtSize', value: form.shirtSize, onUpdate: onInputFieldChange }
    formFields['nameInput'] = { type: 'input', fieldClass:'form-control',field: 'name', name:'name', placeholder: 'name', value: form.name, onUpdate: onInputFieldChange }

	return (
		  <div className="">
			  <div className="form-modal fade-in">
			  	<form onSubmit={(e)=>{e.preventDefault();}}>
			  		<i className="fa fa-times-circle-o i-button" aria-hidden="true" onClick={()=>toggleModal()}></i>
			  		
				  	<div className="form slide-from-right">
					  	{
					  		Object.keys(formFields).map( fieldKey =>
						  		<div key={fieldKey}>
							  		<InputWrapper {...formFields[fieldKey]}/>
							  	</div>	
					  		)
					  	}
			            <ImageUploader
			                withIcon={false}
			                buttonText='Choose images'
			                onChange={uploadImageToField}
			                imgExtension={['.jpg', '.gif', '.png', '.gif']}
			                maxFileSize={5242880}
			                withLabel={false}
			            />
					  	<div className="button-holder">
					  		<input className="form-control"/>
					  		<button className="fa fa-arrow-circle-o-right login-button" onClick={addTraineeStatus}></button>
				  		</div>
				  	</div>
			  	</form>
			  </div>
		  </div>
);
}
export default TraineeStatus;
