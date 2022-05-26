import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import ChatBox from "../components/ChatBox";
export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <div className="form-container bg-dark">
            <form className="form form-horizontal" onSubmit={submitHandler}>
              <fieldset>
                <legend>
                  {" "}
                  <i className="fas fa-user"></i><span className="ml-3">{userInfo.name} Profile</span>
                </legend>

                {loading ? (
                  <LoadingBox></LoadingBox>
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
                    <div className="form-group">
                      <label className="form-label mt-1" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label mt-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label mt-1">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label mt-1"
                      >
                        confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        className="form-control"
                        type="password"
                        placeholder="Enter confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="form-group">
                      <label className="form-label mt-1" />
                      <button className="btn btn-info btn-block" type="submit">
                        Update
                      </button>
                    </div>
                  </Fragment>
                )}
              </fieldset>
            </form>
          </div>
        </div>

        <div className="col-md-7">
          {userInfo && !userInfo.isAdmin ? <ChatBox userInfo={userInfo} />
          :     <img
          src="images/Piggy.png"
          alt="Piggy"
          className="img-thumnail"
        />
          }
        </div>
      </div>
    </div>
  );
}
