// ==UserScript==
// @name         colorbox-anywhere
// @namespace    https://github.com/kosh04/userscript
// @version      0.1.20171208
// @description  Colorbox (a jQuery lightbox plugin) with any web page.
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @match        http://*/*
// @match        https://*/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery-1.8.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/jquery.colorbox.js
// @resource     colorbox.css         https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/colorbox.css
// @resource     images/border.png    https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/border.png
// @resource     images/controls.png  https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/controls.png
// @resource     images/loading.gif   https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/loading.gif
// @resource     images/loading_background.png  https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/loading_background.png
// @resource     images/overlay.png   https://cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.4.33/example1/images/overlay.png
// @author       KOBAYASHI Shigeru (kosh)
// @copyright    2015-2017 kosh
// ==/UserScript==

// TODO
// - Avoid conflict other lightbox plugin

function escapeRegExp(string) {
    var re = new RegExp("([.*+?^=!:${}()|[\]/\\\\])", "g");
    return string.replace(re, "\\$1");
}

function enable_colorbox() {
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

    var $a = $("a").filter(function() {
        var path = new URL(this.href).pathname; // trim query string
        return path.match(/\.(jpe?g|png|gif)$/i);
    });
    alert(`Found ${$a.length} items.`);

    $a.colorbox({
        rel:'group1',
        height: "100%",
        slideshow: false,
        title: function() {
            var a = $(this);
            var img  = a.find("img");
            return img.attr("title") ||
                img.attr("alt") ||
                img.attr("src") ||
                a.text();
        }
    });
}

GM_registerMenuCommand("Enable Colorbox", enable_colorbox);
