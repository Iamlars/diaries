# 使用拼音进行中文检索
最近工作中常有一些需求，就是让用户可以通过汉字或者汉语拼音进行检索。

目录

* [把汉字转化为拼音](#topinyin)
* [从拼音中检索汉字](#search)

<a name='topinyin'></a>
##把汉字转化为拼音
在通过拼音检索之前，需要先把汉字转化为对应的拼音，首先我引入了一个pinyin.js这个对照表，然后把汉字转换为拼音。
````javascript
// pinyin.js 内容
var PinYin = { "a": "\u554a\u963f\u9515", "ai": ...};

// 然后把汉字转换为拼音
function PinYinMethod() {
    
    // 在转换的过程中，需要的耗时还是不少的，所以需要缓存单个汉字的拼音
    var store = {};
    
    // 把单个汉字转换为拼音
    function getSinglePinYin(val) {
        var _key = '';
        for (var i in PinYin) {
            if (PinYin[i].indexOf(val) !== -1) {
                _key = i;
                break;
            }
        }
        return _key.length ? _key : val;
    }

    return function (str) {
        var _name = [],
            _firstChar = '';
            
        if(store[str]){
            return store[str];
        }    
            
        // 把整段文字转换为拼音    
        var str1 = str.split('')
        .map(function(item){
            var singlePinyin =  getSinglePinYin(item);
            
            // 提取首字母
            if(singlePinyin.length)_firstChar+=singlePinyin[0];
            return singlePinyin;
        })
        .join('');
        
        store[str] = {
            full: str1,
            first: _firstChar
        };
        
        return store[str]
    }

}

// 把方法暴露到全局
var getPinYin = PinYinMethod();

if(typeof window !== 'undefined'){
    return window.getPinYin = getPinYin;
}

// 用起来！
getPinYin('汉字转拼音');
==> {
    full: hanzizhuanpinyin,
    first: hzzpy
}

// 把列表转换为拼音
var list = ['四川大学','蓝翔电竞学院','电子科技大学','江西大学'];
var listPinyin = list.slice(0).map(function(item){
    return {
        pinyin: getPinYin(item),
        text: item
    };
})

````

<a name='search'></a>
##从拼音中检索汉字
把汉字转化为拼音之后，再从中筛选出匹配的条目：
````javascript
search('sc').join('\n');
==> 四川大学

function search(text){
    return listPinyin
    .slice(0)
    .filter(function(item){
        return item.pinyin.full.indexOf(text)>-1 || item.pinyin.first.indexOf(text)>-1
    })
    .map(function(item){
        return item.text;
    })
}
````

还是很简单的，下面还有一个demo，下载即可

[❤ 拼音检索demo ❤](../demos/pinyin/index.html)