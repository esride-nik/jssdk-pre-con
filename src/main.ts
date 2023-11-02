import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'

const map = new Map({
  basemap: 'satellite'
})

const mapView = new MapView({
  map: map,
  center: [13.4, 52.5],
  zoom: 14,
  container: 'viewDiv'
})