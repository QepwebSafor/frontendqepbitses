import React from "react";

import UsersList from "../users/UsersList";
import Profile from "../users/Profile";
import "../users/User.css";
const UsersPage = () => {

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-5">
          <UsersList />
        </div>
        <div className="col-md-6">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
