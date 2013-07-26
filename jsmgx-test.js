//TestCode of js_lib_jsmgx_core by QUnit

module("読み込みテスト");
test("モジュールの読み込みチェック", function(){
    //読み込みチェック
    ok(js_lib_jsmgx_core,"読み込み済み");
    ok($$,"標準エイリアス適用済み")
    
    //エイリアス
    var aliasOk = true;
    for(var funcName in js_lib_jsmgx_core){
        //coreに含まれるすべてのFunctionが$$に含まれ、
        //同一参照をもっていることを確認する
        if($$[funcName] !== js_lib_jsmgx_core[funcName]){
            aliasOk = false; break;
        }
    }
    ok(aliasOk,"標準エイリアスは正常に機能しています")
    
});

module("Util関数");
test("merge関数テスト", function(){
    
    //正常merge
    var obj1 = {
            prop1a : "1a"
           ,prop1b : "1b"
           ,prop1c : "1c"
    };
    var obj2 = {
            prop2a : "2a"
           ,prop2b : "2b"
    };
    js_lib_jsmgx_core.mergeProps(obj1,obj2);
    
    var props = "";
    for(var p in obj1){
        props += obj1[p];
    }
    ok(props==="1a1b1c2a2b","正常マージ");
    
    //上書きマージ
    var obj3 = {
            prop1c : "1c+"
    };
    js_lib_jsmgx_core.mergeProps(obj1,obj3);
    var props2 = "";
    for(var p in obj1){
        props2 += obj1[p];
    }
    ok(props2==="1a1b1c+2a2b","上書きマージ");
    
});

test("isType系関数テスト", function(){
    
    //isNull
    ok($$.isNull(null),"nullはNull型");
    ok(!$$.isNull("abc"),"文字列リテラルはNull型ではない");
    
    //isUndefined
    var teigi;
    ok($$.isUndefined(teigi),"未初期化変数はUndefined型");
    ok(typeof teigi === "undefined", "未定義変数はtypeofで判定");
    ok(!$$.isUndefined("abc"),"文字列リテラルはUndefined型ではない");
    throws(function () {
        $$.isUndefined(miteigi);
    }, ReferenceError, "未定義変数を利用（実引数に代入）するとRefference Error");
    
});

