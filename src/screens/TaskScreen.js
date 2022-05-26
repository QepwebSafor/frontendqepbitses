import React from "react";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";


const TasksScreen = () => {
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <TaskForm  />
        </div>
        <div className="col-md-8 text-center ">
       
          <div className="col-md-12">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksScreen;