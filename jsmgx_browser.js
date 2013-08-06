(function(global,jsmgx_browser,undefined){

    if(jsmgx_browser) return; //自分自身読み込み済み
    
    //前提ライブラリチェック
    if(!global.js_lib_jsmgx_core || !global.$$){
        //coreが読み込まれていない場合Exception
        throw "jsmgx_coreが読み込まれていません";
    }
    
    //publicなオブジェクト登録用変数
    var browser = {
        getUAString: getUAString,
        isIE       : isIE
    };
    
    // ======== initialize ======== //
    global.js_lib_jsmgx_browser = browser;
    
    // ======== std alias ======== //
    global.$$ = {};
    mergeProps(global.$$,browser);
    
    // ======== function definitions ======== //    
    // [browser discrimination]
    var whichCache = {
        isIE     : null,
        isFF     : null,
        isChrome : null,
        isSafari : null
    };
    
    function getUAString(){
        return global.navigator.userAgent.toLowerCase();
    }
    
    function isIE(strict,nocache){
        if(!nocache){
            //キャッシュ使うモード
            if(!$$.isNull(whichCache.isIE)) return isIE;
        }
        if(strict){
            //厳密モード（振る舞いからIEかどうか見極める）
            //＜今後実装＞
        } else {
            //ゆるやかモード（UA情報から判定する）
            var res = getUAString().contains("msie");
            whichCache.isIE = res;
            return res;
        }
    }
    
    
})(this,this.js_lib_jsmgx_browser);
