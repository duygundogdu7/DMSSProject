import axios from 'axios';
export const FETCH_TASKS = 'fetch_tasks';
export const GET_PROFILE = 'get_profile';
export const FETCH_SCORE_TABLE = 'fetch_score_table';
export const CHANGE_TASK = 'change_task';
export const DELETE_TASK = 'delete_task';
export const MANAGER_TASK = 'manager_task';
export const APPROVE_TASK = 'approve_task';

export const SEND_MANAGER = 'sendManager';
export const SEND_ID = 'sendID';


const completeTaskUrl = 'http://172.20.10.9:8086/completeTask';
const updateTaskURL = 'http://172.20.10.9:8086/updateTask';
const taskListURL = 'http://172.20.10.9:8086/taskList';
const profileURL = 'http://172.20.10.9:8086/profile';
const scoreTableURL = 'http://172.20.10.9:8086/scoreTable';
const managerTaskURL = 'http://172.20.10.9:8086/managerTaskList';
const approveTaskURL = 'http://172.20.10.9:8086/approveTask';


export const approveTask = (task) => {
  console.log("approveTask throwed")
  return async (dispatch) => {
    try {
      console.log("actiona gelen");
      console.log(task);
      const response = await  axios.post(approveTaskURL, { data: {  id: task.id } });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: APPROVE_TASK,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};

export const fetchAllManagerTasks = (id) => {
  console.log("fetchManagerTask throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(managerTaskURL, {
        params: {
          user_id: id
        }
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: MANAGER_TASK,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};

export const changeTask = (task) => {
  console.log("changeTask throwed")
  return async (dispatch) => {
    try {
      console.log("actiona gelen");
      console.log(task);
      const response = await axios.post(updateTaskURL, 
        {
          id: task.id,
          title: task.title,
          date: task.date,
          type: task.type
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

export const deleteTask = (task) => {
  console.log("deleteTask throwed")
  return async (dispatch) => {
    try {
      console.log("actiona gelen");
      console.log(task);
      const response = await  axios.delete(updateTaskURL, { data: {  id: task.id } });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: DELETE_TASK,
        payload: response
      });
    }
    catch (error) {
      throw (error);
    }
  };
};

export const completeTask = (task) => {
  console.log("completeTask throwed")
  return async (dispatch) => {
    try {
      console.log("actiona gelen");
      console.log(task);
      const response = await axios.post(completeTaskUrl, 
        {
          id: task.id      
      });
      console.log("action resp");
      console.log(response);
      dispatch({
        type: DELETE_TASK,
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

export const getProfile = (id) => {
  console.log("getProfile throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(profileURL, {
        params: {
          user_id: id
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




export const fetchAllTasks = (id) => {
  console.log("fetchTask throwed")
  return async (dispatch) => {
    try {
      const response = await axios.get(taskListURL, {
        params: {
          user_id: id
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

export function sendManager(text) {
  console.log("SEND MANAGER ACTION'INA GELDİN.");
  return {
    type: SEND_MANAGER,
    payload: text
  }
}

export function sendID(ID){
  console.log("SEND ID ACTION'INA GELDİN.");

    console.log(ID);
    return{
      type: SEND_ID,
      payload: ID
    }
}