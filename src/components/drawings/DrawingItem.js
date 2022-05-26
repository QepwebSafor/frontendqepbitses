import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";

import DrawingContext from "../../context/drawing/drawingContext";
import CanvasDraw from "react-canvas-draw";
//import { format } from 'timeago.js';
const DrawingItem = ({ drawing }) => {
  const drawingContext = useContext(DrawingContext);
  const { deleteDrawing } = drawingContext;
  const otherCanvas = useRef(null);
  const { _id, title } = drawing;

  const onDelete = () => {
    deleteDrawing(_id);
  };

  const onLoadDrawing = () => {
    const objDraw = JSON.stringify(drawing);
    //console.log(objDraw)
    otherCanvas.current.loadSaveData(objDraw);
  };

  return (
    <div className="container-fluid mx-auto ">
      <div className="form-group ">
        <button className="btn btn-primary" onClick={onLoadDrawing}>
          Mostrar "{title}"
        </button>
      </div>

      <CanvasDraw
        ref={otherCanvas}
        canvasWidth={308}
        disabled={false}
        /* canvasWidth={drawing.width}
        canvasHeight={drawing.height} */
        brushRadius={0}
        lazyRadius={0}
        backgroundColor="transparent"
        hideGrid={true}
      />

      <button className="btn btn-danger mt-4" onClick={onDelete}>
        Borrar
      </button>
    </div>
  );
};
DrawingItem.propTypes = {
  drawing: PropTypes.object.isRequired,
};

export default DrawingItem;
