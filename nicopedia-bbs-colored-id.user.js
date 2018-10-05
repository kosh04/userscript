// ==UserScript==
// @name         Nicopedia-BBS-Colored-ID
// @namespace    https://github.com/kosh04/userscript
// @version      0.20181005
// @description  ニコニコ大百科掲示板のid表記を色分けする
// @author       kosh (mono)
// @match        http://dic.nicovideo.jp/*
// @match        https://dic.nicovideo.jp/*
// @grant        none
// @noframes
// ==/userscript==

// https://stackoverflow.com/a/7616484/4499880
string.prototype.hashcode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charcodeat(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // convert to 32bit integer
    }
    return hash;
};

function dechex(number) {
    if (number < 0) {
        number = 0xffffffff + number + 1;
    }
    return parseint(number, 10).tostring(16);
}
function id2rgb(id) {
    return "#" + ("000000" + dechex(id.hashcode())).slice(-6);
}

[].foreach.call(document.queryselectorall(".reshead"), (reshead) => {
    reshead.innerHTML = reshead.innerHTML.replace(/ID: ([A-Za-z0-9+\/]{10})/, (match_, id, _offset, _string_) => {
        const rgb = id2rgb(id);
        return `ID: <span style="background: linear-gradient(transparent 85%, ${rgb} 0%);" data-id="${id}">${id}</span>`;
    });
});
