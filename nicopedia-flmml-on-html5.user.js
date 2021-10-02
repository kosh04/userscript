// ==UserScript==
// @name        Nicopedia-FlMMLonHTML5
// @namespace   https://github.com/kosh04/FlMMLonHTML5
// @version     0.20181110
// @description ニコニコ大百科のピコカキコプレーヤーをFlMMLonHTML5に置き換える (デバッグ用)
// @grant       GM_getResourceText
// @match       http://dic.nicovideo.jp/*
// @match       https://dic.nicovideo.jp/*
// @resource    flmmlworker.js  https://argentum384.github.io/flmml-on-html5/flmmlworker.js
// @noframes
// @author      kosh (mono)
// ==/UserScript==

function loadScript(src) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src;
    document.head.appendChild(s);
}

// NOTE: バージョンは flmmlonhtml5.js のヘッダーコメント参照
loadScript("https://argentum384.github.io/flmml-on-html5/flmmlonhtml5.js");
loadScript("https://argentum384.github.io/flmml-on-html5/flmmlplayer.js");

const code = GM_getResourceText("flmmlworker.js");
const blob = new Blob([code], { type: "text/javascript" });
const workerURL = URL.createObjectURL(blob);

document.querySelectorAll("[id^=piko]").forEach(piko => {
    const m = piko.id.match(/^piko(?:bbs|list)?(\d+)/);
    if (!m) return;
    const mml_id = m[1];        // "piko777" -> "777"
    const option = JSON.stringify({
      mmlURL: `/mml/${mml_id}`,
      height: "1.65em",
      underground: true,
      workerURL: workerURL
    });
    const code = `(function(elem) { var player = new FlMMLPlayer(${option}); elem.parentNode.replaceChild(player.svg, elem); })(this)`;

    const imgPikoplayer = piko.children.item(0);
    imgPikoplayer.setAttribute("onclick", code);
});
