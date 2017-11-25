import {connect} from 'react-redux';
import R from 'ramda';
import * as systemActions from 'redux/actions/systemActions'
import * as dietActions from 'redux/actions/dietActions'
import DietList from '../display/DietList';

function mapStateToProps(state) {
    return {
        dietList: state.diet.dietList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeDiet(id){
            dispatch( dietActions.removeDiet(id) )
        },
        editDiet(id){
            dispatch( dietActions.updateDiet(id) )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(DietList)

