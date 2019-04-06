import { combineReducers } from 'redux';
import TaskListReducer from './taskListReducer';
import ProfileReducer from './profileReducer';


export default combineReducers({
    tasks: TaskListReducer,
    profile: ProfileReducer,
});