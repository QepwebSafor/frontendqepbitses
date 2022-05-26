import React, { useContext, useEffect, useState } from "react";
import DrawingContext from "../../context/drawing/drawingContext";
import DrawingList from "../drawings/DrawingList";
import { useSelector } from "react-redux";
import "../drawings/drawings.css";

const DrawingsPage = () => {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const drawingContext = useContext(DrawingContext);
  const { drawings, getDrawings, loading } = drawingContext;
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getDrawings(userInfo._id);
    // eslint-disable-next-line
  }, [setSelectedOption]);

  const Options = ({ options }) => {
    return options.map((option, index) => (
      <option className="optionListItem" key={index} value={option._id}>
        {option.title}
      </option>
    ));
  };

  let content = (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (drawings !== null && drawings.length === 0 && !loading) {
    content = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else if (drawings && drawings.length > 0) {
    content = (
      <div className="container-fluid ">
        <div className="form-group top-margin-small">
          <label className="card-selector-label">
            {userInfo.name} , estos son sus dibujos:
          </label>
          <select
            className="card-selector form-control"
            value={selectedOption}
            key={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option className="optionListItem">Seleccione por título</option>
            <Options options={drawings} />
          </select>
        </div>

        {selectedOption && (
          <DrawingList drawings={drawings} selectedOption={selectedOption} />
        )}
      </div>
    );
  }

  return content;
};

export default DrawingsPage;
