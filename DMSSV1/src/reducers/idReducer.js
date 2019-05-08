import {SEND_ID} from '../actions'

// This is the default state of the app i.e. when the app starts for the first time
const INITIAL_STATE = {};


// This is a reducer which listens to actions and modifies the state
export default (state = INITIAL_STATE, action) => {
  // A switch is used since if more actions are added in the future, it will be easy
  // to be able to handle this in the reducer since we just add another 'case'.
  console.log("SEND ID REDUCER'INA GELDİN.");

  switch (action.type) {
    case SEND_ID:
      return action.payload;
    default:
      return state;
  }
}