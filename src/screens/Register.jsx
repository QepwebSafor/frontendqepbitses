import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {useNavigate, Link , useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import axios from "axios";



const Register = (props) => {
  const navigate = useNavigate();
 
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    textChange: "Sign Up",
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: "Submitting" });
        axios
          .post(`${process.env.REACT_APP_API_URL}/users/register`, {
            name,
            email,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
              textChange: "Submitted",
            });

            toast.success(res.data.message);
          })
          .catch((err) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
              textChange: "Sign Up",
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="container-fluid">
      <div className="row  mx-auto">
      <div className="col-md-3 mx-auto mt-5">
          <img
            src="images/Loro.png"
            alt="Loro"
            className="img-thumnail"
          />
        </div>
        <div className="form-container mx-auto bg-dark col-md-4">
          <ToastContainer />
          <form className="form form-horizontal" onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <i className="fas fa-user-plus"></i>&nbsp;&nbsp;<span className="ml-3"> Create Account</span>
              </legend>

              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div className="form-group">
                <label htmlFor="name" className="form-label ">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label ">
                  Email address
                </label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label ">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label ">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange("password2")}
                  value={password2}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-info btn-block" type="submit">
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  <span className="ml-3">{textChange}</span>
                </button>
              </div>
              <div className="form-group">
                <div>
                  Already have an account?{" "}
                  <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
       
       
      </div>
    </div>
  );
};

export default Register;
