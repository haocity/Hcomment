!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t){var n={utf8:{stringToBytes:function(e){return n.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(n.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t},bytesToString:function(e){for(var t=[],n=0;n<e.length;n++)t.push(String.fromCharCode(e[n]));return t.join("")}}};e.exports=n},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2);n(3);var a=n(8),l=function(){function e(t,n,i){r(this,e);var a=document.createElement("div");this.ele=a,this.cid=n+"_"+i,a.className="ew-comment",a.innerHTML=(0,o.html)("评论"),"string"==typeof t&&(t=document.querySelector(t)),t.appendChild(a),this.init(t)}return i(e,[{key:"init",value:function(e){function t(t){return e.querySelector(t)}var n=this;this.$c=t;new Object;if(this.now="father",this.id=this.cid,this.api="https://api.haotown.cn/hco",this.publish=t(".ew-publish"),localStorage&&localStorage.getItem("ew")){console.log("加载设置成功");var r=JSON.parse(localStorage.getItem("ew"));t(".ew-email").value=r.email,t(".ew-author").value=r.user,t(".ew-weburl").value=r.weburl}this.changersize(),t(".ew-textarea").addEventListener("keydown",function(e){13==e.keyCode&&e.ctrlKey&&t(".ew-send-btn").click()},!1),t(".ew-send-btn").addEventListener("click",function(){n.submitfun()},!1),t(".ew-publish-back").addEventListener("click",function(){n.now="father",n.publish.className="ew-publish";for(var e=document.querySelectorAll(".ew-li-main"),t=0;t<e.length;t++)e[t].style.marginBottom&&(e[t].style.marginBottom="4px")},!1),window.addEventListener("resize",function(){n.changersize()}),n.update()}},{key:"changersize",value:function(){for(var e=this.ele.querySelector(".ew-info"),t=e.offsetWidth,n=e.querySelectorAll("input"),r=0;r<n.length;r++)t>800?(n[r].style.marginRight="7px",n[r].style.width=(t-200)/3+"px"):(n[r].style.marginRight="",n[r].style.width="")}},{key:"alert",value:function(e){var t=document.createElement("div");t.className="ew-alert",t.innerText=e,document.body.appendChild(t),setTimeout(function(){t.style.display="none",t.parentNode.removeChild(t)},1900)}},{key:"getfloor",value:function(e){for(var t="#",n=e.toString(),r=n.split("-"),i=0;i<r.length;i++)if(i==r.length-1){var o=parseInt(r[i])+1;t+=o}else t=t+(parseInt(r[i])+1)+"-";return t}},{key:"gettime",value:function(e){var t=void 0,n=new Date,r=n.getTimezoneOffset(),i=(new Date).getTime(),o=i-e-6e4*r;if(o<6e4)t="刚刚";else if(o<36e5)t=new Date(o).getMinutes()+"分钟前";else if(o<864e5)t=new Date(o).getHours()+"小时前";else{var a=new Date(parseInt(e));t=a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日"}return t}},{key:"update",value:function(e){var t=this,n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var r=JSON.parse(n.responseText);t.$c(".ew-list").innerHTML="";for(var i=0;i<r.data.length;i++){var o=r.data[i];t.sendcom(o.cid,o.user,o.email,o.weburl,o.time,o.text)}"father"!=e&&void 0!=e&&t.$c(".ew-id-"+e+">.ew-li-main>.ew-li-com-w>.ew-li-reply")&&t.$c(".ew-id-"+e+">.ew-li-main>.ew-li-com-w>.ew-li-reply").click(),r.data.length>0?(t.ele.querySelector(".ew-bar").innerHTML=r.data.length+"条评论",t.ele.querySelector(".ew-bar").style.display="block"):t.ele.querySelector(".ew-bar").style.display="none"}},n.open("GET",this.api+"/get/?id="+this.cid,!0),n.send()}},{key:"sendcom",value:function(e,t,n,r,i,l){var s=this,c=document.createElement("div"),u=void 0;"father"==e?(u=s.$c(".ew-list").querySelectorAll(".ew-li"),c.className="ew-li ew-id-"+u.length):s.$c(".ew-id-"+e)?(u=s.$c(".ew-id-"+e).querySelectorAll(".ew-li"),c.className="ew-li ew-id-"+e+"-"+u.length):console.log("数据可能存在错误");var f=(0,o.html2)("https://v2ex.assets.uxengine.net/gravatar/"+a(n)+"?s=80&d=retro",r,t,s.gettime(i),l);c.innerHTML=f,c.m=n;var p=document.createElement("div");p.className="ew-li-reply",p.innerHTML="回复",p.addEventListener("click",function(){s.now=this.i;for(var e=document.querySelectorAll(".ew-li-main"),t=0;t<e.length;t++)e[t].style.marginBottom&&(e[t].style.marginBottom="auto");var n=c.querySelector(".ew-li-main");s.publish.className="ew-publish ew-publish-fly",s.publish.style.top=n.offsetHeight+n.offsetTop+6+"px",n.style.marginBottom="210px",s.$c(".ew-publish-title-lc").innerHTML=s.getfloor(this.i)},!1),c.querySelector(".ew-li-main>.ew-li-com-w").appendChild(p),"father"==e?(p.i=u.length,s.$c(".ew-list").appendChild(c)):s.$c(".ew-id-"+e+">.ew-li-next")?(p.i=e+"-"+u.length,s.$c(".ew-id-"+e+">.ew-li-next").appendChild(c)):console.log("数据可能存在错误"+e)}},{key:"submitfun",value:function(){var e=this,t=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;if(e.$c(".ew-textarea").value.length<=2)e.alert("内容太短了");else if(e.$c(".ew-author").value)if(t.test(e.$c(".ew-email").value)){for(var n=(new Date,[/\n/g,/<script/g,/<\/script/g,/<style/g,/<\/style/g,/<\/div/g,/<div/g,/<\/pre/g,/<[a-z]+\s+on[a-z]+\s+?=/g]),r=0;r<n.length;r++)var i=e.$c(".ew-textarea").value.replace(n[r],"<br>");var o="";"father"!=e.now&&(o=this.$c(".ew-id-"+this.now).m);var a={id:e.id,user:e.$c(".ew-author").value,email:e.$c(".ew-email").value,weburl:e.$c(".ew-weburl").value,text:i,cid:e.now,url:document.location.href,title:document.title,pm:o};a=function(e){var t="";for(var n in e)t+=n+"="+e[n]+"&";return t}(a);var l=new XMLHttpRequest;l.open("POST",e.api+"/send/",!0),l.setRequestHeader("Content-type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){var t=l;if(4==t.readyState&&200==t.status){if(JSON.parse(t.responseText).code){e.update(e.now),e.alert("评论成功"),e.$c(".ew-textarea").value="";var n='{"user":"'+e.$c(".ew-author").value+'","email":"'+e.$c(".ew-email").value+'","weburl":"'+e.$c(".ew-weburl").value+'"}';localStorage&&localStorage.setItem("ew",n)}else e.alert("发送失败")}},l.send(a)}else e.alert("邮箱错误");else e.alert("请输入用户名")}}]),e}();window.Hco=l},function(e,t,n){"use strict";/* HCO
 @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
 @license  The Star And Thank Author License (SATA)
 */
function r(e){return'<div class="ew-publish">\n\t\t\t\t<div class="ew-publish-title">发表评论 <span class="ew-publish-title-lc">#0</span> <span class="ew-publish-back">返回评论</span></div>\n\t\t\t\t\t<div class="ew-textarea-warp">\n\t\t\t\t\t\t<textarea node-type="textarea" name="" class="ew-textarea" placeholder="评论.." autocomplete="off" spellcheck="false"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="ew-info"><input class="text-block ew-author"  name="author" type="text" value="" size="30" placeholder="昵称 *" autocomplete="off"><input class="text-block ew-email"  name="email" type="email" value="" size="30" placeholder="邮箱 *" autocomplete="off"><input class="text-block ew-weburl"  name="url" type="url" value="" size="30" placeholder="网址" autocomplete="off"><div class="ew-send-btn">提交</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="ew-bar">'+e+'</div>\n\t\t\t\t<div class="ew-list">\n\t\t\t\t</div>'}function i(e,t,n,r,i){return'<div class="ew-li-main">\n\t\t\t\t\t<div class="ew-li-logo" style="background-image:url('+e+')"></div>\n\t\t\t\t\t<div class="ew-li-com-w">\n\t\t\t\t\t\t<div class="ew-li-user"><a href="'+t+'" target="_blank">'+n+'</a></div>\n\t\t\t\t\t\t<div class="ew-li-time">'+r+'</div>\n\t\t\t\t\t\t<pre class="ew-li-com">'+i+'</pre>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="ew-li-next"></div>\n\t\t\t\t</div>'}Object.defineProperty(t,"__esModule",{value:!0}),t.html=r,t.html2=i},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]);var i={};i.transform=void 0;n(6)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(5)(void 0),t.push([e.i,".ew-comment{padding:15px 10px;position:relative}.ew-publish{overflow:hidden}.ew-publish-fly{position:absolute;top:256px;width:100%;left:0}.ew-publish-title{font-size:16px;padding:10px 0;font-weight:500;color:#565656;border-top:.1rem solid #eee}.ew-publish-title-lc{color:#969292;display:none}.ew-publish-back{color:#e07e7e;display:none;cursor:pointer;margin-left:30px}.ew-publish-fly .ew-publish-back,.ew-publish-fly .ew-publish-title-lc{display:inline-block}.ew-textarea{background:#fafafa;border:.1rem solid #eee;border-radius:2px;padding:.6rem .8rem;width:100%;height:110px;font-size:17px;color:#333;resize:none;line-height:normal;text-align:left;outline:medium;overflow-x:hidden;overflow-y:auto;box-sizing:border-box}.ew-info{margin-top:20px;margin-bottom:10px;position:relative}.ew-info>.text-block{height:36px;width:24%;margin-right:2%;border:1px solid #cccbcb;border-radius:3px;padding:0 4px;outline:none}.ew-info>.ew-send-btn{position:absolute;right:0;top:-1px;width:140px;background-color:#3b9bf1;color:#fff;text-align:center;line-height:40px;font-size:18px;cursor:pointer}.ew-bar{display:none;background-color:#2483d8;color:#fff;margin-top:10px;margin-bottom:10px;font-size:15px;line-height:32px;padding:0 17px}.ew-li,.ew-li-main{overflow:hidden}.ew-li-main{border-left:7px solid #2483d8;margin-bottom:4px;background-color:#fdfdfd}.ew-li-com-w>.ew-li-com{margin-left:90px;font-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif;word-wrap:break-word;white-space:normal}.ew-li-com-w>.ew-li-time,.ew-li-com-w>.ew-li-user{display:inline-block;color:#3a3a3a;font-size:15px;margin-top:12px}.ew-li-user>a{color:#3a3a3a;font-size:15px;text-decoration:none}.ew-li-time{color:#797878;margin-left:10px}.ew-li-main>.ew-li-logo{margin:16px 20px 16px 10px;background-image:url(https://0d077ef9e74d8.cdn.sohucs.com/clip_picture_1486299863299);width:60px;height:60px;background-size:cover;border-radius:50%;float:left}.ew-li-reply{float:right;color:#308cde;cursor:pointer;position:relative;right:10px;bottom:5px}.ew-li-next{margin-left:50px}.ew-alert{position:fixed;width:300px;height:80px;background-color:rgba(51,51,51,.56);left:0;right:0;top:0;bottom:0;margin:auto;line-height:80px;z-index:999;color:#fff;text-align:center;font-size:25px;animation:.8s tada}@keyframes tada{0%{transform:scaleX(1)}10%,20%{transform:scale3d(.9,.9,.9) rotate(-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate(3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate(-3deg)}to{transform:scaleX(1)}}@media only screen and (min-width:100px) and (max-width:800px){.ew-info>.ew-send-btn{position:relative;top:6px;width:100%;box-shadow:none}.ew-info>.text-block{width:28%;box-sizing:content-box}}",""])},function(e,t){function n(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=h[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(u(r.parts[o],t))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(u(r.parts[o],t));h[r.id]={id:r.id,refs:1,parts:a}}}}function i(e,t){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=t.base?o[0]+t.base:o[0],l=o[1],s=o[2],c=o[3],u={css:l,media:s,sourceMap:c};r[a]?r[a].parts.push(u):n.push(r[a]={id:a,parts:[u]})}return n}function o(e,t){var n=v(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function l(e){var t=document.createElement("style");return e.attrs.type="text/css",c(t,e.attrs),o(e,t),t}function s(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",c(t,e.attrs),o(e,t),t}function c(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function u(e,t){var n,r,i,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var c=m++;n=g||(g=l(t)),r=f.bind(null,n,c,!1),i=f.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(t),r=d.bind(null,n,t),i=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=l(t),r=p.bind(null,n),i=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function f(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function p(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function d(e,t,n){var r=n.css,i=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||o)&&(r=y(r)),i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),l=e.href;e.href=URL.createObjectURL(a),l&&URL.revokeObjectURL(l)}var h={},w=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),v=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e.call(this,n)),t[n]}}(function(e){return document.querySelector(e)}),g=null,m=0,b=[],y=n(7);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=w()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=i(e,t);return r(n,t),function(e){for(var o=[],a=0;a<n.length;a++){var l=n[a],s=h[l.id];s.refs--,o.push(s)}if(e){r(i(e,t),t)}for(var a=0;a<o.length;a++){var s=o[a];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete h[s.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return e;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}},function(e,t,n){!function(){var t=n(9),r=n(0).utf8,i=n(10),o=n(0).bin,a=function(e,n){e.constructor==String?e=n&&"binary"===n.encoding?o.stringToBytes(e):r.stringToBytes(e):i(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||(e=e.toString());for(var l=t.bytesToWords(e),s=8*e.length,c=1732584193,u=-271733879,f=-1732584194,p=271733878,d=0;d<l.length;d++)l[d]=16711935&(l[d]<<8|l[d]>>>24)|4278255360&(l[d]<<24|l[d]>>>8);l[s>>>5]|=128<<s%32,l[14+(s+64>>>9<<4)]=s;for(var h=a._ff,w=a._gg,v=a._hh,g=a._ii,d=0;d<l.length;d+=16){var m=c,b=u,y=f,x=p;c=h(c,u,f,p,l[d+0],7,-680876936),p=h(p,c,u,f,l[d+1],12,-389564586),f=h(f,p,c,u,l[d+2],17,606105819),u=h(u,f,p,c,l[d+3],22,-1044525330),c=h(c,u,f,p,l[d+4],7,-176418897),p=h(p,c,u,f,l[d+5],12,1200080426),f=h(f,p,c,u,l[d+6],17,-1473231341),u=h(u,f,p,c,l[d+7],22,-45705983),c=h(c,u,f,p,l[d+8],7,1770035416),p=h(p,c,u,f,l[d+9],12,-1958414417),f=h(f,p,c,u,l[d+10],17,-42063),u=h(u,f,p,c,l[d+11],22,-1990404162),c=h(c,u,f,p,l[d+12],7,1804603682),p=h(p,c,u,f,l[d+13],12,-40341101),f=h(f,p,c,u,l[d+14],17,-1502002290),u=h(u,f,p,c,l[d+15],22,1236535329),c=w(c,u,f,p,l[d+1],5,-165796510),p=w(p,c,u,f,l[d+6],9,-1069501632),f=w(f,p,c,u,l[d+11],14,643717713),u=w(u,f,p,c,l[d+0],20,-373897302),c=w(c,u,f,p,l[d+5],5,-701558691),p=w(p,c,u,f,l[d+10],9,38016083),f=w(f,p,c,u,l[d+15],14,-660478335),u=w(u,f,p,c,l[d+4],20,-405537848),c=w(c,u,f,p,l[d+9],5,568446438),p=w(p,c,u,f,l[d+14],9,-1019803690),f=w(f,p,c,u,l[d+3],14,-187363961),u=w(u,f,p,c,l[d+8],20,1163531501),c=w(c,u,f,p,l[d+13],5,-1444681467),p=w(p,c,u,f,l[d+2],9,-51403784),f=w(f,p,c,u,l[d+7],14,1735328473),u=w(u,f,p,c,l[d+12],20,-1926607734),c=v(c,u,f,p,l[d+5],4,-378558),p=v(p,c,u,f,l[d+8],11,-2022574463),f=v(f,p,c,u,l[d+11],16,1839030562),u=v(u,f,p,c,l[d+14],23,-35309556),c=v(c,u,f,p,l[d+1],4,-1530992060),p=v(p,c,u,f,l[d+4],11,1272893353),f=v(f,p,c,u,l[d+7],16,-155497632),u=v(u,f,p,c,l[d+10],23,-1094730640),c=v(c,u,f,p,l[d+13],4,681279174),p=v(p,c,u,f,l[d+0],11,-358537222),f=v(f,p,c,u,l[d+3],16,-722521979),u=v(u,f,p,c,l[d+6],23,76029189),c=v(c,u,f,p,l[d+9],4,-640364487),p=v(p,c,u,f,l[d+12],11,-421815835),f=v(f,p,c,u,l[d+15],16,530742520),u=v(u,f,p,c,l[d+2],23,-995338651),c=g(c,u,f,p,l[d+0],6,-198630844),p=g(p,c,u,f,l[d+7],10,1126891415),f=g(f,p,c,u,l[d+14],15,-1416354905),u=g(u,f,p,c,l[d+5],21,-57434055),c=g(c,u,f,p,l[d+12],6,1700485571),p=g(p,c,u,f,l[d+3],10,-1894986606),f=g(f,p,c,u,l[d+10],15,-1051523),u=g(u,f,p,c,l[d+1],21,-2054922799),c=g(c,u,f,p,l[d+8],6,1873313359),p=g(p,c,u,f,l[d+15],10,-30611744),f=g(f,p,c,u,l[d+6],15,-1560198380),u=g(u,f,p,c,l[d+13],21,1309151649),c=g(c,u,f,p,l[d+4],6,-145523070),p=g(p,c,u,f,l[d+11],10,-1120210379),f=g(f,p,c,u,l[d+2],15,718787259),u=g(u,f,p,c,l[d+9],21,-343485551),c=c+m>>>0,u=u+b>>>0,f=f+y>>>0,p=p+x>>>0}return t.endian([c,u,f,p])};a._ff=function(e,t,n,r,i,o,a){var l=e+(t&n|~t&r)+(i>>>0)+a;return(l<<o|l>>>32-o)+t},a._gg=function(e,t,n,r,i,o,a){var l=e+(t&r|n&~r)+(i>>>0)+a;return(l<<o|l>>>32-o)+t},a._hh=function(e,t,n,r,i,o,a){var l=e+(t^n^r)+(i>>>0)+a;return(l<<o|l>>>32-o)+t},a._ii=function(e,t,n,r,i,o,a){var l=e+(n^(t|~r))+(i>>>0)+a;return(l<<o|l>>>32-o)+t},a._blocksize=16,a._digestsize=16,e.exports=function(e,n){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var r=t.wordsToBytes(a(e,n));return n&&n.asBytes?r:n&&n.asString?o.bytesToString(r):t.bytesToHex(r)}}()},function(e,t){!function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&n.rotl(e,8)|4278255360&n.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=n.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],n=0,r=0;n<e.length;n++,r+=8)t[r>>>5]|=e[n]<<24-r%32;return t},wordsToBytes:function(e){for(var t=[],n=0;n<32*e.length;n+=8)t.push(e[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(e){for(var t=[],n=0;n<e.length;n++)t.push((e[n]>>>4).toString(16)),t.push((15&e[n]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},bytesToBase64:function(e){for(var n=[],r=0;r<e.length;r+=3)for(var i=e[r]<<16|e[r+1]<<8|e[r+2],o=0;o<4;o++)8*r+6*o<=8*e.length?n.push(t.charAt(i>>>6*(3-o)&63)):n.push("=");return n.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],r=0,i=0;r<e.length;i=++r%4)0!=i&&n.push((t.indexOf(e.charAt(r-1))&Math.pow(2,-2*i+8)-1)<<2*i|t.indexOf(e.charAt(r))>>>6-2*i);return n}};e.exports=n}()},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}}]);
