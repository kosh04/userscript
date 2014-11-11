// ==UserScript==
// @name      ピコカキコプレーヤーの読み込み位置を正しくする
// @namespace http://lambda.que.jp/
// @version   0.1.20141112
// @description  ニコニコ大百科 同じIDのピコカキコがページ上に複数ある場合に先頭のピコが再生されてしまう問題を修正する
// @grant     GM_addStyle
// @match     http://dic.nicovideo.jp/*
// @author    kosh (mono)
// @license   Public domain
// ==/UserScript==
/*
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

(function($, HororeChuchuParero) {
    GM_addStyle(".pikoplayer { display: inline-block; }");
    
    // オブジェクト再定義
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
                params: {
                    allowScriptAccess: 'sameDomain',
                    bgcolor: "#ffffff",
                    flashvars: {
                        autoPlay: 'y',
                        mmlUrl: 'http://' + location.host + '/mml/' + mml_id,
                        volume: $.cookie('volume')
                    }
                }
            });
        }
    };
    
    $('[id^="piko"]').each(function() {
        var $piko = $(this),
            mml_id = $piko.attr("id").substring(4), // id="piko777" to "777"
            $pikoplayer = $("<div>").addClass("pikoplayer").attr({
                "data-mml-id": mml_id,
                "onclick": "HororeChuchuParero.MMLPlayer.show_player(this)"
            });
        // あるいは
        // $pikoplayer.click(function() { HororeChuchuParero.MMLPlayer.show_player($piko); });
        $piko.children().removeAttr("onclick");
        $piko.wrapInner($pikoplayer);
    });
})(jQuery, HororeChuchuParero);
