import React, { useState, Fragment } from "react";

//import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "../Layout/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../Backdrop/Backdrop";
import DrawingState from "../../context/drawing/DrawingState";
import WeatherPage from "../Weather";
import SigninScreen from "../../screens/SigninScreen";
import Register from "../../screens/Register.jsx";
import DrawingsPage from "../pages/Drawings";
import ContactForm from "../comments/ContactForm";
import ProfileScreen from "../../screens/ProfileScreen";
import ProfileClientScreen from "../../screens/ProfileClientScreen";
import CommentsList from "../comments/CommentsList";
import TaskForm from "../tasks/TaskForm";
import TaskScreen from "../../screens/TaskScreen";
import ProductForm from "../products/ProductForm";
import ProductScreen from "../../screens/ProductsScreen";
import MapView from "../map/MapView";
import UploadPage from "../pages/Uploads";
import GetImage from "../images/GetImage";
import SupportScreen from "../../screens/SupportScreen";
import UserListScreen from "../../screens/UserListScreen";
import UserEditScreen from "../../screens/UserEditScreen";
import PrivateRoute from "../../Routes/PrivateRoute";
import AdminRoute from "../../Routes/AdminRoute";
/* import './App.css'; */
import "react-toastify/dist/ReactToastify.css";
const App = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => setSideDrawerOpen(!sideDrawerOpen);

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <Router>
      <DrawingState>
        <Fragment>
          <div style={{ height: "100%" }}>
            <AppBar position="fixed">
              <Toolbar drawerClickHandler={drawerToggleClickHandler} />
            </AppBar>
            <SideDrawer show={sideDrawerOpen} />
            {backdrop}
            <main style={{ marginTop: "64px" }}>
              <Routes>
                <Route path="/" element={<WeatherPage {...props} />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/register" element={<Register {...props} />} />
                <Route path="/drawings" element={<DrawingsPage />} />
                <Route
                  path="/userlist"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route
                  path="/user/:id/edit"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }
                ></Route>
                <Route path="/contactForm" element={<ContactForm />} />
                <Route
                  path="/tasks"
                  element={
                    <PrivateRoute>
                      <TaskScreen />
                    </PrivateRoute>
                  }
                />
                
                <Route
                  path="/uploadimage"
                  element={
                    <PrivateRoute>
                      <UploadPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/images/:id" element={<GetImage />} />
                <Route
                  path="/tasks/add"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
                />
         
                <Route
                  path="/tasks/edit/:id"
                  element={
                    <PrivateRoute>
                      <TaskScreen />
                    </PrivateRoute>
                  }
                />
                     <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductScreen />
                    </PrivateRoute>
                  }
                />
                           <Route
                  path="/products/add"
                  element={
                    <PrivateRoute>
                      <ProductForm />
                    </PrivateRoute>
                  }
                />
         
                <Route
                  path="/products/edit/:id"
                  element={
                    <PrivateRoute>
                      <ProductScreen />
                    </PrivateRoute>
                  }
                />
                       <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfileScreen />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/comments"
                  element={
                    <AdminRoute>
                      <CommentsList />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <AdminRoute>
                      <SupportScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/profile_cli/:id"
                  element={<ProfileClientScreen />}
                />
                <Route
                  path="/user/:id/edit"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/userlist"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }
                />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/map" element={<MapView />} />
              </Routes>
            </main>
          </div>
        </Fragment>
      </DrawingState>
    </Router>
  );
};
export default App;
