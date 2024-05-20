(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-bac-2",headers:{authorization:"a5ca42b5-c1b9-4110-bd5e-3093d482a010","Content-Type":"application/json"}},t=function(t,n,r){return fetch("".concat(e.baseUrl).concat(t),{method:n,headers:e.headers,body:JSON.stringify(r)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},n=function(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&c(e.currentTarget)},r=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");c(t)}},o=function(e){e.classList.add("popup_is-opened"),e.addEventListener("click",n),document.addEventListener("keyup",r)},c=function(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",n),document.removeEventListener("keyup",r)},u=document.querySelector("#card-template").content.querySelector(".card"),a=document.querySelector(".places__list"),i=document.querySelector(".popup_type_image"),l=i.querySelector(".popup__image"),s=i.querySelector(".popup__caption"),p=document.querySelector(".popup_type_edit"),d=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_edit-avatar"),f=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__image"),m=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=p.querySelector(".popup__form"),h=b.querySelector(".popup__input_type_name"),q=b.querySelector(".popup__input_type_description"),C=d.querySelector(".popup__form"),E=C.querySelector(".popup__input_type_card-name"),g=C.querySelector(".popup__input_type_url"),k=_.querySelector(".popup__form"),L=k.querySelector(".popup__input_type_avatar-link"),x=document.querySelector(".popup_type_delete-card"),A=x.querySelector(".popup__button"),T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},w=null,j=null,B=function(e,t){w=e,j=t,o(x)},O=function(e,n){(function(e,n){return n?function(e){return t("/cards/likes/".concat(e),"DELETE")}(e):function(e){return t("/cards/likes/".concat(e),"PUT")}(e)})(n,e.classList.contains("card__like-button_is-active")).then((function(t){e.classList.toggle("card__like-button_is-active"),e.nextElementSibling.textContent=t.likes.length})).catch((function(e){console.log(e)}))},P=function(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},I=function(e,t,n){D(e)?U(t,n):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))},U=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},D=function(e){return e.some((function(e){return!e.validity.valid}))};function M(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;M(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){M(!1,r,o)}))}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var N,V=function(e){var t=e.querySelector(".card__image");l.src=t.src,l.alt=t.alt,s.textContent=e.querySelector(".card__title").textContent,o(i)},z=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",r=function(e,t,n){var r=function(e){var t=u.cloneNode(!0),n=t.querySelector(".card__image");return n.src=e.link,n.alt="Фотография места ".concat(e.name),t.querySelector(".card__title").textContent=e.name,t}(e),o=r.querySelector(".card__like-button"),c=r.querySelector(".card__delete-button"),a=r.querySelector(".card__like-counter"),i=r.querySelector(".card__like-button");return e.owner._id!==n?c.remove():c.addEventListener("click",(function(){return t.deleteCard(r,e._id)})),e.likes.forEach((function(e){e._id===n&&i.classList.add("card__like-button_is-active")})),a.textContent=e.likes.length,r.querySelector(".card__image").addEventListener("click",(function(){return t.showCard(r)})),o.addEventListener("click",(function(){return t.likeCard(o,e._id)})),r}(e,{deleteCard:B,likeCard:O,showCard:V},t);a[n](r)};f.addEventListener("click",(function(){var e,t,n,r;h.value=m.textContent,q.value=S.textContent,e=b,t=T,n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector),n.forEach((function(n){P(e,n,t)})),I(n,r,t),o(p)})),y.addEventListener("click",(function(){o(d)})),v.addEventListener("click",(function(){o(_)})),A.addEventListener("click",(function(){var e;w&&j&&(e=j,t("/cards/".concat(e),"DELETE")).then((function(){w.remove(),c(x)})).catch((function(e){console.log(e)}))})),b.addEventListener("submit",(function(e){G((function(){return(e=h.value,n=q.value,t("/users/me","PATCH",{name:e,about:n})).then((function(e){m.textContent=e.name,S.textContent=e.about,c(p)}));var e,n}),e)})),C.addEventListener("submit",(function(e){G((function(){return(e=E.value,n=g.value,t("/cards","POST",{name:e,link:n})).then((function(e){z(e,e.owner._id,"prepend"),c(d)}));var e,n}),e)})),k.addEventListener("submit",(function(e){G((function(){return(e=L.value,t("/users/me/avatar","PATCH",{avatar:e})).then((function(e){v.style.backgroundImage="url(".concat(e.avatar,")"),c(_)}));var e}),e)})),Promise.all([t("/cards","GET"),t("/users/me","GET")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];v.style.backgroundImage="url(".concat(c.avatar,")"),m.textContent=c.name,S.textContent=c.about,Array.from(o).forEach((function(e){z(e,c._id,"append")}))})).catch((function(e){console.log(e)})),N=T,Array.from(document.querySelectorAll(N.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);I(n,r,t),e.addEventListener("reset",(function(){U(r,t)})),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorText):t.setCustomValidity(""),t.validity.valid?P(e,t,n):function(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(n.inputErrorClass),r.textContent=t.validationMessage,r.classList.add(n.errorClass)}(e,t,n)}(e,o,t),I(n,r,t)}))}))}(e,N)}))})();