import { combineReducers } from 'redux';
import TaskListReducer from './taskListReducer';
import ProfileReducer from './profileReducer';
import ScoreReducer from './scoreReducer';



export default combineReducers({
    tasks: TaskListReducer,
    profile: ProfileReducer,
    scoreTable: ScoreReducer,
});