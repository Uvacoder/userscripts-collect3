// ==UserScript==
// @name         GitHub Webhook Events Toggle Checkboxes
// @version      1.0.0
// @description  Adds additional buttons to the github webhook event settings page, to easily Check, Uncheck and Invert all checkboxes
// @license      MIT
// @author       Bluscream, Mottie
// @namespace    https://github.com/Mottie
// @match        https://github.com/*/*/settings/hooks/*
// @run-at       document-idle
// @grant        GM_addStyle
// @grant        GM.addStyle
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-webhook-utils.user.js
// @downloadURL  https://raw.githubusercontent.com/Mottie/GitHub-userscripts/master/github-webhook-utils.user.js
// @supportURL   https://github.com/Mottie/GitHub-userscripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const actions = ['invert', 'check', 'uncheck'];
    const buttons = actions.map(action => {
        const btn = document.createElement('button');
        btn.textContent = `${action} all`;
        btn.style.position = 'fixed';
        btn.style.bottom = `${30 * (actions.indexOf(action) + 1)}px`; // Adjust position based on index
        btn.style.right = '20px';
        btn.style.marginBottom = '1px'; // Additional spacing below the button
        btn.style.zIndex = '1000';
        btn.onclick = () => {
            const selectors = document.querySelectorAll('div.hook-event-selector input[type="checkbox"]');
            selectors.forEach(checkbox => {
                checkbox.checked = action === 'invert'?!checkbox.checked : action === 'check';
            });
        };
        return btn;
    });

    buttons.forEach(btn => document.body.appendChild(btn));
})();
