import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";


/********************************************************************
 * Step 1 - Add scene with basemap *
 ********************************************************************/

const map = new Map({
  basemap: "dark-gray-vector",
  ground: "world-elevation",
});

const view = new SceneView({
  container: document.querySelector("#app") as HTMLDivElement,
  center: [13.405, 52.52],
  scale: 50000,
  map: map,

  environment: {
    atmosphereEnabled: false,
    starsEnabled: false,
  },
});