(function(global,jsmgx_browser,undefined){

    if(jsmgx_browser) return; //自分自身読み込み済み
    
    //前提ライブラリチェック
    if(!global.js_lib_jsmgx_core || !global.$$){
        //coreが読み込まれていない場合Exception
        throw "jsmgx_coreが読み込まれていません";
    }
    
    //publicなオブジェクト登録用変数
    var browser = {
        getUAString      : getUAString,
        isIE             : isIE,
        isFF             : isFF,
        isChrome         : isChrome,
        isSafari         : isSafari,
        isOpera          : isOpera,
        isWebkit         : isWebkit,
        isIE6            : isIE6,
        isIE7            : isIE7,
        isIE8            : isIE8,
        initSniffingCache: initSniffingCache,
        //一応公開するが内部用の参照は固定しておく
        _sniff           : function(target){ return _sniff(target); }
    };
    
    // ======== initialize ======== //
    global.js_lib_jsmgx_browser = browser;
    
    // ======== std alias ======== //
    //このライブラリの関数はエイリアスにマージ
    $$.mergeProps(global.$$,browser);
    
    // ======== function definitions ======== //    
    // [browser discrimination]
    
    /**
     * -*-*-*- ブラウザ判別関数仕様 -*-*-*-
     * 
     * [サンプル]
     *   if($$.isIE()) console.log("ブラウザはInternet Explorerです");
     * 
     * [仕様解説]
     *   上記のように「is○○」関数で各ブラウザかどうか判定可能です。
     *   判定ロジックの厳密性や速度確保のために引数として2つのフラグが指定可能で、
     *   組み合わせにより合計4種類の判別モードがあります。
     * 
     * [引数(boolean)]
     *   どちらもデフォルト値はfalse
     *   (arg1) nocache : キャッシュ（後述）を利用しないで必ず判別ロジックを実行します
     *   (arg2) dynamic : UserAgent情報ではなく、ブラウザの実装内容から判別します
     * 
     * [キャッシュについて]
     *   デフォルトでは一度判別した結果はキャッシュに保持され、
     *   二度目以降の呼び出しでは判別ロジックを経由せずにキャッシュから結果を取得します。
     *   キャッシュはスクリプトロード時に初期化されます。
     *   ロード済み＆キャッシュONの状態で、UA情報やブラウザ固有関数の疑似実装が行われた場合は
     *   キャッシュ内容と実際上の振る舞いが食い違う場合があります。
     *   （思ったより実装が複雑になったので、速度が稼げていない可能性あり）
     * 
     * [厳密性と速度]
     *   一番厳密で低速なのが isIE(true,true) で、
     *   一番曖昧で高速なのが isIE()          という想定です。
     */
    var UA = {
        //ブラウザ判定結果を保持しておくキャッシュ
        cache    : {},
        version  : null,
        //UserAgentの種類を示す内部的な定数（コード内で上書きしない）
        MSIE     : "MSIE",
        MSIE6    : "MSIE6",
        MSIE7    : "MSIE7",
        MSIE8    : "MSIE8",
        FIREFOX  : "FIREFOX",
        OPERA    : "OEPERA",
        CHROME   : "CHROME",
        SAFARI   : "SAFARI",
        WEBKIT   : "WEBKIT",
        MOBILE   : "MOBILE",
        UNKNOWN  : "UNKNOWN"
        
    };
    
    //UserAgent文字列を全部小文字にして返す
    function getUAString(){
        return global.navigator.userAgent.toLowerCase();
    }
    
    function getAppVersion(){
        return global.navigator.appVersion.toLowerCase();
    }
    
    //IEかどうか判定する
    function isIE(nocache,dynamic){
        return _isBrowser(UA.MSIE,nocache,dynamic);
    }
    
    //IE6かどうか判定する
    function isIE6(nocache,dynamic){
        return _isBrowser(UA.MSIE6,nocache,dynamic);
    }
    
    //IE7かどうか判定する
    function isIE7(nocache,dynamic){
        return _isBrowser(UA.MSIE7,nocache,dynamic);
    }
    
    //IE8かどうか判定する
    function isIE8(nocache,dynamic){
        return _isBrowser(UA.MSIE8,nocache,dynamic);
    }
    
    //FireFoxかどうか判定する
    function isFF(nocache,dynamic){
        return _isBrowser(UA.FIREFOX,nocache,dynamic);
    }
    
    //Chromeかどうか判定する
    function isChrome(nocache,dynamic){
        return _isBrowser(UA.CHROME,nocache,dynamic);
    }
    
    //Safariかどうか判定する
    function isSafari(nocache,dynamic){
        return _isBrowser(UA.SAFARI,nocache,dynamic);
    }
    
    //Webkitかどうか判定する
    function isWebkit(nocache,dynamic){
        return _isBrowser(UA.WEBKIT,nocache,dynamic);
    }
    
    //Operaかどうか判定する
    function isOpera(nocache,dynamic){
        return _isBrowser(UA.OPERA,nocache,dynamic);
    }
    
    /**
     * ブラウザ判定用のキャッシュをクリアする
     */
    function initSniffingCache(){
        UA.cache = {};
    }
    
    //targetで指定したブラウザかどうか判定する。uaDetectorはUA文字列から抽出する文字。
    function _isBrowser(target,uaDetector,nocache,dynamic){
        
        if(!target && !uaDetector) return;
        
        var result = false;
        
        if(nocache || $$.isUndefined(UA.cache[target])){
            //キャッシュを使わない or キャッシュが未生成
            if(dynamic){
                //動的モード（振る舞いからブラウザの種類を判別する）
                result = _sniff(target) === target;
            } else {
                //静的モード（UserAgent情報から取得して判別する）
                result = _detectUAType(target) === target;
            }
            if(!nocache){
                //キャッシュの更新
                UA.cache[target] = result;
            }
        } else {
            //キャッシュから読み出す
            result = UA.cache[target]===true; //undefinedを返さないため判定結果を格納
        }
        
        return result;
        
    }
    
    //UserAgent情報によるブラウザ判別
    function _detectUAType(target){
        
        var uastr = getUAString();
        
        switch(target){
        default:
        //target指定が無い場合は下記を順番に全部チェックさせる
        case UA.MSIE:     if(uastr.contains("msie"))     return UA.MSIE;
        case UA.FIREFOX:  if(uastr.contains("firefox"))  return UA.FIREFOX;
        case UA.OPERA:    if(uastr.contains("opera"))    return UA.OPERA;
        case UA.CHROME:   if(uastr.contains("chrome"))   return UA.CHROME;
        case UA.SAFARI:   if(uastr.contains("safari") 
                         && !uastr.contains("chrome"))   return UA.SAFARI;
        case UA.WEBKIT:   if(uastr.contains("webkit"))   return UA.WEBKIT;
        case UA.MOBILE:   if(uastr.contains("mobile"))   return UA.MOBILE; //これだけだと弱い
            break;
        case UA.MSIE8:
            if(getAppVersion().contains("msie 8.0")) return UA.MSIE8;  
        case UA.MSIE7:
            if(getAppVersion().contains("msie 7.0")) return UA.MSIE7;            
        case UA.MSIE6:
            if(getAppVersion().contains("msie 6.0")) return UA.MSIE6;
        }
        
        return UA.UNKNOWN;
        
    }
    
    //UserAgent情報に頼らないブラウザ判別
    function _sniff(target){
        //振る舞い（実装）からブラウザを判別して返す
        //参考：http://w3g.jp/blog/tools/js_browser_sniffing
        
        var win = global;          //globalはWindow(Proxy)オブジェクトとする
        var doc = global.document; //なのでdocumentがある
        
        switch(target){
        default:
        //target指定が無い場合は下記を順番に全部チェックさせる
        case UA.MSIE:     if(doc.uniqueID) return UA.MSIE;
        case UA.FIREFOX:  if(win.sidebar)  return UA.FIREFOX;
        case UA.OPERA:    if(win.opera)    return UA.OPERA;
        case UA.CHROME:   if(win.chrome)   return UA.CHROME;
        case UA.SAFARI:
            if(Object.prototype.toString.call(win.HTMLElement).indexOf('Constructor') > 0){
                return UA.SAFARI;
            } 
        case UA.WEBKIT:
            if(!doc.uniqueID && !win.opera && !win.sidebar //←念のため
                    && win.localStorage && $$.isUndefined(win.orientation)){
                return UA.WEBKIT;
            }
        case UA.MOBILE:
            if(!$$.isUndefined(win.orientation)) return UA.MOBILE;
            break; //ここより下の判別式はtarget指定しない限り行われない
        case UA.MSIE6:
            if($$.isUndefined(win.addEventListener) && $$.isUndefined(doc.documentElement.style.maxHeight)){
                return UA.MSIE6;
            }
            break;
        case UA.MSIE7:
            if($$.isUndefined(win.addEventListener) && $$.isUndefined(doc.querySelectorAll)){
                return UA.MSIE7;
            }
            break;
        case UA.MSIE8:
            if($$.isUndefined(win.addEventListener) && $$.isUndefined(doc.getElementsByClassName)){
                return UA.MSIE8;
            }
            break;
        }
        
        return UA.UNKNOWN;
    }
    
    
})(this,this.js_lib_jsmgx_browser);
