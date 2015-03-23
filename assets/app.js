(function () {
  var map = L.map('map', {
    center: [-58.482780222078205, -68.203125],
    zoom: 2
  });

  L.tileLayer('tiles/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 6
  }).addTo(map);

  var $buttons = $('.buttons');
  $buttons.on('click', '.button', function (event) {
    var $target = $(event.target);
    var geometry = features[$target.data('name')];

    geojsonLayer.clearLayers();

    if ($target.hasClass('active')) {
      $target.removeClass('active');
      return;
    }

    $target.siblings('button').removeClass('active');
    $target.addClass('active');
    geojsonLayer.addData(geometry);
    map.fitBounds(geojsonLayer.getBounds());
  });

  var features = {};
  var geojsonLayer = new L.GeoJSON(null, {
    style: function () {
      return {
        fillOpacity: 0,
        weight: 2,
        color: '#333'
      };
    }
  });
  map.addLayer(geojsonLayer);

  $.ajax({
    url: 'features.geojson',
    dataType: 'json',
    success: function (data) {
      data.features.forEach(function (feature) {
        var name = feature.properties.name;
        features[name] = feature.geometry;
        $buttons.append('<button data-name="' + name + '" class="button">' + name + '</button>');
      });
    },
    error: function () {
      console.log('Error when getting features.geojson')
    }
  });
}());
