import React from "react";
import Weather from "./Weather";
const WeatherPage = (props) => {
  return (
    <div className="container-fluid">
    <div className="row mx-auto">
    
      <div className="col-md-4 ">
        <Weather />
      </div>
      <div className="col-md-6 ">
          <img
            src="images/Africana.png"
            alt="Africana"
            className="img-thumnail"
          />
        </div>
     
    </div>
    </div>
  );
};

export default WeatherPage;
