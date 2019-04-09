import axios from 'axios';
export const FETCH_TASKS = 'fetch_tasks';
export const GET_PROFILE = 'get_profile';
export const FETCH_SCORE_TABLE = 'fetch_score_table';



const taskURL = 'http://192.168.43.165:8086/task';
const profileURL = 'http://192.168.43.165:8086/profile';
const scoreTableURL = 'http://192.168.43.165:8086/scoreTable';


export const fetchScoreTable = () => {
  console.log("fetchScoreTable throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(scoreTableURL, {
        params: {

        }
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: FETCH_SCORE_TABLE,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};

export const getProfile = () => {
  console.log("getProfile throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(profileURL, {
        params: {
          user_id: '1235'
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
          user_id: '1235'
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

