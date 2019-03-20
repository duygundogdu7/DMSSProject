import axios from 'axios';
export const FETCH_TASKS = 'FETCH_TASKS';


const apiUrl = 'http://192.168.0.12:8086/task';





export const fetchAllTasks = () => {
  console.log("fetchTask throwed")
  return (dispatch) => {
    return axios.get(apiUrl, {
      params: {
          user_id: '1234'
      }
    })
      .then(response => {
        console.log("action resp")
        console.log(response)
        dispatch({
          type: FETCH_TASKS,
          payload: tasks
        })
      })
      .catch(error => {
        throw(error);
      });
  };
};