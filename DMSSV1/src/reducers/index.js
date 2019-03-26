import { combineReducers } from 'redux';
import TaskListReducer from './taskListReducer';
import MemberReducer from './profileReducer';
import ScoreReducer from './scoreReducer';


export default combineReducers({
    tasks: TaskListReducer,
    members: MemberReducer,
    scoreMembers: ScoreReducer
});