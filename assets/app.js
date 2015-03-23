(function () {
  var map = L.map('map', {
    center: [-58.482780222078205, -68.203125],
    zoom: 2
  });

  L.tileLayer('tiles/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 6
  }).addTo(map);
}());
