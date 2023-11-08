import{ah as a,ai as t,ak as y,au as h,gb as w,av as u,aB as c,aq as d,aC as V,am as p,aD as _,aE as m,aF as v}from"./index-a1cac181.js";import{n as A}from"./LayerView3D-3cbda063.js";import{u as D}from"./LayerView-8ac51c6c.js";const f=i=>{let s=class extends i{constructor(...e){super(...e),this.layer=null}get interactive(){return this.analysisView!=null&&this.analysisView.interactive}set interactive(e){this.analysisView!=null&&(this.analysisView.interactive=e)}get results(){return this.analysisView!=null?this.analysisView.results:new h}get selectedDimension(){return this.analysisView!=null?this.analysisView.selectedDimension:null}set selectedDimension(e){this.analysisView!=null&&(this.analysisView.selectedDimension=e)}async createLengthDimensions(e){if(this.analysisView==null)throw w();await this.analysisView.createLengthDimensions(e)}};return a([t()],s.prototype,"layer",void 0),a([t()],s.prototype,"interactive",null),a([t({readOnly:!0})],s.prototype,"results",null),a([t()],s.prototype,"selectedDimension",null),a([t()],s.prototype,"analysisView",void 0),s=a([y("esri.views.layers.DimensionLayerView")],s),s},o="analysis-view-handles";let n=class extends A(f(D)){constructor(i){super(i),this.type="dimension-3d",this._analysisModule=null}initialize(){this.addHandles(u(()=>this.layer.source,i=>{this._destroyAnalysisView(),i!=null&&this._createAnalysisView(i)},c),o)}destroy(){this.removeHandles(o),this._destroyAnalysisView()}isUpdating(){return this._createAnalysisViewTask!=null||this.analysisView!=null&&this.analysisView.updating}async whenAnalysisView(){if(this.analysisView!=null)return this.analysisView;if(this._createAnalysisViewTask!=null)return this._createAnalysisViewTask.promise;throw new d("layerview:no-analysisview-for-analysis","The analysis has not been set on the DimensionLayer of this layer view")}_createAnalysisView(i){const s=V(async e=>(this.analysisView=await this._createAnalysisViewPromise(i,e),this._createAnalysisViewTask===s&&(this._createAnalysisViewTask=null),this.analysisView));this.addResolvingPromise(s.promise),this._createAnalysisViewTask=s}_destroyAnalysisView(){this.analysisView=p(this.analysisView),this._createAnalysisViewTask=_(this._createAnalysisViewTask)}async _createAnalysisViewPromise(i,s){let e=this._analysisModule;if(e==null){const r=await this._loadAnalysisModule();this._analysisModule=r,e=r}const l=new e.default({analysis:i,view:this.view,parent:this});if(await l.when(),m(s))throw l.destroy(),w();return l}_loadAnalysisModule(){return v(()=>import("./DimensionAnalysisView3D-17c6dddf.js").then(i=>i.D),["./DimensionAnalysisView3D-17c6dddf.js","./index-a1cac181.js","./index-8ff8146e.css","./LineVisualElement-95b7ae27.js","./LengthDimension-c70dfa9a.js","./Segment-924afad1.js","./unitFormatUtils-503fe940.js","./elevationInfoUtils-38658fef.js","./analysisViewUtils-ba4dc63c.js","./Factory-8b5a38d2.js","./ImageMaterial-27f6b83d.js","./vec4f32-0d1b2306.js","./RightAngleQuadVisualElement-139c3851.js","./PointVisualElement-e6db4584.js","./Query-8ec96004.js","./EditGeometryOperations-c99bbfd7.js","./FeatureFilter-22854955.js","./floorFilterUtils-080a7cd2.js","./dehydratedFeatureComparison-0d28d135.js"],import.meta.url)}};a([t()],n.prototype,"type",void 0),a([t()],n.prototype,"analysisView",void 0),a([t()],n.prototype,"_createAnalysisViewTask",void 0),n=a([y("esri.views.3d.layers.DimensionLayerView3D")],n);const $=n;export{$ as default};
