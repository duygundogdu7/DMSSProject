import {GET_PROFILE} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("profileReducer");
  console.log(action)
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    default:
      return state;
  }
}