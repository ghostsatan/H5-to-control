"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function l(a,b){return j(new(j(function(){},{prototype:a})),b)}function m(a){return i(arguments,function(b){b!==a&&i(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function n(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function o(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function p(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function q(a,b,c,d){var f,e=n(c,d),g={},h=[];for(var i in e)if(e[i].params&&(f=o(e[i].params),f.length))for(var k in f)p(h,f[k])>=0||(h.push(f[k]),g[f[k]]=a[f[k]]);return j({},g,b)}function r(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function s(a,b){var c={};return i(a,function(a){c[a]=b[a]}),c}function v(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==p(c,d)&&(b[d]=a[d]);return b}function x(a,b){var c=h(a),d=c?[]:{};return i(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function y(a,b){var c=h(a)?[]:{};return i(a,function(a,d){c[d]=b(a,d)}),c}function z(a,b){var e=1,h=2,k={},l=[],n=k,q=j(a.when(k),{$$promises:k,$$values:k});this.study=function(k){function w(a,c){if(u[c]!==h){if(t.push(c),u[c]===e)throw t.splice(0,p(t,c)),new Error("Cyclic dependency: "+t.join(" -> "));if(u[c]=e,f(a))s.push(c,[function(){return b.get(a)}],l);else{var d=b.annotate(a);i(d,function(a){a!==c&&k.hasOwnProperty(a)&&w(k[a],a)}),s.push(c,a,d)}t.pop(),u[c]=h}}function x(a){return g(a)&&a.then&&a.$$promises}if(!g(k))throw new Error("'invocables' must be an object");var r=o(k||{}),s=[],t=[],u={};return i(k,w),k=t=u=null,function(e,f,h){function w(){--t||(u||m(p,f.$$values),l.$$values=p,l.$$promises=l.$$promises||!0,delete l.$$inheritedValues,k.resolve(p))}function y(a){l.$$failure=a,k.reject(a)}function B(c,f,g){function m(a){j.reject(a),y(a)}function n(){if(!d(l.$$failure))try{j.resolve(b.invoke(f,h,p)),j.promise.then(function(a){p[c]=a,w()},m)}catch(a){m(a)}}var j=a.defer(),k=0;i(g,function(a){o.hasOwnProperty(a)&&!e.hasOwnProperty(a)&&(k++,o[a].then(function(b){p[a]=b,--k||n()},m))}),k||n(),o[c]=j.promise}if(x(e)&&h===c&&(h=f,f=e,e=null),e){if(!g(e))throw new Error("'locals' must be an object")}else e=n;if(f){if(!x(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=q;var k=a.defer(),l=k.promise,o=l.$$promises={},p=j({},e),t=1+s.length/3,u=!1;if(d(f.$$failure))return y(f.$$failure),l;f.$$inheritedValues&&m(p,v(f.$$inheritedValues,r)),j(o,f.$$promises),f.$$values?(u=m(p,v(f.$$values,r)),l.$$inheritedValues=v(f.$$values,r),w()):(f.$$inheritedValues&&(l.$$inheritedValues=v(f.$$inheritedValues,r)),f.then(w,y));for(var z=0,A=s.length;A>z;z+=3)e.hasOwnProperty(s[z])?w():B(s[z],s[z+1],s[z+2]);return l}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function A(a,b,c){this.fromConfig=function(a,b,c){return d(a.template)?this.fromString(a.template,b):d(a.templateUrl)?this.fromUrl(a.templateUrl,b):d(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return e(a)?a(b):a},this.fromUrl=function(c,d){return e(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function C(a,b,d){function q(b,c,d,e){if(p.push(b),n[b])return n[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(o[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return o[b]=new B.Param(b,c,d,e),o[b]}function r(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function s(c,d){var e,f,g,h,j;return e=c[2]||c[3],j=b.params[e],g=a.substring(i,c.index),f=d?c[4]:c[4]||("*"==c[1]?".*":null),h=B.type(f||"string")||l(B.type("string"),{pattern:new RegExp(f)}),{id:e,regexp:f,segment:g,type:h,cfg:j}}b=j({params:{}},g(b)?b:{});var k,e=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,h="^",i=0,m=this.segments=[],n=d?d.params:{},o=this.params=d?d.params.$$new():new B.ParamSet,p=[];this.source=a;for(var t,u,v;(k=e.exec(a))&&(t=s(k,!1),!(t.segment.indexOf("?")>=0));)u=q(t.id,t.type,t.cfg,"path"),h+=r(t.segment,u.type.pattern.source,u.squash),m.push(t.segment),i=e.lastIndex;v=a.substring(i);var w=v.indexOf("?");if(w>=0){var x=this.sourceSearch=v.substring(w);if(v=v.substring(0,w),this.sourcePath=a.substring(0,i+w),x.length>0)for(i=0;k=f.exec(x);)t=s(k,!0),u=q(t.id,t.type,t.cfg,"search"),i=e.lastIndex}else this.sourcePath=a,this.sourceSearch="";h+=r(v)+(b.strict===!1?"/?":"")+"$",m.push(v),this.regexp=new RegExp(h,b.caseInsensitive?"i":c),this.prefix=m[0],this.$$paramNames=p}function D(a){j(this,a)}function E(){function n(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function q(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function r(a){return this.pattern.test(a)}function z(){return{strict:k,caseInsensitive:a}}function A(a){return e(a)||h(a)&&e(a[a.length-1])}function F(){for(;u.length;){var a=u.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(s[a.name],v.invoke(a.def))}}function G(a){j(this,a||{})}B=this;var v,a=!1,k=!0,m=!1,s={},t=!0,u=[],w={string:{encode:n,decode:q,is:r,pattern:/[^/]*/},"int":{encode:n,decode:function(a){return parseInt(a,10)},is:function(a){return d(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};E.$$getDefaultValue=function(a){if(!A(a.value))return a.value;if(!v)throw new Error("Injectable functions cannot be called at configuration time");return v.invoke(a.value)},this.caseInsensitive=function(b){return d(b)&&(a=b),a},this.strictMode=function(a){return d(a)&&(k=a),k},this.defaultSquashPolicy=function(a){if(!d(a))return m;if(a!==!0&&a!==!1&&!f(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return m=a,a},this.compile=function(a,b){return new C(a,j(z(),b))},this.isMatcher=function(a){if(!g(a))return!1;var b=!0;return i(C.prototype,function(c,f){e(c)&&(b=b&&d(a[f])&&e(a[f]))}),b},this.type=function(a,b,c){if(!d(b))return s[a];if(s.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return s[a]=new D(j({name:a},b)),c&&(u.push({name:a,def:c}),t||F()),this},i(w,function(a,b){s[b]=new D(j({name:b},a))}),s=l(s,{}),this.$get=["$injector",function(a){return v=a,t=!1,F(),i(w,function(a,b){s[b]||(s[b]=new D(a))}),this}],this.Param=function(a,b,e,i){function t(a){var b=g(a)?o(a):[],c=-1===p(b,"value")&&-1===p(b,"type")&&-1===p(b,"squash")&&-1===p(b,"array");return c&&(a={value:a}),a.$$fn=A(a.value)?a.value:function(){return a.value},a}function u(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof D?b.type:new D(b.type):"config"===d?s.any:s.string}function w(){var b={array:"search"===i?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return j(b,c,e).array}function z(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!d(c)||null==c)return m;if(c===!0||f(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function B(a,b,d,e){var g,i,j=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return g=h(a.replace)?a.replace:[],f(e)&&g.push({from:e,to:c}),i=y(g,function(a){return a.from}),x(j,function(a){return-1===p(i,a.from)}).concat(g)}function C(){if(!v)throw new Error("Injectable functions cannot be called at configuration time");return v.invoke(e.$$fn)}function E(a){function b(a){return function(b){return b.from===a}}function c(a){var c=y(x(k.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),d(a)?k.type.decode(a):C()}function F(){return"{Param:"+a+" "+b+" squash: '"+q+"' optional: "+n+"}"}var k=this;e=t(e),b=u(e,b,i);var l=w();b=l?b.$asArray(l,"search"===i):b,"string"!==b.name||l||"path"!==i||e.value!==c||(e.value="");var n=e.value!==c,q=z(e,n),r=B(e,l,n,q);j(this,{id:a,type:b,location:i,array:l,squash:q,replace:r,isOptional:n,value:E,dynamic:c,config:e,toString:F})},G.prototype={$$new:function(){return l(this,j(new G,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=o(G.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),i(b,function(b){i(o(b),function(b){-1===p(a,b)&&-1===p(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return i(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return i(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var c,d,e,b=!0,f=this;return i(this.$$keys(),function(g){e=f[g],d=a[g],c=!d&&e.isOptional,b=b&&(c||!!e.type.is(d))}),b},$$parent:c},this.ParamSet=G}function F(a,g){function n(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function o(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function p(a,b,c){if(!c)return!1;var e=a.invoke(b,b,{$match:c});return d(e)?e:!0}function q(d,e,g,h){function p(a,b,c){return"/"===j?a:b?j.slice(0,-1)+a:c?j.slice(1)+a:a}function q(a){function e(a){var b=a(g,d);return b?(f(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var b=o&&d.url()===o;if(o=c,b)return!0;var j,h=i.length;for(j=0;h>j;j++)if(e(i[j]))return;k&&e(k)}}function r(){return m=m||e.$on("$locationChangeSuccess",q)}var o,j=h.baseHref(),n=d.url();return l||r(),{sync:function(){q()},listen:function(){return r()},update:function(a){return a?(n=d.url(),void 0):(d.url()!==n&&(d.url(n),d.replace()),void 0)},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var h=c.format(e);if(f=f||{},g||null===h||(h="#"+a.hashPrefix()+h),h=p(h,g,f.absolute),!f.absolute||!h)return h;var i=!g&&h?"/":"",j=d.port();return j=80===j||443===j?"":":"+j,[d.protocol(),"://",d.host(),j,i,h].join("")}}}var m,i=[],k=null,l=!1;this.rule=function(a){if(!e(a))throw new Error("'rule' must be a function");return i.push(a),this},this.otherwise=function(a){if(f(a)){var b=a;a=function(){return b}}else if(!e(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,d=f(b);if(f(a)&&(a=g.compile(a)),!d&&!e(b)&&!h(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return d&&(c=g.compile(b),b=["$match",function(a){return c.format(a)}]),j(function(c,d){return p(c,b,a.exec(d.path(),d.search()))},{prefix:f(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return d&&(c=b,b=["$match",function(a){return o(c,a)}]),j(function(c,d){return p(c,b,a.exec(d.path()))},{prefix:n(a)})}},k={matcher:g.isMatcher(a),regex:a instanceof RegExp};for(var l in k)if(k[l])return this.rule(i[l](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=q,q.$inject=["$location","$rootScope","$injector","$browser"]}function G(a,m){function z(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function A(a,b){if(!a)return c;var d=f(a),e=d?a:a.name,g=z(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=A(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=t[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function C(a,b){v[a]||(v[a]=[]),v[a].push(b)}function D(a){for(var b=v[a]||[];b.length;)E(b.shift())}function E(b){b=l(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!f(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(t.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var d=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):f(b.parent)?b.parent:g(b.parent)&&f(b.parent.name)?b.parent.name:"";if(d&&!t[d])return C(d,b.self);for(var h in x)e(x[h])&&(b[h]=x[h](b,x.$delegates[h]));return t[c]=b,!b[w]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){u.$current.navigable==b&&r(a,c)||u.transitionTo(b,a,{inherit:!0,location:!1})}]),D(c),b}function F(a){return a.indexOf("*")>-1}function G(a){var b=a.split("."),c=u.$current.name.split(".");if("**"===b[0]&&(c=c.slice(p(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(p(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function H(a,b){return f(a)&&!d(b)?x[a]:e(b)&&f(a)?(x[a]&&!x.$delegates[a]&&(x.$delegates[a]=x[a]),x[a]=b,this):this}function I(a,b){return g(a)?b=a:b.name=a,E(b),this}function J(a,g,m,p,v,x,z){function J(b,c,d,e){var f=a.$broadcast("$stateNotFound",b,c,d);if(f.defaultPrevented)return z.update(),H;if(!f.retry)return null;if(e.$retry)return z.update(),I;var h=u.transition=g.when(f.retry);return h.then(function(){return h!==u.transition?D:(b.options.$retry=!0,u.transitionTo(b.to,b.toParams,b.options))},function(){return H}),z.update(),h}function L(a,c,d,f,j,k){var l=d?c:s(a.params.$$keys(),c),n={$stateParams:l};j.resolve=v.resolve(a.resolve,n,j.resolve,a);var o=[j.resolve.then(function(a){j.globals=a})];return f&&o.push(f),i(a.views,function(c,d){var f=c.resolve&&c.resolve!==a.resolve?c.resolve:{};f.$template=[function(){return m.load(d,{view:c,locals:n,params:l,notify:k.notify})||""}],o.push(v.resolve(f,n,j.resolve,a).then(function(g){if(e(c.controllerProvider)||h(c.controllerProvider)){var i=b.extend({},f,n);g.$$controller=p.invoke(c.controllerProvider,null,i)}else g.$$controller=c.controller;g.$$state=a,g.$$controllerAs=c.controllerAs,j[d]=g}))}),g.all(o).then(function(){return j})}var D=g.reject(new Error("transition superseded")),E=g.reject(new Error("transition prevented")),H=g.reject(new Error("transition aborted")),I=g.reject(new Error("transition failed"));return n.locals={resolve:null,globals:{$stateParams:{}}},u={params:{},current:n.self,$current:n,transition:null},u.reload=function(){return u.transitionTo(u.current,x,{reload:!0,inherit:!1,notify:!0})},u.go=function(a,b,c){return u.transitionTo(a,b,j({inherit:!0,relative:u.$current},c))},u.transitionTo=function(b,c,e){c=c||{},e=j({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},e||{});var m,f=u.$current,h=u.params,i=f.path,o=A(b,e.relative);if(!d(o)){var r={to:b,toParams:c,options:e},t=J(r,f.self,h,e);if(t)return t;if(b=r.to,c=r.toParams,e=r.options,o=A(b,e.relative),!d(o)){if(!e.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+e.relative+"'")}}if(o[w])throw new Error("Cannot transition to abstract state '"+b+"'");if(e.inherit&&(c=q(x,c||{},u.$current,o)),!o.params.$$validates(c))return I;c=o.params.$$values(c),b=o;var v=b.path,y=0,B=v[y],C=n.locals,F=[];if(!e.reload)for(;B&&B===i[y]&&B.ownParams.$$equals(c,h);)C=F[y]=B.locals,y++,B=v[y];if(K(b,f,C,e))return b.self.reloadOnSearch!==!1&&z.update(),u.transition=null,g.when(u.current);if(c=s(b.params.$$keys(),c||{}),e.notify&&a.$broadcast("$stateChangeStart",b.self,c,f.self,h).defaultPrevented)return z.update(),E;for(var G=g.when(C),H=y;H<v.length;H++,B=v[H])C=F[H]=l(C),G=L(B,c,B===b,G,C,e);var M=u.transition=G.then(function(){var d,g,j;if(u.transition!==M)return D;for(d=i.length-1;d>=y;d--)j=i[d],j.self.onExit&&p.invoke(j.self.onExit,j.self,j.locals.globals),j.locals=null;for(d=y;d<v.length;d++)g=v[d],g.locals=F[d],g.self.onEnter&&p.invoke(g.self.onEnter,g.self,g.locals.globals);return u.transition!==M?D:(u.$current=b,u.current=b.self,u.params=c,k(u.params,x),u.transition=null,e.location&&b.navigable&&z.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===e.location}),e.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,f.self,h),z.update(!0),u.current)},function(d){return u.transition!==M?D:(u.transition=null,m=a.$broadcast("$stateChangeError",b.self,c,f.self,h,d),m.defaultPrevented||z.update(),g.reject(d))});return M},u.is=function(a,b,e){e=j({relative:u.$current},e||{});var f=A(a,e.relative);return d(f)?u.$current!==f?!1:b?r(f.params.$$values(b),x):!0:c},u.includes=function(a,b,e){if(e=j({relative:u.$current},e||{}),f(a)&&F(a)){if(!G(a))return!1;a=u.$current.name}var g=A(a,e.relative);return d(g)?d(u.$current.includes[g.name])?b?r(g.params.$$values(b),x,o(b)):!0:!1:c},u.href=function(a,b,e){e=j({lossy:!0,inherit:!0,absolute:!1,relative:u.$current},e||{});var f=A(a,e.relative);if(!d(f))return null;e.inherit&&(b=q(x,b||{},u.$current,f));var g=f&&e.lossy?f.navigable:f;return g&&g.url!==c&&null!==g.url?z.href(g.url,s(f.params.$$keys(),b||{}),{absolute:e.absolute}):null},u.get=function(a,b){if(0===arguments.length)return y(o(t),function(a){return t[a].self});var c=A(a,b||u.$current);return c&&c.self?c.self:null},u}function K(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var n,u,t={},v={},w="abstract",x={parent:function(a){if(d(a.parent)&&a.parent)return A(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?A(b[1]):n},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=j({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(f(b))return"^"==b.charAt(0)?m.compile(b.substring(1),c):(a.parent.navigable||n).url.concat(b,c);if(!b||m.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new B.ParamSet;return i(a.params||{},function(a,c){b[c]||(b[c]=new B.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?j(a.parent.params.$$new(),a.ownParams):new B.ParamSet},views:function(a){var b={};return i(d(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?j({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};n=E({name:"",url:"^",views:null,"abstract":!0}),n.navigable=null,this.decorator=H,this.state=I,this.$get=J,J.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function H(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=j(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function I(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function J(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function j(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(i)return{enter:function(a,b,c){var d=i.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=i.leave(a,b);c&&c.then&&c.then(b)}};if(h){var d=h&&h(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var g=f(),h=g("$animator"),i=g("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,g){return function(c,f,h){function q(){i&&(i.remove(),i=null),l&&(l.$destroy(),l=null),k&&(p.leave(k,function(){i=null}),i=k,k=null)}function r(i){var j,r=L(c,h,f,e),s=r&&a.$current&&a.$current.locals[r];if(i||s!==m){j=c.$new(),m=a.$current.locals[r];var t=g(j,function(a){p.enter(a,f,function(){l&&l.$emit("$viewContentAnimationEnded"),(b.isDefined(o)&&!o||c.$eval(o))&&d(a)}),q()});k=t,l=j,l.$emit("$viewContentLoaded"),l.$eval(n)}}var i,k,l,m,n=h.onload||"",o=h.autoscroll,p=j(h,c);c.$on("$stateChangeSuccess",function(){r(!1)}),c.$on("$viewContentLoading",function(){r(!1)}),r(!0)}}};return k}function K(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=L(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function L(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function M(a,b){var d,c=a.match(/^\s*({[^}]*})\s*$/);if(c&&(a=b+"("+c[1]+")"),d=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!d||4!==d.length)throw new Error("Invalid state ref '"+a+"'");return{state:d[1],paramExpr:d[3]||null}}function N(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function O(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=M(g.uiSref,a.current.name),j=null,l=N(f)||a.$current,m=null,n="A"===f.prop("tagName"),o="FORM"===f[0].nodeName,p=o?"action":"href",q=!0,r={relative:l,inherit:!0},s=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in s&&(r[a]=s[a])});var t=function(c){if(c&&(j=b.copy(c)),q){m=a.href(i.state,j,r);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===m?(q=!1,!1):(g.$set(p,m),void 0)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&t(a)},!0),j=b.copy(e.$eval(i.paramExpr))),t(),o||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,r)});b.preventDefault();var g=n&&!m?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function P(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function i(){j()?d.addClass(h):d.removeClass(h)}function j(){return"undefined"!=typeof e.uiSrefActiveEq?f&&a.is(f.name,g):f&&a.includes(f.name,g)}var f,g,h;h=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){f=a.get(b,N(d)),g=c,i()},b.$on("$stateChangeSuccess",i)}]}}function Q(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function R(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var d=b.isDefined,e=b.isFunction,f=b.isString,g=b.isObject,h=b.isArray,i=b.forEach,j=b.extend,k=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),z.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",z),A.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",A);var B;C.prototype.concat=function(a,b){var c={caseInsensitive:B.caseInsensitive(),strict:B.strictMode(),squash:B.defaultSquashPolicy()};return new C(this.sourcePath+a+this.sourceSearch,j(c,b),this)},C.prototype.toString=function(){return this.source},C.prototype.exec=function(a,b){function l(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=y(d,b);return y(e,c).reverse()}var c=this.regexp.exec(a);if(!c)return null;b=b||{};var h,i,k,d=this.parameters(),e=d.length,f=this.segments.length-1,g={};if(f!==c.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(h=0;f>h;h++){k=d[h];var m=this.params[k],n=c[h+1];for(i=0;i<m.replace;i++)m.replace[i].from===n&&(n=m.replace[i].to);n&&m.array===!0&&(n=l(n)),g[k]=m.value(n)}for(;e>h;h++)k=d[h],g[k]=this.params[k].value(b[k]);return g},C.prototype.parameters=function(a){return d(a)?this.params[a]||null:this.$$paramNames},C.prototype.validates=function(a){return this.params.$$validates(a)},C.prototype.format=function(a){function l(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var b=this.segments,c=this.parameters(),d=this.params;if(!this.validates(a))return null;var e,g=!1,i=b.length-1,j=c.length,k=b[0];for(e=0;j>e;e++){var m=i>e,n=c[e],o=d[n],p=o.value(a[n]),q=o.isOptional&&o.type.equals(o.value(),p),r=q?o.squash:!1,s=o.type.encode(p);if(m){var t=b[e+1];if(r===!1)null!=s&&(k+=h(s)?y(s,l).join("-"):encodeURIComponent(s)),k+=t;else if(r===!0){var u=k.match(/\/$/)?/\/?(.*)/:/(.*)/;k+=t.match(u)[1]}else f(r)&&(k+=r+t)}else{if(null==s||q&&r!==!1)continue;h(s)||(s=[s]),s=y(s,encodeURIComponent).join("&"+n+"="),k+=(g?"&":"?")+(n+"="+s),g=!0}}return k},D.prototype.is=function(){return!0},D.prototype.encode=function(a){return a},D.prototype.decode=function(a){return a},D.prototype.equals=function(a,b){return a==b},D.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},D.prototype.pattern=/.*/,D.prototype.toString=function(){return"{Type:"+this.name+"}"},D.prototype.$asArray=function(a,b){function e(a,b){function e(a,b){return function(){return a[b].apply(a,arguments)}}function f(a){return h(a)?a:d(a)?[a]:[]}function g(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function i(a){return!a}function j(a,b){return function(c){c=f(c);var d=y(c,a);return b===!0?0===x(d,i).length:g(d)}}function k(a){return function(b,c){var d=f(b),e=f(c);if(d.length!==e.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],e[g]))return!1;return!0}}this.encode=j(e(a,"encode")),this.decode=j(e(a,"decode")),this.is=j(e(a,"is"),!0),this.equals=k(e(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new e(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",E),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),F.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",F),G.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",G),H.$inject=[],b.module("ui.router.state").provider("$view",H),b.module("ui.router.state").provider("$uiViewScroll",I),J.$inject=["$state","$injector","$uiViewScroll","$interpolate"],K.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",J),b.module("ui.router.state").directive("uiView",K),O.$inject=["$state","$timeout"],P.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",O).directive("uiSrefActive",P).directive("uiSrefActiveEq",P),Q.$inject=["$state"],R.$inject=["$state"],b.module("ui.router.state").filter("isState",Q).filter("includedByState",R)}(window,window.angular);