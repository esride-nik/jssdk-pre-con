import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import LineStylePattern3D from "@arcgis/core/symbols/patterns/LineStylePattern3D";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import ExpressionInfo from "@arcgis/core/form/ExpressionInfo";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";

// Layers

const treesUrl =
  "https://services2.arcgis.com/jUpNdisbWqRpMo35/ArcGIS/rest/services/Baumkataster_Berlin/FeatureServer/0/";
const streetsUrl =
  "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/arcgis/rest/services/Berlin_Equal_Street_Names/FeatureServer";
const districtsUrl =
  "https://services2.arcgis.com/jUpNdisbWqRpMo35/arcgis/rest/services/BerlinRBS_Ortsteile_2017/FeatureServer";
const buildingsUrl =
  "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Buildings_Berlin/SceneServer";

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

/**************************************************
 * Step 2 - Add a trees layer with a web style symbol *
 **************************************************/

const treesLayer = new FeatureLayer({
  title: "Berlin trees",
  minScale: 5000,
  url: treesUrl,
  outFields: ["*"],
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: new SimpleRenderer({
    symbol: new WebStyleSymbol({
      name: "Populus",
      styleName: "EsriRealisticTreesStyle",
    }),
  }),
});

map.add(treesLayer);

/**************************************************
 * Step 3 - Change the streets renderer to show a 3D line *
 **************************************************/
const FEMALE_COLOR = "#8400a8";
const MALE_COLOR = "#e6bc01";

const femaleStreetSymbol = {
  value: "F",
  symbol: new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        profile: "quad",
        material: {
          color: FEMALE_COLOR,
        },
        width: 10,
        height: 3,
      }),
    ],
  }),
};

const maleStreetSymbol = {
  value: "M",
  symbol: new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        profile: "quad",
        material: {
          color: MALE_COLOR,
        },
        width: 10,
        height: 3,
      }),
    ],
  }),
};

const streetsLayer = new FeatureLayer({
  title: "Berlin streets",
  url: streetsUrl,
  outFields: ["*"],
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: new UniqueValueRenderer({
    field: "gender",
    uniqueValueInfos: [femaleStreetSymbol, maleStreetSymbol],
  }),
});

map.add(streetsLayer);

/**************************************************
 * Step 4 - Add districts and 3D labels *
 **************************************************/

const districtsLayer = new FeatureLayer({
  title: "Berlin district boundaries",
  url: districtsUrl,
  outFields: ["*"],
  elevationInfo: {
    mode: "on-the-ground",
  },
  renderer: new SimpleRenderer({
    symbol: new PolygonSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          outline: {
            color: "white",
            size: "2px",
            pattern: new LineStylePattern3D({
              style: "dash",
            }),
            patternCap: "round",
          },
        }),
      ],
    }),
  }),
});

const districtsLabelLayer = new FeatureLayer({
  title: "Berlin district names",
  url: districtsUrl,
  outFields: ["*"],
  elevationInfo: {
    mode: "relative-to-scene",
  },
  labelingInfo: [
    {
      labelExpression: "[name]",
      symbol: new LabelSymbol3D({
        symbolLayers: [
          new TextSymbol3DLayer({
            material: {
              color: "white",
            },
            halo: {
              size: 1,
              color: [50, 50, 50],
            },
            size: 10,
          }),
        ],
      }),
    },
  ],
  renderer: new SimpleRenderer({
    symbol: new PointSymbol3D({
      symbolLayers: [
        new ObjectSymbol3DLayer({
          width: 1,
          height: 1,
          depth: 1,
          resource: { primitive: "sphere" },
          material: { color: "white" },
        }),
      ],
      verticalOffset: {
        screenLength: 100,
        maxWorldLength: 200,
        minWorldLength: 100,
      },
      callout: new LineCallout3D({
        size: 1.5,
        color: [150, 150, 150],
        border: {
          color: [50, 50, 50],
        },
      }),
    }),
  }),
});

map.add(districtsLayer);
map.add(districtsLabelLayer);

/**************************************************
 * Step 5 - Add 3D buildings with edges rendering *
 **************************************************/

const buildingSymbol = new MeshSymbol3D({
  symbolLayers: [
    new FillSymbol3DLayer({
      material: {
        color: [40, 40, 40, 0.5],
        colorMixMode: "tint",
      },
      edges: new SolidEdges3D({
        size: 0.5,
        color: [255, 255, 255, 0.5],
      }),
    }),
  ],
});

const buildingsLayer = new SceneLayer({
  title: "Berlin 3D buildings",
  url: buildingsUrl,
  outFields: ["*"],
  renderer: new SimpleRenderer({
    symbol: buildingSymbol,
  }),
  legendEnabled: false,
});

map.add(buildingsLayer);

/**************************************************
 * Step 6 - Add a popup with the name & description of the street *
 **************************************************/

const arcadeExpressionInfos = [
  {
    name: "title",
    title: "Name of the person the street is named after.",
    expression: "fromJSON($feature.details).labels.en.value",
  },
  {
    name: "description",
    title: "Description of the person the street is named after.",
    expression: "fromJSON($feature.details).descriptions.en.value",
  },
  {
    name: "link",
    title: "Link to wikipedia article.",
    expression: "fromJSON($feature.details).sitelinks.enwiki.url",
  },
];

streetsLayer.popupTemplate = new PopupTemplate({
  content:
    "<p><strong>{name}</strong></p><p>{expression/title}: {expression/description}</p><p><a href='{expression/link}'>Learn more</a></p><p>",
  expressionInfos: arcadeExpressionInfos.map(
    (infos) => new ExpressionInfo(infos)
  ) as __esri.popupExpressionInfoProperties[],
});


/**************************************************
 * Step 7 - Find a widget in the docs to add to your app *
 **************************************************/

new Search({
  container: "search-widget-container",
  view: view,
});

let homeWidget = new Home({
  view: view,
});
view.ui.add(homeWidget, "top-left");

const layerList = new LayerList({
  view: view,
  listItemCreatedFunction: (event) => {
    const item = event.item;
    if (item.layer.type != "group") {
      item.panel = { content: "legend", open: true };
    }
  },
});
const llExpand = new Expand({
  view: view,
  content: layerList,
  expanded: false,
});
view.ui.add(llExpand, "top-right");