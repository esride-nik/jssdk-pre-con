import{bP as c}from"./index-a1cac181.js";class n{constructor(t){this.size=0,this._start=0,this.maxSize=t,this._buffer=new Array(t)}get entries(){return this._buffer}enqueue(t){if(this.size===this.maxSize){const e=this._buffer[this._start];return this._buffer[this._start]=t,this._start=(this._start+1)%this.maxSize,e}return this._buffer[(this._start+this.size++)%this.maxSize]=t,null}dequeue(){if(this.size===0)return null;const t=this._buffer[this._start];return this._buffer[this._start]=null,this.size--,this._start=(this._start+1)%this.maxSize,t}peek(){return this.size===0?null:this._buffer[this._start]}find(t){if(this.size===0)return null;for(const e of this._buffer)if(e!=null&&t(e))return e;return null}clear(t){let e=this.dequeue();for(;e!=null;)t&&t(e),e=this.dequeue()}}const l="__esri_stream_id__",a="__esri_timestamp__",d=1e3;class p{constructor(t,e,s,i,r=128){this._trackIdToObservations=new Map,this._idCounter=0,this._lastPurge=performance.now(),this._addOrUpdated=new Map,this._removed=[],this._maxAge=0,this._timeInfo=s,this._purgeOptions=i,this.store=t,this.objectIdField=e,this.purgeInterval=r,this._useGeneratedIds=this.objectIdField===l}removeById(t){this._removed.push(t)}removeByTrackId(t){const e=this._trackIdToObservations.get(t);if(e)for(const s of e.entries)this._removed.push(s)}add(t){var h;if(this._useGeneratedIds){const o=this._nextId();t.attributes[this.objectIdField]=o,t.objectId=o}else t.objectId=t.attributes[this.objectIdField];const e=t.objectId;if(this._addOrUpdated.set(e,t),this._maxAge=Math.max(this._maxAge,t.attributes[this._timeInfo.startTimeField]),!this._timeInfo.trackIdField)return this._trackIdLessObservations==null&&(this._trackIdLessObservations=new n(1e5)),void this._trackIdLessObservations.enqueue(e);const s=t.attributes[this._timeInfo.trackIdField];if(!this._trackIdToObservations.has(s)){const o=((h=this._purgeOptions)==null?void 0:h.maxObservations)!=null?this._purgeOptions.maxObservations:d,_=c(o,0,d);this._trackIdToObservations.set(s,new n(_))}const i=this._trackIdToObservations.get(s),r=i==null?void 0:i.enqueue(e);r!=null&&(this._addOrUpdated.has(r)?this._addOrUpdated.delete(r):this._removed.push(r))}checkForUpdates(){const t=this._getToAdd(),e=this._getToRemove(),s=performance.now();s-this._lastPurge>=this.purgeInterval&&(this._purge(s),this._lastPurge=s);const i=[];if(e!=null)for(const h of e){const o=this.store.removeById(h);o!=null&&i.push(o)}const r=[];if(t!=null){const h=new Set(e??[]);for(const o of t)h.has(o.objectId)||(o.attributes[a]=s,this.store.add(o),r.push(o))}(r.length||i!=null&&i.length)&&this.store.update(r,i)}_getToAdd(){if(!this._addOrUpdated.size)return null;const t=new Array(this._addOrUpdated.size);let e=0;return this._addOrUpdated.forEach(s=>t[e++]=s),this._addOrUpdated.clear(),t}_getToRemove(){const t=this._removed;return this._removed.length?(this._removed=[],t):null}_nextId(){const t=this._idCounter;return this._idCounter=(this._idCounter+1)%4294967294+1,t}_purge(t){const e=this._purgeOptions;e!=null&&(this._purgeSomeByDisplayCount(e),this._purgeByAge(e),this._purgeByAgeReceived(t,e),this._purgeTracks())}_purgeSomeByDisplayCount(t){if(!t.displayCount)return;let e=this.store.size;if(e>t.displayCount){if(this._timeInfo.trackIdField){for(const s of this._trackIdToObservations.values())if(e>t.displayCount&&s.size){const i=s.dequeue();this._removed.push(i),e--}}if(this._trackIdLessObservations!=null){let s=e-t.displayCount;for(;s-- >0;){const i=this._trackIdLessObservations.dequeue();i!=null&&this._removed.push(i)}}}}_purgeByAge(t){var r;const e=(r=this._timeInfo)==null?void 0:r.startTimeField;if(!t.age||!e)return;const s=60*t.age*1e3,i=this._maxAge-s;this.store.forEach(h=>{h.attributes[e]<i&&this._removed.push(h.objectId)})}_purgeByAgeReceived(t,e){if(!e.ageReceived)return;const s=t-60*e.ageReceived*1e3;this.store.forEach(i=>{i.attributes[a]<s&&this._removed.push(i.objectId)})}_purgeTracks(){this._trackIdToObservations.forEach((t,e)=>{t.size===0&&this._trackIdToObservations.delete(e)})}}export{p as o,n as t};
