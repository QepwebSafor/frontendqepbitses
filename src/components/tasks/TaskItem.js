import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteTask, listTasks } from "../../actions/taskActions";
import {
  TASK_DELETE_SUCCESS,
  TASK_DELETE_RESET,
} from "../../constants/taskConstants";
import { format } from "timeago.js";
const TaskItem = ({ task, setCurrentId }) => {
  const dispatch = useDispatch();
  const taskDelete = useSelector((state) => state.taskDelete);
  const { success: successDelete } = taskDelete;
  const deleteHandler = (task) => {
    dispatch(deleteTask(task._id));
    dispatch({ type: TASK_DELETE_SUCCESS });
  };
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: TASK_DELETE_RESET });
    }
    dispatch(listTasks());

    return () => {};

    // eslint-disable-next-line
  }, [setCurrentId, dispatch, successDelete]);
  return (
    <div className=" card  bg-dark   mb-2 ">
      <div className="card-header text-center">
        <i className="fas fa-tasks 2x"></i>&nbsp;&nbsp;
        {task.title}
        {""}
      </div>
      <div className="card-body">
        <span className="badge badge-pill badge-danger ml-2">
          {task.priority}
        </span>
        <p>{task.description}</p>
        <p>{format(task.date)}</p>
      </div>

      <p style={{ marginTop: "10px" }}>
        <Link to={`/tasks/edit/${task._id}`} className="btn btn-primary btn-sm">
          Edit
        </Link>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(task)}
        >
          Borrar
        </button>
      </p>
    </div>
  );
};

export default TaskItem;
