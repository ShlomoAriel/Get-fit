import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as dietActions from 'redux/actions/dietActions'
import * as traineeActions from 'redux/actions/traineeActions'
import Diet from '../display/Diet';

class DietComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){}
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId){
         this.props.getDietByTrainee()
      }
    }

    render() {
        return <Diet{...this.props}/>
    }
}

function mapStateToProps(state) {
    let traineeOptions = state.trainee.traineeList.map( trainee => {
        return { value:trainee._id, label: trainee.firstName }
    })
    return {
        dietList: state.diet.dietList,
        form: state.diet.form,
        traineeId: state.trainee.currentTrainee._id,
        traineeList: traineeOptions,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onInputFieldChange(field, value){
            dispatch( dietActions.updateInputField(field, value) )
        },
        setCurrentTrainee(field, traineeId){
            dispatch( traineeActions.setCurrentTrainee(traineeId) )
            dispatch( dietActions.getDietByTrainee() )

        },
        getDietByTrainee(){
            dispatch( dietActions.getDietByTrainee() )
        },
        removeDiet(id){
            dispatch( dietActions.removeDiet(id) )
        },
        editDiet(id){
            dispatch( dietActions.updateDiet(id) )
        },
        addDiet(e){
            e.preventDefault();
            dispatch( dietActions.addDiet() )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(DietComponent)

