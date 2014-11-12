// ==UserScript==
// @name         Nicopedia-Smartphone-Previewer
// @namespace    http://lambda.que.jp/
// @version      0.1.20141113
// @description  ニコニコ大百科の記事編集ページにスマートフォン版のプレビューを追加する
// @grant        GM_addStyle
// @match        http://dic.nicovideo.jp/p/a/*
// @match        http://dic.nicovideo.jp/p/v/*
// @match        http://dic.nicovideo.jp/p/i/*
// @match        http://dic.nicovideo.jp/p/l/*
// @match        http://dic.nicovideo.jp/p/u/*
// @match        http://dic.nicovideo.jp/p/c/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @author       kosh (mono)
// @license      Public domain
// ==/UserScript==

(function($) {
    "use strict";

    GM_addStyle([
        '.sp-window { padding: 5px; }',
        '.sp-window h2 { font-size: 1.3em; border-bottom: double 1px #8cc700; margin: 0.4em 0; }',
        '.resizable { overflow: auto; resize: both; }',
        '.sp-view { background-color: #fff; border: solid 1px #66a32f; margin: 10px auto; }',
        '.sp-view iframe { overflow: hidden; width: 100%; height: 100%; }',
        '#sp-view { width: 320px; height: 480px; }'
    ].join("\n"));

    var html = [
        '<div class="left-box" style="margin: 5px 0; background-image: none; border: solid 1px #aaa; border-radius: 5px;">',
        '  <div class="sp-window">',
        '    <h2>スマホ版プレビュー</h2>',
        '    <button class="sp-rotate-button" type="button">画面の回転</button>',
        '    <button class="sp-resize-button" type="button" data-width="320" data-height="480">320x480 (iPhone 4S)</button>',
        '    <button class="sp-resize-button" type="button" data-width="600" data-height="960">600x960 (Nexus 7)</button>',
        '    <div id="sp-view" class="sp-view">',
        '      <iframe srcdoc=""></iframe>',
        '    </div>',
        '  </div>',
        '</div>'
    ].join("\n");

    $("#article-tab-nico").before(html);
    // $("#sp-view").addClass("resizable");
    $("#sp-view > iframe").attr("srcdoc", [
        '<!DOCTYPE html><html><head><meta charset="utf-8" />',
        '<meta name="viewport" content="width=device-width" />',
        '<link rel="stylesheet" href="/main_sp.css?s=3" type="text/css" />',
        '</head>',
        '<body>',
        '<div class="article">',
        $('#nicopedia-article-textarea').text(),
        '</div>',
        '</body>',
        '</html>'
    ].join("\n"));

    $(".sp-rotate-button").click(function() {
        var $view = $("#sp-view"),
            width = $view.css("width"),
            height = $view.css("height");
        $view.css({
            "width": height,
            "height": width
        });
    });
    $(".sp-resize-button").each(function() {
        var $this = $(this),
            width = $this.attr("data-width"),
            height = $this.attr("data-height");
        $this.click(function() {
            $("#sp-view").css({
                "width": width + "px",
                "height": height + "px"
            });
        });
    });

}(jQuery));
