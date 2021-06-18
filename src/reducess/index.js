import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayform from './isDisplayForm';
import itemEditting from './itemEditting';
const myReducer = combineReducers({
   tasks: tasks,
   isDisplayform: isDisplayform,
   itemEditting: itemEditting
});

export default myReducer;