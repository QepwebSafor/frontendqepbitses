import React from "react";

const WeatherForm = (props) => (
  <div className="form-container  bg-dark ">
    <form className="form-horizontal form-group " onSubmit={props.getWeather}>
      <fieldset>
        <legend>
          <i className="fas fa-cloud-sun fa 1x w-6  -ml-2" />
          <span className="ml-3">El Clima</span>
        </legend>

        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="El tiempo en la ciudad de...."
            className="form-control"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="country"
            placeholder="Del pais......."
            className="form-control"
          />
        </div>
        <div className="card-footer">
          <button className="btn btn-info btn-block">Obtener el clima</button>
        </div>
      </fieldset>
    </form>
  </div>
);

export default WeatherForm;
