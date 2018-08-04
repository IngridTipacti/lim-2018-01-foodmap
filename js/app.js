var map, infoWindow;

function initMap() {
  //   Ventana de información para marcadores-"Nombre de lugares" 
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    // Identifica ubicación actualizada del usuario en el mapa
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //  Crea Mapa actualizado según ubicación identificada (lat,lng y zoom )
      map = new google.maps.Map(document.getElementById('contentMap'), {
        center: pos,
        zoom: 15
      });
      //  Contenidos o parámetros de infowindow
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      //  Devuelve información de conjunto de lugares 
      var service = new google.maps.places.PlacesService(map);
      //   Método para búsqueda cercana y tipo de lugar.
      service.nearbySearch({
        location: pos,
        radius: 500,
        type: ['restaurant', 'food']
      }, callback);
      //   Envia petición para estado de respuesta (OK es válido)
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
          }
        }
      }
    },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
    // El navegador no admite la ubicación
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

