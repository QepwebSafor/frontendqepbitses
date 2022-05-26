import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [ navigate, userInfo]);
  return (
    <div className="container-fluid">
    <div className="row  mx-auto">
    <div className="form-container  bg-dark col-md-4">
      <form className="form-horizontal form-group " onSubmit={submitHandler}>
        <fieldset>
          <legend>
            {" "}
            <i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp;<span className="ml-3"> Sign In</span>
          </legend>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="form-group">
            <label htmlFor="email" className="form-label ">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
         
            <button className="btn btn-info btn-block" type="submit">
              Sign In
            </button>
          </div>
          <div className="form-group">
           
            <div>
              New customer?{" "}
              <Link to={`/register?navigate=${navigate}`}>
                Create your account
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
 </div>

    <div className="col-md-6 mx-auto mt-3">
          <img
            src="images/Buho.png"
            alt="Buho"
            className="img-thumnail"
          />
        </div>
      </div>
</div>
  );
}
