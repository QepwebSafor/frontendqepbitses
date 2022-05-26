import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Dashboard from "../pages/dashboard";
import { getExpenses } from "../../actions/expenses";
const DashboardPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <Dashboard />
    </div>
  );
};


export default DashboardPage;
