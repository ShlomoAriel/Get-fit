import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as locationActions from 'redux/actions/locationActions'
import LocationList from '../display/LocationList';

class LocationListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getLocationList()
    }
    componentDidUpdate(prevProps, prevState) {}

    render() {
        return <LocationList{...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        modalOpen:state.system.modalOpen["location"],
        traineeId: state.trainee.form.traineeId,
        locationList: state.location.locationList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeLocation(id){
            dispatch( locationActions.removeLocation(id) )
        },
        getLocationList(){
            dispatch( locationActions.getLocationList() )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("location"))
        },
        editLocation(id){
            dispatch( locationActions.updateLocation(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(LocationListComponent)

