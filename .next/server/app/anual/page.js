(()=>{var e={};e.id=762,e.ids=[762],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},81257:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>o.a,__next_app__:()=>l,pages:()=>c,routeModule:()=>u,tree:()=>p});var r=t(70260),s=t(28203),n=t(25155),o=t.n(n),i=t(67292),d={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);t.d(a,d);let p=["",{children:["anual",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,33141)),"/home/anderson/projects/next/newapptv/src/app/anual/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,15404))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,71354)),"/home/anderson/projects/next/newapptv/src/app/layout.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,21154)),"/home/anderson/projects/next/newapptv/src/app/loading.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,15404))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/anderson/projects/next/newapptv/src/app/anual/page.tsx"],l={require:t,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/anual/page",pathname:"/anual",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:p}})},17034:(e,a,t)=>{Promise.resolve().then(t.bind(t,33141))},80082:(e,a,t)=>{Promise.resolve().then(t.bind(t,27185))},27185:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>d});var r=t(45512),s=t(93957),n=t(12947),o=t(30511),i=t(58009);t(42875);let d=e=>{let[a,t]=(0,i.useState)([]),[d,p]=(0,i.useState)([]);return(0,i.useEffect)(()=>{(async()=>{await o.A.post("(APPTV_ANALISE_DEPTO)",{departamento:1}).then(e=>{t(e.data.bi091.bidata[0])}).catch(e=>{console.log(e)})})()},[]),(0,i.useEffect)(()=>{(async()=>{await o.A.post("(APPTV_ANALISE_DEPTO)",{departamento:5}).then(e=>{p(e.data.bi091.bidata[0])}).catch(e=>{console.log(e)})})()},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"grid grid-cols-2 px-2 animate__animated animate__fadeIn min-h-[calc(100vh-82px)]",children:[(0,r.jsxs)("div",{className:"flex flex-col gap-2 bg-[#1a9cd9] p-2 rounded-l-md h-[100%]",children:[(0,r.jsx)(s.A,{meta:a?.MetaAcumuladaAno,vendas:a?.VendaAno,faltavender:a?.DiferencaAno,performance:a?.PerformanceAno,departamento:1,tipo:`Ano ${a?.Ano}`}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-2 h-[41.5%]",children:[(0,r.jsx)(n.A,{meta:a?.MetaDia,vendas:a?.VendaDia,faltavender:a?.DiferencaDia,performance:a?.PerformanceDia,departamento:1,tipo:`Dia ${a?.Dia}`}),(0,r.jsx)(n.A,{dualchart:!0,acumuladames:a?.MetaAcumuladames,meta:a?.MetaMes,vendas:a?.VendaMes,faltavender:a?.DiferencaMes,performance:a?.PerformanceMes,departamento:1,tipo:`M\xeas ${a?.Mes}`})]})]}),(0,r.jsxs)("div",{className:"flex flex-col gap-2 bg-[#f9b233] p-2 rounded-r-md h-[100%]",children:[(0,r.jsx)(s.A,{meta:d?.MetaAcumuladaAno,vendas:d?.VendaAno,faltavender:d?.DiferencaAno,performance:d?.PerformanceAno,departamento:5,tipo:`Anual ${d?.Ano}`}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-2 h-[41.5%]",children:[(0,r.jsx)(n.A,{meta:d?.MetaDia,vendas:d?.VendaDia,faltavender:d?.DiferencaDia,performance:d?.PerformanceDia,departamento:5,tipo:`Dia ${d?.Dia}`}),(0,r.jsx)(n.A,{dualchart:!0,acumuladames:d?.MetaAcumuladames,meta:d?.MetaMes,vendas:d?.VendaMes,faltavender:d?.DiferencaMes,performance:d?.PerformanceMes,departamento:5,tipo:`M\xeas ${d?.Mes}`})]})]})]})})}},33141:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r});let r=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/anderson/projects/next/newapptv/src/app/anual/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/anderson/projects/next/newapptv/src/app/anual/page.tsx","default")}};var a=require("../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),r=a.X(0,[989,951,407,813,180,998],()=>t(81257));module.exports=r})();