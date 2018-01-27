import React from 'react';
import InputWrapper from'../../../Elements/InputWrapper/InputWrapper'
import moment from 'moment'

const PaymentList = ({paymentList, removeGoal, onInputFieldChange, editMode, totalPayed, totalBill}) => {
	let checkbox = { type:'checkbox',fieldClass:'form-control',field: 'checkbox', name:'text', onChange: onInputFieldChange }
	return (
			 <div className="payment-list list-general-wrapper">
			  	<div>
			  		<div>
			  			<h3>תשלומים</h3>
			  			<div>
				  			<div className="custom-row">
	  							<div>טקסט</div>
	  							<div>סוג</div>
	  							<div>תאריך</div>
	  							<div>סכום</div>
	  							<div></div>
	  						</div>
			  				{ 
			  					paymentList.map( payment =>{
    								checkbox['value'] = payment.achieved
			  						return(
			  						<div key={payment._id} className="custom-row">
			  							<div>{payment.text}</div>
			  							<div>{payment.type}</div>
			  							<div>{moment(payment.date).format("DD/MM/YYYY")}</div>
			  							<div>{payment.amount}</div>
			  							<div><i className="fa fa-trash-o" onClick={()=>removeGoal(payment._id)}></i></div>
			  						</div>)
			  					}
			  						)
			  				}
	  						<div className="custom-row">
	  							<div>שולם</div>
	  							<div></div>
	  							<div></div>
	  							<div>{totalPayed}</div>
	  							<div></div>
	  						</div>
			  				<div className="custom-row">
	  							<div>סך הכל לתשלום</div>
	  							<div></div>
	  							<div></div>
	  							<div>{totalBill}</div>
	  							<div></div>
	  						</div>
	  						<div className="custom-row">
	  							<div>נותר לשלם</div>
	  							<div></div>
	  							<div></div>
	  							<div>{totalBill-totalPayed}</div>
	  							<div></div>
	  						</div>
			  			</div>
			  		</div>
			  	</div>
			  </div>
);
}
export default PaymentList;
