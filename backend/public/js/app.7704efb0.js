(function(t){function e(e){for(var r,u,a=e[0],i=e[1],l=e[2],b=0,d=[];b<a.length;b++)u=a[b],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&d.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);s&&s(e);while(d.length)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(c.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},o={app:0},c=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var s=i;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"544f":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"bar"},c=Object(r["e"])("메인으로"),u=Object(r["d"])("h5",{class:"text-center"},"테스트 엔진 메인바",-1),a={key:0,class:"userName"},i={key:1,class:"userName"};function l(t,e,n,l,s,b){var d=Object(r["s"])("router-link"),f=Object(r["s"])("router-view");return Object(r["o"])(),Object(r["c"])("div",null,[Object(r["d"])("div",o,[Object(r["f"])(d,{to:"/",id:"main"},{default:Object(r["y"])((function(){return[c]})),_:1}),u,null!=t.$store.state.userNickname?(Object(r["o"])(),Object(r["c"])("div",a,Object(r["u"])(t.$store.state.userNickname),1)):(Object(r["o"])(),Object(r["c"])("div",i,"로그인이 필요합니다"))]),Object(r["f"])(f)])}var s={name:"App",components:{}},b=(n("cb5e"),n("6b0d")),d=n.n(b);const f=d()(s,[["render",l]]);var p=f,O=n("6c02"),j={id:"page"},h=Object(r["e"])(" VSNovel 엔진 테스트 페이지 "),v=Object(r["d"])("br",null,null,-1),m=Object(r["e"])("로그인"),g=Object(r["e"])(),y=Object(r["d"])("br",null,null,-1);function w(t,e,n,o,c,u){var a=Object(r["s"])("router-link");return Object(r["o"])(),Object(r["c"])("div",j,[h,v,Object(r["f"])(a,{to:"/signin"},{default:Object(r["y"])((function(){return[m]})),_:1}),g,y])}var k=n("bc3a"),x=n.n(k),N={name:"Index",created:function(){var t=this;x.a.get("/engine/auth/loginCheck").then((function(e){console.log(e),t.$store.commit("userLogin",e.data.USER_NICKNAME)})).catch((function(t){console.error(t)}))}};n("d572");const _=d()(N,[["render",w]]);var P=_,S={class:"container mt-3"},M={class:"mb-3"},$={class:"mb-3"},C=Object(r["e"])(),L=Object(r["d"])("br",null,null,-1),U=Object(r["d"])("br",null,null,-1);function V(t,e,n,o,c,u){return Object(r["o"])(),Object(r["c"])("div",S,[Object(r["d"])("div",M,[Object(r["z"])(Object(r["d"])("input",{type:"text",class:"form-control",placeholder:"id","onUpdate:modelValue":e[0]||(e[0]=function(t){return c.id=t})},null,512),[[r["w"],c.id]])]),Object(r["d"])("div",$,[Object(r["z"])(Object(r["d"])("input",{type:"password",class:"form-control",placeholder:"pw","onUpdate:modelValue":e[1]||(e[1]=function(t){return c.pw=t})},null,512),[[r["w"],c.pw]])]),Object(r["d"])("button",{class:"btn btn-primary",onClick:e[2]||(e[2]=function(t){return u.login()})},"로그인"),C,L,U,Object(r["d"])("button",{class:"btn btn-primary",onClick:e[3]||(e[3]=function(t){return u.logout()})},"로그아웃")])}var z={name:"Login",data:function(){return{id:"",pw:""}},methods:{login:function(){var t=this,e={id:this.id,pw:this.pw};x.a.post("/engine/auth/login",e).then((function(e){"ok"==e.data?(alert("로그인되었습니다."),t.$router.push("/")):(console.log(e),alert(e.data))})).catch((function(t){console.error(t)}))},logout:function(){var t=this;x.a.get("/engine/auth/logout").then((function(e){"ok"==e.data?(alert("로그아웃 되었습니다."),t.$store.commit("userLogin",null)):(console.log(e),alert(e.data))})).catch((function(t){console.error(t)}))}}};const A=d()(z,[["render",V]]);var E=A,I=[{path:"/",component:P},{path:"/signin",component:E}],J=Object(O["a"])({history:Object(O["b"])(),routes:I}),T=J,K=n("5502"),R=Object(K["a"])({state:function(){return{userNickname:null}},mutations:{userLogin:function(t,e){t.userNickname=e}}}),q=R,B=Object(r["b"])(p);B.use(T).use(q).mount("#app")},"633a":function(t,e,n){},cb5e:function(t,e,n){"use strict";n("544f")},d572:function(t,e,n){"use strict";n("633a")}});
//# sourceMappingURL=app.7704efb0.js.map