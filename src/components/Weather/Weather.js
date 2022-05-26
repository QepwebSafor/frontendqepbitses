import React, { Component, Fragment } from "react";

import Date from "./Date";
import WeatherForm from "./WeatherForm";
import WeatherInfo from "./WeatherInfo";

import { WEATHER_KEY } from "../../keys";

class Weather extends Component {
  state = {
    temperature: "",
    description: "",
    humidity: "",
    wind_speed: 0,
    city: "",
    country: "",
    error: null,
  };

  getWeather = async (e) => {
    e.preventDefault();
    const { city, country } = e.target.elements;
    const cityValue = city.value;
    const countryValue = country.value;

    if (cityValue && countryValue) {
      // metric parameter is for Celcius Unit
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric&lang=es`;
      const response = await fetch(API_URL);
      const data = await response.json();

      this.setState({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        error: null,
      });
    } else {
      this.setState({
        error: "Please enter a City and a Country.",
      });
    }
  };

  render() {
    return (
     
     
         <Fragment>
            <WeatherForm getWeather={this.getWeather} />
         
            <WeatherInfo {...this.state} />
          
           <Date />
          </Fragment>
        
      
    );
  }
}

export default Weather;