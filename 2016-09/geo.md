#通过HTML5地理定位搜索附近的学校(计划中)

目录

* [html定位获取地理坐标](#getGro)
* [经纬度逆向解析](#token)
* [地理测距](#distance)
* [查找附近的学校](#search_school)

<a name='getGro'></a> 
##html定位获取地理坐标

html定位，即使用html5的 `navigator.geolocation` 方法获取用户的当前GPS坐标。这种方式有几个缺陷：
1，`file:///`下的网页协议无法开启定位，会被浏览器直接拒绝
2，非`https`的网页，在一定情况下会出现拒绝定位
抛开以上两点，让我们来看看如何使用：
````javascript
var geo = navigator.geolocation;

// 首先检测浏览器是否支持地理定位
if(!geo) return;

// 获取地理信息配置参数
var settings = {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 3000
};

// enableHighAccuracy: 是否允许使用高精度定位(实际上没用，高精度定位需要结合基站、蓝牙和wifi才有效),
// maximumAge: 缓存最近一次位置信息的时长,
// timeout: 如果超过设置时间还没有成功定位，将抛出一个异常 code3

// 获取当前位置信息
geo.getCurrentPosition( done, fail, settings);

// 定位成功回调函数
function done(position){
  var x = position.coords.latitude; // 纬度
  var y = position.coords.longitude; // 精度
}

// 定位失败回调函数
function fail(error){
    switch (error.code) {
        case 1:
            alert("位置服务被拒绝");
            break;

        case 2:
            alert("暂时获取不到位置信息");
            break;

        case 3:
            alert("获取信息超时");
            break;

        case 4:
            alert("未知错误");
            break;
    }
}


````

<a name='token'></a> 
##经纬度逆向解析
通过百度，腾讯地图把获取到的经纬度转化为实际上的地理位置。

<a name='distance'></a> 
##地理测距

<a name='search_school'></a> 
##查找附近的学校
