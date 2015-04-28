// ==UserScript==
// @name         colorbox-anyware
// @namespace    http://lambda.que.jp/userscript
// @version      0.1.20150428
// @description  Colorbox (a jQuery lightbox plugin) with any web page.
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_addStyle
// @match        http://*/*
// @match        https://*/*
// @exclude      https://*.google.co.jp/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery-1.8.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/jquery.colorbox.js
// @resource     colorbox.css         https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/colorbox.css
// @resource     images/border.png    https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/border.png
// @resource     images/controls.png  https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/controls.png
// @resource     images/loading.gif   https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/loading.gif
// @resource     images/loading_background.png  https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/loading_background.png
// @resource     images/overlay.png   https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/overlay.png
// @author KOBAYASHI Shigeru (kosh)
// @copyright 2015 kosh
// ==/UserScript==

// TODO
// - Avoid conflict other lightbox plugin

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}

var css = GM_getResourceText("colorbox.css"),
    resources = [
        { from: "images/border.png",   to: GM_getResourceURL("images/border.png")},
        { from: "images/controls.png", to: GM_getResourceURL("images/controls.png") },
        { from: "images/loading.gif",  to: GM_getResourceURL("images/loading.gif") },
        { from: "images/loading_background.png", to: GM_getResourceURL("images/loading_background.png") },
        { from: "images/overlay.png",  to: GM_getResourceURL("images/overlay.png") }
    ];

for (var i = 0; i < resources.length; i++) {
    var from = new RegExp(escapeRegExp(resources[i].from), "g"),
        to = resources[i].to;
    css = css.replace(from, to);
}

GM_addStyle(css);

$("a").filter(function() {
    return this.href.match(/\.(jpe?g|png|gif)$/i);
}).colorbox({
    rel:'group1',
    height: "85%",
    slideshow:false,
    title: function() {
        return $(this).attr('title');
    }
});
