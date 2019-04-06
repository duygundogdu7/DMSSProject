import axios from 'axios';
export const FETCH_TASKS = 'fetch_tasks';
export const GET_PROFILE = 'get_profile';


const taskURL = 'http://192.168.0.12:8086/task';
const profileURL = 'http://192.168.0.12:8086/profile';



export const getProfile = () => {
  console.log("getProfile throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(profileURL, {
        params: {
          user_id: '5ca32fa9e16f2972d7e68121'
        }
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: GET_PROFILE,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};




export const fetchAllTasks = () => {
  console.log("fetchTask throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(taskURL, {
        params: {
          user_id: '12345'
        }
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: FETCH_TASKS,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};

