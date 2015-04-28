// ==UserScript==
// @name         lightbox-anyware
// @namespace    http://lambda.que.jp/userscript
// @version      0.1.20150428
// @description  Lightbox (image slideshow) with any web page.
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_addStyle
// @match        http://*/*
// @match        https://*/*
// @exclude      https://*.google.co.jp/*
// @require      http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.8.0.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/js/lightbox.min.js
// @resource     lightbox.css    http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/css/lightbox.css
// @resource     loading.gif     http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/img/loading.gif
// @resource     close.png       http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/img/close.png
// @resource     next.png        http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/img/next.png
// @resource     prev.png        http://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/img/prev.png
// @author KOBAYASHI Shigeru (kosh)
// @copyright  2014 kosh
// ==/UserScript==

// TODO
// - Avoid conflict other lightbox plugin

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}

var css = GM_getResourceText("lightbox.css"),
    resources = [
        { from: "../img/loading.gif", to: GM_getResourceURL("loading.gif") },
        { from: "../img/close.png",   to: GM_getResourceURL("close.png") },
        { from: "../img/next.png",    to: GM_getResourceURL("next.png") },
        { from: "../img/prev.png",    to: GM_getResourceURL("prev.png") }
    ];

for (var i = 0; i < resources.length; i++) {
    var from = new RegExp(escapeRegExp(resources[i].from), "g"),
        to = resources[i].to;
    css = css.replace(from, to);
}

GM_addStyle(css);

$("a").filter(function() {
    return this.href.match(/\.(jpe?g|png|gif)$/i);
}).attr({ "data-lightbox": "slideshow" });

