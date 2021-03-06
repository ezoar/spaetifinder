// Token and Fixing Center-Point of Map 
  
  // Token

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW8tbWFwYm94IiwiYSI6ImNqcjEwYWN4ZzAzNDgzeXJzdGtlbGduNGgifQ.TBbP0PVssrORXh4sFvoOMA'; // access token
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/eo-mapbox/cjrfjmav96dlx2spdc5g81tw4',
    center: [12.397613, 51.315664],
    zoom: 10.7
  });

// Markers and Popups

  map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
      layers: ['leipzig-spaetis'] // Name of the Layer
  });

  if (!features.length) {
      return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h1>' + feature.properties.title + '</h1><p>' 
      + feature.properties.description + '</p><p>' 
      + feature.properties.titleproductrange + '</p><p>'
      + feature.properties.productrange + '</p><p>'  
      + feature.properties.titleopeninghours + '</p><p>' 
      + feature.properties.openinghours + '</p><p>'
      + feature.properties.titleURL + '</p><p>'
      + feature.properties.URL + '</p><p>' 
      + feature.properties.rating + '</p>')
      
      .addTo(map);
  });


// Directions

  map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }), 'bottom-left');

// Geocoder

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }), 'bottom-left');

// Geolocate-Control

  map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
  }), 'top-right');


// Service Worker Registration: Catch and pass to Service Worker file (sw.js)

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'Service Worker registration failed'));
  }
