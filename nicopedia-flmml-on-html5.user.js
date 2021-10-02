// ==UserScript==
// @name        Nicopedia-FlMMLonHTML5
// @namespace   https://github.com/kosh04/userscript
// @version     0.20211002
// @description ニコニコ大百科のピコカキコプレーヤーをFlMMLonHTML5に置き換える (デバッグ用)
// @match       https://dic.nicovideo.jp/*
// @require     https://cdn.jsdelivr.net/npm/flmml-on-html5@2.0.0/dist/flmml-on-html5.js
// @require     https://ghcdn.rawgit.org/argentum384/flmml-on-html5/v1.2.0/src/flmmlplayer-raw.js
// @resource    flmmlworker.js  https://cdn.jsdelivr.net/npm/flmml-on-html5@2.0.0/dist/flmml-on-html5.worker.js
// @grant       GM_getResourceText
// @grant       GM_registerMenuCommand
// @grant       unsafeWindow
// @noframes
// @author      kosh (mono)
// ==/UserScript==

/*global FlMML,FlMMLPlayer*/

'use strict';

// XXX: FlMMLPlayer@1.x から FlMML@2.x を呼び出すための回避策
// v2.0.0 リリースログから引用
// >>> エントリポイント FlMMLonHTML5 の名前を FlMML に変更。ただし当面の間 FlMMLonHTML5 でも利用可
unsafeWindow.FlMMLonHTML5 = FlMML;

// XXX: CORS 対策
const workerURL = (() => {
    const code = GM_getResourceText("flmmlworker.js");
    const blob = new Blob([code], { type: "application/javascript" });
    return URL.createObjectURL(blob);
})();

// セレクタ指定ヒント
// id="piko12345"
// id="piko124_u2" (単語記事「ピコカキコ」参照)
// id="pikobbs12345"
// id="pikolist12345"
// id="pikosearch12345"
const pikoSelector = '[id^=piko]';

document.querySelectorAll(pikoSelector).forEach(piko => {
    const m = piko.id.match(/^piko(?:bbs|list|search)?(\d+)/);
    if (!m) return;
    const mml_id = m[1]; // "piko777" -> "777"

    const imgPikoplayer = piko.children.item(0);
    imgPikoplayer.removeAttribute("onclick"); // 元イベントの無効化
    imgPikoplayer.addEventListener('click', (e) => {
        const player = new FlMMLPlayer({
            mmlURL: `/mml/${mml_id}`,
            height: "1.8em",
            underground: true,
            workerURL: workerURL,
        });
        e.target.parentNode.replaceChild(player.svg, e.target);
    });
});

FlMML.prepare(pikoSelector);
