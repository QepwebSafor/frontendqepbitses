import React, { useEffect, useState } from "react";
import * as api from "../../api";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { format } from "timeago.js";
import { FiPlus, FiMinus } from "react-icons/fi";

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-comments: center;
  justify-content: center;
  position: relative;
  height: 100%;
  padding: 0 1rem 1rem 1rem;
`;

const Container = styled.div`
  position: absolute;
  top: 30%;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
  background: #141e30;
  padding: 0 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-comments: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid #1663bb;
  h1 {
    padding: 2rem;
    font-size: 2rem;
  }

  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-comments: center;
  border-bottom: 1px solid #77b3f0;
  border-top: 1px solid #77b3f0;

  p {
    font-size: 2rem;
  }
`;

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const getComments = async () => {
    setLoading(true);
    const res = await api.getComments();
    setComments(res.data);
    setLoading(false);
  };

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked comment is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  const onDelete = async (id) => {
    await api.deleteComment(id);
    getComments();
  };
  useEffect(() => {
    getComments();
  }, []);
  if (comments !== null && comments.length === 0 && !loading) {
    return <h4>No tienes mensajes. ).</h4>;
  }
  return (
    <IconContext.Provider value={{ color: "red", size: "25px" }}>
      <AccordionSection>
        <Container>
          {comments !== null && !loading ? (
            comments.map((comment, index) => (
              <div
                className="card 
             bg-dark"
                key={comment._id}
              >
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h2 className="mt-4">
                    <span style={{ marginRight: "10px" }}></span>
                    {comment.postername} &nbsp;&nbsp;{" "}
                    <i className="fas fa-comment-dots" />
                  </h2>
                  <span>&nbsp;&nbsp;{format(comment.date)}</span>

                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>

                {clicked === index ? (
                  <Dropdown>
                  
                      <h5>
                        <span>
                          {" "}
                          <i className="fas fa-envelope 5x bg-dark" />{" "}
                        </span>
                        &nbsp;&nbsp;
                        {comment.email}
                      </h5>
                      <h5> <span>Topic : </span>&nbsp;&nbsp; {comment.topic}</h5>
                      <h5> <span>Message : </span>&nbsp;&nbsp;{comment.message}</h5>
                      <div className=" mx-auto">
                        <button
                          className="btn btn-danger "
                          onClick={() => onDelete(comment._id)}
                        >
                          <i className="fas fa-trash-alt 3x"></i>
                        </button>
                      </div>
                  
                  </Dropdown>
                ) : null}
              </div>
            ))
          ) : (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default CommentsList;
