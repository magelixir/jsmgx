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
    ok(aliasOk,"標準エイリアスは正常に機能しています");
    
    //console.log
    ok(console.log("test") || true,"console.logを呼び出しても問題ありません");
    
});

module("Util系");
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

test("trimStringテスト",function(){
    ok($$.trimString(" あいうえお　")==="あいうえお","trimString関数によるトリム");
    ok("　あわわ   ".trim()==="あわわ","String#trimメソッドによるトリム");
});

test("containsStringテスト",function(){
    ok($$.containsString(" あいうえお","うえ"),"containsStringによる文字列含有チェック");
    ok(!$$.containsString(" あいうえお","おえ"),"containsStringによる文字列含有チェック（存在しない場合）");
    ok("ドラえもん".contains("ラ"),"String#containsメソッドによる文字列含有チェック");
    ok(!"ドラえもん".contains("エ"),"String#containsメソッドによる文字列含有チェック（存在しない場合）");
});



module("Type系");

test("isNull", function(){
    
    //isNull
    ok($$.isNull(null),"nullはNull型");
    ok(!$$.isNull("abc"),"文字列リテラルはNull型ではない");
});

test("isUndefined", function(){
    //isUndefined
    var teigi;
    ok($$.isUndefined(teigi),"未初期化変数はUndefined型");
    ok(typeof teigi === "undefined", "未定義変数はtypeofで判定");
    ok(!$$.isUndefined("abc"),"文字列リテラルはUndefined型ではない");
    var obj = {};
    ok($$.isUndefined(obj.prop),"未定義のプロパティはUndefined型");
    throws(function () {
        $$.isUndefined(miteigi);
    }, ReferenceError, "未定義変数を利用（実引数に代入）するとRefference Error");
});

test("isObject", function(){    
    //isObject
    ok($$.isObject({}),"オブジェクトリテラルはObject型");
    ok(!$$.isObject("abc"),"文字列リテラルはObject型としない");
    ok($$.isObject([]),"配列リテラルはObject型");
    ok($$.isObject((new function(){})),"無名関数のnewはObject型になる");

    var TestFunc = function(){
        this.name = "testFunc";
    }
    var TestFuncSub = function(){
        this.name = "testFuncSub";
    }
    TestFuncSub.prototype = new TestFunc();
    
    ok($$.isObject(new TestFunc()),"定義関数のnewはObject型になる");
    ok($$.isObject(new TestFuncSub()),"定義関数をプロトタイプにしてnewしてもObject型になる");
    ok($$.isObject(new Array()),"ArrayのnewはObject型");
    ok($$.isObject(new String()),"StringのnewはObject型");
    ok($$.isObject(new Number()),"NumberのnewはObject型");
    ok($$.isObject(new Boolean()),"BooleanのnewはObject型");
    
});

test("isFunction", function(){
    
    var TestFunc = function(){
        this.name = "testFunc";
    }
    //
    ok($$.isFunction(TestFunc),"定義関数はFunction型");
    ok($$.isFunction(function(){}),"無名関数はFunction型");
    ok(!$$.isFunction(new TestFunc()),"newしたものはFunction型ではない");
    
});

test("isArray", function(){
    
    ok($$.isArray([]),"配列リテラルはArray型");
    ok($$.isArray(new Array()),"ArrayをnewしたものはArray型");
    ok(!$$.isArray({0:"test1",1:"test2"}),"ArrayっぽいオブジェクトリテラルでもArrayにはならない");
    
});

test("isBoolean", function(){
    
    ok($$.isBoolean(true) && $$.isBoolean(false),"trueもfalseもBoolean型");
    ok($$.isBoolean(new Boolean("true")),"newしたものもBoolean型");
    ok(!$$.isBoolean(null),"nullはBoolean型ではない");
    ok(!$$.isBoolean({}),"オブジェクトリテラルはBoolean型ではない");
    
});

test("isString", function(){
    
    ok($$.isString("abc"),"文字列リテラルはString型");
    ok($$.isString(new String("abc")),"newしたStringはString型");
    ok(!$$.isString({}),"オブジェクトリテラルはString型ではない");
    
});

test("isNumber", function(){
    
    ok($$.isNumber(12345.6789),"数値リテラルはNumber型");
    ok($$.isNumber(new Number(12345.6789)),"newしたNumberはNumber型");
    ok(!$$.isNumber({}),"オブジェクトリテラルはNumber型ではない");
    
});

test("isDate", function(){
    
    ok($$.isDate(new Date("2013/07/26")),"newしたDateはDate型");
    ok(!$$.isDate("2013/07/26"),"文字リテラルで日付を記述してもDate型ではない");
    
});


    