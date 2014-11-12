// ==UserScript==
// @name         Nicopedia-Redefine-MMLPlayer
// @namespace    http://lambda.que.jp/
// @version      0.1.20141113
// @description  ニコニコ大百科 ピコカキコプレーヤーの読み込み位置を正しくする
// @grant        GM_addStyle
// @match        http://dic.nicovideo.jp/*
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require      http://jquery.thewikies.com/swfobject/jquery.swfobject.1-1-1.min.js
// @author       kosh (mono)
// @license      Public domain
// ==/UserScript==

/*
同じIDのピコカキコがページ上に複数ある場合、先頭のピコが再生されてしまう問題を修正する。

Before
------
<div id="piko777">
  <img src="/img/pikoplayer.png" onclick="HororeChuchuParero.MMLPlayer.show_player('piko777', 777)">
</div>

After
-----
<div id="piko777">
  <div class="pikoplayer" data-mml-id="777" onclick="HororeChuchuParero.MMLPlayer.show_player(this)">
    <img src="/img/pikoplayer.png">
  </div>
</div>
*/

(function($) {
    "use strict";

    // オブジェクトの擬似的な再定義
    var HororeChuchuParero = {
        flashVer: "2011090701"
    };

    GM_addStyle(".pikoplayer { display: inline-block; }");

    HororeChuchuParero.MMLPlayer = {
        show_player: function(item) {
            var mml_id = $(item).attr("data-mml-id");
            if (!$.flash.hasVersion('10.0.12')) {
                alert('ピコカキコはFlash 10以上でないと再生できないです。');
                return;
            }
            if (!$.cookie('volume')) {
                savePikoVolume(100);
            }
            $(item).empty().flash({
                swf: '/fla/' + HororeChuchuParero.flashVer + '/picoplayer.swf',
                width: 86,
                height: 18,
                wmode: 'window',
                hasVersion: '10.0.12',
                expressInstaller: '/fla/expressInstall.swf',
                flashvars: {
                    autoPlay: 'y',
                    mmlUrl: 'http://' + location.host + '/mml/' + mml_id,
                    volume: $.cookie('volume')
                },
                params: {
                    allowScriptAccess: 'sameDomain',
                    bgcolor: "#ffffff"
                }
            });
        }
    };
    
    $("[id^=piko]").each(function() {
        var $piko = $(this),
            mml_id = $piko.attr("id").substring(4), // id="piko777" to "777"
            $pikoplayer = $("<div />")
              .addClass("pikoplayer")
              .attr("data-mml-id", mml_id)
              // 元のオブジェクトを上書きしていないため、ここでは使えない
              // .attr("onclick", "HororeChuchuParero.MMLPlayer.show_player(this)")
              .click(function() {
                  HororeChuchuParero.MMLPlayer.show_player(this);
              });
        $piko.children().removeAttr("onclick");
        $piko.wrapInner($pikoplayer);
    });
})(jQuery);
