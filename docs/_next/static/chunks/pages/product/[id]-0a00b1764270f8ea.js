(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[360],{8871:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product/[id]",function(){return r(8483)}])},8243:function(e,t,r){"use strict";var s=r(7294),a=r(5121);t.Z=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={q:"",limit:20},r={paging:{total:0,primary_results:0,offset:0,limit:0},results:[]};(e={params:t,...e}).params={...t,...e.params};let[n,l]=(0,s.useState)(!1),[i,o]=(0,s.useState)(e.params),[d,c]=(0,s.useState)(r),u=async()=>{l(!0);try{let{data:e}=await (0,a.Z)({method:"get",url:"https://api.mercadolibre.com/sites/MLB/search",params:i});return e.results=e.results.map(e=>({id:e.id,title:e.title,price:e.price,thumbnail:e.thumbnail,description:""})),c(e),e}catch(e){c(r)}finally{l(!1)}};return{busy:n,params:i,paramsUpdate:e=>{o(t=>({...t,...e}))},setParams:o,response:d,submit:u}}},8483:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return g}});var s=r(5893),a=r(9008),n=r.n(a),l=r(7294),i=r(5121),o=()=>{let[e,t]=(0,l.useState)(!1),[r,s]=(0,l.useState)(null);return{busy:e,response:r,load:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!e)return null;t(!0);try{let{data:r}=await (0,i.Z)({method:"get",url:"https://api.mercadolibre.com/items",params:{ids:e}});if(void 0!==r[0]&&!r[0].body.error){let e=r[0].body,a=[];return e.attributes.map(e=>{let t=e.values.map(e=>e.name).join(", ");a.push("<p>".concat(e.name,": ").concat(t,"</p>"))}),e={id:e.id,title:e.title,price:e.price,thumbnail:e.thumbnail,description:a.join("<br />")},s(e),t(!1),e}return null}catch(e){s(null)}finally{t(!1)}return null}}},d=r(1163),c=r(8243),u=r(9814),m=r(1205),p=r(5177),x=r(1486),h=r(1954);function g(){let e=(0,u.Z)(),t=(0,d.useRouter)(),r=o(),a=(0,l.useContext)(p.A),[i,g]=(0,l.useState)(null),b=(0,c.Z)({params:{q:"Autom\xf3veis",limit:6}});return(0,l.useEffect)(()=>{t.query.id&&(async()=>{let e=Array.isArray(t.query.id)?t.query.id[0]:t.query.id,s=await r.load(e);if(!s)return;g(a.itemFind(s));let n=s.title.split(" ").filter(()=>0==Math.round(1*Math.random())).join(" ");b.paramsUpdate({q:n})})()},[t]),(0,l.useEffect)(()=>{let e=setTimeout(()=>{b.submit()},1e3);return()=>{clearTimeout(e)}},[b.params]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n(),{children:(0,s.jsx)("title",{children:r.response?r.response.title:"Produto n\xe3o encontrado"})}),(0,s.jsxs)("main",{className:"container mx-auto",children:[!r.busy&&!r.response&&(0,s.jsx)("div",{children:"Produto n\xe3o encontrado"}),!r.busy&&r.response&&(0,s.jsxs)("div",{className:"grid grid-cols-12 gap-6",children:[(0,s.jsxs)("div",{className:"col-span-12 lg:col-span-6 flex flex-col",children:[(0,s.jsx)("div",{className:"border rounded-lg overflow-hidden grow",style:{width:"100%",minHeight:300,background:"url(".concat(r.response.thumbnail,") center center no-repeat"),backgroundSize:300}}),(0,s.jsx)("div",{className:"flex gap-3 mt-3 overflow-auto",children:[...Array(10)].map((e,t)=>{var a;return(0,s.jsx)("div",{className:"border rounded-lg overflow-hidden",style:{minWidth:150,maxWidth:150,height:150,background:"url(".concat(null===(a=r.response)||void 0===a?void 0:a.thumbnail,") center center no-repeat"),backgroundSize:120}},t)})})]}),(0,s.jsxs)("div",{className:"col-span-12 lg:col-span-6",children:[(0,s.jsx)("h1",{className:"font-bold text-3xl",children:r.response.title}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"flex gap-2",children:["fluent:star-24-filled","fluent:star-24-filled","fluent:star-24-filled","fluent:star-half-24-regular","fluent:star-24-regular"].map((e,t)=>(0,s.jsx)(h.JO,{className:"text-yellow-400 cursor-pointer",height:"30",icon:e},t))}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{dangerouslySetInnerHTML:{__html:r.response.description},className:"overflow-auto",style:{maxHeight:400}}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"font-bold text-2xl text-center py-3 text-green-600 bg-green-100",children:e.money(r.response.price)}),(0,s.jsx)("br",{}),i&&(0,s.jsxs)("div",{className:"flex gap-3",style:{maxWidth:400},children:[(0,s.jsx)(x.Z,{className:"border rounded",value:i.quantity,onInput:e=>{i.quantity=e,a.itemUpdate(i)}}),(0,s.jsx)("button",{type:"button",className:"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",onClick:async()=>{await a.itemRemove(i.product),g(null)},children:"Remover"})]}),!i&&(0,s.jsx)("div",{children:(0,s.jsx)("button",{type:"button",className:"w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",style:{maxWidth:400},onClick:()=>{r.response&&(a.itemAdd(r.response),g(a.itemFind(r.response)))},children:"Adicionar"})}),(0,s.jsx)("br",{}),(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsxs)("button",{type:"button",className:"flex items-center gap-2 py-1 px-3 rounded border border-green-600 text-green-600 hover:bg-green-500 hover:text-white transition duration-500",children:[(0,s.jsx)(h.JO,{icon:"mdi:heart"}),(0,s.jsx)("span",{children:"Lista de desejos"})]}),(0,s.jsxs)("button",{type:"button",className:"flex items-center gap-2 py-1 px-3 rounded border border-green-600 text-green-600 hover:bg-green-500 hover:text-white transition duration-500",children:[(0,s.jsx)(h.JO,{icon:"mdi:share-variant"}),(0,s.jsx)("span",{children:"Compartilhar"})]})]})]}),(0,s.jsxs)("div",{className:"col-span-12",children:[(0,s.jsx)("h2",{className:"font-bold text-3xl mb-3",children:"Relacionados"}),(0,s.jsxs)("div",{className:"flex gap-6 border-gray-200 overflow-auto",children:[b.busy&&[...Array(10)].map((e,t)=>(0,s.jsxs)("div",{className:"rounded-lg overflow-hidden border mx-auto lg:mx-0 flex flex-col",style:{minWidth:250,maxWidth:250},children:[(0,s.jsx)("div",{className:"bg-gray-200",style:{minHeight:200,maxHeight:200}}),(0,s.jsxs)("div",{className:"grow",children:[(0,s.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-2"}),(0,s.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-4"})]}),(0,s.jsx)("div",{className:"bg-gray-200 dark:bg-gray-700 mt-4",style:{minHeight:50,maxHeight:50}})]},t)),!b.busy&&b.response.results.map(e=>(0,s.jsx)("div",{style:{maxWidth:250},className:"mx-auto lg:mx-0",children:(0,s.jsx)(m.Z,{product:e})},e.id))]})]})]})]})]})}}},function(e){e.O(0,[448,774,888,179],function(){return e(e.s=8871)}),_N_E=e.O()}]);