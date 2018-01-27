import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as locationActions from 'redux/actions/locationActions'
import * as traineeActions from 'redux/actions/traineeActions'
import Location from '../display/Location';

class LocationComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getLocationList()
    }
    componentDidUpdate(prevProps, prevState) {}

    render() {
        return <Location{...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        locationList: state.location.locationList,
        form: state.location.form,
        traineeId: state.trainee.form.traineeId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( locationActions.updateInputField(field, value) )
        },
        getLocationList(){
            dispatch( locationActions.getLocationList() )
        },
        removeLocation(id){
            dispatch( locationActions.removeLocation(id) )
        },
        editLocation(id){
            dispatch( locationActions.updateLocation(id) )
        },
        addLocation(e){
            e.preventDefault();
            dispatch( locationActions.addLocation() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(LocationComponent)

