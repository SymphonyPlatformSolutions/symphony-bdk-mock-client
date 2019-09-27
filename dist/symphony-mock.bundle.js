!function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=154)}({154:function(e,n,t){"use strict";function i(e){this.name=e,this.events={},this.reflectors={},this.eventId=0,this.publish=this.callfire,this.subscribe=this.listen,this.unsubscribe=this.remove,this.unlisten=this.remove,this.invoke=this.callfire,this.invokeArgs=this.fireArgs,this.methods=[],this.tight=!0}t.r(n),i.prototype={setType:function(e){e.forEach(function(e){this[e]=this.invoke.bind(this,e),this.methods.push(e)},this)},callfire:function(){return this.fire.apply(this,arguments)},loosen:function(e){this[e]=this.invoke.bind(this,e)},loosenAll:function(){this.tight=!1,this.methods.forEach(function(e){this.loosen(e)},this)},implementOne:function(e,n){var t="".concat(e,"_e_");this.events[t]||(this.listen(e,n),this.tight?this[e]=n:this[e]=this.invoke.bind(this,e),this.methods.push(e))},implement:function(e,n){if("string"!=typeof e){var t=e;for(var e in t)if(t.hasOwnProperty(e)){n=t[e];this.implementOne(e,n.bind(this))}}else this.implementOne(e,n)},listen:function(e,n){e+="_e_";var t=this.events[e];null==t?(t={},this.events[e]=t):this.loosen(e);var i="event_".concat(this.eventId);return this.eventId++,t[i]=n,i},bubble:function(e,n){e.listen(n,function(){var e=Array.prototype.slice.call(arguments);e.unshift(n),this.fire.apply(this,e)}.bind(this))},remove:function(e,n){e+="_e_";var t=this.events[e];null!=t&&(""===n?t={}:delete t[n])},removeAll:function(e){e+="_e_",this.events[e]={}},getEventCount:function(e){e+="_e_";var n=this.events[e];return null==n?0:_.size(n)},fire:function(e){e+="_e_";var n,t=Array.prototype.slice.call(arguments,1),i=this.events[e];if(null!=i){for(var o in i)if(i.hasOwnProperty(o)){var r=i[o],s=r.apply(this,t);void 0===n&&void 0!==s&&(n=s)}return n}},fireArgs:function(e,n){return n.unshift(e),result=this.fire.apply(this,n),n.shift(e),result},reflect:function(e,n){var t;this.reflectors[e]=this.reflectors[e]||[],(t=this.reflectors[e]).length||this.listen(e,onReflect.bind(this,e)),t.push(n)},onReflect:function(e){var n=Array.prototype.slice.call(arguments,1),t=this.reflectors[e];t&&t.forEach(function(t){t.fireArgs(e,n)},this)}};var o=i,r=t(6),s=t.n(r),c=t(37),a=t.n(c),u=t(38),l=t.n(u),f=t(4),h=t.n(f),d={"single-user-im":"IM","multi-user-im":"MIM",room:"ROOM"},m=new(function(){function e(){a()(this,e),h()(this,"madeServices",[]),h()(this,"implementation",{}),h()(this,"uiButtons",{IM:[],MIM:[],ROOM:[]}),h()(this,"modalHandler",void 0)}return l()(e,[{key:"addToMadeServices",value:function(e){this.madeServices.push(e)}},{key:"setModalHandler",value:function(e){this.modalHandler=e}},{key:"getMadeServices",value:function(){return this.madeServices}},{key:"getModalHandler",value:function(){return this.modalHandler}},{key:"addUiButton",value:function(e,n,t,i){d[e]&&(this.uiButtons[d[e]].find(function(e){return e.id===n})||(this.uiButtons[d[e]].push(s()({},i,{id:n})),console.log("ADDED BUTTON",n)))}},{key:"getUiButtons",value:function(){return this.uiButtons}},{key:"setImplementation",value:function(e){this.implementation=s()({},this.implementation,e)}},{key:"getImplementation",value:function(){return this.implementation}}]),e}()),g=[{name:"Room A",threadId:"abc/def//ghi+jkl==",memberAddUserEnabled:!0,userIsOwner:!0,publicRoom:!1},{name:"Room B",threadId:"abc/def//ghi+123==",memberAddUserEnabled:!1,userIsOwner:!1,publicRoom:!1},{name:"Room C",threadId:"abc/def//ghi+456==",memberAddUserEnabled:!0,userIsOwner:!1,publicRoom:!0}],p=new Map,v={id:0,name:"Cpt. Jean Luc Picard"},b={id:2,name:"2nd Officer LT commander Data"};p.set("abc_def__ghi-jkl",[v,b]),p.set("abc_def__ghi-123",[v]),p.set("abc_def__ghi-456",[v,{id:1,name:"1st officer William Riker"},b,{id:3,name:"Chief Engineer Lt. La forge"}]);var y="entity",w="ui",O="applications-nav",k="dialogs",A="theme-watcher",M="themes",S="account",I="extended-user-info";window.env={};var R={isMock:!0,mockHelper:m,services:{makeAnonymousService:function(){return new o},register:function(e){return console.info("Registering service -> ".concat(e)),{implement:function(e){console.info("App Service implements called"),console.log(e);for(var n=arguments.length,t=new Array(n>1?n-1:0),i=1;i<n;i++)t[i-1]=arguments[i];console.log(t),m.setImplementation(e)}}},make:function(e,n){console.info("Service make-> ".concat(e),m.getMadeServices()),m.addToMadeServices({name:e,instance:n})},unsubscribe:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("unsubscribing -> ".concat(n))},subscribe:function(e){switch(console.info("Subscribing to module -> ".concat(e)),e){case y:return{registerRenderer:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Registering Entity -> ".concat(n))}};case w:return{registerExtension:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Registering Entity -> ".concat(n)),m.addUiButton.apply(m,n)},listen:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Listening to ui entity subscription -> ".concat(n))}};case k:return{show:function(e,n,t){var i=t.match(/src="(.*?)"/)[1].replace(/^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/,"$1"),o=t.match(/width="(.*?)"/)[1],r=t.match(/height="(.*?)"/)[1];window.dispatchEvent(new CustomEvent("openDialog",{detail:{url:i,width:o,height:r},bubbles:!0,cancelable:!0})),console.warn("Requesting to open dialog named as -> ".concat(e))},close:function(){var e=m.getModalHandler();e&&setTimeout(e,50)}};case O:return{add:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Registering Entity -> ".concat(n))}};case A:return{getTheme:function(){return"light"}};case M:return{getActiveThemeInfo:function(){return{contrast:""}}};case S:return{getPodId:function(){return""},getDesktopSettings:function(){return{activeMode:"",fontSize:"normal"}}};case I:return{getJwt:function(){return console.info("Getting mocked jwt"),new Promise(function(e){return e("mocked-jwt")})}};default:return{listen:function(e){console.info("Registered Listener to -> ".concat(e))},addMenuItem:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Adding menu Items [".concat(n.join(","),"]"))},setHandler:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.info("Setting Handler Items [".concat(n.join(","),"]"))},getRooms:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.info("Getting rooms for [".concat(n.join(","),"]")),new Promise(function(e){return e(g)})}}}}},remote:{hello:function(){console.log("Calling Symphony Remote Hello");var e=localStorage.getItem("theme-name");return new Promise(function(n){return n({pod:1234,themeV2:{name:e||"LIGHT",size:"18px"}})})},isMock:!0},application:{connect:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.log("Connecting application ".concat(n)),new Promise(function(e){return e({userReferenceId:"MockedUser"})})},register:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.info("Registering application ".concat(n)),new Promise(function(e){return e({userReferenceId:"MockedUser"})})}},getContacts:function(e){return console.info("Getting contacts for room [".concat(e,"]")),new Promise(function(n){return n(p.get(e))})},chats:[{id:0,label:"CHATS",hasAdd:!0,list:[{id:0,status:!1,text:"Commander Willian Riker",icon:null},{id:1,status:!0,text:"LT Commander Data",icon:null},{id:2,status:!0,text:"LT La Forge",icon:null},{id:3,status:!1,text:"LT Worf",icon:null},{id:4,status:!1,text:"Counselor Troi",icon:null},{id:5,status:!1,text:"Commander Willian Riker, LT Commander Data, LT La forge, LT La Worf, Counselor Troi",icon:null}]}]};window.SYMPHONY=Object.assign({},window.SYMPHONY,R)},37:function(e,n){e.exports=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},38:function(e,n){function t(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}e.exports=function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}},4:function(e,n){e.exports=function(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}},6:function(e,n,t){var i=t(4);e.exports=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){i(e,n,t[n])})}return e}}});