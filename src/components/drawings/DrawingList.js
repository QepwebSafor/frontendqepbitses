import React from "react";

import DrawingItem from "./DrawingItem";

const DrawingList = ({ selectedOption, drawings }) => (
  <div className="left">
    {drawings
      .filter((drawing) => drawing._id === selectedOption)
      .map((drawing) => (
        <div className="container" key={drawing._id}>
          <DrawingItem drawing={drawing} />
        </div>
      ))}
  </div>
);

export default DrawingList;
