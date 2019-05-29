import {FETCH_TASKS, MANAGER_TASK} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("taskReducer");
  console.log(action)
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    case MANAGER_TASK:
      return action.payload;
    default:
      return state;
  }
}