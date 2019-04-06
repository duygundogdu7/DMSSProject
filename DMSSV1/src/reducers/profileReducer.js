import {GET_PROFILE} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("profileReducer");
  console.log(action)
  switch (action.type) {
    case GET_PROFILE:
    console.log("payload getprof")
    console.log(action.profile)
      return action.payload;
    default:
      return state;
  }
}