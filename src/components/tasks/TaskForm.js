import React, { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, listTasks } from "../../actions/taskActions";
import {
  /*  TASK_CREATE_SUCCESS,
  TASK_UPDATE_SUCCESS, */
  TASK_CREATE_RESET,
  TASK_UPDATE_RESET,
} from "../../constants/taskConstants";
/* import { ToastContainer, toast } from "react-toastify"; */
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const TaskForm = (props) => {
  const navigate = useNavigate();
    const params = useParams();
    const {id: taskId}= params;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo._id;
  const initialState = {
    title: "",
    description: "",
    priority: "",
    date: new Date(),
    user: userId,
  };

  const taskList = useSelector((state) => state.taskList);
  const { tasks, loading, error } = taskList;
  const taskCreate = useSelector((state) => state.taskCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = taskCreate;
  const taskUpdate = useSelector((state) => state.taskUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskUpdate;
  const [task, setTask] = useState(initialState);
  const handleChange = (e) =>
    setTask({
      ...task,
      [e.target.name]: e.target.value,
      user: userId,
    });
  const onSubmit = (event) => {
    event.preventDefault();

    if (!task._id) {
      dispatch(createTask(task));
    } else {
      dispatch(updateTask(task));
    }

    navigate("/tasks");
  };
  
  useEffect(() => {
    if (taskId && tasks) {
      const current = tasks.find((task) => task._id === taskId);
      if (current) {
        setTask({
          title: current.title,
          description: current.description,
          priority: current.priority,
          date: new Date(),
          user: userId,
        });
      }
    }
  }, [taskId, tasks, userId]);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: TASK_CREATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: TASK_UPDATE_RESET });
    }
    setTask({
      title: "",
      description: "",
      priority: "",
      date: new Date(),
      user: userId,
    });
    dispatch(listTasks());

    return () => {};
  }, [successCreate, dispatch, successUpdate, userId]);

  return (
    <div className="form-container mx-auto bg-dark ">
      <form className="form form-horizontal" onSubmit={onSubmit}>
        <fieldset>
          <legend>
            {userInfo && ` ${userInfo.name},`} &nbsp;{" "}
            {taskId ? "Actualize la tarea" : "Añada tareas"}
          </legend>
          <div>
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && (
              <MessageBox variant="danger">{errorCreate}</MessageBox>
            )}
            {successCreate && <div>Task Saved Successfully.</div>}
          </div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Fragment>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
              <div className="form-group ">
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Titulo"
                  required
                />
              </div>
              <div className="form-group ">
                <textarea
                  rows="4"
                  name="description"
                  value={task.description}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Descripción"
                ></textarea>
              </div>
              <div className="form-group ">
                <label className=" col-form-label">Prioridad:</label>

                <select
                  name="priority"
                  value={task.priority}
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Baja</option>
                  <option>Media</option>
                  <option>Alta</option>
                </select>
              </div>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-sm">
                  {taskId ? "Update" : "Create"}
                </button>
              </div>
            </Fragment>
          )}
        </fieldset>
      </form>
    </div>
  );
};
export default TaskForm;
