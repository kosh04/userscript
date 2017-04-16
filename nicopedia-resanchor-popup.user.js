// ==UserScript==
// @name      Nicopedia-Resanchor-Popup
// @namespace http://lambda.que.jp/
// @version   0.1.20170416
// @description  ニコニコ大百科 掲示板のレスアンカーをポップアップ表示する
// @grant     GM_addStyle
// @grant     GM_getResourceURL
// @grant     GM_getResourceText
// @match     http://dic.nicovideo.jp/*
// @match     https://dic.nicovideo.jp/*
// @require   https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require   https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @resource  jquery-ui.css https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/css/jquery-ui.css
// @resource  images/ui-bg_flat_75_ffffff_40x100.png https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/css/images/ui-bg_flat_75_ffffff_40x100.png
// @author    kosh (mono)
// @license   Public domain
// ==/UserScript==

var css = GM_getResourceText("jquery-ui.css")
.replace("images/ui-bg_flat_75_ffffff_40x100.png", GM_getResourceURL("images/ui-bg_flat_75_ffffff_40x100.png"));
GM_addStyle([
    css,
    ".ui-tooltip {",
    "  min-width: 600px;",
    "  font-size: small;",
    "  line-height: 1.3em;",
    "  text-align: left;",
    "}"
].join("\n"));

function getAnchorContent(id, context) {
    var $anchor, doc = document;
    // jQueryによるHTML解析は<script>が実行されるらしい
    // var $anchor = $(context || document).find("a[name=" + id + "]");
    
    if (typeof context === "string") {
        var parser = new DOMParser();
        doc = parser.parseFromString(context, "text/html");
    }
    $anchor = $(doc).find("a[name=" + id + "]");
    if ($anchor.length === 0) {
        return null;
    }

    var $parent = $anchor.parent();
    return "<dl>" + /*dt*/ $parent[0].outerHTML + /*dd*/ $parent.next()[0].outerHTML + "</dl>";
}

$("dd.resbody a.dic").filter(function() {
    return this.hash.match(/^#[0-9]+$/);
}).tooltip({
    items: "[href]",
    content: "読み込み中",
    open: function(event, ui) {
        var $elem = $(this),
            url = this.href,
            anchor_id = this.hash.substring(1),
            content = getAnchorContent(anchor_id),
            popup = function(content) {
                $elem.tooltip("option", "content", content);
            };
        if (content) {
            // console.log("同じページ");
            popup(content);
        } else {
            // console.log("別のページ");
            $.get(url, null, function(data) {
                var content = getAnchorContent(anchor_id, data) || "見つかりません";
                popup(content);
            });
        }
    },
/*
    // 表示位置をカーソルの右上にするとレスと被らなくて見やすい
    // ただし、カーソルのフォーカスと表示が引っかかる気がする
    position: {
        at: "right top-20",
        my: "right bottom"
    }
*/
});
