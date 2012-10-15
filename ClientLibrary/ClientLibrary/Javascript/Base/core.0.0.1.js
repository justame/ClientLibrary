/// <reference path="../../Javascript/Base/backbone.js" />
/// <reference path="jquery.1.7.1.js" />
/// <reference path="underscore.js" />
/// <reference path="underscore.string.js" />

var g = {
    kv : {}
};
(function () {
    function methodAdd(methodName, fn){
        g[methodName] = fn;
    };
   
    methodAdd('jsVarAdd', function(jsVarObject){
        $.extend(true, g.kv,jsVarObject);
    });
    methodAdd('kv',function(key, value){
        return g.kv[key];
    });
    methodAdd('log',function(str){
        if(!!console == true){
            console.log(str);
        }
    });
    methodAdd('$$', function(selector){
        return $('#' + selector);
    });
    
}())

