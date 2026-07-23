import{c as i,j as e,X as l}from"./index-BLQ7Esys.js";import{b as y}from"./vendor-C0wX1Slo.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=i("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=i("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),d="_overlay_tp7to_1",m="_closeBtn_tp7to_14",x="_content_tp7to_36",p="_image_tp7to_45",u="_caption_tp7to_53",t={overlay:d,closeBtn:m,content:x,image:p,caption:u},g=({isOpen:n,image:a,title:s,onClose:o})=>(y.useEffect(()=>{const c=r=>{r.key==="Escape"&&o()};return n&&(document.body.style.overflow="hidden",window.addEventListener("keydown",c)),()=>{document.body.style.overflow="unset",window.removeEventListener("keydown",c)}},[n,o]),!n||!a?null:e.jsxs("div",{className:t.overlay,onClick:o,role:"dialog","aria-modal":"true",children:[e.jsx("button",{className:t.closeBtn,onClick:o,"aria-label":"Close Lightbox",children:e.jsx(l,{size:24})}),e.jsxs("div",{className:t.content,onClick:c=>c.stopPropagation(),children:[e.jsx("img",{src:a,alt:s||"LARA Smiles Gallery",className:t.image}),s&&e.jsx("div",{className:t.caption,children:e.jsx("span",{children:s})})]})]})),j="/assets/clinic-3-5BaFxHHR.jpg";export{h as C,g as L,k as Z,j as c};
