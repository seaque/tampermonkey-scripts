// ==UserScript==
// @name         Letterboxd Poster Ambience
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @version      1.3
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
    const logPrefix = '%cLETTERBOXD POSTER AMBIENCE';

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
        try {
            const posterImage = new Image();

            imageElement = $('a > div.film-poster > div > img');
            if (!imageElement || imageElement.length === 0) {
                throw new Error('Poster image element not found.');
            }

            const url = imageElement[0].getAttribute('srcset');
            if (!url) {
                throw new Error('Poster image URL not found.');
            }

            console.info(logPrefix, logStyle, `Successfully fetched poster: "${url}"`);
            posterImage.crossOrigin = "Anonymous";
            posterImage.src = url;

            return posterImage;
        } catch (error) {
            console.error(logPrefix, logStyle, `Error fetching poster image: ${error.message}`);
            return null;
        }
    };

    const addAmbientDiv = () => {
        const img = getPosterImage();
        if (!img) return;

        img.addEventListener("load", () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            if (isMobile){
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(img, width / 3, height / 3));
            }
            else {
                imageElement.parent().parent().parent().parent().prepend(createAmbientDiv(img, width, height));
            }
        });
    };

    let funcInterval = setInterval(() => {
        if ( $('#ambientDiv img').length ){
            console.info(logPrefix, logStyle, 'Poster Ambience Applied.');
            clearInterval(funcInterval);
            funcInterval = null;
            return;
        }
        addAmbientDiv();
    }, 2000);

    const logStyle = [
        'color: white',
        'background: #445566',
        'border: 1px solid #2c3440',
        'border-radius: 4px',
    ].join(';');

    setTimeout(() => {
        if (funcInterval) {
            console.info(logPrefix, logStyle, 'Time Out. Exiting...');
        }
    }, 8000);
})();
