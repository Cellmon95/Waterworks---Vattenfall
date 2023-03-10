const APPID = "0bed6060-47a2-4594-8a5a-5bb3ff8a01d7";
const infoBox = document.querySelector(".infoBox");
const exitBox = document.querySelector(".exitButton");
const markers = [];
const DOMelementsName = [
  'waterLevel',
  'levelDownstream',
  'tapping',
  'lowerLimit',
  'upperLimit'
];

//Adding the markers.
function createAddMarker(response) {
  const customMarker = document.createElement("svg");
  customMarker.className = "marker";
  customMarker.dataset.stationCode = response.Code;

  const marker = {
    mapboxgl: new mapboxgl.Marker(customMarker),
    Code: response.Code,
    Name: response.Description,
    Lat: response.Lat,
    Long: response.Long,
    MeasureParameters: response.MeasureParameters,
  };

  marker.mapboxgl.setLngLat([response.Long, response.Lat]).addTo(map);
  marker.mapboxgl.getElement().dataset.stationCode = response.Code;
  marker.mapboxgl.getElement().addEventListener("click", onClickMarker);
  marker.mapboxgl.getElement().addEventListener("click", onClickOpenInfoBox);


  return marker;
}

function onClickOpenInfoBox(e) {
  infoBox.classList.add("active");
  const allMarkers = document.querySelectorAll(".marker");
  allMarkers.forEach(eachMarker => {
    eachMarker.classList.add("not-active");
  });
  e.currentTarget.classList.remove("not-active")
}

function closeInfoBox() {
    mapZoomOut();
    infoBox.classList.remove("active");
    const allMarkers = document.querySelectorAll(".marker");
    allMarkers.forEach(eachMarker => {
      eachMarker.classList.remove("not-active");
    });
}

function mapZoomOut() {
  map.flyTo({
    zoom: 10.3,
    center: [11.97, 57.7]
  });
}

exitBox.addEventListener("click", closeInfoBox);


function checkIfUndefined(target) {
  if (target === undefined) {
    return true;
  }
  return false;
}

function fillDOMElement(element, targetId, measureParIndex) {
  if (checkIfUndefined(markers[targetId].MeasureParameters[measureParIndex])) {
    element.innerHTML = "n/a";
  } else {
  element.innerHTML = markers[targetId].MeasureParameters[measureParIndex].CurrentValue;
  };
}

function onClickMarker(e) {
  /* Make the map fly to the marker. */
  map.on('click', () => {
    map.flyTo({
        center: [markers[targetId].Long, markers[targetId].Lat-0.012],
        zoom: 12,
    });
});

  //Push down the footer if it's showing.
  document.querySelector('.backButton').click();

  /* targetID shows stationCode (name for code purposes) */
  targetId = e.currentTarget.dataset.stationCode;
  // Name
  const infoHeader = document.getElementById("stationName");
  infoHeader.innerHTML = markers[targetId].Name;

  //Lat & Long(station positioning)
  const infoStationPosition = document.getElementById("stationPos");
  infoStationPosition.innerHTML = ": " + markers[targetId].Lat + ",  " + markers[targetId].Long;

  // Fill the DOM elements
  DOMelementsName.forEach((element, index) => {
    fillDOMElement(document.getElementById(element), targetId, index);
  });
}

fetch(
  `http://data.goteborg.se/riverservice/v1.1/measuresites/${APPID}?format=JSON`
)
  .then((response) => response.json())
  .then((response) => {
    response.forEach((station) => {
      markers[station.Code] = createAddMarker(station);
    });
  });

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVhbXZhdHRlbmZhbGwiLCJhIjoiY2xkdWFkbHN4MDN3MTQzbzVpa3ZydnhobiJ9.s1jE7Ai0VbUH3fxiZojDPg";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/anbru/cldvgf4im001j01ol6fci2pk2",
  center: [11.97, 57.7],
  zoom: 10.3,
  minZoom: 10,
  maxZoom: 18,
});

