import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'

const Login = ({email, password, authenticated, onInputFieldChange, login}) => {
    const emailInput = { fieldClass:'form-control',field: 'email', name:'email', placeholder: 'email', value: email, onUpdate: onInputFieldChange }
    const passwordInput = { type:'password', fieldClass:'form-control',field: 'password', name:'password', placeholder: 'password', value: password, onUpdate: onInputFieldChange }

	return (
		  <div className="login">
		  { !authenticated ?
		  	<form onSubmit={login}>
		  		<h3>Login & Get Fit!</h3>
			  	<div className="form">
				  	<div className="form__first">
				  		<TextInput {...emailInput}/>
				  	</div>
				  	<div className="form__last button-holder">
				  		<TextInput {...passwordInput}/>
				  		<button className="fa fa-arrow-circle-o-right login-button"></button>
				  	</div>
			  	</div>
		  	</form>
		  	:
		  	<h3> {email} You are logged in</h3>
		  }
			 </div>
);
}
export default Login;
