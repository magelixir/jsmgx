/**
 * （なるべく）環境に依存しないJavaScriptコアで使える関数群
 */
(function(global,jsmgx_core,undefined){

    if(jsmgx_core) return; //ロード済み

    //jsmgx core object
    var core = { 
        //[Util]
        mergeProps:     mergeProps,
        doNothing:      doNothing,
        trimString:     trimString,
        containsString: containsString,
        //[Type]
        isNull:         isNull,
        isUndefined:    isUndefined,
        isObject:       isObject,
        isFunction:     isFunction,
        isArray:        isArray,
        isBoolean:      isBoolean,
        isString:       isString,
        isNumber:       isNumber,
        isDate:         isDate
    }; 

    // ======== initialize ======== //
    global.js_lib_jsmgx_core = core;
    
    // ======== std alias ======== //
    global.$$ = {};
    mergeProps(global.$$,core);
    
    // ======== hacks ======== //
    // [Logging] //
    //console.logが存在しない環境への対策。何もしない関数を実行する
    if (isUndefined(global.console)) {
        global.console = {
            log: doNothing
        };
    }
    
    // [String] //
    //String型にメソッドを生やす
    String.prototype.trim = function(){return trimString(this);};
    String.prototype.contains = function(word){return containsString(this,word);};

    // ======== function definitions ======== //
    // [Util] //
    
    //オブジェクトaのプロパティにbのプロパティを全て取り込む
    //同名プロパティは上書きされる。in演算子で判定するのでArrayやFunction自体のマージには不向き
    function mergeProps(a,b){
        for(var pName in b){
            a[pName] = b[pName];
        }
    }
    
    function doNothing(){
        //なにもしない関数
    }
    
    //文字列のトリム
    function trimString(str){
        return str.replace(/(^[\s　]+)|([\s　]+$)/g, "");
    }
    
    //文字列strにwordが含まれるかどうか調べる
    function containsString(str,word){
        return str.indexOf(word) !== -1;
    }
    
    
    // [Type] //
    function protoStr(o){
        return Object.prototype.toString.call(o);
    }
    
    function isNull(o){
        return o === null;
    }
    
    function isUndefined(o){
        return o === undefined;
    }


    function isObject(o,strict) {
        if(strict){
            return (protoStr(o) === "[object Object]");
        } else {
            return o instanceof Object;
        }
    }
    
    function isFunction(o) {
        return (protoStr(o) === "[object Function]");
    }
    
    function isArray(o) {
        return (protoStr(o) === "[object Array]");
    }
    
    function isBoolean(o) {
        return (protoStr(o) === "[object Boolean]");
    }
    
    function isString(o) {
        //文字列リテラルにも対応するためinstanceofは使わない
        return (protoStr(o) === "[object String]");
    }
    
    function isNumber(o) {
        return (protoStr(o) === "[object Number]");
    }
    
    function isDate(o){
        return (protoStr(o) === "[object Date]");
    }


})(this,this.js_lib_jsmgx_core);