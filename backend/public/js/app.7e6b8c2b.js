(function(t){function e(e){for(var c,i,s=e[0],r=e[1],l=e[2],u=0,b=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&b.push(o[i][0]),o[i]=0;for(c in r)Object.prototype.hasOwnProperty.call(r,c)&&(t[c]=r[c]);d&&d(e);while(b.length)b.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],c=!0,i=1;i<n.length;i++){var r=n[i];0!==o[r]&&(c=!1)}c&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var c={},o={app:0},a=[];function i(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-2d216214":"cece44c1","chunk-ea1c26b4":"5467c08d"}[t]+".js"}function s(e){if(c[e])return c[e].exports;var n=c[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var c=new Promise((function(e,c){n=o[t]=[e,c]}));e.push(n[2]=c);var a,r=document.createElement("script");r.charset="utf-8",r.timeout=120,s.nc&&r.setAttribute("nonce",s.nc),r.src=i(t);var l=new Error;a=function(e){r.onerror=r.onload=null,clearTimeout(u);var n=o[t];if(0!==n){if(n){var c=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+c+": "+a+")",l.name="ChunkLoadError",l.type=c,l.request=a,n[1](l)}o[t]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:r})}),12e4);r.onerror=r.onload=a,document.head.appendChild(r)}return Promise.all(e)},s.m=t,s.c=c,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var c in t)s.d(n,c,function(e){return t[e]}.bind(null,c));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0c54":function(t,e,n){"use strict";n("9823")},"0e5b":function(t,e,n){t.exports=n.p+"img/storytelling.b3241798.png"},"10c2":function(t,e,n){"use strict";n("e9fe")},1350:function(t,e,n){"use strict";n("ee80")},"19ca":function(t,e,n){"use strict";n("f8c4")},"1ea7":function(t,e,n){"use strict";n("e208")},2100:function(t,e,n){t.exports=n.p+"img/handshake.01c3948e.png"},2667:function(t,e,n){},"2c60":function(t,e,n){},"30b3":function(t,e,n){t.exports=n.p+"img/background.1b103e51.png"},"3d98":function(t,e,n){t.exports=n.p+"img/adver.6352f1b1.jpg"},"3e55":function(t,e,n){},"467e":function(t,e,n){},"4b6d":function(t,e,n){},"4e0c":function(t,e,n){t.exports=n.p+"img/plus.8f79e608.png"},5657:function(t,e,n){"use strict";n("7ab0")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23");function o(t,e,n,o,a,i){var s=Object(c["A"])("Spinner"),r=Object(c["A"])("GlobalModal"),l=Object(c["A"])("ConfirmModal"),u=Object(c["A"])("SideBar"),d=Object(c["A"])("TaskBar"),b=Object(c["A"])("MainBar"),p=Object(c["A"])("router-view");return Object(c["v"])(),Object(c["f"])(c["a"],null,[Object(c["j"])(s,{loading:t.$store.state.LoadingStatus},null,8,["loading"]),Object(c["j"])(r,{gModalState:t.$store.state.gModalState},null,8,["gModalState"]),Object(c["j"])(l,{cModalState:t.$store.state.cModalState},null,8,["cModalState"]),Object(c["j"])(u,{class:Object(c["p"])({SideBar:!0})}),Object(c["j"])(d,{class:Object(c["p"])({TaskBar:!0})}),Object(c["j"])(b,{class:Object(c["p"])({MainBar:!0})}),Object(c["j"])(p)],64)}n("d3b7");var a=n("bc3a"),i=n.n(a),s=n("5502"),r=Object(s["a"])({state:function(){return{userNickname:null,LoadingStatus:!1,selectMenu:7,menuStyle:"_active",gModalState:!1,gModalMsg:"",gModalSize:"",cModalState:!1,cModalMsg:"",cModalSize:"",cModalBtn1:"",cModalBtn2:"",cModalAnswer:null,sideBar:!1,sideBarState:"sideBarOff",sideBarFixed:"RouterViewLeft",sideBarMove:"RouterMoveLeft"}},mutations:{userLogin:function(t,e){t.userNickname=e},startSpinner:function(t){t.LoadingStatus=!0},endSpinner:function(t){t.LoadingStatus=!1},cngMenu:function(t,e){t.selectMenu=e},gModalOn:function(t,e){t.gModalSize=e.size,t.gModalMsg=e.msg,t.gModalState=!0},gModalOff:function(t){t.gModalState=!1},cModalOn:function(t,e){t.cModalState=!0,t.cModalSize=e.size,t.cModalMsg=e.msg,t.cModalBtn1=e.btn1,t.cModalBtn2=e.btn2},cModalOff:function(t){t.cModalState=!1},setAnswer:function(t,e){t.cModalAnswer=e},sideMenuOn:function(t){t.sideBar=!0,t.sideBarState="sideBarOn",t.sideBarMove="RouterMoveRight",t.sideBarFixed="RouterViewRight"},sideMenuOff:function(t){t.sideBar=!1,t.sideBarState="sideBarOff",t.sideBarMove="RouterMoveLeft",t.sideBarFixed="RouterViewLeft"}},getters:{getAnswer:function(t){return t.cModalAnswer}}}),l=r,u=void 0,d=i.a.create({});d.interceptors.request.use((function(t){return l.commit("startSpinner"),t}),(function(t){return u.$store.commit("gModalOn",{msg:"ERR : 데이터 요청 실패.",size:"small"}),Promise.reject(t)})),d.interceptors.response.use((function(t){return l.commit("endSpinner"),t}),(function(t){return u.$store.commit("gModalOn",{msg:"ERR : 데이터 응답 실패.",size:"small"}),Promise.reject(t)}));var b=d,p={key:0,class:"lds-facebook"},j=Object(c["g"])("div",null,null,-1),g=Object(c["g"])("div",null,null,-1),O=Object(c["g"])("div",null,null,-1),f=[j,g,O];function v(t,e,n,o,a,i){return n.loading?(Object(c["v"])(),Object(c["f"])("div",p,f)):Object(c["e"])("",!0)}var m={props:{loading:{type:Boolean,required:!0}}},h=(n("903e"),n("6b0d")),_=n.n(h);const y=_()(m,[["render",v]]);var C=y,M=n("ade3"),k={key:0},P=Object(c["g"])("div",{class:"modal_opacity"},null,-1),S={class:"modal_inner"},T={class:"modal_close_button"};function w(t,e,n,o,a,i){return n.gModalState?(Object(c["v"])(),Object(c["f"])("div",k,[P,Object(c["g"])("div",{class:Object(c["p"])(Object(M["a"])({},"modal_frame_".concat(this.$store.state.gModalSize),!0))},[Object(c["g"])("div",S,[Object(c["g"])("span",null,Object(c["C"])(this.$store.state.gModalMsg),1)]),Object(c["g"])("div",T,[Object(c["g"])("span",{class:"modal_close_ok",onClick:e[0]||(e[0]=function(t){return i.modalClose()})},"확인")])],2)])):Object(c["e"])("",!0)}var x={name:"GlobalModal",methods:{modalClose:function(){this.$store.commit("gModalOff")}},props:{gModalState:{type:Boolean,required:!0}}};n("ec04");const $=_()(x,[["render",w]]);var R=$,L={key:0},E=Object(c["g"])("div",{class:"modal_opacity"},null,-1),B={class:"modal_inner"},I={class:"modal_save_ok"},D={class:"modal_cancel_ok"};function A(t,e,n,o,a,i){return n.cModalState?(Object(c["v"])(),Object(c["f"])("div",L,[E,Object(c["g"])("div",{class:Object(c["p"])(Object(M["a"])({},"modal_frame_".concat(this.$store.state.cModalSize),!0))},[Object(c["g"])("div",B,[Object(c["g"])("span",null,Object(c["C"])(this.$store.state.cModalMsg),1)]),Object(c["g"])("div",{class:"modal_save_button",onClick:e[0]||(e[0]=function(t){return i.modalCloseY()})},[Object(c["g"])("span",I,Object(c["C"])(this.$store.state.cModalBtn1),1)]),Object(c["g"])("div",{class:"modal_cancel_button",onClick:e[1]||(e[1]=function(t){return i.modalCloseN()})},[Object(c["g"])("span",D,Object(c["C"])(this.$store.state.cModalBtn2),1)])],2)])):Object(c["e"])("",!0)}var V={name:"ConfirmModal",methods:{modalCloseY:function(){this.$store.commit("setAnswer",!0),this.$store.commit("cModalOff"),console.log(this.$store.state.cModalAnswer)},modalCloseN:function(){this.$store.commit("setAnswer",!1),this.$store.commit("cModalOff"),console.log(this.$store.state.cModalAnswer)}},props:{cModalState:{type:Boolean,required:!0}}};n("9349");const z=_()(V,[["render",A]]);var N=z,J=n("7ca7"),U=n.n(J),F=n("9994"),W=n.n(F),H=n("c770"),K=n.n(H),q=n("62f2"),G=n.n(q),Y=n("2100"),Q=n.n(Y),X=n("b062"),Z=n.n(X),tt=n("5d75"),et=n.n(tt),nt={class:Object(c["p"])({mainmenu:!0})},ct={class:Object(c["p"])({menus:!0})},ot=Object(c["h"])('<div class="menubox"><img class="menubox_icon_resource" src="'+U.a+'"></div><br><div class="menubox"><img class="menubox_icon_text" src="'+W.a+'"></div><br><div class="menubox"><img class="menubox_icon_event" src="'+K.a+'"></div><br><div class="menubox"><img class="menubox_icon_scene" src="'+G.a+'"></div><br><div class="menubox"><img class="menubox_icon_cooperation" src="'+Q.a+'"></div><br><div class="menubox"><img class="menubox_icon_setting" src="'+Z.a+'"></div><br>',12),at=Object(c["g"])("img",{class:"menubox_icon_mainscreen",src:et.a},null,-1),it=[at];function st(t,e,n,o,a,i){var s=this;return Object(c["v"])(),Object(c["f"])("div",nt,[Object(c["g"])("div",ct,[ot,Object(c["g"])("div",{class:Object(c["p"])({menubox_active:!0}),onClick:e[0]||(e[0]=function(t){return s.$router.push("/")})},it)])])}var rt={name:"MainBar",data:function(){return{}}};n("10c2");const lt=_()(rt,[["render",st]]);var ut=lt,dt={class:"barBackground"},bt=Object(c["h"])('<div class="bars_left"><span class="topmenus">VSN</span><span class="topmenus">프로그램 설정</span><span class="topmenus">도구</span><span class="topmenus">창</span></div>',1),pt=[bt];function jt(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",dt,pt)}var gt={name:"TaskBar"};n("8797");const Ot=_()(gt,[["render",jt]]);var ft=Ot,vt=Object(c["i"])(" 123 ");function mt(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",{class:Object(c["p"])(Object(M["a"])({},"".concat(this.$store.state.sideBarState),!0))},[vt,Object(c["g"])("div",{class:"sideBarButton",onClick:e[0]||(e[0]=function(t){return i.sideBarClick()})},[Object(c["g"])("span",null,Object(c["C"])(a.btnIcon),1)])],2)}var ht={name:"SideBar",data:function(){return{btnIcon:"◀"}},methods:{sideBarClick:function(){0==this.$store.state.sideBar?(this.$store.commit("sideMenuOn"),this.btnIcon="▶"):(this.$store.commit("sideMenuOff"),this.btnIcon="◀")}}};n("b73c");const _t=_()(ht,[["render",mt]]);var yt=_t,Ct={name:"App",components:{Spinner:C,GlobalModal:R,ConfirmModal:N,MainBar:ut,TaskBar:ft,SideBar:yt},methods:{logout:function(){var t=this;b.get("/engine/auth/logout").then((function(e){"ok"==e.data?(t.$store.commit("userLogin",null),t.$router.push("/")):(console.log(e),alert(e.data))})).catch((function(t){console.error(t)}))}}};n("5657");const Mt=_()(Ct,[["render",o]]);var kt=Mt,Pt=n("6c02"),St=n("e236"),Tt=n.n(St),wt=n("9f38"),xt=n.n(wt),$t=n("4e0c"),Rt=n.n($t),Lt=n("b0ac"),Et=n.n(Lt),Bt={class:"RouterView"},It={class:Object(c["p"])({enginebackground:!0})},Dt=Object(c["i"])("임시 로그인"),At=Object(c["g"])("div",{class:"header"},[Object(c["g"])("img",{class:"header_icon",src:Tt.a}),Object(c["g"])("span",{class:"header_title"},"VSN Engine")],-1),Vt={class:"invite_center"},zt=Object(c["g"])("div",{class:"invite_box"},[Object(c["g"])("img",{class:"invite_icon",src:xt.a})],-1),Nt=Object(c["g"])("div",{class:Object(c["p"])({invite_counter_on:!0})},[Object(c["g"])("span",null,"9")],-1),Jt={class:Object(c["p"])({invite_modal_on:!0})},Ut={class:"invite_message"},Ft=Object(c["g"])("button",{class:"invite_button"},"승인",-1),Wt=Object(c["g"])("button",{class:"invite_button"},"거절",-1),Ht=Object(c["g"])("hr",null,null,-1),Kt={class:"section"},qt={class:"newpj_part"},Gt=Object(c["g"])("div",{class:"newpj_icon"},[Object(c["g"])("img",{class:"newpj_icon_plus",src:Rt.a})],-1),Yt=Object(c["g"])("div",null,[Object(c["g"])("span",{class:"newpj_label"},"New Project")],-1),Qt={class:"newpj_create_frame"},Xt=Object(c["g"])("span",null,"새로운 프로젝트 생성하기",-1),Zt=[Xt],te={class:"loadpj_part"},ee=Object(c["g"])("div",{class:"loadpj_icon"},[Object(c["g"])("img",{class:"loadpj_icon_plus",src:Et.a})],-1),ne=Object(c["g"])("div",null,[Object(c["g"])("span",{class:"loadpj_label"},"Load Project")],-1),ce={class:"loadpj_list_box"},oe=Object(c["g"])("div",{class:"loadpj_list_th"},"최근 프로젝트",-1),ae=["onClick"],ie=Object(c["g"])("br",null,null,-1),se=Object(c["i"])("  "),re=Object(c["i"])("  "),le=Object(c["i"])("  ");function ue(t,e,n,o,a,i){var s=this,r=Object(c["A"])("router-link");return Object(c["v"])(),Object(c["f"])("div",Bt,[Object(c["g"])("div",It,[null==t.$store.state.userNickname?(Object(c["v"])(),Object(c["d"])(r,{key:0,to:"/signin"},{default:Object(c["I"])((function(){return[Dt]})),_:1})):(Object(c["v"])(),Object(c["f"])("button",{key:1,onClick:e[0]||(e[0]=function(t){return i.logout()})},"로그아웃")),At,Object(c["g"])("div",Vt,[zt,Nt,Object(c["g"])("div",Jt,[(Object(c["v"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(a.noticeList,(function(t){return Object(c["v"])(),Object(c["f"])("div",{key:t.SCHE_CODE},[Object(c["g"])("div",Ut,[Object(c["g"])("div",null,Object(c["C"])(t.SCHE_CONTENT),1),Ft,Wt]),Ht])})),128))])]),Object(c["g"])("div",Kt,[Object(c["g"])("div",qt,[Gt,Yt,Object(c["g"])("div",Qt,[Object(c["g"])("div",{onClick:e[1]||(e[1]=function(t){return s.$router.push("/createNewPj")})},Zt)])]),Object(c["g"])("div",te,[ee,ne,Object(c["g"])("div",ce,[oe,(Object(c["v"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(a.pjList,(function(t){return Object(c["v"])(),Object(c["f"])("div",{class:"loadpj_list_tr",key:t.PROJ_CODE,onClick:function(e){return i.goToDevPage(t.PROJ_CODE)}},[Object(c["g"])("span",null,Object(c["C"])(t.PROJ_CODE),1),ie,Object(c["g"])("span",null,Object(c["C"])(t.PROJ_TYPE),1),se,Object(c["g"])("span",null,Object(c["C"])(t.PROJ_TITLE),1),re,Object(c["g"])("span",null,Object(c["C"])(t.PROJ_STATUS),1),le,Object(c["g"])("span",null,Object(c["C"])(t.PROJ_RETOUCHDATE),1)],8,ae)})),128))])])])])])}var de=n("1da1"),be=(n("96cf"),{name:"Index",created:function(){var t=this;b.get("/engine/auth/loginCheck").then(function(){var e=Object(de["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""==n.data){e.next=7;break}return console.log(n.data),t.$store.commit("userLogin",n.data.USER_NICKNAME),e.next=5,t.getPjList();case 5:return e.next=7,t.getNoticeList();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){console.error(t)}))},data:function(){return{pjList:[],noticeList:[]}},methods:{logout:function(){var t=this;b.get("/engine/auth/logout").then((function(e){"ok"==e.data?(t.$store.commit("userLogin",null),t.$router.push("/")):(console.log(e),alert(e.data))})).catch((function(t){console.error(t)}))},goToDevPage:function(t){this.$router.push("/devPage/".concat(t))},getPjList:function(){var t=this;b.get("/engine/pj/getList").then((function(e){"empty"!=e.data&&(t.pjList=e.data)})).catch((function(t){console.error(t)}))},getNoticeList:function(){var t=this;b.get("/engine/team/getNoticeList").then((function(e){"err"==e.data?console.log("ERR : 알림 불러오기 실패"):t.noticeList=e.data})).catch((function(t){console.error(t)}))}}});n("84c0");const pe=_()(be,[["render",ue]]);var je=pe,ge=n("30b3"),Oe=n.n(ge),fe=n("3d98"),ve=n.n(fe),me={class:"RouterView"},he={class:Object(c["p"])({contentbackground:!0})},_e=Object(c["g"])("img",{class:"background_img",src:Oe.a,alt:""},null,-1),ye={class:"sign_box"},Ce=Object(c["g"])("div",{class:"sign_title"},[Object(c["g"])("span",null,"LOGIN")],-1),Me={class:"sign_inner_box"},ke={class:"id_pw_form"},Pe={class:"insert_id"},Se=Object(c["g"])("span",{class:"id_label"},"ID",-1),Te=Object(c["i"])(),we={class:"insert_pw"},xe=Object(c["g"])("span",{class:"pw_label"},"PW",-1),$e=Object(c["i"])(),Re={class:"logins"},Le=Object(c["g"])("div",{class:"kakao_yellow"},[Object(c["g"])("span",{class:"kakao_label"},"KAKAO")],-1),Ee=Object(c["g"])("div",{class:"google_red"},[Object(c["g"])("span",{class:"google_label"},"GOOGLE")],-1),Be={class:"login_blue"},Ie=Object(c["h"])('<div class="logins_deco"><div class="logins_deco_social"><span class="social_label">social</span></div><div class="logins_deco_platform"><span class="platform_label">platform</span></div></div><div class="signupNpasswd"><span class="where_my_account">로그인에 문제가 있나요?</span></div><div class="partion_block"></div><div class="adver_section"><img class="adver_img" src="'+ve.a+'" alt=""><div class="adver_info"><span>123</span></div></div>',4);function De(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",me,[Object(c["g"])("div",he,[_e,Object(c["g"])("div",ye,[Ce,Object(c["g"])("div",Me,[Object(c["g"])("div",ke,[Object(c["g"])("div",Pe,[Se,Te,Object(c["J"])(Object(c["g"])("input",{class:"id_input_box",type:"textarea","onUpdate:modelValue":e[0]||(e[0]=function(t){return a.id=t})},null,512),[[c["F"],a.id]])]),Object(c["g"])("div",we,[xe,$e,Object(c["J"])(Object(c["g"])("input",{class:"pw_input_box",type:"password","onUpdate:modelValue":e[1]||(e[1]=function(t){return a.pw=t})},null,512),[[c["F"],a.pw]])])]),Object(c["g"])("div",Re,[Le,Ee,Object(c["g"])("div",Be,[Object(c["g"])("span",{class:"login_label",onClick:e[2]||(e[2]=function(t){return i.login()})},"로그인")])]),Ie])])])])}var Ae={name:"Login",data:function(){return{id:"",pw:""}},methods:{login:function(){var t=this,e={id:this.id,pw:this.pw};b.post("/engine/auth/login",e).then((function(e){"ok"==e.data?(t.$store.commit("gModalOn",{msg:"로그인되었습니다.",size:"small"}),t.$router.push("/")):t.$store.commit("gModalOn",{msg:e.data,size:"normal"})})).catch((function(t){console.error(t)}))}}};n("1350");const Ve=_()(Ae,[["render",De]]);var ze=Ve,Ne={class:"RouterView"},Je={key:0},Ue={key:1};function Fe(t,e,n,o,a,i){var s=Object(c["A"])("SelectType"),r=Object(c["A"])("InputPj");return Object(c["v"])(),Object(c["f"])("div",Ne,[null==a.type?(Object(c["v"])(),Object(c["f"])("div",Je,[Object(c["j"])(s,{onSelectType:i.inputType},null,8,["onSelectType"])])):(Object(c["v"])(),Object(c["f"])("div",Ue,[Object(c["j"])(r,{type:a.type},null,8,["type"])]))])}var We=n("db32"),He=n.n(We),Ke=n("0e5b"),qe=n.n(Ke),Ge=n("8302"),Ye=n.n(Ge),Qe={class:"select_type_frame"},Xe=Object(c["g"])("span",{class:"title_type"},"제작 유형을 선택하세요.",-1),Ze={class:"type_box"},tn=Object(c["g"])("div",{class:"novel_tag"},[Object(c["g"])("img",{class:"button_img_book",src:He.a}),Object(c["g"])("span",{class:"korean_tag"},"웹 소설"),Object(c["g"])("br"),Object(c["g"])("span",{class:"en_tag"},"Web Novel")],-1),en=[tn],nn=Object(c["h"])('<div class="novel_tag"><img class="button_img_visual" src="'+qe.a+'"><img class="button_img_play" src="'+Ye.a+'"><span class="korean_tag">비주얼 노벨</span><br><span class="en_tag">Visual Novel</span></div>',1),cn=[nn];function on(t,e,n,o,a,i){var s,r=this;return Object(c["v"])(),Object(c["f"])("div",{class:Object(c["p"])((s={},Object(M["a"])(s,"".concat(this.$store.state.sideBarFixed),!0),Object(M["a"])(s,"".concat(this.$store.state.sideBarMove),!0),s))},[Object(c["g"])("div",Qe,[Xe,Object(c["g"])("div",Ze,[Object(c["g"])("div",{class:"web_novel_button",onClick:e[0]||(e[0]=function(t){return r.$emit("selectType","W")})},en),Object(c["g"])("div",{class:"visual_novel_button",onClick:e[1]||(e[1]=function(t){return r.$emit("selectType","V")})},cn)])])],2)}var an={name:"SelectType"};n("98c1");const sn=_()(an,[["render",on]]);var rn=sn,ln={class:Object(c["p"])({RouterView:!0})},un={class:"create_pj_page_frame"},dn=Object(c["g"])("span",{class:"pj_info_type"},"프로젝트 정보를 입력하세요.",-1),bn={class:"create_pj_frame"},pn={class:"title_input_frame"},jn=Object(c["g"])("span",{class:"label_center"},"제목",-1),gn={class:"synopsis_input_frame"},On=Object(c["g"])("span",{class:"label_center"},"시놉시스",-1),fn={class:"create_button_frame"},vn=Object(c["g"])("span",null,"생성",-1),mn=[vn];function hn(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",ln,[Object(c["g"])("div",un,[dn,Object(c["g"])("div",bn,[Object(c["g"])("div",pn,[jn,Object(c["J"])(Object(c["g"])("input",{class:"title_input",type:"text","onUpdate:modelValue":e[0]||(e[0]=function(t){return a.title=t})},null,512),[[c["F"],a.title]])]),Object(c["g"])("div",gn,[On,Object(c["J"])(Object(c["g"])("textarea",{class:"synopsis_input","onUpdate:modelValue":e[1]||(e[1]=function(t){return a.synopsis=t})},null,512),[[c["F"],a.synopsis]])]),Object(c["g"])("div",fn,[Object(c["g"])("div",{class:"create_button",onClick:e[2]||(e[2]=function(t){return i.createPj()})},mn)])])])])}var _n={name:"InputPj",data:function(){return{title:"",synopsis:""}},methods:{createPj:function(){var t=this,e={type:this.type,title:this.title,synopsis:this.synopsis};b.post("/engine/pj/createNewPj",e).then((function(e){"ok"==e.data?(t.$store.commit("gModalOn",{msg:"새로운 프로젝트가 생성됐습니다.",size:"normal"}),t.$router.push("/")):(console.log(e),alert(e.data))})).catch((function(t){console.log(t)}))}},props:{type:String}};n("1ea7");const yn=_()(_n,[["render",hn]]);var Cn=yn,Mn={name:"CreateNewPj",data:function(){return{type:null}},methods:{inputType:function(t){this.type=t,console.log(t)}},components:{SelectType:rn,InputPj:Cn}};const kn=_()(Mn,[["render",Fe]]);var Pn=kn,Sn={class:"RouterView"},Tn={key:0},wn={key:1},xn={class:"editRouter"};function $n(t,e,n,o,a,i){var s=Object(c["A"])("WDevBoard"),r=Object(c["A"])("VDevBoard"),l=Object(c["A"])("router-view");return Object(c["v"])(),Object(c["f"])("div",Sn,[Object(c["g"])("div",null,[Object(c["i"])(" Project [ "+Object(c["C"])(a.title)+" ] 마지막 저장 : "+Object(c["C"])(a.retouchDate)+" 상태 : "+Object(c["C"])(a.status)+" ",1),Object(c["g"])("button",{onClick:e[0]||(e[0]=function(t){return i.goToEditPjInfo(a.pjCode)})},"프로젝트 정보수정"),Object(c["g"])("button",{onClick:e[1]||(e[1]=function(t){return i.goToInvitePj(a.pjCode)})},"유저 초대"),Object(c["g"])("button",{onClick:e[2]||(e[2]=function(t){return i.save()})},"저장")]),"W"==a.pjType?(Object(c["v"])(),Object(c["f"])("div",Tn,[Object(c["j"])(s,{pjType:a.pjType,WpjCode:a.pjCode},null,8,["pjType","WpjCode"])])):"V"==a.pjType?(Object(c["v"])(),Object(c["f"])("div",wn,[Object(c["j"])(r,{pjType:a.pjType,VpjCode:a.pjCode},null,8,["pjType","VpjCode"])])):Object(c["e"])("",!0),Object(c["g"])("div",xn,[Object(c["j"])(l)])])}var Rn=["innerHTML"];function Ln(t,e,n,o,a,i){var s=Object(c["A"])("WebNovelEditor");return Object(c["v"])(),Object(c["f"])(c["a"],null,[Object(c["g"])("button",{class:"btn btn-primary",onClick:e[0]||(e[0]=function(t){return i.exportToPDF()})},"PDF 변환"),Object(c["j"])(s,{onCommitContent:i.getContent},null,8,["onCommitContent"]),Object(c["g"])("div",{id:"preview",innerHTML:a.contentHTML,ref:"content"},null,8,Rn)],64)}var En={class:"Editor"};function Bn(t,e,n,o,a,i){var s=Object(c["A"])("quill-editor");return Object(c["v"])(),Object(c["f"])("div",null,[Object(c["g"])("button",{onClick:e[0]||(e[0]=function(t){return i.save()})},"저장"),Object(c["g"])("div",En,[Object(c["j"])(s,{innerHTML:a.loadData,value:o.state.content,"onUpdate:value":e[1]||(e[1]=function(t){return o.state.content=t}),options:o.state.editorOption,disabled:o.state.disabled,onChange:e[2]||(e[2]=function(t){return o.onEditorChange(t)})},null,8,["innerHTML","value","options","disabled"])])])}var In=n("e3c2"),Dn={name:"App",data:function(){return{loadData:""}},methods:{save:function(){this.$emit("commitContent",this.state._content)}},setup:function(){var t=Object(c["x"])({_content:"",editorOption:{placeholder:"",modules:{toolbar:[[],[],[],[],[],[],[],[],[],[],[],[],["bold","italic","underline"],[{indent:"-1"},{indent:"+1"}],[{size:[!1,"large","huge"]}],[{align:[]}],["image"],["clean"]]}},disabled:!1}),e=function(e){var n=e.quill,c=e.html,o=e.text;console.log("editor change!",n,c,o),t._content=c};return{state:t,onEditorChange:e}},components:{quillEditor:In["a"]}};n("19ca");const An=_()(Dn,[["render",Bn]]);var Vn=An,zn=n("d67e"),Nn=n.n(zn),Jn={name:"WDebBoard",created:function(){"W"==this.pjType&&console.log("웹소설 개발 페이지 진입")},data:function(){return{contentHTML:""}},methods:{getContent:function(t){this.contentHTML=t},viewContent:function(){console.log(this.contentHTML)},exportToPDF:function(){Nn()(this.$refs.content,{margin:.42,filename:"document.pdf",image:{type:"jpeg",quality:1.98},html2canvas:{dpi:192,letterRendering:!0},jsPDF:{orientation:"portrait",unit:"in",format:"a4"}})}},props:{pjType:String,WpjCode:String},components:{WebNovelEditor:Vn}};n("0c54");const Un=_()(Jn,[["render",Ln]]);var Fn=Un,Wn={key:0},Hn=Object(c["i"])(" 플롯 선택 "),Kn=Object(c["g"])("thead",null,[Object(c["g"])("th",null,"코드"),Object(c["g"])("th",null,"제목")],-1),qn={key:1,id:"devBoard"},Gn={class:"input-img"},Yn=["src"],Qn=Object(c["g"])("div",{id:"talkTable",contenteditable:"true",placeholder:"텍스트를 입력해보세요."},null,-1);function Xn(t,e,n,o,a,i){return null==a.selectPlot?(Object(c["v"])(),Object(c["f"])("div",Wn,[Object(c["g"])("div",null,[Hn,Object(c["g"])("table",null,[Kn,Object(c["g"])("tbody",null,[(Object(c["v"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(a.plotList,(function(t){return Object(c["v"])(),Object(c["f"])("tr",{key:t.PLOT_CODE},[Object(c["g"])("td",null,Object(c["C"])(t.PLOT_CODE),1),Object(c["g"])("td",null,Object(c["C"])(t.PLOT_TITLE),1)])})),128))])])])])):(Object(c["v"])(),Object(c["f"])("div",qn,[Object(c["g"])("div",Gn,[Object(c["J"])(Object(c["g"])("img",{src:a.imageSrc},null,8,Yn),[[c["G"],a.imageSrc]]),Object(c["J"])(Object(c["g"])("input",{type:"text",class:"form-control",placeholder:"드래그 앤 드롭으로 리소스를 올려보세요","onUpdate:modelValue":e[0]||(e[0]=function(t){return a.filename=t}),onDragover:e[1]||(e[1]=Object(c["K"])((function(){}),["prevent"])),onDragenter:e[2]||(e[2]=Object(c["K"])((function(){}),["prevent"])),onDrop:e[3]||(e[3]=Object(c["K"])((function(){return i.onDrop&&i.onDrop.apply(i,arguments)}),["prevent"])),readonly:""},null,544),[[c["F"],a.filename]])]),Qn]))}n("ac1f"),n("00b4"),n("b0c0");var Zn={name:"VDevBoard",created:function(){"V"==this.pjType&&this.getPlotList()},data:function(){return{selectPlot:null,exPlot:!1,title:"",plotList:[],filename:"",imageSrc:"",pageText:""}},methods:{getPlotList:function(){var t=this;b.post("/engine/pj/getPlotList",{pjCode:this.VpjCode}).then((function(e){console.log(e),"empty"!=e.data&&(t.exPlot=!0,t.plotList=e.data)})).catch((function(t){console.error(t)}))},createPlot:function(){var t=this;b.post("/engine/pj/createPlot",{pjCode:this.VpjCode,title:this.title}).then((function(e){"ok"==e.data&&(t.$store.commit("gModalOn",{msg:"새로운 플롯 생성.",size:"small"}),t.exPlot=!0,t.getPlotList())})).catch((function(t){console.error(t)}))},onDrop:function(t){this.inputImageFile(t.dataTransfer.files)},inputImageFile:function(t){if(t.length){var e=t[0];if(!/^image\//.test(e.type))return alert("이미지 파일만 등록이 가능"),!1;this.filename=e.name,this.preview(e)}},preview:function(t){var e=this,n=new FileReader;n.onload=function(){e.imageSrc=n.result},n.readAsDataURL(t)}},props:{pjType:String,VpjCode:String}};n("eb9b");const tc=_()(Zn,[["render",Xn]]);var ec=tc,nc={name:"devPage",created:function(){this.pjCode=this.$route.params.pjCode,this.getPjInfo(this.pjCode)},watch:{$route:function(){this.getPjInfo(this.pjCode)}},data:function(){return{pjType:"",pjCode:"",title:"",retouchDate:"",status:""}},methods:{getPjInfo:function(){var t=this;b.post("/engine/pj/getPjInfo",{pjCode:this.pjCode}).then((function(e){"err"==e.data?t.$store.commit("gModalOn","프로젝트 정보를 불러오는데 실패했습니다.","normal"):(t.title=e.data.PROJ_TITLE,t.retouchDate=e.data.PROJ_RETOUCHDATE,t.status=e.data.PROJ_STATUS,t.pjType=e.data.PROJ_TYPE)})).catch((function(t){console.error(t)}))},goToEditPjInfo:function(t){this.$router.push("/devPage/".concat(t,"/editInfo"))},goToInvitePj:function(t){this.$router.push("/devPage/".concat(t,"/invitePj"))},save:function(){var t=this;b.patch("/engine/pj/devSave",{pjCode:this.pjCode}).then((function(e){"ok"==e.data.msg?(t.$store.commit("gModalOn",{msg:"저장되었습니다.",size:"small"}),t.retouchDate=e.data.date):t.$store.commit("gModalOn",{msg:"ERR : 프로젝트 저장 실패",size:"normal"})}))}},components:{WDevBoard:Fn,VDevBoard:ec}};n("d9bd");const cc=_()(nc,[["render",$n]]);var oc=cc,ac={class:"RouterView"},ic=Object(c["i"])(" 프로젝트 상태변경 "),sc=Object(c["g"])("option",{value:"D"},"개발중",-1),rc=Object(c["g"])("option",{value:"S"},"배포",-1),lc=Object(c["g"])("option",{value:"P"},"개발중단",-1),uc=[sc,rc,lc],dc=Object(c["i"])(),bc=Object(c["g"])("br",null,null,-1),pc=Object(c["i"])(),jc=Object(c["g"])("br",null,null,-1),gc=Object(c["i"])(),Oc=Object(c["g"])("br",null,null,-1),fc=Object(c["i"])(),vc=Object(c["g"])("br",null,null,-1);function mc(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",ac,[ic,Object(c["J"])(Object(c["g"])("select",{"onUpdate:modelValue":e[0]||(e[0]=function(t){return a.status=t})},uc,512),[[c["E"],a.status]]),dc,bc,Object(c["J"])(Object(c["g"])("input",{type:"text",placeholder:"제목","onUpdate:modelValue":e[1]||(e[1]=function(t){return a.title=t})},null,512),[[c["F"],a.title]]),pc,jc,Object(c["J"])(Object(c["g"])("textarea",{cols:"40",rows:"10","onUpdate:modelValue":e[2]||(e[2]=function(t){return a.synopsis=t})},null,512),[[c["F"],a.synopsis]]),gc,Oc,Object(c["g"])("button",{onClick:e[3]||(e[3]=function(t){return i.saveEdit()})},"수정하기"),fc,vc,Object(c["g"])("button",{onClick:e[4]||(e[4]=function(t){return i.deletePj()})},"프로젝트 삭제")])}var hc={name:"EditPjInfo",created:function(){this.pjCode=this.$route.params.pjCode,this.getPjInfo(this.pjCode)},data:function(){return{pjCode:"",status:"",title:"",synopsis:""}},methods:{getPjInfo:function(){var t=this;i.a.post("/engine/pj/getPjInfo",{pjCode:this.pjCode}).then((function(e){"err"==e.data?t.$store.commit("gModalOn",{msg:"프로젝트 정보 불러오기를 실패했습니다.",size:"normal"}):(t.status=e.data.PROJ_STATUS,t.title=e.data.PROJ_TITLE,t.synopsis=e.data.PROJ_SYNOPSIS)})).catch((function(t){console.error(t)}))},saveEdit:function(){var t=this,e={pjCode:this.pjCode,status:this.status,title:this.title,synopsis:this.synopsis};i.a.patch("/engine/pj/editPjInfo",e).then((function(e){"ok"==e.data?(t.$store.commit("gModalOn",{msg:"수정되었습니다.",size:"small"}),t.$router.push("/devPage/".concat(t.pjCode))):t.$store.commit("gModalOn",{msg:"ERR : 프로젝트 수정 실패.",size:"small"})})).catch((function(t){console.error(t)}))},deletePj:function(){var t=this;this.$store.commit("cModalOn",{msg:"프로젝트 [".concat(this.title,"]를 삭제하시겠습니까?"),size:"normal",btn1:"확인",btn2:"취소"}),1==this.$store.state.cModalAnswer&&(console.log(this.$store.state.cModalAnswer),i.a.post("/engine/pj/deletePj",{pjCode:this.pjCode}).then((function(e){"ok"==e.data?(t.$store.commit("gModalOn",{msg:"프로젝트가 삭제되었습니다.",size:"normal"}),t.$router.push("/")):t.$store.commit("gModalOn",{msg:"ERR : 삭제를 실패했습니다.",size:"normal"})})).catch((function(t){console.error(t)})))}}};const _c=_()(hc,[["render",mc]]);var yc=_c,Cc={class:"RouterView"},Mc=Object(c["g"])("option",{value:"I",selected:""},"아이디",-1),kc=Object(c["g"])("option",{value:"N"},"닉네임",-1),Pc=[Mc,kc],Sc=Object(c["i"])(),Tc={border:"2px"},wc=Object(c["g"])("thead",null,[Object(c["g"])("th",null,"ID"),Object(c["g"])("th",null,"닉네임"),Object(c["g"])("th",null,"초대하기")],-1),xc=["id"],$c=["onClick","disabled"];function Rc(t,e,n,o,a,i){return Object(c["v"])(),Object(c["f"])("div",Cc,[Object(c["g"])("div",null,[Object(c["J"])(Object(c["g"])("select",{"onUpdate:modelValue":e[0]||(e[0]=function(t){return a.searchType=t})},Pc,512),[[c["E"],a.searchType]]),Object(c["J"])(Object(c["g"])("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=function(t){return a.searchKeyword=t})},null,512),[[c["F"],a.searchKeyword]]),Sc,Object(c["g"])("button",{onClick:e[2]||(e[2]=function(t){return i.userSearch()})},"유저 검색"),Object(c["g"])("table",Tc,[wc,Object(c["g"])("tbody",null,[(Object(c["v"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(a.userList,(function(t){return Object(c["v"])(),Object(c["f"])("tr",{key:t.USER_ID},[Object(c["g"])("td",{id:t.USER_ID},Object(c["C"])(t.USER_ID),9,xc),Object(c["g"])("td",null,Object(c["C"])(t.USER_NICKNAME),1),Object(c["g"])("td",null,[Object(c["g"])("button",{onClick:function(e){return i.inviteUser(t.USER_ID)},disabled:a.isInvite==t.USER_ID},"초대",8,$c)])])})),128))])]),Object(c["g"])("button",{onClick:e[3]||(e[3]=function(t){return i.back()})},"돌아가기")])])}var Lc={name:"InvitePj",created:function(){this.pjCode=this.$route.params.pjCode,console.log(this.pjCode)},data:function(){return{pjCode:"",searchKeyword:"",searchType:"I",userList:[],isInvite:""}},methods:{userSearch:function(){var t=this,e={searchKeyword:this.searchKeyword,searchType:this.searchType};b.post("/engine/user/search",e).then((function(e){"empty"!=e.data?t.userList=e.data:t.$store.commit("gModalOn",{msg:"조건에 맞는 유저를 찾지 못했습니다.",size:"normal"})})).catch((function(t){console.error(t)}))},inviteUser:function(t){var e=this,n={userId:t,pjCode:this.pjCode};b.post("/engine/team/inviteUser",n).then((function(n){"ok"==n.data?(e.$store.commit("gModalOn",{msg:"유저 [".concat(t,"]님을 초대하였습니다."),size:"small"}),e.isInvite=t):"already"==n.data?e.$store.commit("gModalOn",{msg:"이미 초대한 유저입니다.",size:"small"}):e.$store.commit("gModalOn",{msg:"ERR : 유저 초대 실패",size:"small"})}))},back:function(){this.$router.push("/devPage/".concat(this.pjCode))}}};const Ec=_()(Lc,[["render",Rc]]);var Bc=Ec,Ic=[{path:"/",component:je},{path:"/signin",component:ze},{path:"/createNewPj",component:Pn,children:[{path:"invitePj",component:Bc}]},{path:"/devPage/:pjCode",component:oc,children:[{path:"editInfo",component:yc},{path:"invitePj",component:Bc}]}],Dc=Object(Pt["a"])({history:Object(Pt["b"])(),routes:Ic}),Ac=Dc,Vc=n("953d"),zc=n.n(Vc),Nc=Object(c["c"])(kt);Nc.use(Ac).use(l).use(zc.a).mount("#app")},"5d75":function(t,e,n){t.exports=n.p+"img/home.1e591cc4.png"},"62f2":function(t,e,n){t.exports=n.p+"img/background_two.bb500cf3.png"},"648e":function(t,e,n){},"7ab0":function(t,e,n){},"7ca7":function(t,e,n){t.exports=n.p+"img/folder.ce3daeb4.png"},8302:function(t,e,n){t.exports=n.p+"img/youtube.caa7ae57.png"},"84c0":function(t,e,n){"use strict";n("8d09")},8797:function(t,e,n){"use strict";n("2c60")},"8d09":function(t,e,n){},"903e":function(t,e,n){"use strict";n("2667")},9349:function(t,e,n){"use strict";n("f304")},9823:function(t,e,n){},"98c1":function(t,e,n){"use strict";n("ccc4")},9994:function(t,e,n){t.exports=n.p+"img/comment_two.211df528.png"},"9f38":function(t,e,n){t.exports=n.p+"img/notification.ca88e736.png"},b062:function(t,e,n){t.exports=n.p+"img/gear.60bf9b8d.png"},b0ac:function(t,e,n){t.exports=n.p+"img/magnifier.7c2646f8.png"},b73c:function(t,e,n){"use strict";n("467e")},c770:function(t,e,n){t.exports=n.p+"img/clapperboard.5235259f.png"},ccc4:function(t,e,n){},d9bd:function(t,e,n){"use strict";n("3e55")},db32:function(t,e,n){t.exports=n.p+"img/book.fed318ca.png"},e208:function(t,e,n){},e236:function(t,e,n){t.exports=n.p+"img/vsn_engine.7a106c65.png"},e9fe:function(t,e,n){},eb9b:function(t,e,n){"use strict";n("648e")},ec04:function(t,e,n){"use strict";n("4b6d")},ee80:function(t,e,n){},f304:function(t,e,n){},f8c4:function(t,e,n){}});
//# sourceMappingURL=app.7e6b8c2b.js.map