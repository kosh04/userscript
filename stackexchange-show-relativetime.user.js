// ==UserScript==
// @name         StackExchange-Show-Relativetime
// @namespace    https://github.com/kosh04/userscript
// @version      0.1.20150428
// @description  Replace .user-action-time/.comment-date to relativetime in StackExchange
// @grant        none
// @match        https://stackoverflow.com/*
// @match        https://*.stackoverflow.com/*
// @match        https://stackexchange.com/*
// @match        https://*.stackexchange.com/*
// @require      none
// @author       KOBAYASHI Shigeru (kosh)
// @license      Public domain
// ==/UserScript==

function replaceRelativetime(times) {
    [].forEach.call(times, function(time) {
        time.dataset.originalText = time.innerText;
        time.innerText = time.title;
    });
}

replaceRelativetime(document.querySelectorAll('.relativetime'));
replaceRelativetime(document.querySelectorAll('.relativetime-clean'));
