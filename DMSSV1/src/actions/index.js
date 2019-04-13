import axios from 'axios';
export const FETCH_TASKS = 'fetch_tasks';
export const GET_PROFILE = 'get_profile';
export const FETCH_SCORE_TABLE = 'fetch_score_table';
export const CHANGE_TASK = 'change_task';



const updateTaskURL = 'http://192.168.0.12:8086/updateTask';
const taskListURL = 'http://192.168.0.12:8086/taskList';
const profileURL = 'http://192.168.0.12:8086/profile';
const scoreTableURL = 'http://192.168.0.12:8086/scoreTable';



export const changeTask = (task) => {
  console.log("changeTask throwed")
  return async (dispatch) => {
    try {
      console.log("actiona gelen");
      console.log(task);
      const response = await axios.post(updateTaskURL, 
        {
          id: task.id,
          title: task.title
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: CHANGE_TASK,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};


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

export const getProfile = (user_id) => {
  console.log("getProfile throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(profileURL, {
        params: {
          user_id: user_id
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
      const response = await axios.get(taskListURL, {
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

