!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=153)}({153:function(e,t,n){"use strict";function i(e){this.name=e,this.events={},this.reflectors={},this.eventId=0,this.publish=this.callfire,this.subscribe=this.listen,this.unsubscribe=this.remove,this.unlisten=this.remove,this.invoke=this.callfire,this.invokeArgs=this.fireArgs,this.methods=[],this.tight=!0}n.r(t),i.prototype={setType:function(e){e.forEach(function(e){this[e]=this.invoke.bind(this,e),this.methods.push(e)},this)},callfire:function(){return this.fire.apply(this,arguments)},loosen:function(e){this[e]=this.invoke.bind(this,e)},loosenAll:function(){this.tight=!1,this.methods.forEach(function(e){this.loosen(e)},this)},implementOne:function(e,t){var n="".concat(e,"_e_");this.events[n]||(this.listen(e,t),this.tight?this[e]=t:this[e]=this.invoke.bind(this,e),this.methods.push(e))},implement:function(e,t){if("string"!=typeof e){var n=e;for(var e in n)if(n.hasOwnProperty(e)){t=n[e];this.implementOne(e,t.bind(this))}}else this.implementOne(e,t)},listen:function(e,t){e+="_e_";var n=this.events[e];null==n?(n={},this.events[e]=n):this.loosen(e);var i="event_".concat(this.eventId);return this.eventId++,n[i]=t,i},bubble:function(e,t){e.listen(t,function(){var e=Array.prototype.slice.call(arguments);e.unshift(t),this.fire.apply(this,e)}.bind(this))},remove:function(e,t){e+="_e_";var n=this.events[e];null!=n&&(""===t?n={}:delete n[t])},removeAll:function(e){e+="_e_",this.events[e]={}},getEventCount:function(e){e+="_e_";var t=this.events[e];return null==t?0:_.size(t)},fire:function(e){e+="_e_";var t,n=Array.prototype.slice.call(arguments,1),i=this.events[e];if(null!=i){for(var o in i)if(i.hasOwnProperty(o)){var r=i[o],s=r.apply(this,n);void 0===t&&void 0!==s&&(t=s)}return t}},fireArgs:function(e,t){return t.unshift(e),result=this.fire.apply(this,t),t.shift(e),result},reflect:function(e,t){var n;this.reflectors[e]=this.reflectors[e]||[],(n=this.reflectors[e]).length||this.listen(e,onReflect.bind(this,e)),n.push(t)},onReflect:function(e){var t=Array.prototype.slice.call(arguments,1),n=this.reflectors[e];n&&n.forEach(function(n){n.fireArgs(e,t)},this)}};var o=i,r=[{name:"Room A",threadId:"abc/def//ghi+jkl==",memberAddUserEnabled:!0,userIsOwner:!0,publicRoom:!1},{name:"Room B",threadId:"abc/def//ghi+123==",memberAddUserEnabled:!1,userIsOwner:!1,publicRoom:!1},{name:"Room C",threadId:"abc/def//ghi+456==",memberAddUserEnabled:!0,userIsOwner:!1,publicRoom:!0}],s=new Map,c={id:0,name:"Cpt. Jean Luc Picard"},a={id:2,name:"2nd Officer LT commander Data"};s.set("abc_def__ghi-jkl",[c,a]),s.set("abc_def__ghi-123",[c]),s.set("abc_def__ghi-456",[c,{id:1,name:"1st officer William Riker"},a,{id:3,name:"Chief Engineer Lt. La forge"}]);var l="entity",u="ui",f="applications-nav",h="dialogs",d="theme-watcher",m="themes",g="account",v="extended-user-info",p=[];window.env={};var b={services:{makeAnonymousService:function(){return new o},madeServices:p,register:function(e){return console.info("Registering service -> ".concat(e)),{implement:function(){console.info("App Service implements called")}}},make:function(e,t){console.info("Service make-> ".concat(e),p),p.push({name:e,instance:t})},unsubscribe:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("unsubscribing -> ".concat(t))},subscribe:function(e){switch(console.info("Subscribing to module -> ".concat(e)),e){case l:return{registerRenderer:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Registering Entity -> ".concat(t))}};case u:return{registerExtension:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Registering Entity -> ".concat(t))},listen:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Listening to ui entity subscription -> ".concat(t))}};case h:return{show:function(e,t,n){var i=n.match(/src=\"(.*?)\"/)[1].replace(/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/,"$1"),o=n.match(/width=\"(.*?)\"/)[1],r=n.match(/height=\"(.*?)\"/)[1];window.dispatchEvent(new CustomEvent("openDialog",{detail:{url:i,width:o,height:r},bubbles:!0,cancelable:!0})),console.warn("Requesting to open dialog named as -> ".concat(e))}};case f:return{add:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Registering Entity -> ".concat(t))}};case d:return{getTheme:function(){return"light"}};case m:return{getActiveThemeInfo:function(){return{contrast:""}}};case g:return{getPodId:function(){return""},getDesktopSettings:function(){return{activeMode:"",fontSize:"normal"}}};case v:return{getJwt:function(){return console.info("Getting mocked jwt"),new Promise(function(e){return e("mocked-jwt")})}};default:return{listen:function(e,t){console.info("Registered Listener to -> ".concat(e))},addMenuItem:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Adding menu Items [".concat(t.join(","),"]"))},setHandler:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];console.info("Setting Handler Items [".concat(t.join(","),"]"))},getRooms:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return console.info("Getting rooms for [".concat(t.join(","),"]")),new Promise(function(e){return e(r)})}}}}},remote:{hello:function(){console.log("Calling Symphony Remote Hello");var e=localStorage.getItem("theme-name");return new Promise(function(t){return t({themeV2:{name:e||"light",size:"18px"}})})}},application:{connect:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return console.log("Connecting application ".concat(t)),new Promise(function(e){return e({userReferenceId:"MockedUser"})})},register:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return console.info("Registering application ".concat(t)),new Promise(function(e){return e({userReferenceId:"MockedUser"})})}},getContacts:function(e){return console.info("Getting contacts for room [".concat(e,"]")),new Promise(function(t){return t(s.get(e))})},chats:[{id:0,label:"CHATS",hasAdd:!0,list:[{id:0,status:!1,text:"Commander Willian Riker",icon:null},{id:1,status:!0,text:"LT Commander Data",icon:null},{id:2,status:!0,text:"LT La Forge",icon:null},{id:3,status:!1,text:"LT Worf",icon:null},{id:4,status:!1,text:"Counselor Troi",icon:null},{id:5,status:!1,text:"Commander Willian Riker, LT Commander Data, LT La forge, LT La Worf, Counselor Troi",icon:null}]},{id:1,label:"SIGNALS",hasAdd:!0,list:[{id:0,status:null,text:"Keywords",icon:null},{id:1,status:null,text:"All Following",icon:null}]},{id:2,label:"APPLICATIONS",hasAdd:!0,list:[{id:0,status:null,text:"Symphony Market",icon:null},{id:1,status:null,text:"Sample App",icon:"/assets/white-label.png"}]},{id:3,label:"INVITES",hasAdd:!0,list:[{id:0,status:null,text:"Create Team",icon:null},{id:1,status:null,text:"Invite Contacts",icon:null}]}]};console.log("Service make-> ",window.SYMPHONY.services.madeServices,window.SYMPHONY),window.SYMPHONY=Object.assign({},window.SYMPHONY,b)}});