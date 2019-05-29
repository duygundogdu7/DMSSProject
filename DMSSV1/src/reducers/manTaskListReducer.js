import {MANAGER_TASK} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("taskReducer");
  console.log(action)
  switch (action.type) {
    case MANAGER_TASK:
      return action.payload;
    default:
      return state;
  }
}