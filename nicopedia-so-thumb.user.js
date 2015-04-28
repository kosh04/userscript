// ==UserScript==
// @name         Nicopedia-so-Thumb
// @namespace    http://lambda.que.jp/userscript
// @version      0.1.20141113
// @description  ニコニコ大百科 公式動画サムネイルを正しいものに置き換える [不具合修正]
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @match        http://dic.nicovideo.jp/*
// @author       kosh (mono)
// @license      Public domain
// ==/UserScript==

var selector = 'iframe[src^="http://ext.nicovideo.jp/thumb/so"]',
    tail = function(url) { return split("/").pop(); };
Array.prototype.forEach.call(document.querySelectorAll(selector), function(iframe) {
    var so_id = tail(iframe.src);
    GM_log("Found Thumbnail: " + so_id);
    GM_xmlhttpRequest({
      method: "HEAD",
      url: "http://www.nicovideo.jp/watch/" + so_id,
      onload: function(res) {
          var video_id = tail(res.finalUrl);
          iframe.src = "http://ext.nicovideo.jp/thumb/" + video_id;
      }
    });

});

