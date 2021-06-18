import * as  types from './../constants/ActionTypes'

  // format id
  const s4=()=>{
     return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
   }
   // hàm return ra id 
   const generateID=()=>{
     return s4()+'/'+ s4()+'-'+s4()+'-'+s4();
   }
   const findIndex = (tasks,id) =>{
     var result = -1;
     tasks.forEach((task,index)=>{
       if(task.id === id){
         result = index;
       }
     });
     return result;
     
   }

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data: [];

var myReducer = (state= initialState, action) =>{
     var id = '';
     var index = -1;
     switch (action.type) {
          case types.LIST_ALL:
               return state;
          case types.ADD_TASK: 
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
          case types.UPDATE_STATUS:
               id = action.id;
               index = findIndex(state,id);
               // var cloneTask = {...state[index]};
               // cloneTask.status = !cloneTask.status;
               // state[index] = cloneTask;
               state[index] = {
                    ...state[index],
                    status: !state[index].status
               }
               localStorage.setItem('tasks', JSON.stringify(state));
               return [...state];
          case types.DELETE_TASK:
               id = action.id;
               index = findIndex(state,id);
               state.splice(index,1);
               localStorage.setItem('tasks', JSON.stringify(state));
               return [...state];
          
          default:
               return state;
     }    
}

export default myReducer