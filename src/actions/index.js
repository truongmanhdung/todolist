import * as  types from './../constants/ActionTypes'

export const listAll = () =>{
     return {
          type: types.LIST_ALL
     }
}

export const addTask = (task) =>{
     return {
          type: types.ADD_TASK,
          task: task
     }
}

export const toggleForm = () =>{
     return {
          type: types.TOGGLE_FORM,
     }
}

export const closeForm = () =>{
     return {
          type: types.CLOSE_FORM,
     }
}

export const openForm = () =>{
     return {
          type: types.OPEN_FORM,
     }
}


export const onUpdateStatus = (id) =>{
     return {
          type: types.UPDATE_STATUS,
          id: id,
     }
}
export const onDelete = (id) =>{
     return {
          type: types.DELETE_TASK,
          id: id,
     }
}
export const onEditTask = (task) =>{
     return {
          type: types.EDIT_TASK,
          task: task
     }
}