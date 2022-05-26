import React, {  useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import data from '../assets/data.json';
import Markers from "./VenueMarkers";

import {  useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";

const MapView = (props) => {
  const state = {
    currentLocation:{ lat: 38.966670248452544, lng: -0.18267525773760687},
    zoom: 16,
    data,
  };

  const navigate = useNavigate();

  useEffect(() => {
    navigate("./", { replace: true });
/*     if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      console.log(state);
      setState({
        ...state,
        data: {
          venues: state.data.venues.concat({
            name: "You are here",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      }); 
      navigate.replace({
        pathname: "/map",
        state: {},
      });
  */
    // eslint-disable-next-line 
  }, []);

  return (
    <Map center={state.currentLocation} zoom={state.zoom}  style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
    </Map>
  );
};

export default MapView;
