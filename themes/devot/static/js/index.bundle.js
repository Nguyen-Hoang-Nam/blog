(()=>{"use strict";var t={8177:(t,e,n)=>{n.r(e)},206:function(t,e,n){var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{s(r.next(t))}catch(t){i(t)}}function c(t){try{s(r.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}s((r=r.apply(t,e||[])).next())}))},o=this&&this.__generator||function(t,e){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};e.__esModule=!0,n(8177);var i="☀️";window.addEventListener("DOMContentLoaded",(function(){var t=new IntersectionObserver((function(t){t.forEach((function(t){var e=t.target.getAttribute("id");t.intersectionRatio>0?document.querySelector('nav li a[href="#'.concat(e,'"]')).classList.add("active"):document.querySelector('nav li a[href="#'.concat(e,'"]')).classList.remove("active")}))}));function e(t){if(document.querySelector(".utterances-frame")){var e={type:"set-theme",theme:"dark"===t?"github-dark":"github-light"};document.querySelector(".utterances-frame").contentWindow.postMessage(e,"https://utteranc.es")}}document.querySelectorAll("h2[id], h3[id]").forEach((function(e){t.observe(e)}));var n=document.getElementById("mode"),r=document.getElementById("github-icon"),o=document.getElementById("github-icon-1"),a=document.getElementById("rss"),c=document.getElementById("chroma-theme");n.addEventListener("click",(function(){n.textContent===i?(n.textContent="🌙",document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("mode","🌙"),e("dark"),r.setAttribute("src","/images/GitHub-Mark-Light-32px.png"),o.setAttribute("src","/images/GitHub-Mark-Light-32px.png"),a.setAttribute("src","/images/rss-dark.png"),c.href="/css/syntax-dark.css"):(n.textContent=i,document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("mode",i),e("light"),r.setAttribute("src","/images/GitHub-Mark-32px.png"),o.setAttribute("src","/images/GitHub-Mark-32px.png"),a.setAttribute("src","/images/rss-light.png"),c.href="/css/syntax-light.css")}));var s=localStorage.getItem("mode");s?(n.textContent=s,s===i?document.documentElement.setAttribute("data-theme","light"):(document.documentElement.setAttribute("data-theme","dark"),e("light"),r.setAttribute("src","/images/GitHub-Mark-Light-32px.png"),o.setAttribute("src","/images/GitHub-Mark-Light-32px.png"),a.setAttribute("src","/images/rss-dark.png"),c.href="/css/syntax-dark.css")):(n.textContent=i,document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("mode",i))}));var a,c=document.getElementById("connect-metamask"),s=[];void 0===window.ethereum&&(c.disabled=!0),c.addEventListener("click",(function(){return r(void 0,void 0,void 0,(function(){return o(this,(function(t){return function(){r(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,a.request({method:"eth_requestAccounts"})];case 1:return s=t.sent(),[2]}}))}))}(),a.request({method:"eth_sendTransaction",params:[{from:s[0],to:"0x0374fAe44F049252A9FDc517514566a57b5D9Af9",value:"0x1c6bf52634000"}]}).then((function(t){return console.log(t)})).catch((function(t){return console.error(t)})),[2]}))}))}))}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};n(206)})();
//# sourceMappingURL=index.bundle.js.map