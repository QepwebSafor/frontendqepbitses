import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
export const VenueLocationIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl,
  iconAnchor: null,
  shadowUrl: null ,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [30, 55],
  className: "leaflet-venue-icon",
});
