(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(7229)}])},8243:function(e,t,s){"use strict";var r=s(7294),i=s(5121);t.Z=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={q:"",limit:20},s={paging:{total:0,primary_results:0,offset:0,limit:0},results:[]};(e={params:t,...e}).params={...t,...e.params};let[a,l]=(0,r.useState)(!1),[n,u]=(0,r.useState)(e.params),[d,m]=(0,r.useState)(s),c=async()=>{l(!0);try{let{data:e}=await (0,i.Z)({method:"get",url:"https://api.mercadolibre.com/sites/MLB/search",params:n});return e.results=e.results.map(e=>({id:e.id,title:e.title,price:e.price,thumbnail:e.thumbnail,description:""})),m(e),e}catch(e){m(s)}finally{l(!1)}};return{busy:a,params:n,paramsUpdate:e=>{u(t=>({...t,...e}))},setParams:u,response:d,submit:c}}},7229:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return o}});var r=s(5893),i=s(9008),a=s.n(i),l=s(1664),n=s.n(l),u=s(7294),d=s(8243),m=s(1205),c=s(1954);function o(){let e=[{title:"Computadores",href:"/product?q=Computadores",request:(0,d.Z)({params:{limit:10,q:"Computadores"}})},{title:"Brinquedos",href:"/product?q=Brinquedos",request:(0,d.Z)({params:{limit:10,q:"Brinquedos"}})},{title:"Im\xf3veis",href:"/product?q=Im\xf3veis",request:(0,d.Z)({params:{limit:10,q:"Im\xf3veis"}})},{title:"Ve\xedculos",href:"/product?q=Ve\xedculos",request:(0,d.Z)({params:{limit:10,q:"Ve\xedculos"}})}];return(0,u.useEffect)(()=>{let t=setTimeout(()=>{e.map(e=>{e.request.submit()})},1e3);return()=>clearTimeout(t)},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"Home"})}),(0,r.jsx)("main",{children:(0,r.jsx)("div",{className:"container mx-auto",children:(0,r.jsx)("div",{className:"flex flex-col gap-10",children:e.map((e,t)=>(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("div",{className:"text-gray-600 text-3xl font-bold uppercase mb-2",children:e.title}),(0,r.jsxs)("div",{className:"flex gap-3 overflow-auto mb-2",children:[e.request.busy&&[...Array(10)].map((e,t)=>(0,r.jsxs)("div",{className:"rounded-lg overflow-hidden border",style:{minWidth:200,maxWidth:200,height:200},children:[(0,r.jsx)(c.JO,{icon:"material-symbols:image-rounded",className:"mx-auto text-gray-200",height:"80"}),(0,r.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-2"}),(0,r.jsx)("div",{className:"h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-4"}),(0,r.jsx)("div",{className:"h-20 bg-gray-200 dark:bg-gray-700 mt-4"})]},t)),!e.request.busy&&e.request.response.results.map(e=>(0,r.jsx)("div",{style:{minWidth:200,maxWidth:200},children:(0,r.jsx)(m.Z,{product:e,height:"200px"})},e.id))]}),(0,r.jsx)("div",{className:"flex justify-end",children:(0,r.jsxs)(n(),{href:e.href,style:{minWidth:120},className:"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1",children:[(0,r.jsx)("span",{children:"Ver mais"}),(0,r.jsx)(c.JO,{icon:"ic:baseline-keyboard-double-arrow-right",height:"20"})]})})]},t))})})})]})}}},function(e){e.O(0,[448,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);