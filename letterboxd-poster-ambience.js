// ==UserScript==
// @name         Letterboxd Poster Ambience
// @version      1.1
// @description  Ambient background color for film posters.
// @author       seaque
// @license       MIT
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @downloadURL  https://github.com/seaque/tampermonkey-scripts/raw/main/letterboxd-poster-ambience.js
// @match        *://*.letterboxd.com/film/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==
 
(function() {
    'use strict';
    
    let imageElement;
    let isMobile = window.navigator.userAgent.toLowerCase().includes("mobi");
    
    const rgbToHex = (r, g, b) => {
        const hexValue = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return "#" + hexValue;
    }
 
    const createAmbientDiv = (color, w, h) => {
        const ambient_div = document.createElement('div');
        ambient_div.setAttribute('id', 'ambientDiv');
        GM_addStyle(`
            #ambientDiv {
              width: ${w}px;
              height: ${h}px;
              position: absolute;
              -webkit-filter: blur(100px);
              background-color: ${color};
              opacity: 0;
              animation: show 500ms 50ms cubic-bezier(0.38, 0.97, 0.56, 0.76) forwards;
            }
            @keyframes show {
              100% {
                opacity: 0.6;
                transform: none;
              }
            }
          `);
 
        return ambient_div;
    };
 
    const getPosterImage = () => {
 
        if (isMobile){
            imageElement = $('div.poster-list > a#poster-zoom > div.film-poster > div > img');}
        else {
            imageElement = $('section.poster-list > a#poster-zoom > div.film-poster > div > img')
        }
 
        const url = imageElement[0].getAttribute('srcset');
 
        const posterImage = new Image();
        posterImage.crossOrigin = "Anonymous";
        posterImage.src = url;
 
        return posterImage;
    };
 
    const addAmbientDiv = () => {
        const img = getPosterImage();
        const colorThief = new ColorThief();
        const hexValue = rgbToHex(...colorThief.getColor(img));
        //console.log("[POSTER AMBIENCE]", colorThief.getPalette(img));
 
        img.addEventListener("load", () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            if (isMobile){
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(hexValue, width / 3, height / 3));
            }
            else {
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(hexValue, width / 1.7, height / 1.7));
            }
        });
    };
 
    setInterval(function() {
        if ( $('#ambientDiv').length ){
            return;
        }
        addAmbientDiv();
    }, 750);
 
})();