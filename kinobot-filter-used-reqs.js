// ==UserScript==
// @name         Kinobot Filter Used Requests
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds a filter toggle.
// @author       seaque
// @license      MIT
// @match        *://*.kino.caretas.club/user*
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @icon         data:image/svg+xml,<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.16 122.88"><defs><style>.cls-1{fill: whitesmoke;}</style></defs><title>film-camera</title><path class="cls-1" d="M14.76,47.89H71.34a9.56,9.56,0,0,1,9.54,9.53V93a9.58,9.58,0,0,1-9.54,9.54H53.86l12.7,20.37H54.73L40.89,104.27l-14,18.61h-12l12.62-20.37H14.76A9.57,9.57,0,0,1,5.22,93V57.42a9.56,9.56,0,0,1,9.54-9.53Zm.24-38a15,15,0,1,1-15,15,15,15,0,0,1,15-15ZM5.27,24.93A3.05,3.05,0,1,1,8.32,28a3,3,0,0,1-3.05-3.05Zm9.81,9.66a3.06,3.06,0,1,1,3-3.06,3.05,3.05,0,0,1-3,3.06Zm9.66-9.82a3.06,3.06,0,1,1-3-3.05,3.06,3.06,0,0,1,3,3.05Zm-9.82-9.66a3.06,3.06,0,1,1-3.05,3.06,3.06,3.06,0,0,1,3.05-3.06ZM61.06,0A19.89,19.89,0,1,1,41.17,19.89,19.88,19.88,0,0,1,61.06,0Zm-.12,5.8a4.44,4.44,0,1,1-4.44,4.44A4.44,4.44,0,0,1,60.94,5.8ZM46.88,20.08a4.45,4.45,0,1,1,4.44,4.44,4.44,4.44,0,0,1-4.44-4.44ZM61.17,34.14a4.44,4.44,0,1,1,4.44-4.44,4.44,4.44,0,0,1-4.44,4.44Zm14-14.28a4.44,4.44,0,1,1-4.44-4.45,4.44,4.44,0,0,1,4.44,4.45ZM86.3,91V60.38l25.86-15.24v61.51L86.3,91Z"/></svg>
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */
 
(function() {
    'use strict';
 
    function setVisibility(status) {
        if (status == "hide")
        {
            $("#requests_table > thead > tr > td:nth-child(2):contains('1')").parent().hide();
        }
        if (status == "show")
        {
            $("#requests_table > thead > tr > td:nth-child(2):contains('1')").parent().show();
        }
    }
 
    // Create filter button as a table element
    let tableElement = document.createElement ('tr');
    tableElement.setAttribute("id", "my_tr");
    tableElement.innerHTML = '<td></td><td><img src="https://cdn-icons-png.flaticon.com/512/60/60954.png" style="width: 1.5em; margin-right: 10px; filter: invert(100%); pointer-events: none;"><input type="checkbox" id="switch" class="checkbox" /><label for="switch" class="toggle"></label></td>';
    GM_addStyle("#my_tr { text-align: right; } .toggle { position: relative; display: inline-block; width: 1.5em; background-color: #EFCFD4; border-radius: 10px; border: 2px solid #DEC2C5; padding: 10px; } .toggle:after { content: ''; position: absolute; width: 1.1em; height: 1.1em; border-radius: 50%; background-color: #770919; top: 1px; left: 1px; bottom:1px; transition: all 0.5s; margin-bottom:5px; } .checkbox:checked + .toggle::after { left : 1.5em; background-color: #FFFFFF;} .checkbox:checked + .toggle { background-color: #770919; } .checkbox { display : none; }");
 
    $(tableElement).insertBefore('.header');
 
 
 
    $('#my_tr :checkbox').change(function() {
        if (this.checked) {
            setVisibility("hide");
            localStorage.setItem("hideOnLoad", true);
        } else {
            setVisibility("show");
            localStorage.setItem("hideOnLoad", false);
        }
    });
 
    if (localStorage.getItem("hideOnLoad") !== undefined){
 
        if (localStorage.getItem("hideOnLoad") === "true") {
            setVisibility("hide");
            $('#my_tr :checkbox').prop('checked', true);
        }
        else {
            setVisibility("show");
            $('#my_tr :checkbox').prop('checked', false);
        }
    }
})();