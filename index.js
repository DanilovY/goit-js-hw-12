import{a as p,i as r,S as y}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();const v="47498478-5b3c5ee421281cd3bcc4956d2";async function f(i,e){const{data:l}=await p("https://pixabay.com/api/?",{params:{key:v,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}});return l}const g=i=>i.map(e=>`<li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img class="gallery-img"
                src="${e.webformatURL}" 
                alt="${e.tags}" 
                width="360" 
                height="200"/>
                <ul class="img-info-list">
                    <li class="img-info-item">
                        <p class="info-title">Likes</p>
                        <p class="info-value">${e.likes}</p>
                    </li>
                    <li class="img-info-item">
                        <p class="info-title">Views</p>
                       <p class="info-value">${e.views}</p>
                    </li>
                    <li class="img-info-item">
                        <p class="info-title">Comments</p>
                        <p class="info-value">${e.comments}</p>
                    </li>
                    <li class="img-info-item">
                        <p class="info-title">Downloads</p>
                        <p class="info-value">${e.downloads}</p>
                    </li>
                </ul>
            </a>
        </li>`).join("");r.settings({position:"topRight",maxWidth:"432px"});const L=document.querySelector(".form"),c=document.querySelector(".loader"),m=document.querySelector(".gallery-list"),a=document.querySelector(".more"),h=new y(".gallery-item .gallery-link",{captionsData:"alt"});let d="",o=1;L.addEventListener("submit",w);a.addEventListener("click",b);async function w(i){if(i.preventDefault(),d=i.target.elements.input.value.trim(),o=1,m.innerHTML="",c.classList.remove("visually-hidden"),a.classList.add("visually-hidden"),d===""){c.classList.add("visually-hidden"),r.warning({message:"The field is empty!"});return}try{const e=await f(d,o);if(c.classList.add("visually-hidden"),e.hits.length===0){r.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}m.innerHTML=g(e.hits),h.refresh(),e.totalHits>15?a.classList.remove("visually-hidden"):r.warning({message:"We're sorry, but you've reached the end of search results."})}catch{c.classList.add("visually-hidden"),r.error({message:"Sorry, there was an error fetching the images. Please try again!"})}finally{i.target.reset()}}async function b(i){o+=1,a.disabled=!0;try{const e=await f(d,o);m.insertAdjacentHTML("beforeend",g(e.hits)),h.refresh(),(e.hits.length<15||o===Math.ceil(e.totalHits/15))&&(a.classList.add("visually-hidden"),r.warning({message:"We're sorry, but you've reached the end of search results."}));const l=document.querySelector(".gallery-item");let n=Math.ceil(l.getBoundingClientRect().height);window.scrollBy({left:0,top:n*2,behavior:"smooth"})}catch(e){console.log(e.message)}finally{a.disabled=!1}}
//# sourceMappingURL=index.js.map
