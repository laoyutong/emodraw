var te=Object.defineProperty;var j=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var O=(e,t,o)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,C=(e,t)=>{for(var o in t||(t={}))ne.call(t,o)&&O(e,o,t[o]);if(j)for(var o of j(t))oe.call(t,o)&&O(e,o,t[o]);return e};var B=(e,t,o)=>(O(e,typeof t!="symbol"?t+"":t,o),o);import{C as re,R as se,a as ie,D as ce,F as ae,A as le,j as K,c as ue,b as v,r as p,n as Y,d as de,e as he}from"./vendor.779914d6.js";const fe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}};fe();const pe={theme:"outline",size:"20",fill:"#333"},k=[{type:"selection",Icon:re},{type:"rectangle",Icon:se},{type:"circle",Icon:ie},{type:"diamond",Icon:ce},{type:"text",Icon:ae},{type:"arrow",Icon:le}],ge="_container_zx2b4_1",me="_active_zx2b4_25";var A={container:ge,"tool-item":"_tool-item_zx2b4_12",active:me,"tool-index":"_tool-index_zx2b4_28"};const we=({Icon:e,index:t,changeType:o,isActive:n})=>K("div",{className:ue(A["tool-item"],{[A.active]:n}),onClick:o,children:[v("div",{className:A["tool-icon"],children:e}),v("div",{className:A["tool-index"],children:t})]}),X="emodraw",U="Segoe UI Emoji",N=15,R={default:"default",crosshair:"crosshair",move:"move",grab:"grab",neswResize:"nesw-resize",nwseResize:"nwse-resize"},ye=30,y=3,M=8,De=[15,10],_=(e,t,o,n,r)=>{e.beginPath(),e.moveTo(t,o),e.lineTo(t+n,o),e.lineTo(t+n,o+r),e.lineTo(t,o+r),e.closePath(),e.stroke()},Te=(e,t,o,n,r)=>{e.save(),e.fillStyle="rgba(255,165,0,0.5)",e.fillRect(t,o,n,r),e.restore()},Se=(e,t,o,n,r)=>{const s=n>r?1/n:1/r;e.beginPath(),e.moveTo(t+n,o);for(let i=0;i<Math.PI*2;i+=s)e.lineTo(t+n*Math.cos(i),o+r*Math.sin(i));e.closePath(),e.stroke()},Ee=(e,t,o,n,r)=>{e.beginPath(),e.moveTo(t+n/2,o+r),e.lineTo(t+n,o+r/2),e.lineTo(t+n/2,o),e.lineTo(t,o+r/2),e.closePath(),e.stroke()},ve=(e,t)=>Math.floor(180/(Math.PI/Math.atan(e/t))),q=30,xe=(e,t,o,n,r)=>{const s=Math.min(Math.pow(n*n+r*r,1/2)/2,ye),i=r<0?-s:s,g=ve(n,r),c=g+q,d=g-q,h=t+n,l=o+r,w=h-i*Math.sin(Math.PI*c/180),f=l-i*Math.cos(Math.PI*c/180),x=h-i*Math.sin(Math.PI*d/180),m=l-i*Math.cos(Math.PI*d/180);e.beginPath(),e.moveTo(t,o),e.lineTo(h,l),e.lineTo(w,f),e.moveTo(h,l),e.lineTo(x,m),e.stroke()},Me=(e,t)=>{const{type:o,x:n,y:r,width:s,height:i}=t;switch(o){case"rectangle":_(e,n,r,s,i);return;case"circle":Se(e,n+s/2,r+i/2,Math.abs(s/2),Math.abs(i/2));return;case"arrow":xe(e,n,r,s,i);return;case"diamond":Ee(e,n,r,s,i);return;case"selection":Te(e,n,r,s,i);return}},Ie=(e,t)=>{const{content:o,x:n,y:r}=t;e.textBaseline="bottom",e.font=`${N}px  ${U}`,V(o).forEach((s,i)=>{e.fillText(s,n,r+N*(i+1))})},J=(e,{x:t,y:o,width:n,height:r},s)=>{const i=n>0?y:-y,g=r>0?y:-y,c=t-i,d=t+n+i,h=o-g,l=o+r+g;if(e.setLineDash(De),e.beginPath(),e.moveTo(c,h),e.lineTo(d,h),e.lineTo(d,l),e.lineTo(c,l),e.closePath(),e.stroke(),e.setLineDash([]),!s){const w=n>0?M:-M,f=r>0?M:-M;_(e,c,h,-w,-f),_(e,d,h,w,-f),_(e,d,l,w,f),_(e,c,l,-w,f)}},Re=e=>{const[t,o,n,r]=u.getSelectionData();J(e,{x:t,y:n,width:o-t,height:r-n},!1)},$=e=>{let t=!1;u.data.filter(n=>n.isSelected).length>1&&(Re(e),t=!0),u.data.forEach(n=>{n.isSelected&&J(e,n,t),n.type==="text"?Ie(e,n):Me(e,n)})};class be{constructor(){B(this,"data");this.data=this._getStorageData()}_getStorageData(){let t;try{t=JSON.parse(localStorage.getItem(X))||[]}catch{t=[],localStorage.setItem(X,"[]")}return t}getSelectionData(){let t=-1/0,o=-1/0,n=1/0,r=1/0;return this.data.filter(s=>s.isSelected).forEach(s=>{const[i,g]=s.width>0?[s.x+s.width,s.x]:[s.x,s.x+s.width],[c,d]=s.height>0?[s.y+s.height,s.y]:[s.y,s.y+s.height];i>t&&(t=i),c>o&&(o=c),g<n&&(n=g),d<r&&(r=d)}),[t,n,o,r]}addDrawData(t){this.data.push(t)}revokeDrawData(){this.data.pop()}storageDrawData(){this.data=this.data.filter(t=>t.type!=="selection").map(t=>{const o=C({},t);return o.width<0&&(o.x=o.x+o.width,o.width=-o.width),o.height<0&&(o.y=o.y+o.height,o.height=-o.height),o}),localStorage.setItem(X,JSON.stringify(this.data))}delete(){this.data=this.data.filter(t=>!t.isSelected),this.storageDrawData()}}var u=new be;const Le=({x:e,y:t},o)=>{if(document.querySelector("textarea"))return;const r=document.createElement("textarea");Object.assign(r.style,{position:"absolute",margin:0,padding:0,border:0,outline:0,background:"transparent",resize:"none",top:t+"px",left:e+"px",fontSize:N+"px",lineHeight:"1em",fontFamily:U}),r.onkeydown=s=>{s.stopPropagation()},r.oninput=()=>{r.style.height=r.scrollHeight+"px"},r.onblur=()=>{document.body.removeChild(r)},r.onchange=s=>{o(s.target.value)},document.body.appendChild(r),setTimeout(()=>{r.focus()})},I=5,Ae=e=>e>I?e-I:0,P=e=>e+I<window.innerWidth?e+I:window.innerWidth,z=e=>e+I<window.innerWidth?e+I:window.innerWidth,b=(e,t,o)=>e>=Ae(t)&&e<=o,F=(e,t,o,n)=>Math.pow(Math.pow(Math.abs(e-t),2)+Math.pow(Math.abs(o-n),2),1/2),W=({x:e,y:t})=>{for(let o=0;o<u.data.length;o++){const n=u.data[o],r=n.x,s=n.x+n.width,i=n.y,g=n.y+n.height;if(n.isSelected){const c=n.width>0?s:r,d=n.width>0?r:s,h=n.height>0?g:i,l=n.height>0?i:g;if(e>=d&&e<=c&&t>=l&&t<=h)return n.id}if(n.type==="text"&&b(e,r,P(s))&&b(t,i,z(g))||n.type==="rectangle"&&((b(e,r,P(r))||b(e,s,P(s)))&&b(t,i,z(g))||(b(t,i,z(i))||b(t,g,z(g)))&&b(e,r,P(s))))return n.id;if(n.type==="diamond"){const c=n.width*n.height,d=Math.abs(e-(r+n.width/2)),h=Math.abs(t-(i+n.height/2)),l=((d+I)*n.height+(h+I)*n.width)*2,w=((d-I)*n.height+(h-I)*n.width)*2;if(l>=c&&w<=c)return n.id}if(n.type==="circle"){const c=r+n.width/2,d=i+n.height/2,h=Math.abs(n.width/2),l=Math.abs(n.height/2),w=h>l?1/h:1/l;for(let f=0;f<Math.PI*2;f+=w){const x=Math.round(c+h*Math.cos(f)),m=Math.round(d+l*Math.sin(f));if(b(e,x,P(x))&&b(t,m,z(m)))return n.id}}if(n.type==="arrow"){const c=Math.round(F(r,s,i,g)),d=Math.round(F(e,r,t,i)+F(e,s,t,g));if(d>=c-I/2&&d<=c+I/2)return n.id}}return null},_e=(e,t,o,n)=>{const[r,s]=o>0?[e+o,e]:[e,e+o],[i,g]=n>0?[t+n,t]:[t,t+n];return u.data.filter(c=>{if(c.type==="selection")return!1;const[d,h]=c.width>0?[c.x+c.width,c.x]:[c.x,c.x+c.width],[l,w]=c.height>0?[c.y+c.height,c.y]:[c.y,c.y+c.height];return r>=d&&s<=h&&i>=l&&g<=w}).map(({id:c})=>c)},Z=(e,t)=>{const[o,n,r,s]=u.getSelectionData();return e<=o&&e>=n&&t<=r&&t>=s},Q=({x:e,y:t})=>{const[o,n,r,s]=u.getSelectionData();return e<=n-y&&e>=n-M-y&&t<=s-y&&t>=s-M-y?[R.nwseResize,"top"]:e>=o+y&&e<=o+M+y&&t>=r+y&&t<=r+M+y?[R.nwseResize,"bottom"]:e<=n-y&&e>=n-M-y&&t>=r+y&&t<=r+M+y?[R.neswResize,"bottom"]:e>=o+y&&e<=o+M+y&&t<=s-y&&t>=s-M-y?[R.neswResize,"top"]:null},V=e=>e.replace(/\r\n?/g,`
`).split(`
`),Pe=(e,t)=>{p.exports.useEffect(()=>{const o=()=>{!e.current||!t.current||(e.current.width=window.innerWidth,e.current.height=window.innerHeight,$(t.current))};return o(),window.addEventListener("resize",o),()=>document.removeEventListener("resize",o)},[])},ee=e=>{p.exports.useEffect(()=>{const t=o=>{const{key:n,metaKey:r}=o;e(n,r)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[])},H=p.exports.createContext({}),ze=({children:e})=>{const[t,o]=p.exports.useState("selection");return v(H.Provider,{value:{drawType:t,setDrawType:o},children:e})},G=p.exports.createContext({}),Ne=({children:e})=>{const[t,o]=p.exports.useState(R.default);return v(G.Provider,{value:{cursorType:t,setCursorType:o},children:e})},Oe=e=>{const{drawType:t,setDrawType:o}=p.exports.useContext(H),{cursorType:n,setCursorType:r}=p.exports.useContext(G),s=p.exports.useRef(!1),i=p.exports.useRef(!1),g=p.exports.useRef(!1),c=p.exports.useRef(!1),d=p.exports.useRef(),h=p.exports.useRef(!1),l=p.exports.useRef({x:0,y:0}),w=()=>{e.current&&(e.current.clearRect(0,0,window.innerWidth,window.innerHeight),$(e.current))};p.exports.useEffect(()=>{r(t==="selection"?R.default:R.crosshair),t!=="selection"&&u.data.forEach(f=>f.isSelected=!1)},[t]),ee((f,x)=>{x&&f==="z"&&(u.revokeDrawData(),u.storageDrawData(),w()),f==="Backspace"&&(u.delete(),w())}),p.exports.useEffect(()=>{const f=x=>{const{offsetX:m,offsetY:E}=x;if(l.current={x:m,y:E},t==="text")o("selection"),Le(l.current,D=>{if(D.trim()){const T=V(D);let S=0;T.forEach(a=>{if(e.current){const{width:L}=e.current.measureText(a);L>S&&(S=L)}}),u.addDrawData({type:t,id:Y(),x:m,y:E,content:D,width:Math.floor(S),height:T.length*N,isSelected:!1}),u.storageDrawData(),w()}});else if(t==="selection"){if(s.current=!0,c.current&&Z(m,E)){i.current=!0;return}const D=Q({x:m,y:E});if(D){d.current=D[1],i.current=!0;return}const T=W({x:m,y:E});u.data.forEach(S=>S.isSelected=!1),i.current=!1,T?(u.data.find(S=>S.id===T).isSelected=!0,i.current=!0,u.storageDrawData()):(u.addDrawData({type:t,id:Y(),x:m,y:E,width:0,height:0,isSelected:!1}),w())}else s.current=!0,u.addDrawData({type:t,id:Y(),x:m,y:E,width:0,height:0,isSelected:!1})};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[t]),p.exports.useEffect(()=>{const f=x=>{const{offsetX:m,offsetY:E}=x;if(!s.current){const S=Q({x:m,y:E});if(S){r(S[0]);return}if(t==="selection"){const a=c.current?Z(m,E):W({x:m,y:E});r(a?R.move:R.default)}return}const D=m-l.current.x,T=E-l.current.y;if(t==="selection"&&i.current){const S=u.data.filter(a=>a.isSelected);n==="nesw-resize"?S.forEach(a=>{d.current==="top"?(a.y=a.y+T,a.width=a.width+D,a.height=a.height-T):(a.height=a.height+T,a.x=a.x+D,a.width=a.width-D)}):n==="nwse-resize"?S.forEach(a=>{d.current==="top"?(a.x=a.x+D,a.y=a.y+T,a.width=a.width-D,a.height=a.height-T):(a.width=a.width+D,a.height=a.height+T)}):S.forEach(a=>{a.x=a.x+D,a.y=a.y+T}),(m!==l.current.x||E!==l.current.y)&&(h.current=!0,l.current={x:m,y:E})}else{const S=u.data[u.data.length-1];if(S.type!=="text"&&(S.width=D,S.height=T),S.type==="selection"){g.current=!0;const a=_e(l.current.x,l.current.y,D,T);c.current=a.length>1,u.data.forEach(L=>{L.isSelected=a.includes(L.id)})}}w()};return document.addEventListener("mousemove",f),()=>document.removeEventListener("mousemove",f)},[t,n]),p.exports.useEffect(()=>{const f=x=>{if(!s.current)return;s.current=!1;const{offsetX:m,offsetY:E}=x;if(m===l.current.x&&E===l.current.y?(t!=="selection"&&u.revokeDrawData(),h.current||(c.current=!1)):(t!=="selection"?(u.data[u.data.length-1].isSelected=!0,o("selection")):u.revokeDrawData(),w()),t==="selection"&&!h.current&&!g.current){u.data.forEach(T=>T.isSelected=!1);const D=W({x:m,y:E});D?u.data.find(T=>T.id===D).isSelected=!0:r(R.default),w()}h.current=!1,g.current=!1,u.storageDrawData()};return document.addEventListener("mouseup",f),()=>document.removeEventListener("mouseup",f)},[t])},Ce=()=>{const{drawType:e,setDrawType:t}=p.exports.useContext(H);return ee(o=>{const n=+o-1;!isNaN(n)&&n<k.length&&t(k[n].type)}),v("div",{className:A.container,children:k.map(({Icon:o,type:n},r)=>v(we,{isActive:n===e,Icon:v(o,C({},pe)),index:r+1,changeType:()=>t(n)},r))})};function Ye(){const e=p.exports.useRef(null),t=p.exports.useRef(null),{cursorType:o}=p.exports.useContext(G);return p.exports.useEffect(()=>{e.current&&(t.current=e.current.getContext("2d"))},[]),Oe(t),Pe(e,t),K("div",{className:"App",style:{position:"relative",cursor:o},children:[v(Ce,{}),v("canvas",{ref:e,id:"canvas"})]})}de.render(v(he.StrictMode,{children:v(ze,{children:v(Ne,{children:v(Ye,{})})})}),document.getElementById("root"));