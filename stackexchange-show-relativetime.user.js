// ==UserScript==
// @name         StackExchange-Show-Relativetime
// @namespace    http://lambda.que.jp/userscript
// @version      0.1.20150428
// @description  Replace .user-action-time/.comment-date to relativetime in StackExchange
// @grant        none
// @match        http://stackoverflow.com/*
// @match        http://*.stackoverflow.com/*
// @match        http://stackexchange.com/*
// @match        http://*.stackexchange.com/*
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
