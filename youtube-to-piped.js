// ==UserScript==
// @name         Youtube 2 Piped
// @version      0.1
// @description  Redirect YouTube to piped.kavin.rocks
// @author       seaque
// @license      MIT
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
 
(function() {
    'use strict';
 
    if (window.location.href.match(/^https?:\/\/www.youtube\.com\/watch\?v=[A-Za-z0-9]*/)) {
	window.location.replace ("https://piped.video" + window.location.href.substr(23,44));
}
})();