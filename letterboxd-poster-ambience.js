// ==UserScript==
// @name         Letterboxd Poster Ambience
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @version      1.2.1
// @description  Ambient background color for film posters.
// @author       seaque
// @license       MIT
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @downloadURL  https://github.com/seaque/tampermonkey-scripts/raw/main/letterboxd-poster-ambience.js
// @match        *://*.letterboxd.com/film/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
 
(function() {
    'use strict';
    
    let imageElement;
    let isMobile = window.navigator.userAgent.toLowerCase().includes("mobi");
    
    const createAmbientDiv = (img, w, h) => {
        const ambient_div = document.createElement('div');
        ambient_div.setAttribute('id', 'ambientDiv');
        GM_addStyle(`
            #ambientDiv {
              position: absolute;
              margin-left: -10px;
            }
            #ambientDiv img {
              width: ${w}px;
              height: ${h}px;
              max-width: 280px;
              max-height: 420px;
              -webkit-filter: blur(100px);
              opacity: 0;
              animation: show 500ms 50ms cubic-bezier(.45,.05,.55,.95) forwards;
            }
            @keyframes show {
              25% {
                opacity: 0.2;
                transform: none;
              }
              100% {
                opacity: 0.65;
                transform: none;
              }
            }
        `);

        ambient_div.append(img);
        return ambient_div;
    };

    const getPosterImage = () => {

        imageElement = $('div.film-poster > div > img')
        const url = imageElement[0].getAttribute('srcset');

        const posterImage = new Image();
        posterImage.crossOrigin = "Anonymous";
        posterImage.src = url;

        return posterImage;
    };

    const addAmbientDiv = () => {
        const img = getPosterImage();

        img.addEventListener("load", () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            if (isMobile){
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(img, width / 5, height / 5));
            }
            else {
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(img, width, height));
            }
        });
    };

    setInterval(function() {
        if ( $('#ambientDiv img').length ){
            return;
        }
        addAmbientDiv();
    }, 2500);

})();
