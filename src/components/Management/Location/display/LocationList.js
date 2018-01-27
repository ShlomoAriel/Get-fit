import React from 'react';
import LocationComponent from'../container/LocationComponent'

const LocationList = ({locationList, removeLocation}) => {
	return (
		  <div className="location-list list-general-wrapper">
			  <div>
			  	<h3>מקומות</h3>
			 	{ locationList.map( location =>
					<div key={location._id} className="custom-row">
						<div>{location.name}</div>
						<div className="fa-button"><i className="fa fa-trash-o" onClick={()=>removeLocation(location._id)}></i></div>
						<div className="fa-button"><i className="fa fa-pencil" onClick={()=>editLocation(location._id)}></i></div>
					</div>
					)
			}
			  </div>
		  	<LocationComponent/>
		  </div>
		
);
}
export default LocationList;
