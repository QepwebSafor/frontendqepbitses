import React, { useRef, useState, useContext, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import {  useSelector } from "react-redux";
import DrawingContext from "../../context/drawing/drawingContext";

function Drawing(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const user = userInfo._id;
  const drawingContext = useContext(DrawingContext);
  const { addDrawing } = drawingContext;
  const width = 600;
  const  height = 800;
  const [title, setTitle] = useState("");
  const inputEl = useRef(null);
  const firstCanvas = useRef(null);
  const secondCanvas = useRef(null);
  const [color, setColor] = useState({
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  });

  const handleChange = () => {
    inputEl.current.focus();
    //console.log(inputEl.current.value)
    setTitle(inputEl.current.value);
  };

  const onCreateImage = (event) => {
    const data = firstCanvas.current.getSaveData();
    secondCanvas.current.loadSaveData(data);
    event.preventDefault();
    if (title !== "") {
      const objDraw = JSON.parse(data);

      const newDrawing = [
        { 
          title,
          height: objDraw.height,
          width: objDraw.width,
          lines: objDraw.lines,
          user,
        },
      ];

      addDrawing(newDrawing);
    }

    setTitle("");
  };

  const clear = () => {
    firstCanvas.current.clear();
  };
  const undo = () => {
    firstCanvas.current.undo();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setColor("#" + Math.floor(Math.random() * 16777215).toString(16));
    }, 2000);
    return () => clearInterval(interval);
  }, [color]);
  return (
    <div className="App">
      <form
        className="form-group form-horizontal"
        onSubmit={(event) => onCreateImage(event)}
      >
        <div className="btn-group ">
          <button onClick={clear} className="btn btn-primary  ">
            Limpiar
          </button>
          <button onClick={undo} className="btn btn-primary">
            Deshacer
          </button>
          Color actual{" "}
          <div
            style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              backgroundColor: color,
              border: "1px solid #272727",
            }}
          />
        </div>
        <CanvasDraw
          lazyRadius={3}
          brushRadius={3}
          brushColor={String(color)}
          catenaryColor={String(color)}
          hideGrid={false}
          gridColor="rgba(150,150,150,0.3)"
          style={{ border: "1px solid #000" }}
          canvasWidth={width}
          canvasHeight={height}
          getSaveData={onCreateImage}
          ref={firstCanvas}
          imgSrc={props.imgSrc}
        />
        <div className="input-group">
          <div className="form-group">
            <label>Poner título</label>
            <input
              ref={inputEl}
              type="text"
              onChange={handleChange}
              className="input-sm form-control"
            />
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
        </div>
        <CanvasDraw
          ref={secondCanvas}
          brushRadius={1}
          brushColor={String(color)}
          catenaryColor={String(color)}
          disable={true}
          hideGrid={true}
          backgroundColor="transparent"
          canvasWidth={width}
          canvasHeight={height}
          style={{ border: "1px solid #000" }}
          imgSrc=""
        />
      </form>
    </div>
  );
}
export default Drawing;
