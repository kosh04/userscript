// ==UserScript==
// @name         colorbox-anywhere
// @namespace    https://github.com/kosh04/userscript
// @version      0.20180930
// @description  Colorbox (a jQuery lightbox plugin) with any web page.
// @author       KOBAYASHI Shigeru (kosh)
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
// @noframes
// ==/UserScript==

// TODO
// - Avoid conflict other lightbox plugin

/* global jQuery, $ */

GM_registerMenuCommand("Enable Colorbox", function() {
    let css = GM_getResourceText("colorbox.css");
    css = css.replace(/images\/\w+\.(?:png|gif)/g, (match, _offset, _string) => {
        return GM_getResourceURL(match) || match;
    });

    GM_addStyle(css);

    let $a = $("a").filter((_, elm) => elm.pathname.match(/\.(jpe?g|png|gif)$/i));

    alert(`Found ${$a.length} items.`);

    $a.colorbox({
        rel:'group1',
        height: "100%",
        slideshow: false,
        title: function() {
            let a = $(this);
            let img = a.find("img");
            return img.attr("title") ||
                img.attr("alt") ||
                img.attr("src") ||
                a.text();
      }
    });
});
