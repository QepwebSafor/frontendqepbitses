import React from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CircularProgress } from "@material-ui/core";
const TaskList = ({ setCurrentId }) => {
  const taskList = useSelector((state) => state.taskList);
  const { tasks, loading, error } = taskList;

  return (
    <div className="container-fluid">
      <div className="col-md-8">
        {tasks && <h4>Tienes tareas pendientes...</h4>}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div className="card-columns ">
            {tasks !== null && !loading ? (
              <TransitionGroup>
                {tasks &&
                  tasks.map((task) => (
                    <CSSTransition
                      key={task._id}
                      timeout={500}
                      classNames="item"
                    >
                      <TaskItem task={task} setCurrentId={setCurrentId} />
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            ) : (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskList;
