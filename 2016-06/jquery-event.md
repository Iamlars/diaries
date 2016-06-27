#  jQuery 事件用法详解

目录

[简介](#description)

[实现原理](#principle)

[事件操作](#do)

* [绑定事件](#on)

* [解除事件](#off)

* [触发事件](#trigger)

* [事件委托](#delegate)


[事件操作进阶](#up)

* [阻止默认事件](#preventDefault)

* [阻止事件传播](#stopPropagation)

* [阻止事件向后执行](#stopImmediatePropagation)

* [命名空间](#namespace)

* [自定义事件](#costomEvent)

* [事件队列](#flow)


[jquery中文文档](http://www.jquery123.com/)

<a name='description'></a>
##简介
 `jquery` 之所以成为最受欢迎的前端库，很大一部分是得益于它的事件具有良好的语义，
优秀的兼容性，并且便于管理和扩展。

在这里我会介绍 `jquery` 事件的一些比较基础的用法。

<a name='principle'></a>
##实现原理

 `jquery` 事件脱胎于浏览器的 `addEventListener (W3)` 和 `attachEvent (IE)` 方法 , 
提供了跨浏览器的一致性API。具体的实现原理可以参考Aaron的系列文章 
 [jquery源码分析-事件](http://www.cnblogs.com/aaronjs/p/3440647.html)。

<a name='do'></a>
##事件操作

<a name='on'></a>
###绑定事件
 `jquery` 中实现事件绑定有多种方式,
 其中 `$(selector).event(func)` 方式中 `event` 支持一系列的浏览器事件，
 文档加载事件，表单事件，键盘事件和鼠标事件，但并非全部。

````javascript
// 常用的写法

$('body').click(function(){ })

$('body').on('click',function(){ })

$('body').one('click',function(){ }) // 只会执行一次，然后销毁事件

// 其他写法(不推荐)

$('body').bind('click',function(){ })

$('body').delegate('p','click',function(){ })

````
**`on.('click')` 和 `.click()` 的区别**

`on` 属于 `绑定事件处理器`(`event-handler-attachment`) , 而 `.click()` 属于 `jquery`
包装好的鼠标事件。

`on` 可以绑定dom和bom的既有事件，也可以绑定自定义的事件。所以推荐始终只使用
 `$(selector).on(event,func)` 的方式，弹性的绑定更多的事件：
````javascript
$(document).hashchange(function(){ }) => 报错，jquery没有提供此事件处理器

$(document).on('hashchange',function(){ })  => 绑定事件成功

````
也可以同时绑定多个事件处理同一事务：
````javascript
$('input').on('focus input',function(){ })  => 在文本框聚焦和输入的时候，都做同样的事情

````

<a name='off'></a>
###解除事件
在不需要再继续监听事件执行的时候，就需要解除事件了，根据绑定事件方式的不同，
解除事件也有好几种方式，推荐始终使用 `$(selector).off(event)` 的方式解除事件绑定，
因为 `on/off` 正好构成了一个开关。
````javascript
$('body').off('click') 

  => 可以解除 $.click(func),$.on('click',func) 
     和 $.bind('click',func) 绑定的事件，
     不能解除delegate方式绑定的事件

$('body').unbind('click') => 同上

$('body').undelegate('p','click') => 只能解除 delegate方式绑定的事件

````

<a name='trigger'></a>
###触发事件
在 `jquery` 中，有许多方法根据其参数个数的不同，既可以是赋值，也可以做为取值操作。
事件也不例外，许多时候可以利用这个特性，代替手动去触发一些事件，以下示例中的两种方式，
都可以实现自动触发事件。
````javascript
// (当表单字段未通过验证时) 自动选中文本值
$('input').select()
$('input').trigger('select')

// 触发已有的点击事件
$(selector).click()
$(selector).trigger('click')


// 通过触发事件，通知select2插件重新渲染
$('select').change()
$('select').trigger('change')

````

<a name='delegate'></a>
###事件委托
事件委托通过事件从目标元素冒泡到根元素的原理实现，它有2个好处，一是大幅降低事件绑定的内存占用，
二是可以对后来加入的元素生效。
````javascript
// 写法
$(selector).on(event, selector2, func)

// 不推荐的方法
$(selector).delagate(selector2, event, func)

````
事件委托原理及性能分析详见 [解密jQuery事件核心 - 委托设计（二）](http://www.cnblogs.com/aaronjs/p/3447483.html)

<a name='up'></a>
##事件操作进阶
上面列举了一些简单的事件绑定，解绑和委托的使用，下面会说到一些更加个性化的用法。

<a name='preventDefault'></a>
###阻止默认事件

`event.preventDefault()` 这个方法用于阻止浏览器的默认行为，通常用于表单提交或是页面滚动。
````javascript
$('form').on('submit',function(event){
      
  // 阻止了默认的表单提交事件，下面可以做一些爱做的事情了
  event.preventDefault();
})

$(document).on('touchmove',function(event){
      
  // 阻止了浏览器的默认滚动，也可以做些爱做的事情了
  event.preventDefault();
})
````

<a name='stopPropagation'></a>
###阻止事件传播

阻止事件传播即阻止事件继续向上冒泡。
````javascript
// 点击div时，会依次alert 2 ,1
$('body').on('click',function(){alert(1)})

$('div').on('click',function(){alert(2)})

// 下面的代码只会alert一个 2，因为事件停止冒泡了,不会被body监听到
$('body').on('click',function(){alert(1)})

$('div').on('click',function(event){
   event.stopPropagation();
   alert(2)
})
````
<a name='stopImmediatePropagation'></a>
###阻止事件向后执行
除了阻止默认的事件，停止向上冒泡之外，有时还需要禁止后续的事件执行，可以使用 `event.stopImmediatePropagation()` 方法。
该方法会自动调用 `event.stopPropagation()` 方法。
````javascript
// 不使用 event.stopImmediatePropagation() 将会alert 2,3,4,1
// 加上之后只会alert 2
$('body').on('click',function(){alert(1)})

$('div').on('click',function(event){
   event.stopImmediatePropagation();
   alert(2)
})
$('div').on('click',function(){
   alert(3)
})
$('div').on('click',function(){
   alert(4)
})
````
<a name='namespace'></a>
###命名空间
想要更精准的控制事件，很多时候还需要利用 `jquery` 的命名空间机制。
````javascript
$('div').on('click.click1',function(){console.log(1)})
$('input').on('click.click1',function(){console.log(11)})

$('div').on('click.click2',function(){console.log(2)})
$('input').on('click.click2',function(){console.log(21)})

// 只触发click2事件
$('div,input').trigger('.click2')

// 解除click1事件,click2任然会执行
$('div,input').off('.click1')

````

<a name='costomEvent'></a>
###自定义事件
把多个事件组合起来，或者在特定条件下触发事件，普通的事件绑定是无法满足需要的，
可以通过自定义事件来形成 `pub-sub` 组合。
比如监听 **短信验证码发送倒计时**：
````javascript
// 伪代码

setInterVal(function(){
  time--;
  if(time < 1){
    $('.js-timeless-button').trigger('time-end', params0, params1);
  }
},1000)

// 自定义事件回调函数默认第一个参数为event对象，以后的参数依次是传入的参数

 $('.js-timeless-button').on('time-end',function(event, params0, params1){
   
 });

````
或者是 **页面滚动到了底部**
````javascript
// 伪代码

$(window).on('scroll',function(){
  if((($(window).scrollTop() + $(window).height())) >= $(document).height()){
    $(document).trigger('infinite', params0, params1);  
  }
})

 $(document).on('infinite',function(event, params0, params1){
   
 });

````

**解除自定义事件**和解除其他事件的方式相同。可以通过 `off` 或者 `unbind` 进行。

<a name='flow'></a>
###事件队列
在 `jquery` 中，事件是按照其绑定顺序依次执行的。如果想要调整执行顺序，
或是禁止之前绑定的方法发生，可以通过重写事件队列的方式。

查看某个dom上已绑定事件的方法是
 `$._data(elem,'events')`  (`jquery`版本>1.7)。
 
**`elem` 是 `dom对象` 而非 `jquery对象`** 。
````javascript
function alertBottle(){
  $("body").on('click',function() { alert("1") });
  $("body").on('click',function() { alert("2") });
  $("body").on('click',function() { alert("3") });
}

// 点击body会依次alert 1, 2, 3
alertBottle();

// 倒序执行
alertBottle();

var Events = $._data($("body").get(0),'events');
Events.click.sort(function(a,b){return b.guid-a.guid })   

// 禁止执行之前的一切， 只执行我
alertBottle();

var Events = $._data($("body").get(0),'events');
Events.click = null;
$("body").on('click',function() { alert("4") });

// 最先执行我 alert 4, 1, 2, 3
alertBottle();

$("body").on('click',function() { alert("4") });
var Events = $._data($("body").get(0),'events');
var last = Events.click.pop();
Events.click.unshift(last);

````

兼容jquery低版本的写法是:
````
$.fn.getEvents = function() {
    if (typeof(jQuery._data) == 'function') {
        return jQuery._data(this.get(0), 'events') || {};
    } else if (typeof(this.data) == 'function') { // jQuery version < 1.7.?
        return this.data('events') || {};
    }
    return {};
};

// 使用
$("body").getEvents();
````




