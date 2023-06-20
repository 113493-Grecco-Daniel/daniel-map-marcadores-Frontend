//const API_MARCADORES_URL = "https://localhost:7043/api/Marcadores";

const API_MARCADORES_URL = "https://daniel-map-marcadores-backend.azurewebsites.net/api/Marcadores"

var platform = new H.service.Platform({
  apikey: '8M_tIG6pilYhB7pr9mD3mL0V28ACH-_yi2ynRKEbwPc'
});

var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
  document.getElementById('map'),
  defaultLayers.vector.normal.map, {
    center: { lat: -31.432, lng: -64.193 },
    zoom: 14,
    pixelRatio: window.devicePixelRatio || 1  
  }
);

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);

function moveMapToCiudadUniversitaria() {
  map.setCenter({ lat: -31.432, lng: -64.193 });
  map.setZoom(14);
}

function addMarkerToMap(coordinates) {
  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);
}

function cargarMarcadores() {
  console.log('Inicializando mapa')
  fetch(API_MARCADORES_URL)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      if (respuesta.statusCode !== 200) {
        alert('Error al cargar los marcadores!!!');       
        return;
      } else {
        respuesta.listMarcadores.forEach(marcador => {
          var marker = new H.map.Marker({
            lat: marcador.latitud,
            lng: marcador.longitud
          });
          marker.setData({
            info: marcador.info            
          });
          console.log(marcador.info)
          marker.addEventListener('tap', onMarkerClick);
          map.addObject(marker);
          console.log('Está agregando los marcadores')
        });
      }
    });
}

function onMarkerClick(event) {
  var marker = event.target;
  var data = marker.getData();

  var infoWindow = new H.ui.InfoBubble(marker.getGeometry(), {
    content: data.info 
  });
  ui.addBubble(infoWindow);
}



function initializeMap() {
    cargarMarcadores();
  }  

document.addEventListener('DOMContentLoaded', initializeMap);