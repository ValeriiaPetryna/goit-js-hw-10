import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as s}from"./assets/vendor-77e16229.js";const m=document.querySelector(".form");m.addEventListener("submit",e=>{e.preventDefault();const r=Object.fromEntries(new FormData(e.target));o(r.delay,r.state).then(t=>{s.success({message:`✅ Fulfilled promise in ${t}ms`})}).catch(t=>{s.error({message:`❌ Rejected promise in ${t}ms`})})});function o(e,r){return new Promise((t,i)=>{setTimeout(()=>{r==="fulfilled"?t(e):i(e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map