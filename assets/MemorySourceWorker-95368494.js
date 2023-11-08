import{aq as I,eG as Z,eH as Q,bZ as A,b_ as k,eK as b,eL as w,eM as C,eN as P,eF as S,dV as v}from"./index-a1cac181.js";import{t as G,n as $}from"./objectIdUtils-789e911a.js";import{m as L}from"./FeatureStore-2c50987b.js";import{W as N,x as E,j as _}from"./QueryEngine-161e756d.js";import{i as W,o as z,a as H}from"./clientSideDefaults-3df88923.js";import{I as B,f as g,p as T,d as j,w as O}from"./sourceUtils-226e0e6c.js";import{Z as D}from"./FieldsIndex-6b49ca64.js";import"./BoundsStore-4bb1f6f0.js";import"./PooledRBush-6417eb86.js";import"./quickselect-29477ff4.js";import"./optimizedFeatureQueryEngineAdapter-865d3f13.js";import"./WhereClause-94ad22d7.js";import"./TimeOnly-d19fd4d4.js";import"./UnknownTimeZone-ab7c6b01.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-85c4f1d0.js";import"./utils-886070e6.js";import"./heatmapUtils-2351b1fb.js";import"./utils-5dc09d08.js";import"./generateRendererUtils-d73d141f.js";import"./defaultsJSON-59981e75.js";import"./date-294ce3fb.js";const K=S,U={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:S},V={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function J(h){return v(h)?h.z!=null:!!h.hasZ}function X(h){return v(h)?h.m!=null:!!h.hasM}class Ee{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){var e;(e=this._queryEngine)==null||e.destroy(),this._queryEngine=this._createDefaultAttributes=null}async load(e){const i=[],{features:a}=e,n=this._inferLayerProperties(a,e.fields),o=e.fields||[],u=e.hasM!=null?e.hasM:!!n.hasM,m=e.hasZ!=null?e.hasZ:!!n.hasZ,p=!e.spatialReference&&!n.spatialReference,d=p?K:e.spatialReference||n.spatialReference,y=p?U:null,c=e.geometryType||n.geometryType,l=!c;let t=e.objectIdField||n.objectIdField,r=e.timeInfo;const f=new D(o);if(!l&&(p&&i.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!c))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!t)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(n.objectIdField&&t!==n.objectIdField&&(i.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${t}" doesn't match the field name "${n.objectIdField}", found in the provided fields`}),t=n.objectIdField),t&&!n.objectIdField){const s=f.get(t);s?(t=s.name,s.type="esriFieldTypeOID",s.editable=!1,s.nullable=!1):o.unshift({alias:t,name:t,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const s of o){if(s.name==null&&(s.name=s.alias),s.alias==null&&(s.alias=s.name),!s.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:s});if(s.name===t&&(s.type="esriFieldTypeOID"),!Z.jsonValues.includes(s.type))throw new I("feature-layer:invalid-field-type",`invalid type for field "${s.name}"`,{field:s});s.length==null&&(s.length=Q(s))}const F={};for(const s of o)if(s.type!=="esriFieldTypeOID"&&s.type!=="esriFieldTypeGlobalID"){const q=A(s);q!==void 0&&(F[s.name]=q)}if(r){if(r.startTimeField){const s=f.get(r.startTimeField);s?(r.startTimeField=s.name,s.type="esriFieldTypeDate"):r.startTimeField=null}if(r.endTimeField){const s=f.get(r.endTimeField);s?(r.endTimeField=s.name,s.type="esriFieldTypeDate"):r.endTimeField=null}if(r.trackIdField){const s=f.get(r.trackIdField);s?r.trackIdField=s.name:(r.trackIdField=null,i.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:r}}))}r.startTimeField||r.endTimeField||(i.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:r}}),r=null)}const x=f.dateFields.length?{timeZoneIANA:e.dateFieldsTimeZone??k}:null;this._createDefaultAttributes=W(F,t);const R={warnings:i,featureErrors:[],layerDefinition:{...V,drawingInfo:z(c),templates:H(F),extent:y,geometryType:c,objectIdField:t,fields:o,hasZ:m,hasM:u,timeInfo:r,dateFieldsTimeReference:x},assignedObjectIds:{}};if(this._queryEngine=new N({fieldsIndex:D.fromLayerJSON({fields:o,timeInfo:r,dateFieldsTimeReference:x}),geometryType:c,hasM:u,hasZ:m,objectIdField:t,spatialReference:d,featureStore:new L({geometryType:c,hasM:u,hasZ:m}),timeInfo:r,cacheSpatialQueries:!0}),!(a!=null&&a.length))return this._nextObjectId=G,R;const M=$(t,a);return this._nextObjectId=M+1,await E(a,d),this._loadInitialFeatures(R,a)}async applyEdits(e){const{spatialReference:i,geometryType:a}=this._queryEngine;return await Promise.all([B(i,a),E(e.adds,i),E(e.updates,i)]),this._applyEdits(e)}queryFeatures(e,i={}){return this._queryEngine.executeQuery(e,i.signal)}queryFeatureCount(e,i={}){return this._queryEngine.executeQueryForCount(e,i.signal)}queryObjectIds(e,i={}){return this._queryEngine.executeQueryForIds(e,i.signal)}queryExtent(e,i={}){return this._queryEngine.executeQueryForExtent(e,i.signal)}querySnapping(e,i={}){return this._queryEngine.executeQueryForSnapping(e,i.signal)}_inferLayerProperties(e,i){let a,n,o=null,u=null,m=null;for(const p of e){const d=p.geometry;if(d!=null&&(o||(o=b(d)),u||(u=d.spatialReference),a==null&&(a=J(d)),n==null&&(n=X(d)),o&&u&&a!=null&&n!=null))break}if(i&&i.length){let p=null;i.some(d=>{const y=d.type==="esriFieldTypeOID",c=!d.type&&d.name&&d.name.toLowerCase()==="objectid";return p=d,y||c})&&(m=p.name)}return{geometryType:o,spatialReference:u,objectIdField:m,hasM:n,hasZ:a}}async _loadInitialFeatures(e,i){const{geometryType:a,hasM:n,hasZ:o,objectIdField:u,spatialReference:m,featureStore:p,fieldsIndex:d}=this._queryEngine,y=[];for(const t of i){if(t.uid!=null&&(e.assignedObjectIds[t.uid]=-1),t.geometry&&a!==b(t.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const r=this._createDefaultAttributes(),f=T(d,r,t.attributes,!0);f?e.featureErrors.push(f):(this._assignObjectId(r,t.attributes,!0),t.attributes=r,t.uid!=null&&(e.assignedObjectIds[t.uid]=t.attributes[u]),t.geometry!=null&&(t.geometry=_(t.geometry,t.geometry.spatialReference,m)),y.push(t))}p.addMany(w([],y,a,o,n,u));const{fullExtent:c,timeExtent:l}=await this._queryEngine.fetchRecomputedExtents();if(e.layerDefinition.extent=c,l){const{start:t,end:r}=l;e.layerDefinition.timeInfo.timeExtent=[t,r]}return e}async _applyEdits(e){const{adds:i,updates:a,deletes:n}=e,o={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(i!=null&&i.length&&this._applyAddEdits(o,i),a!=null&&a.length&&this._applyUpdateEdits(o,a),n==null?void 0:n.length){for(const p of n)o.deleteResults.push(j(p));this._queryEngine.featureStore.removeManyById(n)}const{fullExtent:u,timeExtent:m}=await this._queryEngine.fetchRecomputedExtents();return{extent:u,timeExtent:m,featureEditResults:o}}_applyAddEdits(e,i){const{addResults:a}=e,{geometryType:n,hasM:o,hasZ:u,objectIdField:m,spatialReference:p,featureStore:d,fieldsIndex:y}=this._queryEngine,c=[];for(const l of i){if(l.geometry&&n!==b(l.geometry)){a.push(g("Incorrect geometry type."));continue}const t=this._createDefaultAttributes(),r=T(y,t,l.attributes);if(r)a.push(r);else{if(this._assignObjectId(t,l.attributes),l.attributes=t,l.uid!=null){const f=l.attributes[m];e.uidToObjectId[l.uid]=f}if(l.geometry!=null){const f=l.geometry.spatialReference??p;l.geometry=_(O(l.geometry,f),f,p)}c.push(l),a.push(j(l.attributes[m]))}}d.addMany(w([],c,n,u,o,m))}_applyUpdateEdits({updateResults:e},i){const{geometryType:a,hasM:n,hasZ:o,objectIdField:u,spatialReference:m,featureStore:p,fieldsIndex:d}=this._queryEngine;for(const y of i){const{attributes:c,geometry:l}=y,t=c==null?void 0:c[u];if(t==null){e.push(g(`Identifier field ${u} missing`));continue}if(!p.has(t)){e.push(g(`Feature with object id ${t} missing`));continue}const r=C(p.getFeature(t),a,o,n);if(l!=null){if(a!==b(l)){e.push(g("Incorrect geometry type."));continue}const f=l.spatialReference??m;r.geometry=_(O(l,f),f,m)}if(c){const f=T(d,r.attributes,c);if(f){e.push(f);continue}}p.add(P(r,a,o,n,u)),e.push(j(t))}}_assignObjectId(e,i,a=!1){const n=this._queryEngine.objectIdField;a&&i&&isFinite(i[n])?e[n]=i[n]:e[n]=this._nextObjectId++}}export{Ee as default};
