import {FETCH_TASKS} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("taskReducer");
  console.log(action)
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }
}