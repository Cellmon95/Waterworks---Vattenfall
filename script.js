
// AppID
const APPID = "0bed6060-47a2-4594-8a5a-5bb3ff8a01d7";
function createMarker(long, lat)
{
    new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
};

fetch(`http://data.goteborg.se/riverservice/v1.1/measuresites/${APPID}?format=JSON`)
    .then((response) => response.json())
    .then((response) => {
        response.forEach((station) => {
            createMarker(station.Long, station.Lat);
        })
});
    
// //GET ALL SITES
// fetch(`http://data.goteborg.se/riverservice/v1.1/measuresites/${APPID}?format=JSON`)
// .then((response) => response.json())
// .then((data) => console.log(data));

// //GET ONE SITE
// fetch(`http://data.goteborg.se/RiverService/v1.1/MeasureSites/${APPID}/Agnesberg?format=JSON`)
// .then((response) => response.json())
// .then((data) => console.log(data));

//MAP
/* Annas access token */
mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbXZhdHRlbmZhbGwiLCJhIjoiY2xkdWFkbHN4MDN3MTQzbzVpa3ZydnhobiJ9.s1jE7Ai0VbUH3fxiZojDPg';
/* Rubens access token */
// mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbXZhdHRlbmZhbGwiLCJhIjoiY2xkdWFpZGwyMDQwMjN2bWZvYm4wZmoxMSJ9.q4S7xLi6-45dT97-hzr_zg';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/anbru/cldvgf4im001j01ol6fci2pk2',
center: [11.97, 57.7],
zoom: 12,
minZoom: 11,
maxZoom: 18
});

/* Old Marker */
// const marker =
// new mapboxgl.Marker()
// .setLngLat([12.0101, 57.7898])
// .addTo(map);
