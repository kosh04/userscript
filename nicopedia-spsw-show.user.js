// ==UserScript==
// @name         ニコニコ大百科 スマートフォン版リンクを常に表示する
// @namespace    http://lambda.que.jp/
// @version      0.1.20141202
// @description  ニコニコ大百科(通常版)の右メニューにある「スマートフォン版で見る」リンクを常に表示する
// @grant        none
// @match        http://dic.nicovideo.jp/*
// @exclude      http://dic.nicovideo.jp/t/*
// @author       kosh (mono)
// @license      Public domain
// ==/UserScript==

(function($) {
    $("#spsw").show();
})(jQuery);
