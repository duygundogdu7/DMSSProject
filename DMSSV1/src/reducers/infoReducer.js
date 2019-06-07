import {GET_INFO} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("getInfoReducer");
  console.log(action)
  switch (action.type) {
    case GET_INFO:
      return action.payload;
    default:
      return state;
  }
}