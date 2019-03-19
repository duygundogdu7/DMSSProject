import { combineReducers } from 'redux';
import TaskListReducer from './taskListReducer';

export default combineReducers({
  taskList: TaskListReducer
});