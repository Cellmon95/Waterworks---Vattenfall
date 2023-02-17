const APPID = "0bed6060-47a2-4594-8a5a-5bb3ff8a01d7";
const markers = [];

function createAddMarker(response)
{
    const customMarker = document.createElement('svg');
    customMarker.className = 'marker';

    const marker = 
    {
        mapboxgl: new mapboxgl.Marker(customMarker),
        Code: response.Code,
        Lat: response.Lat,
        Long: response.Long,
        MeasureParameters: response.MeasureParameters
    };

    marker.mapboxgl.setLngLat([response.Long, response.Lat]).addTo(map);
    marker.mapboxgl.getElement().dataset.stationCode = response.Code;
    marker.mapboxgl.getElement().addEventListener('click', onClickMarker);
    marker.mapboxgl.getElement().addEventListener('mouseenter', hoverToggle);
    marker.mapboxgl.getElement().addEventListener('mouseleave', hoverToggle);
    // marker.mapboxgl.getElement().classList.add("marker"); // Remove? Might not need this after adding "customMarker".
    
    return marker;
};

function hoverToggle(e) {
    e.currentTarget.classList.toggle("active")
    console.log(e.currentTarget.classList);
}

function onClickMarker(e) {
    /* targetID shows stationCode (name for code purposes) */
    targetId = e.currentTarget.dataset.stationCode;
    /* stationData shows target station data */

    const waterLevelDOM = document.getElementById('waterLevel');
    console.log(waterLevelDOM.innerHTML = markers[targetId].MeasureParameters[0]);
    waterLevelDOM.innerHTML = markers[targetId].MeasureParameters[0].CurrentValue;
    const levelDownstreamDOM = document.getElementById('levelDownstream');
    const tappingDOM = document.getElementById('tapping');
    const lowerLimitDOM = document.getElementById('lowerLimit');
    const upperLimitDOM = document.getElementById('upperLimit');
    
}

fetch(`http://data.goteborg.se/riverservice/v1.1/measuresites/${APPID}?format=JSON`)
    .then((response) => response.json())
    .then((response) => {

        response.forEach((station) => {
            markers[station.Code] = createAddMarker(station);
        })
        // console.log(markers);
});

mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbXZhdHRlbmZhbGwiLCJhIjoiY2xkdWFkbHN4MDN3MTQzbzVpa3ZydnhobiJ9.s1jE7Ai0VbUH3fxiZojDPg';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/anbru/cldvgf4im001j01ol6fci2pk2',
center: [11.97, 57.7],
zoom: 12,
minZoom: 11,
maxZoom: 18
});