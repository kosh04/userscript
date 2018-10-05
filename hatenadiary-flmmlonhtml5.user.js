// ==UserScript==
// @name         Hatena::Diary FlMMLonHTML5
// @namespace    https://github.com/kosh04/userscript
// @version      0.20180925
// @description  はてなダイアリーのメロディ再生記法を FlMMLonHTML5 プレイヤーで再生する
// @author       kosh04
// @match        http://d.hatena.ne.jp/*
// @require      https://rawgit.com/carborane3/FlMMLonHTML5/596df3a5dfeb95b3cc84d7ffe1e0ca92d66c1222/flmmlonhtml5.js
// @require      https://rawgit.com/carborane3/FlMMLonHTML5/596df3a5dfeb95b3cc84d7ffe1e0ca92d66c1222/flmmlplayer.js
// @resource     flmmlworker.js  https://rawgit.com/carborane3/FlMMLonHTML5/596df3a5dfeb95b3cc84d7ffe1e0ca92d66c1222/flmmlworker.js
// @grant        GM_getResourceText
// @noframes
// ==/UserScript==

// FlMMLonHTML v1.1.0 commit:596df3a

var code = GM_getResourceText("flmmlworker.js");
var blob = new Blob([code], { type: "text/javascript" });
var workerURL = URL.createObjectURL(blob);

[].forEach.call(document.querySelectorAll(".mml-source"), function(elem) {
    var mml = elem.textContent;
    var player = new FlMMLPlayer({
        mml: mml,
        height: "1.55em",
        underground: true,
        workerURL: workerURL
    });
    elem.parentNode.insertBefore(player.svg, elem);
});
