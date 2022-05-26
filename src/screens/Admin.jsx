import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser, isAuth, getCookie, signout } from "../helpers/auth";
// import { Link, Redirect } from 'react-router-dom';

const Admin = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    textChange: "Actualizar",
    role: "",
  });

  useEffect(() => {
    const loadProfile = () => {
      const token = getCookie("token");
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { role, name, email } = res.data;
          setFormData({ ...formData, role, name, email });
        })
        .catch((err) => {
          toast.error(`Error To Your Information ${err.response.statusText}`);
          if (err.response.status === 401) {
            signout(() => {
              
              history.push("/login");
            });
          }
        });
    };
    loadProfile();
    // eslint-disable-next-line
  }, []);
  const { name, email, password1, textChange, role } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    const token = getCookie("token");
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: "Enviando..." });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/update`,
        {
          name,
          email,
          password: password1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateUser(res, () => {
          toast.success("Tu perfil se ha actualizaado con exito");
          setFormData({ ...formData, textChange: "Actualizar" });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="container-fluid ">
    <div className="row ">
      <ToastContainer />
     
      <div className="col-md-5 mx-auto">
        <div className="card  bg-dark">
        <div className="card-header">
          <i className="fas fa-edit fa 1x w-6  -ml-2" />Actualizar administrador</div>
          <div className="card-body">
            <form
              className="form-group form horinzontal"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <input
                  disabled
                  className="form-control"
                  type="text"
                  placeholder="Role"
                  value={role}
                />
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  disabled
                  value={email}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                />

                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                />

                <button type="submit" className="btn btn-info btn-block">
                  <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  <span className="ml-3">{textChange}</span>
                </button>
              </div>

              <div className="form-group">
                <a
                  className="btn btn btn-outline-warning"
                  href="/"
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa   text-indigo-500" />
                  <span className="ml-4">Home</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6 mx-auto">
          <img src="images/bear.png" alt="Bambi" className="img-thumnail"/>
        </div>
  </div>
  </div>
  
  );
};

export default Admin;
