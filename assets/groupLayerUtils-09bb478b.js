import{I as l,b as p}from"./utils-1e8eb5eb.js";import{a as s}from"./jsonContext-c4023ffa.js";import{i as y,f,s as v}from"./portalItemUtils-bd3ade0c.js";import{u as i}from"./saveUtils-3dc293c4.js";import"./index-a1cac181.js";import"./originUtils-cfe4feaf.js";import"./multiOriginJSONSupportUtils-c978f4c3.js";import"./saveAPIKeyUtils-c8a9e333.js";import"./resourceUtils-03345e02.js";const n="Group Layer",d="group-layer-save",I="group-layer-save-as",o=f.GROUP_LAYER_MAP;function c(e){return{isValid:e.type==="group",errorMessage:"Layer.type should be 'group'"}}function g(e){return{isValid:v(e,o),errorMessage:`Layer.portalItem.typeKeywords should have '${o}'`}}function u(e){const r=e.layerJSON;return Promise.resolve(r&&Object.keys(r).length?r:null)}async function P(e,r){r.title||(r.title=e.title),y(r,o)}async function w(e,r){return l({layer:e,itemType:n,validateLayer:c,validateItem:g,createJSONContext:t=>s(t,e),createItemData:u,errorNamePrefix:d,saveResources:async(t,a)=>(e.sourceIsPortalItem||await t.removeAllResources().catch(()=>{}),i(e.resourceReferences,a))},r)}async function J(e,r,t){return p({layer:e,itemType:n,validateLayer:c,createJSONContext:a=>s(a,e),createItemData:u,errorNamePrefix:I,newItem:r,setItemProperties:P,saveResources:(a,m)=>i(e.resourceReferences,m)},t)}export{w as save,J as saveAs};
