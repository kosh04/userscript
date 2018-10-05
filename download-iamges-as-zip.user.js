// ==UserScript==
// @name         Download images as ZIP
// @namespace    https://github.com/kosh04/userscript/
// @version      0.20181004
// @description  ページ内の直リンク画像をまとめてZIPで保存する
// @author       KOBAYASHI Shigeru (kosh[04])
// @match        http://*/*
// @match        https://*/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

/* global JSZip, saveAs */

function get(url) {
    return new Promise(function(resolve, reject) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            responseType: "arraybuffer",
            onload: function (event) {
                if (event.status == 200) {
                    resolve(event);
                } else {
                    reject(Error(event.statusText))
                }
            },
            onerror: function() {
                reject(Error("Network Error"));
            },
        });
    });
}

GM_registerMenuCommand("Download images as ZIP", function() {
    let zip = new JSZip();
    let urls = [].filter.call(document.querySelectorAll("a[href]"), (elm) => elm.pathname.match(/\.(jpe?g|png|gif)$/i)).map(a => a.href);

    if (urls.length == 0) {
        alert("No found any images");
        return;
    }

    Promise.all(urls.map(get))
    .then(function(events) {
        events.forEach(function(e, i) {
            zip.file(`${i}_${encodeURIComponent(e.finalUrl)}`, e.response)
        });

        // Download
        zip.generateAsync({type:"blob"})
        .then(function (blob) {
            saveAs(blob, `${document.title}.zip`);
        });
    }).catch(function(err) {
        alert(err);
    });
});
