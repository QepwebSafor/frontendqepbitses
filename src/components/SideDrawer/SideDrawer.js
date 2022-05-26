import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions/userActions";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const authLinks = (
    <Fragment>
      {userInfo && userInfo.isAdmin ? (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              <i className="fas fa-smile" />
              &nbsp;Admin, {userInfo.name}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/support">
              <i className="fa fa-question-circle" />
              &nbsp;&nbsp; Support
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/comments">
              <i className="fas fa-envelope" /> &nbsp;Messages
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/userlist">
              <i className="fas fa-users" />
              &nbsp; Users
            </NavLink>
          </li>
        </Fragment>
      ) : (
        userInfo && (
          <Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <i className="fas fa-smile" />
                &nbsp;Hola, {userInfo.name}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                <i className="fas fa-image" /> &nbsp;Pictures
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/drawings">
                <i className="fas fa-images" />
                &nbsp; Drawings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/uploadimage">
                <i className="fas fa-edit" /> To draw
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tasks">
                <i className="fas fa-tasks" /> &nbsp;Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tasks/add">
                <i className="fas fa-plus" />
                &nbsp; Add Tasks
              </NavLink>
            </li>
          </Fragment>
        )
      )}

      <li className="nav-item">
        <NavLink to="#signout" onClick={signoutHandler}>
          <i className="fas fa-sign-out-alt  w-6  -ml-2" />
          <span className="ml-3">Signout</span>
        </NavLink>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contactForm">
          <i className="fas fa-envelope" />
          &nbsp; Contact
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/map">
          <i className="fas fa-map" />
          &nbsp; Location
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">
          <i className="fas fa-sign-in-alt" />
          &nbsp; Sign In
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          <i className="fas fa-user-plus" />
          &nbsp; Sign Up
        </NavLink>
      </li>
    </Fragment>
  );

  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>{userInfo ? authLinks : guestLinks}</ul>
      {false && <Link to="/" />}
    </nav>
  );
};

export default SideDrawer;
