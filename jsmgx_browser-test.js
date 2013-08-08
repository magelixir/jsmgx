//TestCode of js_lib_jsmgx_browser by QUnit

module("読み込みテスト");
test("モジュールの読み込みチェック", function(){
    
    //読み込みチェック
    ok(js_lib_jsmgx_browser,"読み込み済み");
    
});

module("ブラウザ判別");
test("ブラウザ判定",function(){
   
    //$$.isIE(); //キャッシュ生成
    ok($$.isIE()!=null,          "ブラウザはIEか？（static, 　cache） : " + $$.isIE());
    ok($$.isIE(true)!=null,      "ブラウザはIEか？（static, nocache） : " + $$.isIE());
    ok($$.isIE(false,true)!=null,"ブラウザはIEか？（dynamic,　cache） : " + $$.isIE());
    ok($$.isIE(true,true)!=null, "ブラウザはIEか？（dynamic,nocache） : " + $$.isIE());
    
    //$$.isFF(); //キャッシュ生成
    ok($$.isFF()!=null,          "ブラウザはFFか？（static, 　cache） : " + $$.isFF());
    ok($$.isFF(true)!=null,      "ブラウザはFFか？（static, nocache） : " + $$.isFF());
    ok($$.isFF(false,true)!=null,"ブラウザはFFか？（dynamic,　cache） : " + $$.isFF());
    ok($$.isFF(true,true)!=null, "ブラウザはFFか？（dynamic,nocache） : " + $$.isFF());
    
    
});

    