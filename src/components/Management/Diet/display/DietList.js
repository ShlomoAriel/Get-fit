import React from 'react';
import DietComponent from'../container/DietComponent'

const DietList = ({dietList, removeDiet, modalOpen, toggleModal}) => {
	return (
		  <div className="diet-list list-general-wrapper">
		   { modalOpen && <DietComponent toggleModal={toggleModal}/>}
			  <div>
			  	<h3><i className="fa fa-plus-square-o  i-button" aria-hidden="true" onClick={()=>toggleModal()}></i> טיפים תזונתיים</h3>
			  	{ dietList.lebgth > 0 &&
			  		<div className="custom-row">
							<div>תיאור</div>
							<div></div>
						</div>
				}
			 	{ dietList.map( diet =>
					<div key={diet._id} className="custom-row">
						<div>{diet.text}</div>
						<div className="fa-button"><i className="fa fa-trash-o" onClick={()=>removeDiet(diet._id)}></i></div>
						<div className="fa-button"><i className="fa fa-pencil" onClick={()=>editDiet(diet._id)}></i></div>
					</div>
					)
			}
			  </div>
		  </div>
);
}
export default DietList;
