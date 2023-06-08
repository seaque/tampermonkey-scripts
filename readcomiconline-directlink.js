// ==UserScript==
// @name         ReadComicOnline Direct Image Link
// @version      1.0
// @description  Adds a button in top navbar to open corresponding comic panel source url.
// @license      MIT
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @downloadURL  https://github.com/seaque/tampermonkey-scripts/raw/main/readcomiconline-directlink.js
// @author       seaque
// @match        *://*.readcomiconline.li/Comic/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=readcomiconline.li
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const getCurrentImageSrc = () => {
        let currentImage = document.querySelector("#imgCurrent");
        return currentImage.src;
    }

    const createHyperlinkElement = (src) => {
        const hyperlinkElement = document.createElement('a');
        hyperlinkElement.setAttribute('href', src);
        hyperlinkElement.setAttribute('target', '_blank');
        hyperlinkElement.innerHTML = 'Direct Link';

        return hyperlinkElement;
    };

    const createNavbarDiv = (div) => {
        const parentDiv = document.querySelector('#navcontainer ul');
        const navbarDiv = document.createElement('li');
        navbarDiv.setAttribute('id', 'navcontainer');
        navbarDiv.setAttribute('class', 'directLink');

        GM_addStyle(`
          .directLink a {
            float: right !important;
          }
        `);

        navbarDiv.appendChild(div);
        parentDiv.appendChild(navbarDiv);
    };

    createNavbarDiv(
        createHyperlinkElement(
            getCurrentImageSrc()
        )
    );

    document.querySelectorAll('#btnPrevius, #btnNext').forEach(element => {
        element.addEventListener('click', () => {
            document.querySelector('.directLink a').href = getCurrentImageSrc();
        });
    });

})();