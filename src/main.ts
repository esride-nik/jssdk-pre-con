import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'

const layer = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/0' })
const layer1 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/1' })
const layer2 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/2' })
const layer3 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/3' })

const map = new Map({
  basemap: 'satellite',
  layers: [layer, layer1, layer2, layer3]
})

const mapView = new MapView({
  map: map,
  center: [13.4, 52.5],
  zoom: 14,
  container: 'viewDiv'
})

