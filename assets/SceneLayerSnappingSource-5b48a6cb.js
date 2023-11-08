import{ah as s,ai as o,ak as g,ao as w,dm as f,iw as k,b8 as S,af as b,kb as C,aD as H,kc as L,aN as _,aE as E,ca as $,dL as O}from"./index-a1cac181.js";import{a as I,i as V}from"./DimensionAnalysisView3D-17c6dddf.js";import{r as R}from"./VertexSnappingCandidate-08215e8d.js";import"./LineVisualElement-95b7ae27.js";import"./LengthDimension-c70dfa9a.js";import"./Segment-924afad1.js";import"./unitFormatUtils-503fe940.js";import"./elevationInfoUtils-38658fef.js";import"./analysisViewUtils-ba4dc63c.js";import"./Factory-8b5a38d2.js";import"./ImageMaterial-27f6b83d.js";import"./vec4f32-0d1b2306.js";import"./RightAngleQuadVisualElement-139c3851.js";import"./PointVisualElement-e6db4584.js";import"./Query-8ec96004.js";import"./EditGeometryOperations-c99bbfd7.js";import"./FeatureFilter-22854955.js";import"./floorFilterUtils-080a7cd2.js";import"./dehydratedFeatureComparison-0d28d135.js";let d=class extends w{constructor(e){super(e),this.availability=0,this._ids=new Set}destroy(){this._workerHandle.destroy(),this._workerHandle=null}initialize(){this._workerHandle=new x(this.schedule,{fetchAllEdgeLocations:(e,t)=>this._fetchAllEdgeLocations(e,t)})}async fetchCandidates(e,t){const i=e.coordinateHelper,{point:c}=e,a=P;this.renderCoordsHelper.toRenderCoords(c,i.spatialReference,a);const h=e.distance,l=typeof h=="number"?h:h.distance,u=await this._workerHandle.invoke({bounds:f(a[0],a[1],a[2],l),returnEdge:e.returnEdge,returnVertex:e.vertexMode!=="none"},t);return u.candidates.sort((y,m)=>y.distance-m.distance),u.candidates.map(y=>this._convertCandidate(i,y))}async add(e,t){this._ids.add(e.id),await this._workerHandle.invokeMethod("add",e,t)}async remove(e,t){this._ids.delete(e.id),await this._workerHandle.invokeMethod("remove",e,t)}_convertCandidate(e,t){switch(t.type){case"edge":return new I({objectId:t.objectId,targetPoint:this._convertRenderCoordinate(e,t.target),edgeStart:this._convertRenderCoordinate(e,t.start),edgeEnd:this._convertRenderCoordinate(e,t.end),isDraped:!1});case"vertex":return new R({objectId:t.objectId,targetPoint:this._convertRenderCoordinate(e,t.target),isDraped:!1})}}_convertRenderCoordinate({spatialReference:e},t){const i=S();return this.renderCoordsHelper.fromRenderCoords(t,i,e),V(i)}async _fetchAllEdgeLocations(e,t){const i=[],c=[];for(const{id:a,uid:h}of e.components)this._ids.has(a)&&i.push((async()=>{const l=await this.fetchEdgeLocations(a,t.signal),u=l.locations.buffer;return c.push(u),{id:a,uid:h,objectIds:l.objectIds,locations:u,origin:l.origin,type:l.type}})());return{result:{components:(await Promise.all(i)).filter(({id:a})=>this._ids.has(a))},transferList:c}}};s([o({constructOnly:!0})],d.prototype,"renderCoordsHelper",void 0),s([o({constructOnly:!0})],d.prototype,"fetchEdgeLocations",void 0),s([o({constructOnly:!0})],d.prototype,"schedule",void 0),s([o({readOnly:!0})],d.prototype,"availability",void 0),d=s([g("esri.views.interactive.snapping.featureSources.sceneLayerSource.SceneLayerSnappingSourceWorker")],d);class x extends k{constructor(e,t){super("SceneLayerSnappingSourceWorker","fetchCandidates",{},e,{strategy:"dedicated",client:t})}}const P=S();let n=class extends w{get updating(){return this._updatingHandles.updating}constructor(r){super(r),this.availability=1,this._updatingHandles=new b,this._abortController=new AbortController}destroy(){this._tracker=C(this._tracker),this._abortController=H(this._abortController),this._updatingHandles.destroy()}initialize(){const{view:r}=this,e=r.resourceController;this._edgeWorker=new L(v(e)),this._workerHandle=new d({renderCoordsHelper:this.view.renderCoordsHelper,schedule:v(e),fetchEdgeLocations:async(t,i)=>{if(this._tracker==null)throw new Error("tracker-not-initialized");return this._tracker.fetchEdgeLocations(t,this._edgeWorker,i)}}),this._updatingHandles.addPromise(this._setupLayerView()),this.addHandles([_(this._workerHandle),_(this._edgeWorker)])}async fetchCandidates(r,e){return this._workerHandle.fetchCandidates(r,e)}refresh(){}async _setupLayerView(){var t;if(this.destroyed)return;const r=(t=this._abortController)==null?void 0:t.signal,e=await this.getLayerView();e==null||E(r)||(this._tracker=e.trackSnappingSources({add:(i,c)=>{this._updatingHandles.addPromise(this._workerHandle.add({id:i,bounds:c},r))},remove:i=>{this._updatingHandles.addPromise(this._workerHandle.remove({id:i},r))}}))}};function v(r){return e=>r.immediate.schedule(e)}s([o({constructOnly:!0})],n.prototype,"getLayerView",void 0),s([o({constructOnly:!0})],n.prototype,"view",void 0),s([o({readOnly:!0})],n.prototype,"updating",null),s([o({readOnly:!0})],n.prototype,"availability",void 0),n=s([g("esri.views.interactive.snapping.featureSources.I3SSnappingSource")],n);let p=class extends w{get updating(){return this._i3sSources.some(r=>r.updating)}constructor(r){super(r),this.availability=1,this._i3sSources=[]}destroy(){this._i3sSources.forEach(r=>r.destroy()),this._i3sSources.length=0}initialize(){const{view:r}=this,e=this.layerSource.layer;this._i3sSources=e.type==="building-scene"?this._getBuildingSceneI3SSources(r,e):[this._getSceneLayerI3SSource(r,e)]}async fetchCandidates(r,e){const t=await Promise.all(this._i3sSources.map(i=>i.fetchCandidates(r,e)));return $(e),t.flat()}refresh(){this._i3sSources.forEach(r=>r.refresh())}_getBuildingSceneI3SSources(r,e){return e.allSublayers.toArray().map(t=>t.type==="building-component"?new n({getLayerView:async()=>(await r.whenLayerView(e)).whenSublayerView(t),view:r}):null).filter(O)}_getSceneLayerI3SSource(r,e){return new n({getLayerView:async()=>{const t=await r.whenLayerView(e);return t.type==="scene-layer-graphics-3d"?void 0:t},view:r})}};s([o({constructOnly:!0})],p.prototype,"layerSource",void 0),s([o({constructOnly:!0})],p.prototype,"view",void 0),s([o({readOnly:!0})],p.prototype,"updating",null),s([o({readOnly:!0})],p.prototype,"availability",void 0),p=s([g("esri.views.interactive.snapping.featureSources.SceneLayerSnappingSource")],p);export{p as SceneLayerSnappingSource};
