function t(t,e,s,i){var n,o=arguments.length,r=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,s,r):n(e,s))||r);return o>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,y=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,$=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??v)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[$("elementProperties")]=new Map,b[$("finalized")]=new Map,g?.({ReactiveElement:b}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,U=`<${P}>`,M=document,O=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,z=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,Y=M.createTreeWalker(M,129);function J(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(r.lastIndex=l,c=r.exec(s),null!==c);)l=r.lastIndex,r===R?"!--"===c[1]?r=j:void 0!==c[1]?r=z:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=D):void 0!==c[3]&&(r=D):r===D?">"===c[0]?(r=n??R,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?D:'"'===c[3]?L:I):r===L||r===I?r=D:r===j||r===z?r=R:(r=D,n=void 0);const d=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===R?s+U:h>=0?(i.push(a),s.slice(0,h)+k+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[J(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=F.createElement(c,s),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=h[o++],s=i.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),Y.nextNode(),a.push({type:2,index:++n});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===W)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);Y.currentNode=i;let n=Y.nextNode(),o=0,r=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++r]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),T(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new F(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const i=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),o||=!T(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===W)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(F,X),(x.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new X(e.insertBefore(O(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},lt=(t=ht,e,s)=>{const{kind:i,metadata:n}=s;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0,attribute:!1})}function ut(t,e,s){if(!t.show_anniversary)return q``;const i=e.anniversaries||[];return i.length?q`
    <div class="cc-anniv">
      <div class="cc-section-title">纪念日</div>
      ${i.map(e=>q`
          <div class="cc-anniv-item">
            <span class="cc-anniv-name">${e.name}</span>
            <span class="cc-anniv-date">(${function(t){const e=(t||"").split("-");return 3!==e.length?t||"":`${parseInt(e[1],10)}月${parseInt(e[2],10)}日`}(e.full_date)})</span>
            ${e.age_label?q`<span class="cc-anniv-age">${e.age_label}</span>`:""}
            <span class="cc-anniv-count"
              >${0===e.days_left?"今天":`${e.days_left} 天`}</span
            >
            ${t.show_manage?q`
                  <button
                    class="cc-del"
                    title="删除"
                    @click=${()=>s(e.name)}
                  >
                    ×
                  </button>
                `:""}
          </div>
        `)}
    </div>
  `:q``}const _t=["一","二","三","四","五","六","日"],mt=["日","一","二","三","四","五","六"],yt=["正月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];function gt(t,e,s,i,n,o){if(!t.show_month)return q``;const r=q`
    <div class="cc-month-header">
      <button class="cc-nav" @click=${i} aria-label="上一个月">‹</button>
      <div class="cc-month-title">${e.year} 年 ${e.month} 月</div>
      <button class="cc-nav" @click=${n} aria-label="下一个月">›</button>
    </div>
  `;if(!s||!s.days||!s.days.length)return q`
      <div class="cc-month">
        ${r}
        <div class="cc-loading">${o?"加载中…":"无数据"}</div>
      </div>
    `;const a="sunday"===t.week_start?mt:_t,c="sunday"===t.week_start?(s.first_weekday+1)%7:s.first_weekday,h=[];for(let t=0;t<c;t++)h.push(null);for(const t of s.days)h.push(t);for(;h.length%7!=0;)h.push(null);return q`
    <div class="cc-month">
      ${r}
      <div class="cc-grid cc-weekdays">
        ${a.map(t=>q`<div class="cc-wd">${t}</div>`)}
      </div>
      <div class="cc-grid">
        ${h.map(e=>e?function(t,e){const s=["cc-cell"];e.is_today&&s.push("cc-today");"holiday"===e.holiday_status&&s.push("cc-rest");"adjusted_workday"===e.holiday_status&&s.push("cc-workday");const i=[];"holiday"===e.holiday_status&&e.holiday_name&&i.push(q`<span class="cc-marker cc-marker-holiday">${e.holiday_name}</span>`);t.show_custom_holiday&&e.custom_holiday_name&&i.push(q`<span class="cc-marker cc-marker-custom-holiday">${e.custom_holiday_name}</span>`);t.show_term&&e.term&&i.push(q`<span class="cc-marker cc-marker-term">${e.term}</span>`);e.anniversaries.length&&i.push(q`<span class="cc-marker cc-marker-anniv"
        >${e.anniversaries.length} 纪念</span
      >`);return q`
    <div class="${s.join(" ")}" title="${function(t,e){const s=[];s.push(function(t){const e=(t||"").split("-");if(3!==e.length)return t||"";return`${e[0]}年${parseInt(e[1],10)}月${parseInt(e[2],10)}日`}(t.date));const i=t.lunar?.month;if(i){const e=t.lunar?.is_leap?"闰":"";s.push(`农历${e}${yt[i-1]}${t.lunar_day_cn||""}`)}t.term&&s.push(t.term);"holiday"===t.holiday_status&&t.holiday_name?s.push(t.holiday_name):"adjusted_workday"===t.holiday_status&&s.push(t.holiday_name?`调休补班（${t.holiday_name}）`:"调休补班");e&&t.custom_holiday_name&&s.push(t.custom_holiday_name);t.anniversaries.length&&s.push(`纪念日：${t.anniversaries.join("、")}`);return s.join("\n")}(e,t.show_custom_holiday)}">
      <div class="cc-day-num">${e.day}</div>
      ${t.show_lunar_in_month?q`<div class="cc-day-lunar">${e.lunar_day_cn}</div>`:""}
      ${i.length?q`<div class="cc-day-markers">${i}</div>`:""}
    </div>
  `}(t,e):q`<div class="cc-cell cc-empty"></div>`)}
      </div>
    </div>
  `}const $t=r`
  :host {
    display: block;
  }

  .cc-empty {
    padding: 16px;
    color: var(--secondary-text-color);
  }

  .cc-title {
    font-size: 1.15em;
    font-weight: 600;
    padding: 16px 16px 0;
  }

  .cc-header {
    padding: 12px 16px 4px;
  }
  .cc-solar {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.2;
  }
  .cc-sub {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    margin-top: 6px;
    color: var(--secondary-text-color);
  }
  .cc-term {
    color: var(--accent-color);
  }
  .cc-holiday {
    color: var(--warning-color, #e6a700);
    font-weight: 500;
  }
  .cc-custom-holiday {
    color: #ff9800;
    font-weight: 500;
  }

  .cc-anniv {
    padding: 4px 16px;
  }
  .cc-section-title {
    font-weight: 600;
    margin: 10px 0 4px;
    color: var(--primary-text-color);
  }
  .cc-anniv-item {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 3px 0;
  }
  .cc-anniv-name {
    font-weight: 500;
  }
  .cc-anniv-date {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  .cc-anniv-age {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
  .cc-anniv-count {
    margin-left: auto;
    color: var(--primary-color);
    font-weight: 500;
  }

  .cc-month {
    padding: 4px 16px 16px;
  }
  .cc-month-header {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 4px 0;
  }
  .cc-nav {
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 1.4em;
    line-height: 1;
    padding: 2px 10px;
    border-radius: 50%;
    min-width: 32px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cc-nav:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }
  .cc-month-title {
    flex: 1;
    text-align: center;
    font-weight: 600;
  }
  .cc-loading {
    padding: 24px 0;
    text-align: center;
    color: var(--secondary-text-color);
  }
  .cc-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  .cc-weekdays {
    margin-bottom: 4px;
  }
  .cc-wd {
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 0.85em;
    padding: 3px 0;
  }
  .cc-cell {
    min-height: 50px;
    border-radius: 6px;
    padding: 3px 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
  .cc-cell.cc-empty {
    background: transparent;
  }
  .cc-day-num {
    font-weight: 500;
    line-height: 1.2;
  }
  .cc-day-lunar {
    font-size: 0.72em;
    color: var(--secondary-text-color);
    line-height: 1.1;
    white-space: nowrap;
  }
  .cc-day-markers {
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-top: 2px;
    font-size: 0.6em;
    line-height: 1.1;
    max-width: 100%;
  }
  .cc-marker {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cc-marker-holiday {
    color: #d32f2f;
  }
  .cc-marker-custom-holiday {
    color: #ff9800;
  }
  .cc-marker-workday {
    color: var(--secondary-text-color);
  }
  .cc-marker-term {
    color: var(--accent-color);
  }
  .cc-marker-anniv {
    color: var(--primary-color);
  }
  .cc-today {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .cc-today .cc-day-lunar,
  .cc-today .cc-day-markers,
  .cc-today .cc-marker {
    color: inherit;
    opacity: 0.92;
  }
  .cc-rest .cc-day-num {
    color: #d32f2f;
  }
  .cc-workday .cc-day-num {
    color: var(--secondary-text-color);
    text-decoration: line-through;
  }

  .cc-del {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    font-size: 1.2em;
    line-height: 1;
    padding: 2px 6px;
    border-radius: 50%;
    margin-left: auto;
  }
  .cc-del:hover {
    color: var(--error-color, #d32f2f);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.08));
  }

  .cc-add-bar {
    padding: 4px 16px 12px;
  }
  .cc-add-btn {
    border: 1px dashed var(--divider-color, #ccc);
    background: transparent;
    color: var(--primary-color);
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.95em;
  }
  .cc-add-btn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
  }

  .cc-add-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 16px 14px;
  }
  .cc-input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 6px;
    background: var(--card-background-color, transparent);
    color: var(--primary-text-color);
    font-size: 0.95em;
  }
  .cc-add-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
  .cc-ok,
  .cc-cancel {
    border: none;
    border-radius: 6px;
    padding: 6px 14px;
    cursor: pointer;
    font-size: 0.95em;
  }
  .cc-ok {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .cc-cancel {
    background: transparent;
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color, #ccc);
  }
`,ft=/^(\d{4}|\d{8})$/;class vt extends at{constructor(){super(...arguments),this._viewing=null,this._loading=!1,this._showAdd=!1,this._addType="anniversary",this._addName="",this._addDate="",this._addCalendar="solar",this._monthCache={}}static get styles(){return $t}setConfig(t){this._config=function(t){if("string"!=typeof t.entity||!t.entity)throw new Error("必须配置 entity（例如 sensor.chinese_calendar）");return{type:"chinese-calendar-card",entity:t.entity,title:"string"==typeof t.title?t.title:"",show_solar:!1!==t.show_solar,show_lunar:!1!==t.show_lunar,show_weekday:!1!==t.show_weekday,show_term:!1!==t.show_term,show_holiday:!1!==t.show_holiday,show_custom_holiday:!1!==t.show_custom_holiday,show_anniversary:!1!==t.show_anniversary,show_month:!1!==t.show_month,week_start:"sunday"===t.week_start?"sunday":"monday",show_lunar_in_month:!1!==t.show_lunar_in_month,show_manage:!1!==t.show_manage}}(t)}getCardSize(){return 6}static getStubConfig(){return{entity:"sensor.chinese_calendar",title:"中国日历"}}static getConfigElement(){return document.createElement("chinese-calendar-card-editor")}_getAttr(){if(!this._config)return null;const t=this.hass?.states?.[this._config.entity];return t?t.attributes:null}_monthKey(t,e){return`${t}-${String(e).padStart(2,"0")}`}_resolveMonth(t){return this._viewing?this._viewing.year===t.month?.year&&this._viewing.month===t.month?.month?t.month:this._monthCache[this._monthKey(this._viewing.year,this._viewing.month)]??null:t.month??null}async _shiftMonth(t){const e=this._getAttr();if(!e?.month)return;const s=this._viewing??{year:e.month.year,month:e.month.month};let i=s.year,n=s.month+t;if(n<1?(n=12,i-=1):n>12&&(n=1,i+=1),this._viewing={year:i,month:n},i===e.month.year&&n===e.month.month)return;const o=this._monthKey(i,n);if(!this._monthCache[o]){this._loading=!0;try{const t=await this.hass.callService("chinese_calendar","get_month",{year:i,month:n},{},!1,!0),e=t?.response;e&&"object"==typeof e&&(this._monthCache[o]=e)}catch{}finally{this._loading=!1,this.requestUpdate()}}}_toggleAdd(){this._showAdd=!this._showAdd}_submitAdd(){const t=this._addName.trim(),e=this._addDate.trim();t&&ft.test(e)&&("anniversary"===this._addType?this.hass.callService("chinese_calendar","set_anniversary",{name:t,type:this._addCalendar,date:e}):this.hass.callService("chinese_calendar","set_custom_holiday",{name:t,date:e}),this._showAdd=!1,this._addName="",this._addDate="")}_removeAnniversary(t){this.hass.callService("chinese_calendar","remove_anniversary",{name:t})}_removeCustomHoliday(t){this.hass.callService("chinese_calendar","remove_custom_holiday",{name:t})}_renderCustomHolidays(t){if(!this._config?.show_custom_holiday)return q``;const e=t.configured_custom_holidays||[];return e.length?q`
      <div class="cc-anniv">
        <div class="cc-section-title">自定义假日</div>
        ${e.map(t=>{return q`
            <div class="cc-anniv-item">
              <span class="cc-anniv-name">${t.name}</span>
              <span class="cc-anniv-date">(${e=t.date,e?8===e.length?`${e.slice(0,4)}年${parseInt(e.slice(4,6),10)}月${parseInt(e.slice(6),10)}日`:`${parseInt(e.slice(0,2),10)}月${parseInt(e.slice(2),10)}日`:""})</span>
              ${this._config?.show_manage?q`
                    <button
                      class="cc-del"
                      title="删除"
                      @click=${()=>this._removeCustomHoliday(t.name)}
                    >
                      ×
                    </button>
                  `:""}
            </div>
          `;var e})}
      </div>
    `:q``}_renderAddSection(){return this._config?.show_manage?this._showAdd?q`
      <div class="cc-add-form">
        <select
          class="cc-input"
          @change=${t=>{this._addType=t.target.value}}
        >
          <option value="anniversary" ?selected=${"anniversary"===this._addType}>
            纪念日
          </option>
          <option
            value="custom_holiday"
            ?selected=${"custom_holiday"===this._addType}
          >
            自定义假日
          </option>
        </select>
        <input
          class="cc-input"
          placeholder="名称"
          .value=${this._addName}
          @input=${t=>{this._addName=t.target.value}}
        />
        <input
          class="cc-input"
          placeholder="日期 MMDD / YYYYMMDD"
          .value=${this._addDate}
          @input=${t=>{this._addDate=t.target.value}}
        />
        ${"anniversary"===this._addType?q`
              <select
                class="cc-input"
                @change=${t=>{this._addCalendar=t.target.value}}
              >
                <option value="solar" ?selected=${"solar"===this._addCalendar}>
                  公历
                </option>
                <option value="lunar" ?selected=${"lunar"===this._addCalendar}>
                  农历
                </option>
              </select>
            `:""}
        <div class="cc-add-actions">
          <button class="cc-ok" @click=${this._submitAdd}>确定</button>
          <button class="cc-cancel" @click=${this._toggleAdd}>取消</button>
        </div>
      </div>
    `:q`
        <div class="cc-add-bar">
          <button class="cc-add-btn" @click=${this._toggleAdd}>＋ 添加</button>
        </div>
      `:q``}render(){if(!this._config)return q`<ha-card><div class="cc-empty">请配置 entity</div></ha-card>`;const t=this.hass?.states?.[this._config.entity];if(!t)return q`
        <ha-card>
          <div class="cc-empty">实体未找到：${this._config.entity}</div>
        </ha-card>
      `;const e=t.attributes,s=this._viewing??{year:e.month?.year??0,month:e.month?.month??0},i=this._resolveMonth(e);return q`
      <ha-card>
        ${this._config.title?q`<div class="cc-title">${this._config.title}</div>`:""}
        ${function(t,e){const s=[];if(t.show_lunar&&s.push(q`<span>${e.lunar_date_cn}</span>`),t.show_weekday&&s.push(q`<span>${e.weekday_cn}</span>`),t.show_term&&e.term&&s.push(q`<span class="cc-term">${e.term}</span>`),t.show_holiday){const i="holiday"===e.holiday_status&&e.holiday_name?`${e.holiday_status_cn} · ${e.holiday_name}`:e.holiday_status_cn;s.push(q`<span class="cc-holiday">${i}</span>`),t.show_custom_holiday&&e.custom_holiday_name&&s.push(q`<span class="cc-custom-holiday">${e.custom_holiday_name}</span>`)}return q`
    <div class="cc-header">
      ${t.show_solar?q`<div class="cc-solar">${e.solar_date_cn}</div>`:""}
      ${s.length?q`<div class="cc-sub">${s}</div>`:""}
    </div>
  `}(this._config,e)}
        ${ut(this._config,e,t=>this._removeAnniversary(t))}
        ${this._renderCustomHolidays(e)}
        ${gt(this._config,s,i,()=>this._shiftMonth(-1),()=>this._shiftMonth(1),this._loading)}
        ${this._renderAddSection()}
      </ha-card>
    `}}t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([pt()],vt.prototype,"_config",void 0),t([pt()],vt.prototype,"_viewing",void 0),t([pt()],vt.prototype,"_loading",void 0),t([pt()],vt.prototype,"_showAdd",void 0),t([pt()],vt.prototype,"_addType",void 0),t([pt()],vt.prototype,"_addName",void 0),t([pt()],vt.prototype,"_addDate",void 0),t([pt()],vt.prototype,"_addCalendar",void 0);class wt extends at{constructor(){super(...arguments),this._config={}}static get styles(){return r`
      .cc-editor {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 4px 0;
      }
      .cc-editor-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .cc-editor-row > span {
        white-space: nowrap;
        color: var(--primary-text-color);
      }
      .cc-editor-row input[type="checkbox"] {
        width: 18px;
        height: 18px;
      }
      .cc-input {
        box-sizing: border-box;
        width: 100%;
        padding: 6px 8px;
        border: 1px solid var(--divider-color, #ccc);
        border-radius: 6px;
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
      }
    `}setConfig(t){this._config={...t}}_update(t,e){this._config={...this._config,[t]:e},this._fireChange()}_fireChange(){const t=new Event("config-changed",{bubbles:!0,composed:!0});t.detail={config:this._config},this.dispatchEvent(t)}_toggle(t,e){const s=!1!==this._config[t];return q`
      <label class="cc-editor-row">
        <span>${e}</span>
        <input
          type="checkbox"
          .checked=${s}
          @change=${e=>this._update(t,e.target.checked)}
        />
      </label>
    `}render(){return q`
      <div class="cc-editor">
        <label class="cc-editor-row">
          <span>实体</span>
          <input
            class="cc-input"
            .value=${String(this._config.entity??"")}
            @input=${t=>this._update("entity",t.target.value)}
          />
        </label>
        <label class="cc-editor-row">
          <span>标题</span>
          <input
            class="cc-input"
            .value=${String(this._config.title??"")}
            @input=${t=>this._update("title",t.target.value)}
          />
        </label>
        ${this._toggle("show_solar","公历")}
        ${this._toggle("show_lunar","农历")}
        ${this._toggle("show_weekday","星期")}
        ${this._toggle("show_term","节气")}
        ${this._toggle("show_holiday","法定节假日")}
        ${this._toggle("show_custom_holiday","自定义假日")}
        ${this._toggle("show_anniversary","纪念日")}
        ${this._toggle("show_month","当月日历")}
        ${this._toggle("show_lunar_in_month","月历内显示农历")}
        ${this._toggle("show_manage","显示增删按钮")}
        <label class="cc-editor-row">
          <span>周起始日</span>
          <select
            class="cc-input"
            @change=${t=>this._update("week_start",t.target.value)}
          >
            <option value="monday" ?selected=${"sunday"!==this._config.week_start}>
              周一
            </option>
            <option value="sunday" ?selected=${"sunday"===this._config.week_start}>
              周日
            </option>
          </select>
        </label>
      </div>
    `}}t([dt({attribute:!1})],wt.prototype,"hass",void 0),t([pt()],wt.prototype,"_config",void 0),customElements.get("chinese-calendar-card")||customElements.define("chinese-calendar-card",vt),customElements.get("chinese-calendar-card-editor")||customElements.define("chinese-calendar-card-editor",wt),window.customCards=window.customCards||[],window.customCards.some(t=>"chinese-calendar-card"===t.type)||window.customCards.push({type:"chinese-calendar-card",name:"中国日历",description:"公历 / 农历 / 星期 / 节气 / 节假日 / 纪念日 / 当月日历",preview:!1});
