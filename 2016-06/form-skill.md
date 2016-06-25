#form表单那点事儿(下) 进阶篇

上一篇主要温习了一下form表单的属性和表单元素，这一片主要讲解用JavaScript如何操作form。

###目录：

####[表单操作](#handle)
> [取值](#get)

> [赋值](#set)

> [重置](#reset)

> [校验](#checkValidity)

> [提交](#submit)

####[技巧](#skill)

> **[不提交空字段](#clean)**

> **[异步提交文件](#async)**

> **[用作延时链接](#delay)**



<a name='handle'></a>
##表单操作

<a name='get'></a>
###取值

用JavaScript操作表单，免不了会有取值赋值操作，比如有以下表单：
````html
  <form action="/login" method="post" target="blank" id='form1'>
    <input type="text" name='user_name'>
    <input type="email" name='user_email'>
    <input type="tel" name='user_phone'>
    <button type='submit'>提交</button>
  </form>
````
用JavaScript获取表单的属性值，或者表单字段的值，可以直接通过 `elem.name` 的方式
````javascript
alert(form1.action); => '/login'
alert(form1.method); => 'post'
alert(form1.user_name.value) => 'undefined'
````
而要获取表单中的字段，则通过：
````javascript

// 属于本表单元素nodelist类数组，如果通过form属性指定到其他表单，不会算作本表单元素
console.log(form1.elements);  => [<input>...,...,...</button>] 

// 属于本表单元素个数，如果通过form属性指定到其他表单，不会算作本表单元素
console.log(form1.length);  => 4 

// nodelist中下标为2的表单元素
console.log(form1[2]);  => <input type="tel" name='user_phone'>

// 表单中 name='user_name' 的元素,有同名的字段则返回一个nodelst类数组
console.log(form1['user_name']);  => <input type="text" name='user_name'> 或 nodelist

// 获取表单全部内容 jquery是否遵从form指向？
jQuery('#form1').serialize(); => user_name=&user_email=&user_phone
jQuery('#form1').serializeArray(); => [] 一个数组，里面是每个字段的键值对
new FormData(form1) => 没有返回值

````


<a name='set'></a>
###赋值

<a name='reset'></a>
###重置
form.reset()
<a name='checkValidity'></a>
###校验
required
pattern
form.checkValidity()
<a name='submit'></a>
###提交
form.submit()
默认提交规则
jquery 表单序列化
监听提交事件
<a name='skill'></a>
##技巧

<a name='clean'></a>
###不提交空字段
disabled;

<a name='async'></a>
###异步提交文件
new FormData()
iframe

<a name='delay'></a>
###用作延时链接
form.submit() target='_blank'




