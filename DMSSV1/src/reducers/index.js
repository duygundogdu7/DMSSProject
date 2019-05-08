import { combineReducers } from 'redux';
import TaskListReducer from './taskListReducer';
import ProfileReducer from './profileReducer';
import ScoreReducer from './scoreReducer';
import ManagerReducer from './managerReducer';
import IDReducer from './idReducer';



export default combineReducers({
    tasks: TaskListReducer,
    profile: ProfileReducer,
    scoreTable: ScoreReducer,
    manager: ManagerReducer,
    id: IDReducer
});