var ne=Object.defineProperty;var B=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var C=(e,t,r)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Y=(e,t)=>{for(var r in t||(t={}))re.call(t,r)&&C(e,r,t[r]);if(B)for(var r of B(t))oe.call(t,r)&&C(e,r,t[r]);return e};var K=(e,t,r)=>(C(e,typeof t!="symbol"?t+"":t,r),r);import{C as se,R as ie,a as ae,D as ce,F as le,A as ue,j as U,c as de,b as x,r as p,n as k,d as fe,e as he}from"./vendor.779914d6.js";const pe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}};pe();const we={theme:"outline",size:"20",fill:"#333"},X=[{type:"selection",Icon:se},{type:"rectangle",Icon:ie},{type:"circle",Icon:ae},{type:"diamond",Icon:ce},{type:"text",Icon:le},{type:"arrow",Icon:ue}],me="_container_zx2b4_1",ge="_active_zx2b4_25";var A={container:me,"tool-item":"_tool-item_zx2b4_12",active:ge,"tool-index":"_tool-index_zx2b4_28"};const ye=({Icon:e,index:t,changeType:r,isActive:n})=>U("div",{className:de(A["tool-item"],{[A.active]:n}),onClick:r,children:[x("div",{className:A["tool-icon"],children:e}),x("div",{className:A["tool-index"],children:t})]}),F="emodraw",q="Segoe UI Emoji",O=15,S={default:"default",crosshair:"crosshair",move:"move",grab:"grab",neswResize:"nesw-resize",nwseResize:"nwse-resize"},De=30,z=3,I=8,Te=[15,10],_=(e,t,r,n,o)=>{e.beginPath(),e.moveTo(t,r),e.lineTo(t+n,r),e.lineTo(t+n,r+o),e.lineTo(t,r+o),e.closePath(),e.stroke()},Se=(e,t,r,n,o)=>{e.save(),e.fillStyle="rgba(255,165,0,0.5)",e.fillRect(t,r,n,o),e.restore()},Ee=(e,t,r,n,o)=>{const i=n>o?1/n:1/o;e.beginPath(),e.moveTo(t+n,r);for(let s=0;s<Math.PI*2;s+=i)e.lineTo(t+n*Math.cos(s),r+o*Math.sin(s));e.closePath(),e.stroke()},Re=(e,t,r,n,o)=>{e.beginPath(),e.moveTo(t+n/2,r+o),e.lineTo(t+n,r+o/2),e.lineTo(t+n/2,r),e.lineTo(t,r+o/2),e.closePath(),e.stroke()},ve=(e,t)=>Math.floor(180/(Math.PI/Math.atan(e/t))),J=30,xe=(e,t,r,n,o)=>{const i=Math.min(Math.pow(n*n+o*o,1/2)/2,De),s=o<0?-i:i,m=ve(n,o),a=m+J,u=m-J,f=t+n,l=r+o,T=f-s*Math.sin(Math.PI*a/180),h=l-s*Math.cos(Math.PI*a/180),E=f-s*Math.sin(Math.PI*u/180),g=l-s*Math.cos(Math.PI*u/180);e.beginPath(),e.moveTo(t,r),e.lineTo(f,l),e.lineTo(T,h),e.moveTo(f,l),e.lineTo(E,g),e.stroke()},Me=(e,t)=>{const{type:r,x:n,y:o,width:i,height:s}=t;switch(r){case"rectangle":_(e,n,o,i,s);return;case"circle":Ee(e,n+i/2,o+s/2,Math.abs(i/2),Math.abs(s/2));return;case"arrow":xe(e,n,o,i,s);return;case"diamond":Re(e,n,o,i,s);return;case"selection":Se(e,n,o,i,s);return}},be=(e,t)=>{const{content:r,x:n,y:o}=t;e.textBaseline="bottom",e.font=`${O}px  ${q}`,ee(r).forEach((i,s)=>{e.fillText(i,n,o+O*(s+1))})},$=(e,{x:t,y:r,width:n,height:o,type:i},s)=>{const m=n>0?z:-z,a=o>0?z:-z,u=t-m,f=t+n+m,l=r-a,T=r+o+a;if(e.setLineDash(Te),e.beginPath(),e.moveTo(u,l),e.lineTo(f,l),e.lineTo(f,T),e.lineTo(u,T),e.closePath(),e.stroke(),e.setLineDash([]),!s){const h=n>0?I:-I,E=o>0?I:-I;_(e,u,l,-h,-E),_(e,f,T,h,E),i!=="arrow"&&(_(e,f,l,h,-E),_(e,u,T,-h,E))}},ze=e=>{const[t,r,n,o]=d.getSelectionData();$(e,{x:t,y:n,width:r-t,height:o-n,type:"selection"},!1)},Z=e=>{let t=!1;d.data.filter(n=>n.isSelected).length>1&&(ze(e),t=!0),d.data.forEach(n=>{n.isSelected&&$(e,n,t),n.type==="text"?be(e,n):Me(e,n)})};class Ie{constructor(){K(this,"data");this.data=this._getStorageData()}_getStorageData(){let t;try{t=JSON.parse(localStorage.getItem(F))||[]}catch{t=[],localStorage.setItem(F,"[]")}return t}getSelectionData(){let t=-1/0,r=-1/0,n=1/0,o=1/0;const i=this.data.filter(s=>s.isSelected);if(i.length===1&&i[0].type==="arrow"){const s=i[0];return[s.x,s.x+s.width,s.y,s.y+s.height,!0]}return i.forEach(s=>{const[m,a]=s.width>0?[s.x+s.width,s.x]:[s.x,s.x+s.width],[u,f]=s.height>0?[s.y+s.height,s.y]:[s.y,s.y+s.height];m>t&&(t=m),u>r&&(r=u),a<n&&(n=a),f<o&&(o=f)}),[t,n,r,o,!1]}addDrawData(t){this.data.push(t)}revokeDrawData(){this.data.pop()}storageDrawData(){this.data=this.data.filter(t=>t.type!=="selection").map(t=>{if(t.type==="arrow")return t;const r=Y({},t);return r.width<0&&(r.x=r.x+r.width,r.width=-r.width),r.height<0&&(r.y=r.y+r.height,r.height=-r.height),r}),localStorage.setItem(F,JSON.stringify(this.data))}delete(){this.data=this.data.filter(t=>!t.isSelected),this.storageDrawData()}}var d=new Ie;const Le=({x:e,y:t},r)=>{if(document.querySelector("textarea"))return;const o=document.createElement("textarea");Object.assign(o.style,{position:"absolute",margin:0,padding:0,border:0,outline:0,background:"transparent",resize:"none",top:t+"px",left:e+"px",fontSize:O+"px",lineHeight:"1em",fontFamily:q}),o.onkeydown=i=>{i.stopPropagation()},o.oninput=()=>{o.style.height=o.scrollHeight+"px"},o.onblur=()=>{document.body.removeChild(o)},o.onchange=i=>{r(i.target.value)},document.body.appendChild(o),setTimeout(()=>{o.focus()})},M=5,Ae=e=>e>M?e-M:0,P=e=>e+M<window.innerWidth?e+M:window.innerWidth,N=e=>e+M<window.innerWidth?e+M:window.innerWidth,b=(e,t,r)=>e>=Ae(t)&&e<=r,W=(e,t,r,n)=>Math.pow(Math.pow(Math.abs(e-t),2)+Math.pow(Math.abs(r-n),2),1/2),H=({x:e,y:t})=>{for(let r=0;r<d.data.length;r++){const n=d.data[r],o=n.x,i=n.x+n.width,s=n.y,m=n.y+n.height;if(n.isSelected){const a=n.width>0?i:o,u=n.width>0?o:i,f=n.height>0?m:s,l=n.height>0?s:m;if(e>=u&&e<=a&&t>=l&&t<=f)return n.id}if(n.type==="text"&&b(e,o,P(i))&&b(t,s,N(m))||n.type==="rectangle"&&((b(e,o,P(o))||b(e,i,P(i)))&&b(t,s,N(m))||(b(t,s,N(s))||b(t,m,N(m)))&&b(e,o,P(i))))return n.id;if(n.type==="diamond"){const a=n.width*n.height,u=Math.abs(e-(o+n.width/2)),f=Math.abs(t-(s+n.height/2)),l=((u+M)*n.height+(f+M)*n.width)*2,T=((u-M)*n.height+(f-M)*n.width)*2;if(l>=a&&T<=a)return n.id}if(n.type==="circle"){const a=o+n.width/2,u=s+n.height/2,f=Math.abs(n.width/2),l=Math.abs(n.height/2),T=f>l?1/f:1/l;for(let h=0;h<Math.PI*2;h+=T){const E=Math.round(a+f*Math.cos(h)),g=Math.round(u+l*Math.sin(h));if(b(e,E,P(E))&&b(t,g,N(g)))return n.id}}if(n.type==="arrow"){const a=Math.round(W(o,i,s,m)),u=Math.round(W(e,o,t,s)+W(e,i,t,m));if(u>=a-M/2&&u<=a+M/2)return n.id}}return null},_e=(e,t,r,n)=>{const[o,i]=r>0?[e+r,e]:[e,e+r],[s,m]=n>0?[t+n,t]:[t,t+n];return d.data.filter(a=>{if(a.type==="selection")return!1;const[u,f]=a.width>0?[a.x+a.width,a.x]:[a.x,a.x+a.width],[l,T]=a.height>0?[a.y+a.height,a.y]:[a.y,a.y+a.height];return o>=u&&i<=f&&s>=l&&m<=T}).map(({id:a})=>a)},Q=(e,t)=>{const[r,n,o,i]=d.getSelectionData();return e<=r&&e>=n&&t<=o&&t>=i},w=(e,t,r)=>r?e>=t+z&&e<=t+I+z:e<=t-z&&e>=t-I-z,V=({x:e,y:t})=>{const[r,n,o,i,s]=d.getSelectionData();if(s){if(r>n&&o>i){if(w(e,n,!1)&&w(t,i,!1))return[S.nwseResize,"top"];if(w(e,r,!0)&&w(t,o,!0))return[S.nwseResize,"bottom"]}else if(r>n&&o<i){if(w(e,n,!1)&&w(t,i,!0))return[S.neswResize,"bottom"];if(w(e,r,!0)&&w(t,o,!1))return[S.neswResize,"top"]}else if(r<n&&o>i){if(w(e,n,!0)&&w(t,i,!1))return[S.neswResize,"top"];if(w(e,r,!1)&&w(t,o,!0))return[S.neswResize,"bottom"]}else{if(w(e,r,!1)&&w(t,o,!1))return[S.nwseResize,"top"];if(w(e,n,!0)&&w(t,i,!0))return[S.nwseResize,"bottom"]}return null}return w(e,n,!1)&&w(t,i,!1)?[S.nwseResize,"top"]:w(e,r,!0)&&w(t,o,!0)?[S.nwseResize,"bottom"]:w(e,n,!1)&&w(t,o,!0)?[S.neswResize,"bottom"]:w(e,r,!0)&&w(t,i,!1)?[S.neswResize,"top"]:null},ee=e=>e.replace(/\r\n?/g,`
`).split(`
`),Pe=(e,t)=>{p.exports.useEffect(()=>{const r=()=>{!e.current||!t.current||(e.current.width=window.innerWidth,e.current.height=window.innerHeight,Z(t.current))};return r(),window.addEventListener("resize",r),()=>document.removeEventListener("resize",r)},[])},te=e=>{p.exports.useEffect(()=>{const t=r=>{const{key:n,metaKey:o}=r;e(n,o)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[])},G=p.exports.createContext({}),Ne=({children:e})=>{const[t,r]=p.exports.useState("selection");return x(G.Provider,{value:{drawType:t,setDrawType:r},children:e})},j=p.exports.createContext({}),Oe=({children:e})=>{const[t,r]=p.exports.useState(S.default);return x(j.Provider,{value:{cursorType:t,setCursorType:r},children:e})},Ce=e=>{const{drawType:t,setDrawType:r}=p.exports.useContext(G),{cursorType:n,setCursorType:o}=p.exports.useContext(j),i=p.exports.useRef(!1),s=p.exports.useRef(!1),m=p.exports.useRef(!1),a=p.exports.useRef(!1),u=p.exports.useRef(),f=p.exports.useRef(!1),l=p.exports.useRef({x:0,y:0}),T=()=>{e.current&&(e.current.clearRect(0,0,window.innerWidth,window.innerHeight),Z(e.current))};p.exports.useEffect(()=>{o(t==="selection"?S.default:S.crosshair),t!=="selection"&&d.data.forEach(h=>h.isSelected=!1)},[t]),te((h,E)=>{E&&h==="z"&&(d.revokeDrawData(),d.storageDrawData(),T()),h==="Backspace"&&(d.delete(),T())}),p.exports.useEffect(()=>{const h=E=>{const{offsetX:g,offsetY:R}=E;if(l.current={x:g,y:R},t==="text")r("selection"),Le(l.current,y=>{if(y.trim()){const D=ee(y);let v=0;D.forEach(c=>{if(e.current){const{width:L}=e.current.measureText(c);L>v&&(v=L)}}),d.addDrawData({type:t,id:k(),x:g,y:R,content:y,width:Math.floor(v),height:D.length*O,isSelected:!1}),d.storageDrawData(),T()}});else if(t==="selection"){if(i.current=!0,a.current&&Q(g,R)){s.current=!0;return}const y=V({x:g,y:R});if(y){u.current=y[1],s.current=!0;return}const D=H({x:g,y:R});d.data.forEach(v=>v.isSelected=!1),s.current=!1,D?(d.data.find(v=>v.id===D).isSelected=!0,s.current=!0,d.storageDrawData()):(d.addDrawData({type:t,id:k(),x:g,y:R,width:0,height:0,isSelected:!1}),T())}else i.current=!0,d.addDrawData({type:t,id:k(),x:g,y:R,width:0,height:0,isSelected:!1})};return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[t]),p.exports.useEffect(()=>{const h=E=>{const{offsetX:g,offsetY:R}=E;if(!i.current){const v=V({x:g,y:R});if(v){o(v[0]);return}if(t==="selection"){const c=a.current?Q(g,R):H({x:g,y:R});o(c?S.move:S.default)}return}const y=g-l.current.x,D=R-l.current.y;if(t==="selection"&&s.current)d.data.filter(c=>c.isSelected).forEach(c=>{c.type==="arrow"&&["nesw-resize","nwse-resize"].includes(n)?n==="nesw-resize"&&(c.width>0&&u.current==="top"||c.width<0&&u.current==="bottom")||n==="nwse-resize"&&(c.width<0&&u.current==="top"||c.width>0&&u.current==="bottom")?(c.width+=y,c.height+=D):(c.x+=y,c.y+=D,c.width-=y,c.height-=D):n==="nesw-resize"||n==="nwse-resize"?u.current==="top"?(c.x+=y,c.y+=D,c.width-=y,c.height-=D):(c.width+=y,c.height+=D):(c.x+=y,c.y+=D)}),(g!==l.current.x||R!==l.current.y)&&(f.current=!0,l.current={x:g,y:R});else{const v=d.data[d.data.length-1];if(v.type!=="text"&&(v.width=y,v.height=D),v.type==="selection"){m.current=!0;const c=_e(l.current.x,l.current.y,y,D);a.current=c.length>1,d.data.forEach(L=>{L.isSelected=c.includes(L.id)})}}T()};return document.addEventListener("mousemove",h),()=>document.removeEventListener("mousemove",h)},[t,n]),p.exports.useEffect(()=>{const h=E=>{if(!i.current)return;i.current=!1;const{offsetX:g,offsetY:R}=E;if(g===l.current.x&&R===l.current.y?(t!=="selection"&&d.revokeDrawData(),f.current||(a.current=!1)):(t!=="selection"?(d.data[d.data.length-1].isSelected=!0,r("selection")):d.revokeDrawData(),T()),t==="selection"&&!f.current&&!m.current){d.data.forEach(D=>D.isSelected=!1);const y=H({x:g,y:R});y?d.data.find(D=>D.id===y).isSelected=!0:o(S.default),T()}f.current=!1,m.current=!1,d.storageDrawData()};return document.addEventListener("mouseup",h),()=>document.removeEventListener("mouseup",h)},[t])},Ye=()=>{const{drawType:e,setDrawType:t}=p.exports.useContext(G);return te(r=>{const n=+r-1;!isNaN(n)&&n<X.length&&t(X[n].type)}),x("div",{className:A.container,children:X.map(({Icon:r,type:n},o)=>x(ye,{isActive:n===e,Icon:x(r,Y({},we)),index:o+1,changeType:()=>t(n)},o))})};function ke(){const e=p.exports.useRef(null),t=p.exports.useRef(null),{cursorType:r}=p.exports.useContext(j);return p.exports.useEffect(()=>{e.current&&(t.current=e.current.getContext("2d"))},[]),Ce(t),Pe(e,t),U("div",{className:"App",style:{position:"relative",cursor:r},children:[x(Ye,{}),x("canvas",{ref:e,id:"canvas"})]})}fe.render(x(he.StrictMode,{children:x(Ne,{children:x(Oe,{children:x(ke,{})})})}),document.getElementById("root"));
