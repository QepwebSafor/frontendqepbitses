import React, { useReducer } from "react";
import axios from "axios";
import PointContext from "./pointContext";
import pointReducer from "./pointReducer";
import {
  ADD_POINT,
  GET_POINTS,
  UPDATE_POINT,
  DELETE_POINT,
  CLEAR_POINTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  POINT_ERROR,
} from "../types";

const PointState = (props) => {
  const initialState = {
    points: [],
    lines: [],
    points: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(pointReducer, initialState);

  const addPoint = async (point) => {
    console.log("desde DraState 1", point);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const obj = JSON.stringify(point);

      /*   
       console.log('tamaño array', obj.lines.length)
      const lobj = obj.lines[0];
      console.log('linea', lobj);
      const pobj = lobj.points;
      console.log('puntos', pobj.length) */

      const res = await axios.post("/api/points", obj, config);
      console.log("Desde state2, lines:", res.config.data);
      /*   const res1 = await axios.post(`/api/point/${res.config.data._id}`, JSON.stringify(lobj) , config);
      console.log('Lines:' , res1.config.data); 
      const res2 = await axios.post(`/api/line/${res1.config.data._id}`, JSON.stringify(pobj) , config);
      console.log('Points:' , res2.config.data); 
      console.log ('ALL:', ) */
      dispatch({ type: ADD_POINT, payload: res.config.data });
    } catch (error) {
      dispatch({ type: POINT_ERROR, payload: error.response });
    }
  };

  const updatePoint = async (point) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/points/${point._id}`, point, config);
      dispatch({ type: UPDATE_POINT, payload: res.data });
    } catch (error) {
      dispatch({ type: POINT_ERROR, payload: error.response.msg });
    }
  };

  const getPoints = async () => {
    try {
      const res = await axios.get("/api/points");

      dispatch({ type: GET_POINTS, payload: res.data });
    } catch (error) {
      dispatch({ type: POINT_ERROR, payload: error.response.msg });
    }
  };

  const deletePoint = async (id) => {
    try {
      await axios.delete(`/api/points/${id}`);
      dispatch({ type: DELETE_POINT, payload: id });
    } catch (error) {
      dispatch({ type: POINT_ERROR, payload: error.response.msg });
    }
  };

  const clearPoints = () => {
    dispatch({ type: CLEAR_POINTS });
  };

  const setCurrent = (point) => {
    dispatch({ type: SET_CURRENT, payload: point });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <PointContext.Provider
      value={{
        points: state.points,
        current: state.current,
        error: state.error,
        addPoint,
        updatePoint,
        getPoints,
        deletePoint,
        clearPoints,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </PointContext.Provider>
  );
};

export default PointState;
