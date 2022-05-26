import Axios from "axios";
import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  GET_TASKS,
  TASK_DELETE_REQUEST,
  TASK_DELETE_FAIL,
  TASK_DELETE_SUCCESS,
  CLEAR_TASKS,
  CLEAR_CURRENT,
  TASK_ERROR,
  SET_CURRENT,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
 
} from "../constants/taskConstants";
export const createTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST, payload: task });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!task._id) {
      const { data } = await Axios.post('/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/tasks/' + task._id,
        task,
        {
          headers: {
            Authorization: `Qepweb ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: TASK_CREATE_FAIL, payload: error.message });
  }
};
export const setCurrent = (task) => async (dispatch) => {
  dispatch({ type: SET_CURRENT, payload: task });
};
export const clearTasks = () => async (dispatch) => {
  dispatch({ type: CLEAR_TASKS });
};
export const clearCurrent = () => async (dispatch) => {
  dispatch({ type: CLEAR_CURRENT });
};

export const listTasks = () => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const res = await Axios.get(`/api/tasks/user/${userInfo._id}`);
    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_ERROR, payload: message });
  }
};
export const detailsTask= (taskId) => async (dispatch, getState) => {
  dispatch({ type: TASK_DETAILS_REQUEST, payload: taskId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/tasks/${taskId}`, {
      headers:  { Authorization: 'Qepweb ' + userInfo.token }
    });
  
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_DETAILS_FAIL, payload: message });
  }
};
export const deleteTask = (taskId) => async (dispatch, getState) => {
  dispatch({ type: TASK_DELETE_REQUEST, payload: taskId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
     Axios.delete(`/api/tasks/${taskId}`, {
      headers: { Authorization: `Qepweb ${userInfo.token}` },
    });
    dispatch({ type: TASK_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_DELETE_FAIL, payload: message });
  }
};

export const updateTask = (task) => async (dispatch, getState) => {
  dispatch({ type: TASK_UPDATE_REQUEST, payload: task });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/tasks/${task._id}`, task,  {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TASK_UPDATE_FAIL, payload: message });
  }
};
