import React, { useReducer } from "react";
import axios from "axios";
import LineContext from "./lineContext";
import lineReducer from "./lineReducer";
import {
  ADD_LINE,
  GET_LINES,
  UPDATE_LINE,
  DELETE_LINE,
  CLEAR_LINES,
  SET_CURRENT,
  CLEAR_CURRENT,
  LINE_ERROR,
} from "../types";

const LineState = (props) => {
  const initialState = {
    drawings: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(lineReducer, initialState);

  const addLine = async (line) => {
    console.log("desde DraState 1", line);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const obj = JSON.stringify(line);

      /*   
       console.log('tamaño array', obj.lines.length)
      const lobj = obj.lines[0];
      console.log('linea', lobj);
      const pobj = lobj.points;
      console.log('puntos', pobj.length) */

      const res = await axios.post("/api/lines", obj, config);
      console.log("Desde state2, lines:", res.config.data);
      /*   const res1 = await axios.post(`/api/line/${res.config.data._id}`, JSON.stringify(lobj) , config);
      console.log('Lines:' , res1.config.data); 
      const res2 = await axios.post(`/api/line/${res1.config.data._id}`, JSON.stringify(pobj) , config);
      console.log('Points:' , res2.config.data); 
      console.log ('ALL:', ) */
      dispatch({ type: ADD_LINE, payload: res.config.data });
    } catch (error) {
      dispatch({ type: LINE_ERROR, payload: error.response });
    }
  };

  const updateLine = async (line) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/lines/${line._id}`, line, config);
      dispatch({ type: UPDATE_LINE, payload: res.data });
    } catch (error) {
      dispatch({ type: LINE_ERROR, payload: error.response.msg });
    }
  };

  const getLines = async () => {
    try {
      const res = await axios.get("/api/lines");

      dispatch({ type: GET_LINES, payload: res.data });
    } catch (error) {
      dispatch({ type: LINE_ERROR, payload: error.response.msg });
    }
  };

  const deleteLine = async (id) => {
    try {
      await axios.delete(`/api/lines/${id}`);
      dispatch({ type: DELETE_LINE, payload: id });
    } catch (error) {
      dispatch({ type: LINE_ERROR, payload: error.response.msg });
    }
  };

  const clearLines = () => {
    dispatch({ type: CLEAR_LINES });
  };

  const setCurrent = (line) => {
    dispatch({ type: SET_CURRENT, payload: line });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <LineContext.Provider
      value={{
        lines: state.lines,
        current: state.current,
        error: state.error,
        addLine,
        updateLine,
        getLines,
        deleteLine,
        clearLines,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </LineContext.Provider>
  );
};

export default LineState;
