import {FETCH_SCORE_TABLE} from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("scoreReducer");
  console.log(action)
  switch (action.type) {
    case FETCH_SCORE_TABLE:
      return action.payload;
    default:
      return state;
  }
}