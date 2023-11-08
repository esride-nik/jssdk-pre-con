import{bE as $,d3 as z,c1 as b,ca as x,dJ as I,cy as g,bF as y}from"./index-a1cac181.js";function D(a=!1,e){if(a){const{elevationInfo:t,alignPointsInFeatures:n}=e;return new v(t,n)}return new m}let m=class{async alignCandidates(e,t,n){return e}notifyElevationSourceChange(){}};const w=1024;let v=class{constructor(e,t){this._elevationInfo=e,this._alignPointsInFeatures=t,this._alignmentsCache=new $(w),this._cacheVersion=0}async alignCandidates(e,t,n){const s=this._elevationInfo;return s==null||s.mode!=="absolute-height"||s.featureExpressionInfo?this._alignComputedElevationCandidates(e,t,n):(this._alignAbsoluteElevationCandidates(e,t,s),e)}notifyElevationSourceChange(){this._alignmentsCache.clear(),this._cacheVersion++}_alignAbsoluteElevationCandidates(e,t,n){const{offset:s,unit:i}=n;if(s==null)return;const r=z(t),o=s*(I(i??"meters")/r);for(const c of e)switch(c.type){case"edge":c.start.z+=o,c.end.z+=o;continue;case"vertex":c.target.z+=o;continue}}async _alignComputedElevationCandidates(e,t,n){const s=new Map;for(const u of e)b(s,u.objectId,E).push(u);const[i,r,o]=this._prepareQuery(s,t),c=await this._alignPointsInFeatures(i,n);if(x(n),o!==this._cacheVersion)return this._alignComputedElevationCandidates(e,t,n);this._applyCacheAndResponse(i,c,r);const{drapedObjectIds:d,failedObjectIds:f}=c,h=[];for(const u of e){const{objectId:l}=u;d.has(l)&&u.type==="edge"&&(u.draped=!0),f.has(l)||h.push(u)}return h}_prepareQuery(e,t){const n=[],s=[];for(const[i,r]of e){const o=[];for(const c of r)this._addToQueriesOrCachedResult(i,c.target,o,s),c.type==="edge"&&(this._addToQueriesOrCachedResult(i,c.start,o,s),this._addToQueriesOrCachedResult(i,c.end,o,s));o.length!==0&&n.push({objectId:i,points:o})}return[{spatialReference:t.toJSON(),pointsInFeatures:n},s,this._cacheVersion]}_addToQueriesOrCachedResult(e,t,n,s){const i=_(e,t),r=this._alignmentsCache.get(i);r==null?n.push(t):s.push(new j(t,r))}_applyCacheAndResponse(e,{elevations:t,drapedObjectIds:n,failedObjectIds:s},i){for(const c of i)c.apply();let r=0;const o=this._alignmentsCache;for(const{objectId:c,points:d}of e.pointsInFeatures){if(s.has(c)){r+=d.length;continue}const f=!n.has(c);for(const h of d){const u=_(c,h),l=t[r++];h.z=l,f&&o.put(u,l,1)}}}};class j{constructor(e,t){this.point=e,this.z=t}apply(){this.point.z=this.z}}function _(a,{x:e,y:t,z:n,spatialReference:s}){return`${a}-${e}-${t}-${n??0}}-wkid:${s==null?void 0:s.wkid}`}function E(){return[]}class S{filter(e,t){return t}notifyElevationSourceChange(){}}let O=class{filter(e,t){const{point:n,distance:s}=e,{z:i}=n;if(i==null||t.length===0)return t;const r=T(s),o=this._updateCandidatesTo3D(t,n,r).filter(R);return o.sort(M),o}_updateCandidatesTo3D(e,t,n){for(const s of e)switch(s.type){case"edge":V(s,t,n);continue;case"vertex":Q(s,t,n);continue}return e}};function R(a){return a.distance<=1}function B(a=!1){return a?new O:new S}function V(a,e,{x:t,y:n,z:s}){const{start:i,end:r,target:o}=a;a.draped||F(o,e,i,r);const c=(e.x-o.x)/t,d=(e.y-o.y)/n,f=(e.z-o.z)/s;a.distance=Math.sqrt(c*c+d*d+f*f)}function F(a,e,t,n){const s=n.x-t.x,i=n.y-t.y,r=n.z-t.z,o=s*s+i*i+r*r,c=(e.x-t.x)*s+(e.y-t.y)*i+r*(e.z-t.z),d=Math.min(1,Math.max(0,c/o)),f=t.x+s*d,h=t.y+i*d,u=t.z+r*d;a.x=f,a.y=h,a.z=u}function Q(a,e,{x:t,y:n,z:s}){const{target:i}=a,r=(e.x-i.x)/t,o=(e.y-i.y)/n,c=(e.z-i.z)/s,d=Math.sqrt(r*r+o*o+c*c);a.distance=d}function T(a){return typeof a=="number"?{x:a,y:a,z:a}:a}function M(a,e){return a.distance-e.distance}function G(a=!1,e){return a?new k(e):new A}class A{async fetch(){return[]}notifySymbologyChange(){}}const P=1024;class k{constructor(e){this._getSymbologyCandidates=e,this._candidatesCache=new $(P),this._cacheVersion=0}async fetch(e,t){if(e.length===0)return[];const n=[],s=[],i=this._candidatesCache;for(const h of e){const u=C(h),l=i.get(u);if(l)for(const p of l)s.push(g(p));else n.push(h),i.put(u,[],1)}if(n.length===0)return s;const r=this._cacheVersion,{candidates:o,sourceCandidateIndices:c}=await this._getSymbologyCandidates(n,t);if(x(t),r!==this._cacheVersion)return this.fetch(e,t);const d=[],{length:f}=o;for(let h=0;h<f;++h){const u=o[h],l=C(n[c[h]]),p=i.get(l);p.push(u),i.put(l,p,p.length),d.push(g(u))}return s.concat(d)}notifySymbologyChange(){this._candidatesCache.clear(),this._cacheVersion++}}function C(a){switch(a.type){case"vertex":{const{objectId:e,target:t}=a,n=`${e}-vertex-${t.x}-${t.y}-${t.z??0}`;return y(n).toString()}case"edge":{const{objectId:e,start:t,end:n}=a,s=`${e}-edge-${t.x}-${t.y}-${t.z??0}-to-${n.x}-${n.y}-${n.z??0}`;return y(s).toString()}default:return""}}export{D as i,G as n,B as r};
