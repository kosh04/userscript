// ==UserScript==
// @name         FlMML-anwhere
// @namespace    https://github.com/kosh04/userscript
// @version      0.1.20211001
// @description  Play FlMML
// @description:ja  選択範囲を MML 文字列として再生する
// @author       Kosh
// @match        https://*/*
// @require      https://cdn.jsdelivr.net/npm/flmml-on-html5@2.0.0/dist/flmml-on-html5.js
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @noframes
// ==/UserScript==

'use strict';

/*global FlMML */

const flmml = new FlMML({
    crossOriginWorker: true,
    workerURL: 'https://cdn.jsdelivr.net/npm/flmml-on-html5@2.0.0/dist/flmml-on-html5.worker.js',
    lamejsURL: 'https://cdn.jsdelivr.net/npm/lamejs@1.2.0/lame.min.js',
});

flmml.addEventListener('compilecomplete', () => {
    let msg = flmml.getWarnings();
    if (!msg) return;
    GM_log(`Warning: ${msg}`);
});
flmml.addEventListener('onbuffering', (e) => {
    GM_log(`Buffering: ${e.progress}%`);
});
flmml.addEventListener('syncinfo', () => {
    GM_log(`Time: ${flmml.getNowTimeStr()}/${flmml.getTotalTimeStr()}`);
});

let currentMMLText;
GM_registerMenuCommand('⏯️ 再生/一時停止', () => {
    if (flmml.isPlaying()) {
        flmml.pause();
        return;
    } else if (flmml.isPaused()) {
        flmml.play(currentMMLText);
        return;
    }
    let mml = getSelection().toString();
    if (!mml) {
        alert('範囲を選択してください');
        return;
    }
    currentMMLText = mml;
    flmml.play(mml);
});
/*
GM_registerMenuCommand('⏸️ 一時停止', () => {
    flmml.pause();
});
*/
GM_registerMenuCommand('⏹️ 停止', () => {
    flmml.stop();
});
/*
GM_registerMenuCommand('🔊 ボリューム設定', () => {});
GM_registerMenuCommand('⏺️ 録音 (WAV)', () => {
    alert('未実装');
});
GM_registerMenuCommand('⏺️ 録音 (MP3)', () => {
    alert('未実装');
});
*/

FlMML.prepare('body');
