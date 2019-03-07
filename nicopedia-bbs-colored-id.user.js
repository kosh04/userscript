// ==UserScript==
// @name         Nicopedia-BBS-Colored-ID
// @namespace    https://github.com/kosh04/userscript
// @updateURL    https://github.com/kosh04/userscript/raw/master/nicopedia-bbs-colored-id.user.js
// @version      0.20190308
// @description  ニコニコ大百科掲示板のID表記を色分けする
// @author       kosh (mono)
// @match        http://dic.nicovideo.jp/*
// @match        https://dic.nicovideo.jp/*
// @grant        none
// @noframes
// ==/UserScript==

// ChangeLog
// =========
// * 0.20190308 PC版サイトのデザインリニューアルに伴うCSSセレクタの修正
// * 0.20181005 初版

// https://stackoverflow.com/a/7616484/4499880
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function dechex(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }
    return parseInt(number, 10).toString(16);
}
function id2rgb(id) {
    return "#" + ("000000" + dechex(id.hashCode())).slice(-6);
}

document.querySelectorAll(".st-bbs_resInfo").forEach(reshead => {
    reshead.innerHTML = reshead.innerHTML.replace(/ID: ([A-Za-z0-9+\/]{10})/, (match_, id, offset_, _string_) => {
        const rgb = id2rgb(id);
        return `ID: <span style="background: linear-gradient(transparent 85%, ${rgb} 0%);" data-id="${id}">${id}</span>`;
    });
});
