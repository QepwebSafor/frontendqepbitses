import React, { useReducer} from "react";
import axios from "axios";
import DrawingContext from "./drawingContext";
import drawingReducer from "./drawingReducer";


import {
  ADD_DRAWING,
  GET_DRAWINGS,
  UPDATE_DRAWING,
  DELETE_DRAWING,
  CLEAR_DRAWINGS,
  SET_CURRENT,
  CLEAR_CURRENT,
  DRAWING_ERROR,
} from "../types";

const DrawingState = (props) => {
 

  const initialState = {
    drawings: [],
    title: "",
    user: "",
    lines: [],
    points: [],
    current: null,
    error: null,
    id: "",
  };

  const [state, dispatch] = useReducer(drawingReducer, initialState);

  const addDrawing = async (drawing) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {

    
      const res = await axios.post("/api/drawings", drawing, config);

      dispatch({ type: ADD_DRAWING, payload: res.config.data });
    } catch (error) {
      dispatch({ type: DRAWING_ERROR, payload: error.response.msg });
    }
  };

  const updateDrawing = async (drawing) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/drawings/${drawing._id}`,
        drawing,
        config
      );
      dispatch({ type: UPDATE_DRAWING, payload: res.data });
    } catch (error) {
      dispatch({ type: DRAWING_ERROR, payload: error.response.msg });
    }
  };

  const getDrawings = async (id) => {
    try {
      const res = await axios.get(`/api/drawings/user/${id}`);
      dispatch({ type: GET_DRAWINGS, payload: res.data });
    } catch (error) {
      dispatch({ type: DRAWING_ERROR, payload: error.response.msg });
    }
  };

  const deleteDrawing = async (id) => {
    try {
      await axios.delete(`/api/drawings/${id}`);
      dispatch({ type: DELETE_DRAWING, payload: id });
    } catch (error) {
      dispatch({ type: DRAWING_ERROR, payload: error.response.msg });
    }
  };

  const clearDrawings = () => {
    dispatch({ type: CLEAR_DRAWINGS });
  };

  const setCurrent = (drawing) => {
    dispatch({ type: SET_CURRENT, payload: drawing });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <DrawingContext.Provider
      value={{
        drawings: state.drawings,
        current: state.current,
        error: state.error,
        addDrawing,
        updateDrawing,
        getDrawings,
        deleteDrawing,
        clearDrawings,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </DrawingContext.Provider>
  );
};

export default DrawingState;
