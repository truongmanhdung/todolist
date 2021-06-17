import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayform from './isDisplayForm'
const myReducer = combineReducers({
   tasks: tasks,
   isDisplayform: isDisplayform
});

export default myReducer;