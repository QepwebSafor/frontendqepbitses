import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div className="container-fluid">
      <h2>Your geolocation is:</h2>
      <h4><span>Latitude:</span> {state.latitude}&nbsp;&nbsp; <span>longitude:</span>{state.longitude}</h4>
    

      <Link
        to={{
          pathname: "/map",
          // state: {
          //   hello: 'world'
          // }
          state,
        }}
      >
        See marker
      </Link>
    </div>
  );
};

export default Home;
