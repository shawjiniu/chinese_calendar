function t(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(e,t))}return t}toString(){return this.cssText}};const o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,y=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},g=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:g};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??g)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,b=t=>t,x=A.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,U=document,O=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=U.createTreeWalker(U,129);function J(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<s;e++){const s=t[e];let a,c,h=-1,l=0;for(;l<s.length&&(o.lastIndex=l,c=o.exec(s),null!==c);)l=o.lastIndex,o===R?"!--"===c[1]?o=N:void 0!==c[1]?o=j:void 0!==c[2]?(L.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=z):void 0!==c[3]&&(o=z):o===z?">"===c[0]?(o=n??R,h=-1):void 0===c[1]?h=-2:(h=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?z:'"'===c[3]?I:D):o===I||o===D?o=z:o===N||o===j?o=R:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===R?s+P:h>=0?(i.push(a),s.slice(0,h)+S+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class F{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=F.createElement(c,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=h[r++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),K.nextNode(),a.push({type:2,index:++n});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===q)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);K.currentNode=i;let n=K.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=K.nextNode(),r++)}return K.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new F(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=G(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=G(this,i[s+o],e,o),a===q&&(a=this._$AH[o]),r||=!M(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class st extends Y{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===q)return;const s=this._$AH,i=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(F,X),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new X(e.insertBefore(O(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:g},ht=(t=ct,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function lt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return lt({...t,state:!0,attribute:!1})}function pt(t,e){if(!t.show_anniversary)return B``;const s=e.anniversaries||[];return s.length?B`
    <div class="cc-anniv">
      <div class="cc-section-title">纪念日</div>
      ${s.map(t=>B`
          <div class="cc-anniv-item">
            <span class="cc-anniv-name">${t.name}</span>
            <span class="cc-anniv-date">(${function(t){const e=(t||"").split("-");return 3!==e.length?t||"":`${parseInt(e[1],10)}月${parseInt(e[2],10)}日`}(t.full_date)})</span>
            ${t.age_label?B`<span class="cc-anniv-age">${t.age_label}</span>`:""}
            <span class="cc-anniv-count"
              >${0===t.days_left?"今天":`${t.days_left} 天`}</span
            >
          </div>
        `)}
    </div>
  `:B``}const ut=["一","二","三","四","五","六","日"],_t=["日","一","二","三","四","五","六"];function yt(t,e,s,i,n,r){if(!t.show_month)return B``;const o=B`
    <div class="cc-month-header">
      <button class="cc-nav" @click=${i} aria-label="上一个月">‹</button>
      <div class="cc-month-title">${e.year} 年 ${e.month} 月</div>
      <button class="cc-nav" @click=${n} aria-label="下一个月">›</button>
    </div>
  `;if(!s||!s.days||!s.days.length)return B`
      <div class="cc-month">
        ${o}
        <div class="cc-loading">${r?"加载中…":"无数据"}</div>
      </div>
    `;const a="sunday"===t.week_start?_t:ut,c="sunday"===t.week_start?(s.first_weekday+1)%7:s.first_weekday,h=[];for(let t=0;t<c;t++)h.push(null);for(const t of s.days)h.push(t);for(;h.length%7!=0;)h.push(null);return B`
    <div class="cc-month">
      ${o}
      <div class="cc-grid cc-weekdays">
        ${a.map(t=>B`<div class="cc-wd">${t}</div>`)}
      </div>
      <div class="cc-grid">
        ${h.map(e=>e?function(t,e){const s=["cc-cell"];e.is_today&&s.push("cc-today");"holiday"===e.holiday_status&&s.push("cc-rest");"adjusted_workday"===e.holiday_status&&s.push("cc-workday");const i=[];"holiday"===e.holiday_status&&e.holiday_name?i.push(B`<span class="cc-marker cc-marker-holiday">${e.holiday_name}</span>`):"adjusted_workday"===e.holiday_status&&i.push(B`<span class="cc-marker cc-marker-workday">班</span>`);t.show_term&&e.term&&i.push(B`<span class="cc-marker cc-marker-term">${e.term}</span>`);e.anniversaries.length&&i.push(B`<span class="cc-marker cc-marker-anniv"
        >${e.anniversaries.length} 纪念</span
      >`);return B`
    <div class="${s.join(" ")}" title="${function(t){const e=[mt(t.date)];t.term&&e.push(t.term);"holiday"===t.holiday_status&&t.holiday_name?e.push(t.holiday_name):"adjusted_workday"===t.holiday_status&&e.push(t.holiday_name?`调休补班（${t.holiday_name}）`:"调休补班");t.anniversaries.length&&e.push(`纪念日：${t.anniversaries.join("、")}`);return e.join(" · ")}(e)}">
      <div class="cc-day-num">${e.day}</div>
      ${t.show_lunar_in_month?B`<div class="cc-day-lunar">${e.lunar_day_cn}</div>`:""}
      ${i.length?B`<div class="cc-day-markers">${i}</div>`:""}
    </div>
  `}(t,e):B`<div class="cc-cell cc-empty"></div>`)}
      </div>
    </div>
  `}function mt(t){const e=(t||"").split("-");return 3!==e.length?t||"":`${parseInt(e[1],10)}月${parseInt(e[2],10)}日`}const ft=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)})`
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
`;class $t extends ot{constructor(){super(...arguments),this._viewing=null,this._loading=!1,this._monthCache={}}static get styles(){return ft}setConfig(t){this._config=function(t){if("string"!=typeof t.entity||!t.entity)throw new Error("必须配置 entity（例如 sensor.chinese_calendar）");return{type:"chinese-calendar-card",entity:t.entity,title:"string"==typeof t.title?t.title:"",show_solar:!1!==t.show_solar,show_lunar:!1!==t.show_lunar,show_weekday:!1!==t.show_weekday,show_term:!1!==t.show_term,show_holiday:!1!==t.show_holiday,show_anniversary:!1!==t.show_anniversary,show_month:!1!==t.show_month,week_start:"sunday"===t.week_start?"sunday":"monday",show_lunar_in_month:!1!==t.show_lunar_in_month}}(t)}getCardSize(){return 6}static getStubConfig(){return{entity:"sensor.chinese_calendar",title:"中国日历"}}_getAttr(){if(!this._config)return null;const t=this.hass?.states?.[this._config.entity];return t?t.attributes:null}_monthKey(t,e){return`${t}-${String(e).padStart(2,"0")}`}_resolveMonth(t){return this._viewing?this._viewing.year===t.month?.year&&this._viewing.month===t.month?.month?t.month:this._monthCache[this._monthKey(this._viewing.year,this._viewing.month)]??null:t.month??null}async _shiftMonth(t){const e=this._getAttr();if(!e?.month)return;const s=this._viewing??{year:e.month.year,month:e.month.month};let i=s.year,n=s.month+t;if(n<1?(n=12,i-=1):n>12&&(n=1,i+=1),this._viewing={year:i,month:n},i===e.month.year&&n===e.month.month)return;const r=this._monthKey(i,n);if(!this._monthCache[r]){this._loading=!0;try{const t=await this.hass.callService("chinese_calendar","get_month",{year:i,month:n});t&&"object"==typeof t&&(this._monthCache[r]=t)}catch{}finally{this._loading=!1,this.requestUpdate()}}}render(){if(!this._config)return B`<ha-card><div class="cc-empty">请配置 entity</div></ha-card>`;const t=this.hass?.states?.[this._config.entity];if(!t)return B`
        <ha-card>
          <div class="cc-empty">实体未找到：${this._config.entity}</div>
        </ha-card>
      `;const e=t.attributes,s=this._viewing??{year:e.month?.year??0,month:e.month?.month??0},i=this._resolveMonth(e);return B`
      <ha-card>
        ${this._config.title?B`<div class="cc-title">${this._config.title}</div>`:""}
        ${function(t,e){const s=[];if(t.show_lunar&&s.push(B`<span>${e.lunar_date_cn}</span>`),t.show_weekday&&s.push(B`<span>${e.weekday_cn}</span>`),t.show_term&&e.term&&s.push(B`<span class="cc-term">${e.term}</span>`),t.show_holiday){const t="holiday"===e.holiday_status&&e.holiday_name?`${e.holiday_status_cn} · ${e.holiday_name}`:e.holiday_status_cn;s.push(B`<span class="cc-holiday">${t}</span>`)}return B`
    <div class="cc-header">
      ${t.show_solar?B`<div class="cc-solar">${e.solar_date_cn}</div>`:""}
      ${s.length?B`<div class="cc-sub">${s}</div>`:""}
    </div>
  `}(this._config,e)}
        ${pt(this._config,e)}
        ${yt(this._config,s,i,()=>this._shiftMonth(-1),()=>this._shiftMonth(1),this._loading)}
      </ha-card>
    `}}t([lt({attribute:!1})],$t.prototype,"hass",void 0),t([dt()],$t.prototype,"_config",void 0),t([dt()],$t.prototype,"_viewing",void 0),t([dt()],$t.prototype,"_loading",void 0),customElements.get("chinese-calendar-card")||customElements.define("chinese-calendar-card",$t),window.customCards=window.customCards||[],window.customCards.some(t=>"chinese-calendar-card"===t.type)||window.customCards.push({type:"chinese-calendar-card",name:"中国日历",description:"公历 / 农历 / 星期 / 节气 / 节假日 / 纪念日 / 当月日历",preview:!1});
