import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import MapView from '@arcgis/core/views/MapView'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import SceneLayer from '@arcgis/core/layers/SceneLayer'

const layer = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/0' })
const layer1 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/1' })
const layer2 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/2' })
const layer3 = new FeatureLayer({ url: 'https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/Berliner_Mauer/FeatureServer/3' })

const scLayer = new SceneLayer({ url: 'https://tiles.arcgis.com/tiles/jUpNdisbWqRpMo35/arcgis/rest/services/Berlin_3D/SceneServer' })

const map = new Map({
  basemap: 'satellite',
  ground: 'world-elevation',
  layers: [layer, layer1, layer2, layer3, scLayer]
})

// const mapView = new MapView({
//   map: map,
//   center: [13.4, 52.5],
//   zoom: 14,
//   container: 'viewDiv'
// })

const sceneView = new SceneView({
  map: map,
  center: [13.4, 52.5],
  zoom: 5,
  container: 'viewDiv'
})

setTimeout(() => {

  sceneView.goTo({
    center: [13.392154, 52.512202],
    tilt: 60,
    zoom: 18
  })
}, 5000)

