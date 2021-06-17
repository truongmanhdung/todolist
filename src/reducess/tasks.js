import * as  types from './../constants/ActionTypes'

  // format id
  const s4=()=>{
     return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
   }
   // hàm return ra id 
   const generateID=()=>{
     return s4()+'/'+ s4()+'-'+s4()+'-'+s4();
   }

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data: [];

var myReducer = (state= initialState, action) =>{
     switch (action.type) {
          case types.LIST_ALL:
               return state;
               break;
          case types.ADD_TASK: 
               console.log(action)
               var newTask = {
                    id: generateID(),
                    name : action.task.name,
                    status: action.task.status === true ? true : false,
                    time: action.task.time,
                    time_start: action.task.time_start,
               }
               state.push(newTask);
               localStorage.setItem('tasks', JSON.stringify(state));
               return [...state];
          default:
               return state;
               break;
     }    
}

export default myReducer