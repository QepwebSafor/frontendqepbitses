import React , {Fragment} from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import { useNavigate , useParams } from 'react-router-dom';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email,  isAdmin }));
  };
  return (
    <div className="container-fluid">
    <div className="form-container  bg-dark col-md-4">
        <form className="form form-horizontal" onSubmit={submitHandler}>
          <fieldset>
            <legend><i className="fas fa-edit"></i>&nbsp;&nbsp;Edit User {name}</legend>

            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}

            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Fragment>
                <div className="form-group">
                  <label htmlFor="name" className="form-label mt-1">
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
                  <label htmlFor="isAdmin" className="form-label mt-1">
                    Is Admin
                  </label>
                  <input
                    id="isAdmin"
                    type="checkbox"
                    className="form-control"
                    checked={isAdmin}
                    onChange={(e) => {setIsAdmin(e.target.checked);}}
                 
                  ></input>
                </div>
                <div className="form-group">
                  <label className="form-label mt-1" />
                  <button type="submit" className="btn btn-info btn-block">
                    Update
                  </button>
                </div>
              </Fragment>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
