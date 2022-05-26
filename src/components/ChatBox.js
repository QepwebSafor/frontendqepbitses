import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Hello there, Please ask your question." },
  ]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
    // eslint-disable-next-line
  }, [messages, isOpen, socket, userInfo._id]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="form-container  bg-dark ">
      {!isOpen ? (
        <button
          type="button"
          className="btn btn-info btn-block"
          onClick={supportHandler}
        >
          <i className="fa fa-question-circle" />
          &nbsp;&nbsp; Support
        </button>
      ) : (
        <div>
          <div className="row">
            <button
              type="button"
              className="btn btn-info btn-block"
              onClick={closeHandler}
            >
              <i className="fa fa-times-circle"></i>&nbsp;&nbsp; Close
            </button>
          </div>
          <ul ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <li key={index}>
                <i className="fas fa-user"></i>&nbsp;&nbsp;
                <strong>{`${msg.name}: `}</strong> <h2>{msg.body}</h2>
              </li>
            ))}
          </ul>
          <div>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-group "
            >
              <fieldset>
                <div className="form-group">
                  <input
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="type message"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-info btn-block">
                    <i className="fa fa-paper-plane"></i>&nbsp;&nbsp;Send
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
