//TestCode of js_lib_jsmgx_browser by QUnit

module("読み込みテスト");
test("モジュールの読み込みチェック", function(){
    
    //読み込みチェック
    ok(js_lib_jsmgx_browser,"読み込み済み");
    
});

module("ブラウザ判別");

test("UA文字列",function(){
    ok($$.getUAString(),"UserAgent : " + $$.getUAString());
});

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

    //$$.isChrome(); //キャッシュ生成
    ok($$.isChrome()!=null,          "ブラウザはChromeか？（static, 　cache） : " + $$.isChrome());
    ok($$.isChrome(true)!=null,      "ブラウザはChromeか？（static, nocache） : " + $$.isChrome());
    ok($$.isChrome(false,true)!=null,"ブラウザはChromeか？（dynamic,　cache） : " + $$.isChrome());
    ok($$.isChrome(true,true)!=null, "ブラウザはChromeか？（dynamic,nocache） : " + $$.isChrome());    
    
    //$$.isSafari(); //キャッシュ生成
    ok($$.isSafari()!=null,          "ブラウザはSafariか？（static, 　cache） : " + $$.isSafari());
    ok($$.isSafari(true)!=null,      "ブラウザはSafariか？（static, nocache） : " + $$.isSafari());
    ok($$.isSafari(false,true)!=null,"ブラウザはSafariか？（dynamic,　cache） : " + $$.isSafari());
    ok($$.isSafari(true,true)!=null, "ブラウザはSafariか？（dynamic,nocache） : " + $$.isSafari());
    
    //$$.isOpera(); //キャッシュ生成
    ok($$.isOpera()!=null,          "ブラウザはOperaか？（static, 　cache） : " + $$.isOpera());
    ok($$.isOpera(true)!=null,      "ブラウザはOperaか？（static, nocache） : " + $$.isOpera());
    ok($$.isOpera(false,true)!=null,"ブラウザはOperaか？（dynamic,　cache） : " + $$.isOpera());
    ok($$.isOpera(true,true)!=null, "ブラウザはOperaか？（dynamic,nocache） : " + $$.isOpera());
    
    //$$.isWebkit(); //キャッシュ生成
    ok($$.isWebkit()!=null,          "ブラウザはWebkitか？（static, 　cache） : " + $$.isWebkit());
    ok($$.isWebkit(true)!=null,      "ブラウザはWebkitか？（static, nocache） : " + $$.isWebkit());
    ok($$.isWebkit(false,true)!=null,"ブラウザはWebkitか？（dynamic,　cache） : " + $$.isWebkit());
    ok($$.isWebkit(true,true)!=null, "ブラウザはWebkitか？（dynamic,nocache） : " + $$.isWebkit());
    
    
    //$$.isIE6(); //キャッシュ生成
    ok($$.isIE6()!=null,          "ブラウザはIE6か？（static, 　cache） : " + $$.isIE6());
    ok($$.isIE6(true)!=null,      "ブラウザはIE6か？（static, nocache） : " + $$.isIE6());
    ok($$.isIE6(false,true)!=null,"ブラウザはIE6か？（dynamic,　cache） : " + $$.isIE6());
    ok($$.isIE6(true,true)!=null, "ブラウザはIE6か？（dynamic,nocache） : " + $$.isIE6());
    
    //$$.isIE7(); //キャッシュ生成
    ok($$.isIE7()!=null,          "ブラウザはIE7か？（static, 　cache） : " + $$.isIE7());
    ok($$.isIE7(true)!=null,      "ブラウザはIE7か？（static, nocache） : " + $$.isIE7());
    ok($$.isIE7(false,true)!=null,"ブラウザはIE7か？（dynamic,　cache） : " + $$.isIE7());
    ok($$.isIE7(true,true)!=null, "ブラウザはIE7か？（dynamic,nocache） : " + $$.isIE7());
    
    //$$.isIE8(); //キャッシュ生成
    ok($$.isIE8()!=null,          "ブラウザはIE8か？（static, 　cache） : " + $$.isIE8());
    ok($$.isIE8(true)!=null,      "ブラウザはIE8か？（static, nocache） : " + $$.isIE8());
    ok($$.isIE8(false,true)!=null,"ブラウザはIE8か？（dynamic,　cache） : " + $$.isIE8());
    ok($$.isIE8(true,true)!=null, "ブラウザはIE8か？（dynamic,nocache） : " + $$.isIE8());    
    
});


module("動作チェック");

test("onload",function(){
    
    var src = "http://code.jquery.com/jquery-1.10.1.min.js";
    $$.loadScript(src,function(test){alert("スクリプトよんだよ : " + src);});
    
    ok($$.getUAString(),"UserAgent : " + $$.getUAString());
});

    