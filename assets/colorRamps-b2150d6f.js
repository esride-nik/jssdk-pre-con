import{ah as o,ai as e,ak as m,cx as d,dk as C,cy as p,bt as y,fr as h}from"./index-a1cac181.js";let l=class extends d{constructor(t){super(t),this.type=null}};o([e({readOnly:!0,json:{read:!1,write:!0}})],l.prototype,"type",void 0),l=o([m("esri.rest.support.ColorRamp")],l);const c=l;var i;let r=i=class extends c{constructor(t){super(t),this.algorithm=null,this.fromColor=null,this.toColor=null,this.type="algorithmic"}clone(){return new i({fromColor:p(this.fromColor),toColor:p(this.toColor),algorithm:this.algorithm})}};o([C({esriCIELabAlgorithm:"cie-lab",esriHSVAlgorithm:"hsv",esriLabLChAlgorithm:"lab-lch"})],r.prototype,"algorithm",void 0),o([e({type:y,json:{type:[h],write:!0}})],r.prototype,"fromColor",void 0),o([e({type:y,json:{type:[h],write:!0}})],r.prototype,"toColor",void 0),o([e({type:["algorithmic"]})],r.prototype,"type",void 0),r=i=o([m("esri.rest.support.AlgorithmicColorRamp")],r);const n=r;var a;let s=a=class extends c{constructor(t){super(t),this.colorRamps=null,this.type="multipart"}clone(){return new a({colorRamps:p(this.colorRamps)})}};o([e({type:[n],json:{write:!0}})],s.prototype,"colorRamps",void 0),o([e({type:["multipart"]})],s.prototype,"type",void 0),s=a=o([m("esri.rest.support.MultipartColorRamp")],s);const u=s,f={key:"type",base:c,typeMap:{algorithmic:n,multipart:u}};function v(t){return t!=null&&t.type?t.type==="algorithmic"?n.fromJSON(t):t.type==="multipart"?u.fromJSON(t):null:null}export{u as a,f as m,v as p};
