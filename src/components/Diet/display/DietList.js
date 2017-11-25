import React from 'react';
import TextInput from'../../Elements/TextInput/TextInput'

const DietList = ({dietList, removeDiet}) => {
	return (
		  <div className="diet-list list-general-wrapper">
		  <h3>תפריט</h3>
		  {
			dietList.map( diet =>
				<div key={diet._id} className="custom-row">
					<div>{diet.text}</div>
					<div className="fa-button"><i className="fa fa-trash-o" onClick={()=>removeDiet(diet._id)}></i></div>
					<div className="fa-button"><i className="fa fa-pencil" onClick={()=>editDiet(diet._id)}></i></div>
				</div>
				)
		}
		  </div>
);
}
export default DietList;
