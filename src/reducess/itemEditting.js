import * as  types from './../constants/ActionTypes'
var initialState = {};

var myReducer = (state= initialState, action) =>{
     switch (action.type) {
          case types.EDIT_TASK:
               console.log(action);
               return action.task; 
          default:
               return state;
               break;
     }    
}

export default myReducer