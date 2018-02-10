import React from 'react'
import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as dietActions from 'redux/actions/dietActions'
import DietList from '../display/DietList';

class DietListComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount(){
        this.props.getDietByTrainee()
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.props.traineeId != prevProps.traineeId || (this.props.form && this.props.form.weekDay != prevProps.form.weekDay)){
         this.props.getDietByTrainee()
      }
    }

    render() {
        return <DietList{...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.login.isAdmin,
        modalOpen:state.system.modalOpen["diet"],
        traineeId: state.trainee.form.traineeId,
        dietList: state.diet.dietList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeDiet(id){
            dispatch( dietActions.removeDiet(id) )
        },
        getDietByTrainee(){
            dispatch( dietActions.getDietByTrainee() )
        },
        toggleModal(){
            dispatch(systemActions.toggleModal("diet"))
        },
        editDiet(id){
            dispatch( dietActions.updateDiet(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(DietListComponent)

