var Ze=Object.defineProperty,$e=Object.defineProperties;var qe=Object.getOwnPropertyDescriptors;var be=Object.getOwnPropertySymbols;var Qe=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var pe=(e,t,r)=>t in e?Ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,X=(e,t)=>{for(var r in t||(t={}))Qe.call(t,r)&&pe(e,r,t[r]);if(be)for(var r of be(t))Ve.call(t,r)&&pe(e,r,t[r]);return e},re=(e,t)=>$e(e,qe(t));var Me=(e,t,r)=>(pe(e,typeof t!="symbol"?t+"":t,r),r),he=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var ne=(e,t,r)=>(he(e,t,"read from private field"),r?r.call(e):t.get(e)),ye=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},ze=(e,t,r,o)=>(he(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);var Ae=(e,t,r)=>(he(e,t,"access private method"),r);import{C as et,R as tt,a as rt,D as nt,F as ot,A as st,m as at,j as oe,c as ge,b,r as h,n as se,d as it,L as ct,E as lt,e as dt,f as ut,g as ft,h as pt}from"./vendor.8922c5b7.js";const ht=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};ht();const _e={theme:"outline",size:"20",fill:"#333"},we=[{type:"selection",Icon:et},{type:"rectangle",Icon:tt},{type:"circle",Icon:rt},{type:"diamond",Icon:nt},{type:"text",Icon:ot},{type:"arrow",Icon:st}],me="emodraw",Oe="Segoe UI Emoji",ae=15,yt="#fff",v={default:"default",crosshair:"crosshair",move:"move",grab:"grab",neswResize:"nesw-resize",nwseResize:"nwse-resize"},gt=30,Y=3,G=8,wt=[15,10],Ce=20,ie=30,mt="emodraw.png",Dt="emodraw",B=(e,t,r,o,n)=>{e.beginPath(),e.moveTo(t,r),e.lineTo(t+o,r),e.lineTo(t+o,r+n),e.lineTo(t,r+n),e.closePath(),e.stroke()},xt=(e,t,r,o,n)=>{e.save(),e.fillStyle="rgba(255,165,0,0.5)",e.fillRect(t,r,o,n),e.restore()},St=(e,t,r,o,n)=>{const s=o>n?1/o:1/n;e.beginPath(),e.moveTo(t+o,r);for(let a=0;a<Math.PI*2;a+=s)e.lineTo(t+o*Math.cos(a),r+n*Math.sin(a));e.closePath(),e.stroke()},Tt=(e,t,r,o,n)=>{e.beginPath(),e.moveTo(t+o/2,r+n),e.lineTo(t+o,r+n/2),e.lineTo(t+o/2,r),e.lineTo(t,r+n/2),e.closePath(),e.stroke()},Et=(e,t)=>Math.floor(180/(Math.PI/Math.atan(e/t))),Pe=30,Rt=(e,t,r,o,n)=>{const s=Math.min(Math.pow(o*o+n*n,1/2)/2,gt),a=n<0?-s:s,g=Et(o,n),u=g+Pe,w=g-Pe,m=t+o,T=r+n,R=m-a*Math.sin(Math.PI*u/180),x=T-a*Math.cos(Math.PI*u/180),M=m-a*Math.sin(Math.PI*w/180),I=T-a*Math.cos(Math.PI*w/180);e.beginPath(),e.moveTo(t,r),e.lineTo(m,T),e.lineTo(R,x),e.moveTo(m,T),e.lineTo(M,I),e.stroke()},vt=(e,t)=>{const{type:r,x:o,y:n,width:s,height:a}=t;switch(r){case"rectangle":B(e,o,n,s,a);return;case"circle":St(e,o+s/2,n+a/2,Math.abs(s/2),Math.abs(a/2));return;case"arrow":Rt(e,o,n,s,a);return;case"diamond":Tt(e,o,n,s,a);return;case"selection":xt(e,o,n,s,a);return}},Lt=(e,t)=>{const{content:r,x:o,y:n}=t;e.textBaseline="bottom",e.font=`${ae}px  ${Oe}`,Ye(r).forEach((s,a)=>{e.fillText(s,o,n+ae*(a+1))})},ke=(e,{x:t,y:r,width:o,height:n,type:s},a)=>{const g=o>0?Y:-Y,u=n>0?Y:-Y,w=t-g,m=t+o+g,T=r-u,R=r+n+u;if(e.setLineDash(wt),e.beginPath(),e.moveTo(w,T),e.lineTo(m,T),e.lineTo(m,R),e.lineTo(w,R),e.closePath(),e.stroke(),e.setLineDash([]),!a){const x=o>0?G:-G,M=n>0?G:-G;s!=="text"&&(B(e,w,T,-x,-M),B(e,m,R,x,M),s!=="arrow"&&(B(e,m,T,x,-M),B(e,w,R,-x,M)))}},It=e=>{const t=d.getSelectionData();if(!t)return;const[r,o,n,s]=t;ke(e,{x:r,y:n,width:o-r,height:s-n,type:"selection"},!1)},De=(e,t=d.data)=>{let r=!1;d.data.filter(n=>n.isSelected).length>1&&(It(e),r=!0),t.forEach(n=>{n.isSelected&&ke(e,n,r),n.type==="text"?Lt(e,n):vt(e,n)})};var H,ce,Mt;class bt{constructor(){ye(this,ce);Me(this,"data");ye(this,H,void 0);this.data=Ae(this,ce,Mt).call(this),ze(this,H,[])}addOperateStack(t){ne(this,H).push(t)}getSelectionData(){const t=this.data.filter(r=>r.isSelected);if(t.length===1&&t[0].type==="text")return null;if(t.length===1&&t[0].type==="arrow"){const r=t[0];return[r.x,r.x+r.width,r.y,r.y+r.height,!0]}return[...Te(t),!1]}addDrawData(t){this.data.push(t)}popDrawData(){this.data.pop()}revokeDrawData(){if(ne(this,H).length>0){const t=ne(this,H).pop();if(t.type==="DELETE"&&this.data.push(...t.payload),t.type==="ADD"&&(this.data=this.data.filter(r=>!t.selectedIds.includes(r.id))),t.type==="MOVE"){const{x:r,y:o}=t.payload;this.data.forEach(n=>n.isSelected=!1),this.data.filter(n=>t.selectedIds.includes(n.id)).forEach(n=>{n.x-=r,n.y-=o,n.isSelected=!0})}if(t.type==="RESIZE"){const r=t.payload,o=r.map(n=>n.id);this.data=this.data.filter(n=>!o.includes(n.id)).concat(r)}t.type==="SET"&&(this.data=t.payload),this.storageDrawData()}}storageDrawData(){this.data=this.data.filter(t=>t.type!=="selection").map(t=>{if(t.type==="arrow")return t;const r=X({},t);return r.width<0&&(r.x=r.x+r.width,r.width=-r.width),r.height<0&&(r.y=r.y+r.height,r.height=-r.height),r}),localStorage.setItem(me,JSON.stringify(this.data))}delete(){const t=[];this.data=this.data.filter(r=>r.isSelected?(t.push(re(X({},r),{isSelected:!1})),!1):!0),this.addOperateStack({type:"DELETE",payload:t}),this.storageDrawData()}}H=new WeakMap,ce=new WeakSet,Mt=function(){let t;try{t=JSON.parse(localStorage.getItem(me))||[]}catch{t=[],localStorage.setItem(me,"[]")}return t};var d=new bt;const zt=({x:e,y:t},r,o)=>{if(document.querySelector("textarea"))return;const s=document.createElement("textarea");Object.assign(s.style,{position:"absolute",margin:0,padding:0,border:0,outline:0,background:"transparent",resize:"none",top:t+"px",left:e+"px",fontSize:ae+"px",lineHeight:"1em",fontFamily:Oe,width:`${window.innerWidth-e}px`,whiteSpace:"nowrap",overflowX:"hidden"}),o&&(s.value=o,s.setSelectionRange(0,o.length)),s.onkeydown=a=>{a.stopPropagation()},s.oninput=()=>{s.style.height=s.scrollHeight+"px"},s.onblur=a=>{r(a.target.value),document.body.removeChild(s)},document.body.appendChild(s),setTimeout(()=>{s.focus()})},O=5,At=e=>e>O?e-O:0,J=e=>e+O<window.innerWidth?e+O:window.innerWidth,K=e=>e+O<window.innerWidth?e+O:window.innerWidth,N=(e,t,r)=>e>=At(t)&&e<=r,xe=(e,t,r,o)=>Math.pow(Math.pow(Math.abs(e-t),2)+Math.pow(Math.abs(r-o),2),1/2),Se=({x:e,y:t})=>{for(let r=0;r<d.data.length;r++){const o=d.data[r],n=o.x,s=o.x+o.width,a=o.y,g=o.y+o.height;if(o.isSelected){const u=o.width>0?s:n,w=o.width>0?n:s,m=o.height>0?g:a,T=o.height>0?a:g;if(e>=w&&e<=u&&t>=T&&t<=m)return o.id}if(o.type==="text"&&N(e,n,J(s))&&N(t,a,K(g))||o.type==="rectangle"&&((N(e,n,J(n))||N(e,s,J(s)))&&N(t,a,K(g))||(N(t,a,K(a))||N(t,g,K(g)))&&N(e,n,J(s))))return o.id;if(o.type==="diamond"){const u=o.width*o.height,w=Math.abs(e-(n+o.width/2)),m=Math.abs(t-(a+o.height/2)),T=((w+O)*o.height+(m+O)*o.width)*2,R=((w-O)*o.height+(m-O)*o.width)*2;if(T>=u&&R<=u)return o.id}if(o.type==="circle"){const u=n+o.width/2,w=a+o.height/2,m=Math.abs(o.width/2),T=Math.abs(o.height/2),R=m>T?1/m:1/T;for(let x=0;x<Math.PI*2;x+=R){const M=Math.round(u+m*Math.cos(x)),I=Math.round(w+T*Math.sin(x));if(N(e,M,J(M))&&N(t,I,K(I)))return o.id}}if(o.type==="arrow"){const u=Math.round(xe(n,s,a,g)),w=Math.round(xe(e,n,t,a)+xe(e,s,t,g));if(w>=u-O/2&&w<=u+O/2)return o.id}}return null},_t=(e,t,r,o)=>{const[n,s]=r>0?[e+r,e]:[e,e+r],[a,g]=o>0?[t+o,t]:[t,t+o];return d.data.filter(u=>{if(u.type==="selection")return!1;const[w,m]=u.width>0?[u.x+u.width,u.x]:[u.x,u.x+u.width],[T,R]=u.height>0?[u.y+u.height,u.y]:[u.y,u.y+u.height];return n>=w&&s<=m&&a>=T&&g<=R}).map(({id:u})=>u)},Ne=(e,t)=>{const r=d.getSelectionData();if(!r)return!1;const[o,n,s,a]=r;return e<=o&&e>=n&&t<=s&&t>=a},S=(e,t,r)=>r?e>=t+Y&&e<=t+G+Y:e<=t-Y&&e>=t-G-Y,Xe=({x:e,y:t})=>{const r=d.getSelectionData();if(!r)return null;const[o,n,s,a,g]=r;if(g){if(o>=n&&s>a){if(S(e,n,!1)&&S(t,a,!1))return[v.nwseResize,"top"];if(S(e,o,!0)&&S(t,s,!0))return[v.nwseResize,"bottom"]}else if(o>=n&&s<a){if(S(e,n,!1)&&S(t,a,!0))return[v.neswResize,"bottom"];if(S(e,o,!0)&&S(t,s,!1))return[v.neswResize,"top"]}else if(o<n&&s>a){if(S(e,n,!0)&&S(t,a,!1))return[v.neswResize,"top"];if(S(e,o,!1)&&S(t,s,!0))return[v.neswResize,"bottom"]}else{if(S(e,o,!1)&&S(t,s,!1))return[v.nwseResize,"top"];if(S(e,n,!0)&&S(t,a,!0))return[v.nwseResize,"bottom"]}return null}return S(e,n,!1)&&S(t,a,!1)?[v.nwseResize,"top"]:S(e,o,!0)&&S(t,s,!0)?[v.nwseResize,"bottom"]:S(e,n,!1)&&S(t,s,!0)?[v.neswResize,"bottom"]:S(e,o,!0)&&S(t,a,!1)?[v.neswResize,"top"]:null},Ot=({x:e,y:t})=>{const r=d.data.filter(o=>o.type==="text");for(let o=0;o<r.length;o++){const n=r[o];if(e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height)return n}return null},Te=e=>{let t=-1/0,r=-1/0,o=1/0,n=1/0;return e.forEach(s=>{const[a,g]=s.width>0?[s.x+s.width,s.x]:[s.x,s.x+s.width],[u,w]=s.height>0?[s.y+s.height,s.y]:[s.y,s.y+s.height];a>t&&(t=a),u>r&&(r=u),g<o&&(o=g),w<n&&(n=w)}),[t,o,r,n]},Ye=e=>e.replace(/\r\n?/g,`
`).split(`
`).filter(t=>!!t.trim()),Ct=e=>{const t="\uFEFF",r=new Blob([t+e],{type:"text/json"});return URL.createObjectURL(r)},Fe=(e,t)=>{const r=document.createElement("a");r.download=t,r.href=e,document.body.appendChild(r),r.click(),document.body.removeChild(r)};var C=at();const Pt="_container_1dwzc_1",kt="_element_1dwzc_10",Nt="_operate_1dwzc_14",Xt="_active_1dwzc_30";var F={container:Pt,element:kt,operate:Nt,"tool-item":"_tool-item_1dwzc_17",active:Xt,"tool-index":"_tool-index_1dwzc_33"};const Yt=({Icon:e,index:t,changeType:r,isActive:o})=>oe("div",{className:ge(F["tool-item"],{[F.active]:o}),onClick:r,children:[b("div",{children:e}),b("div",{className:F["tool-index"],children:t})]}),Ft=(e,t)=>{h.exports.useEffect(()=>{const r=()=>{!e.current||!t.current||(e.current.width=window.innerWidth,e.current.height=window.innerHeight,De(t.current))};return r(),window.addEventListener("resize",r),()=>document.removeEventListener("resize",r)},[])},We=e=>{h.exports.useEffect(()=>{const t=r=>{const{key:o,metaKey:n}=r;e(o,n)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[])},Ee=h.exports.createContext({}),Wt=({children:e})=>{const[t,r]=h.exports.useState("selection");return b(Ee.Provider,{value:{drawType:t,setDrawType:r},children:e})},Re=h.exports.createContext({}),Ht=({children:e})=>{const[t,r]=h.exports.useState(v.default);return b(Re.Provider,{value:{cursorType:t,setCursorType:r},children:e})},Gt=(e,t)=>{const{drawType:r,setDrawType:o}=h.exports.useContext(Ee),{cursorType:n,setCursorType:s}=h.exports.useContext(Re),a=h.exports.useRef(!1),g=h.exports.useRef(!1),u=h.exports.useRef(!1),w=h.exports.useRef(!1),m=h.exports.useRef(),T=h.exports.useRef(),R=h.exports.useRef(),x=h.exports.useRef({x:0,y:0}),M=h.exports.useRef({x:0,y:0}),I=h.exports.useRef({x:0,y:0}),le=h.exports.useRef([]),Z=h.exports.useRef([]),de=h.exports.useRef({x:0,y:0}),ue=h.exports.useRef(!1),A=()=>{e.current&&(e.current.clearRect(0,0,window.innerWidth,window.innerHeight),De(e.current))},U=()=>{d.data.forEach(c=>c.isSelected=!1)};h.exports.useEffect(()=>{const c=()=>{d.addOperateStack({type:"DELETE",payload:d.data}),d.data=[],d.storageDrawData(),A()},l=()=>{if(d.data.length===0)return;const p=document.createElement("canvas"),[y,D,E,L]=Te(d.data),P=y-D+ie,_=E-L+ie;p.width=P,p.height=_;const z=p.getContext("2d");z.save(),z.fillStyle=yt,z.fillRect(0,0,P,_),z.restore(),De(z,d.data.map(j=>re(X({},j),{x:j.x-D+ie/2,y:j.y-L+ie/2})));const W=p.toDataURL();Fe(W,mt)},i=()=>{if(d.data.length===0)return;const p=Ct(JSON.stringify(d.data));Fe(p,Dt)},f=()=>{const p=document.createElement("input");p.type="file",document.body.appendChild(p),p.click(),p.onchange=y=>{const E=y.target.files[0],L=new FileReader;L.onload=P=>{try{const _=JSON.parse(P.target.result);d.addOperateStack({type:"SET",payload:d.data}),d.data=_,d.storageDrawData(),A()}catch{}},L.readAsText(E),document.body.removeChild(p)}};return C.on("exportImage",l),C.on("exportData",i),C.on("clear",c),C.on("import",f),()=>{C.off("import",f),C.off("exportData",i),C.off("exportImage",l),C.off("clear",c)}},[]),h.exports.useEffect(()=>{const c=()=>{Z.current=d.data.filter(i=>i.isSelected)},l=()=>{if(Z.current.length>0&&!ue.current){const[i,f,p,y]=Te(Z.current),[D,E]=[(i+f)/2,(p+y)/2],[L,P]=[de.current.x-D,de.current.y-E];U();const _=[];Z.current.forEach(z=>{const W=se();d.addDrawData(re(X({},z),{id:W,x:z.x+L,y:z.y+P,isSelected:!0})),_.push(W)}),d.addOperateStack({type:"ADD",selectedIds:_}),d.storageDrawData(),A()}};return document.addEventListener("copy",c),document.addEventListener("paste",l),()=>{document.removeEventListener("copy",c),document.addEventListener("paste",l)}},[]);const He=(c,l,i)=>{c.type==="arrow"?T.current==="head"?(c.width+=l,c.height+=i):(c.x+=l,c.y+=i,c.width-=l,c.height-=i):n==="nesw-resize"?m.current==="top"?(c.y+=i,c.width+=l,c.height-=i):(c.height+=i,c.x+=l,c.width-=l):n==="nwse-resize"&&(m.current==="top"?(c.x+=l,c.y+=i,c.width-=l,c.height-=i):(c.width+=l,c.height+=i))},Ge=(c,l,i)=>{const{x:f,y:p}=M.current,y={x:0,y:0},D=l-f,E=i-p,L=d.getSelectionData(),P=L[0]-L[1],_=L[2]-L[3],z=m.current==="top",W=z&&n==="nesw-resize"||m.current==="bottom"&&n==="nwse-resize",j=m.current==="bottom"&&n==="nesw-resize"||z&&n==="nwse-resize";if(P<=Ce&&(D<=I.current.x&&W||D>=I.current.x&&j)||_<=Ce&&(E<=I.current.y&&m.current==="bottom"||E>=I.current.y&&z))return;let ee=0,te=0;const ve=Math.abs(D)>Math.abs(E);ee=ve?n==="nesw-resize"?-E:E:D,te=ve?E:n==="nesw-resize"?-D:D,y.x=L[W?1:0],y.y=L[z?2:3],c.forEach(k=>{const Le=Math.abs(k.x-y.x)/P,Je=Math.abs(k.x+k.width-y.x)/P,Ie=Math.abs(k.y-y.y)/_,Ke=Math.abs(k.y+k.height-y.y)/_;k.x+=(ee-I.current.x)*Le,k.y+=(te-I.current.y)*Ie,k.width+=(ee-I.current.x)*(Je-Le),k.height+=(te-I.current.y)*(Ke-Ie)}),I.current={x:ee,y:te}},Ue=(c,l,i)=>{c.length===1?He(c[0],l-x.current.x,i-x.current.y):Ge(c,l,i)},je=(c,l,i)=>{c.forEach(f=>{f.x+=l,f.y+=i})},fe=({x:c,y:l},i)=>{ue.current=!0,zt({x:c,y:l},f=>{if(ue.current=!1,f.trim()){const p=Ye(f);let y=0;p.forEach(E=>{if(e.current){const{width:L}=e.current.measureText(E);L>y&&(y=L)}});const D=se();d.addDrawData({type:"text",id:D,x:c,y:l,content:f,width:Math.floor(y),height:p.length*ae,isSelected:!1}),d.addOperateStack({type:"ADD",selectedIds:[D]}),d.storageDrawData(),A()}},i)},$=h.exports.useRef();$.current=(c,l)=>{if(r==="selection"){const i=Ot({x:c,y:l});U(),i?(d.data=d.data.filter(f=>f.id!==i.id),fe({x:i.x,y:i.y},i.content)):fe({x:c,y:l}),A()}},h.exports.useEffect(()=>{const c=({pageX:l,pageY:i})=>{var f;(f=$.current)==null||f.call($,l,i)};return document.addEventListener("dblclick",c),()=>document.removeEventListener("dblclick",c)},[]),h.exports.useEffect(()=>{s(r==="selection"?v.default:v.crosshair),r!=="selection"&&U()},[r]),We((c,l)=>{l&&c==="z"&&(d.revokeDrawData(),A()),l&&c==="a"&&(d.data.forEach(i=>i.isSelected=!0),d.data.length>1&&(w.current=!0),d.storageDrawData(),A()),c==="Backspace"&&(d.delete(),A())});const Be=()=>{R.current=void 0,u.current=!1,I.current={x:0,y:0},le.current=[]},q=h.exports.useRef();q.current=c=>{if(c.button===2)return;const{pageX:l,pageY:i}=c;if(x.current=M.current={x:l,y:i},r==="text")o("selection"),fe({x:l,y:i});else if(r==="selection"){if(a.current=!0,w.current&&Ne(l,i)){g.current=!0;return}const f=Xe({x:l,y:i});if(f){m.current=f[1],g.current=!0;const y=d.data.filter(D=>D.isSelected);if(le.current=y.map(D=>X({},D)),y.length===1&&y[0].type==="arrow"){const D=y[0];T.current=D.height<=0&&m.current==="top"||D.height>0&&m.current==="bottom"?"head":"foot"}return}const p=Se({x:l,y:i});U(),g.current=!1,p?(d.data.find(y=>y.id===p).isSelected=!0,g.current=!0,d.storageDrawData()):(d.addDrawData({type:r,id:se(),x:l,y:i,width:0,height:0,isSelected:!1}),A())}else a.current=!0,d.addDrawData({type:r,id:se(),x:l,y:i,width:0,height:0,isSelected:!1})};const Q=h.exports.useRef();Q.current=c=>{const{pageX:l,pageY:i}=c;if(de.current={x:l,y:i},!a.current){const y=Xe({x:l,y:i});if(y){s(y[0]);return}if(r==="selection"){const D=w.current?Ne(l,i):Se({x:l,y:i});s(D?v.move:v.default)}return}const f=l-x.current.x,p=i-x.current.y;if(r==="selection"&&g.current){const y=d.data.filter(E=>E.isSelected),D=["nesw-resize","nwse-resize"].includes(n);D?Ue(y,l,i):je(y,f,p),(l!==x.current.x||i!==x.current.y)&&(R.current=D?"resize":"move",x.current={x:l,y:i})}else{const y=d.data[d.data.length-1];if(y.type!=="text"&&(y.width=f,y.height=p),y.type==="selection"){u.current=!0;const D=_t(x.current.x,x.current.y,f,p);w.current=D.length>1,d.data.forEach(E=>{E.isSelected=D.includes(E.id)})}}A()};const V=h.exports.useRef();V.current=c=>{if(!a.current)return;a.current=!1;const{pageX:l,pageY:i}=c;if(l===x.current.x&&i===x.current.y)r!=="selection"&&d.popDrawData(),R.current?R.current==="move"?d.addOperateStack({type:"MOVE",selectedIds:d.data.filter(f=>f.isSelected).map(f=>f.id),payload:{x:l-M.current.x,y:i-M.current.y}}):d.addOperateStack({type:"RESIZE",payload:le.current}):w.current=!1;else{if(r!=="selection"){const f=d.data[d.data.length-1];f.isSelected=!0,d.addOperateStack({type:"ADD",selectedIds:[f.id]}),o("selection")}else d.popDrawData();A()}if(r==="selection"&&!R.current&&!u.current){U();const f=Se({x:l,y:i});f?d.data.find(p=>p.id===f).isSelected=!0:s(v.default),A()}Be(),d.storageDrawData()},h.exports.useEffect(()=>{const c=f=>{var p;(p=Q.current)==null||p.call(Q,f)},l=f=>{var p;(p=q.current)==null||p.call(q,f)},i=f=>{var p;(p=V.current)==null||p.call(V,f)};return document.addEventListener("mousedown",l),document.addEventListener("mousemove",c),document.addEventListener("mouseup",i),()=>{document.removeEventListener("mousedown",l),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",i)}},[])},Ut=()=>{const{drawType:e,setDrawType:t}=h.exports.useContext(Ee);We(g=>{const u=+g-1;!isNaN(u)&&u!==-1&&u<we.length&&t(we[u].type)});const r=(g,u)=>b("div",{className:F["tool-item"],onClick:u,children:b(g,X({},_e))}),o=()=>{C.emit("clear")},n=()=>{C.emit("import")},s=()=>{C.emit("exportData")},a=()=>{C.emit("exportImage")};return oe(it,{children:[b("div",{className:ge(F.container,F.element),children:we.map(({Icon:g,type:u},w)=>b(Yt,{isActive:u===e,Icon:b(g,X({},_e)),index:w+1,changeType:()=>t(u)},w))}),oe("div",{className:ge(F.container,F.operate),children:[r(ut,o),r(ct,n),r(lt,s),r(dt,a)]})]})};function jt(){const e=h.exports.useRef(null),t=h.exports.useRef(null),{cursorType:r}=h.exports.useContext(Re);return h.exports.useEffect(()=>{e.current&&(t.current=e.current.getContext("2d"))},[]),Gt(t),Ft(e,t),oe("div",{className:"App",style:{position:"relative",cursor:r},children:[b(Ut,{}),b("canvas",{ref:e,id:"canvas"})]})}ft.render(b(pt.StrictMode,{children:b(Wt,{children:b(Ht,{children:b(jt,{})})})}),document.getElementById("root"));
