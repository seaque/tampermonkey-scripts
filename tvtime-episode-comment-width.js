// ==UserScript==
// @name         TVTime Episode Comment Picture Width
// @version      1.0
// @description  Smaller comment pictures, bigger reaction icons.
// @author       seaque
// @license      MIT
// @namespace    https://github.com/seaque/tampermonkey-scripts
// @match        *://*.tvtime.com/*/show/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvtime.com
// @grant        GM_addStyle
// @run-at       document-start
// @namespace https://greasyfork.org/users/934668
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(" .comment .post .comment-picture img { width: 45%; } .comment .post .options .right-options { font-size: 18px; } .comment .reply .options { font-size: 16px; } ");

})();