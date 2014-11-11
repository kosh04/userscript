// ==UserScript==
// @name      newLISP-Documentation-Highlight
// @namespace http://lambda.que.jp/
// @version   20141001
// @description  Provide syntax hightlighting in newLISP documentation
// @grant   GM_addStyle
// @grant   GM_getResourceText
// @match   http://www.newlisp.org/*/newlisp_manual.html
// @match   http://www.newlisp.org/*/CodePatterns.html
// @require http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/highlight.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/languages/lisp.min.js
// @resource default.css http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/styles/default.min.css
// @resource github.css  http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/styles/github.min.css
// @resource zenburn.css http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.2/styles/zenburn.min.css
// @author KOBAYASHI Shigeru (kosh)
// @license Public domain
// ==/UserScript==

GM_addStyle([
    GM_getResourceText("zenburn.css"),
    "pre code {",
    "  font-size: 110%;",
    "  font-family: Consolas, 'Courier New', Courier, Monaco, monospace;",
    "}",
    "span.arw {",
    "  color: inherit;",
    "}"
].join("\n"));

$("pre").each(function(i, block) {
    // wrap <pre></pre> to <pre><code></code></pre>
    var code = $("<code></code>").html($(this).html());
    code.addClass("lisp");
    $(this).html(code);
});

hljs.configure({languages:["lisp", "c", "bash"]});
hljs.initHighlighting();
