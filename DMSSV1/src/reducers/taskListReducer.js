/*export default () => {
    axios.get('http://192.168.0.12:8086/task', {
        params: {
            user_id: '1234'
        }
      })
    .then((response) => {
        console.log(response);
      return response.data["title"].toString();
    })
    .catch((error) => {
      console.log(error);
    })
}*/

import FETCH_TASKS from '../actions';

const INITIAL_STATE = {};

export default (state = [], action) => {
  console.log("taskReducer");
  console.log(action)
  switch (action.type) {
    case FETCH_TASKS:
    console.log("payload")
    console.log(action.payload)
      return {...state, tasks:action.payload};
    default:
      return INITIAL_STATE;
  }
}