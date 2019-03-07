// ==UserScript==
// @name         Hatena::Diary FlMMLonHTML5
// @namespace    https://github.com/kosh04/userscript
// @version      0.20181016
// @description  はてなダイアリーのメロディ再生記法を FlMMLonHTML5 プレイヤーで再生する
// @author       kosh04
// @match        http://d.hatena.ne.jp/*
// @require      https://carborane3.github.io/FlMMLonHTML5/flmmlonhtml5.js
// @require      https://carborane3.github.io/FlMMLonHTML5/flmmlplayer.js
// @resource     flmmlworker.js  https://carborane3.github.io/FlMMLonHTML5/flmmlworker.js
// @grant        GM_getResourceText
// @noframes
// ==/UserScript==

const code = GM_getResourceText("flmmlworker.js");
const blob = new Blob([code], { type: "text/javascript" });
const workerURL = URL.createObjectURL(blob);

document.querySelectorAll(".mml-source").forEach(elem => {
    const mml = elem.textContent;
    const player = new FlMMLPlayer({
        mml: mml,
        height: "1.55em",
        underground: true,
        workerURL: workerURL
    });
    elem.parentNode.insertBefore(player.svg, elem);
});
