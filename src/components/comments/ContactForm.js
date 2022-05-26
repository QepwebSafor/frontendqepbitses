import React, { useState, useEffect } from "react";
import * as api from "../../api";
const CommentForm = () => {
  const [comment, setComment] = useState({
    postername: "",
    message: "",
    date: new Date(),
    email: "",
    topic: "",
  });
  const { postername, message, date, email, topic } = comment;
  useEffect(() => {
    if (comment) setComment(comment);
  }, [comment]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setComment({ postername, message, date, email, topic });
    await api.createComment(comment);
    window.location = "/";
  };

  const onInputChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-fluid">
      <div className="row mx-auto">
      
        <div className="form-container col-md-4 mx-auto bg-dark ">
          <form className="form-horizontal form-group " onSubmit={onSubmit}>
            <fieldset>
              <legend>
                <i className="fas fa-envelope fa 1x w-6  -ml-2" />
                <span className="ml-3">Leave your message:</span>
              </legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="postername"
                  onChange={onInputChange}
                  value={postername}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={onInputChange}
                  value={email}
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Topic"
                  onChange={onInputChange}
                  value={topic}
                  name="topic"
                  required
                />
              </div>
              <div className="form-group">
                <span> * </span>
                <label className=" col-form-label">Message:</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  onChange={onInputChange}
                  name="message"
                  value={message}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-info btn-block">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="col-md-5 mx-auto mt-3">
          <img
            src="images/Guitarra.png"
            alt="Guitarra"
            className="img-thumnail"
          />
        </div>
      </div>
    </div>
  );
};
export default CommentForm;
