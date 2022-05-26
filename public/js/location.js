var map = L.map('map-template').setView([38.9667, -0.1833], 10);


const tileURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

const tile = L.tileLayer(tileURL);

// Socket Io
const socket = io.connect();

// Marker
const marker = L.marker([38.9667, -0.1833]); 
marker.bindPopup('Parking Esoma aqui!');
map.addLayer(marker);

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('You are Here!');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);