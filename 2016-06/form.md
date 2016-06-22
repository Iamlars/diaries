#form表单那点事儿

做为html中最为常见，应用最广泛的标签之一，form常伴随前端左右。了解更深，用的更顺。

目录：

[表单属性](#props)

[表单元素](#elements)

> [常识](#general)

> [模拟外观](#skin)

[表单操作](#handle)
> [取值](#get)

> [赋值](#set)

> [重置](#reset)

> [校验](#checkValidity)

> [提交](#submit)

[技巧](#skill)

> **[不提交空字段](#clean)**

> **[异步提交文件](#async)**

> **[用作延时链接](#delay)**


<a name='props'></a>
======
##表单属性
accept-charset  ===字符集
action ===url
autocapitalize=none ===取消ios首字母大写
autocomplete === 自动补全
enctype === MIME类型。文件上传必须为multipart/form-data
method == put,get,post
name == 名字
target==打开方式
<a name='elements'></a>
======
##表单元素

form[elements]
form[length]
form[index]
form[name]

<a name='general'></a>
###常识

* type必不可少
* 浏览器不支持的type会转为type=text
* 低版本浏览器不支持动态改变type
* button会默认提交表单
* 低版本浏览器需要指定button的type=submit才会提交表单
* 文本域的光标颜色由字体颜色决定

````html
<input type='hidden' name='token'/>   
<input type='file' name='file' accept='' multiple/>   
<button type='submit'>button</button>
````

<a name='skin'></a>
###模拟外观
button和input在safari下的默认外观
修改radio和checkbox外观

<a name='handle'></a>
======
##表单操作

<a name='get'></a>
###取值

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
<a name='skill'></a>
======
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




