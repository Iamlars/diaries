# 用JSON-server模拟REST API(二)  动态数据

上一篇演示了如何安装并运行 `json server` , 在这里将使用第三方库让模拟的数据更加丰满和实用。


目录：

[使用动态数据](#data)

[为什么选择mockjs](#diff_with_faker)

[mockjs用法示例](#mock)

* [安装mockjs](#install)

* [Mock.mock](#mock_mock)

* [Mock.Random](#mock_random)

* [为什么不在浏览器中使用mockjs](#diff_with_mock)

* [示例](#mock_example)

上一篇 [用JSON-server模拟REST API(一) 安装运行](./json-server&mock-1st.md)

下一篇 [用JSON-server模拟REST API(三) 进阶使用](./json-server&mock-3rd.md)

<a name='data'></a>
## 使用动态数据

上一篇演示时，使用了 `db.json` 作为数据载体，虽然方便，但是如果需要大量的数据，则显得力不从心。
幸好 `json server` 可以通过js动态生成json格式数据，官方例子为生成1000组user数据：
````javascript
# /mock/db.js

module.exports = function() {
  var data = { users: [] }
  // Create 1000 users
  for (var i = 0; i < 1000; i++) {
    data.users.push({ id: i, name: 'user' + i })
  }
  return data
}
````
`/mock` 下运行
````
json-server db.js -p 3003
````
我们访问 `http://localhost:3003/news/` 看到的数据是
 
````
[
  {"id": 0,"name": "user0"},
  {"id": 1,"name": "user1"},
  {"id": 2,"name": "user2"},
  {"id": 3,"name": "user3"},
  ...
  {"id": 999,"name": "user999"}
]

````

但是在开发环境中，`name` 这个属性应该是诸如 “李铁蛋”， “张艳华” 或者是 “Brenda Thomas”，
 “Daniel Wilson” 这样接地气的名字，而不是 “user0”, “user1” 这样让人望而生畏的名字，对于用户的
 年龄，性别，籍贯，也应该有比较合理的数据展示。



<a name='diff_with_faker'></a>
## 为什么选择mockjs![demo](http://dummyimage.com/60x25/396&text=Mockjs)


数据生成器有很多，比较出名的有 [faker](https://github.com/Marak/faker.js) ,
[chance](https://github.com/chancejs/chancejs) ,
[mockjs](http://mockjs.com/) 等，其中最为强大的非 faker 莫属，不但拥有几乎全部常用的数据格式，
而且还有中英德法等多种语言的数据。但是在实际测试中发现，faker 对中文数据的支持还是以西方文字为基础，
并不能很好的模拟中文，例如：
````
let faker = require('faker');

faker.locale = "zh_CN";

console.log(faker.address.city());          => 南 罗
console.log(faker.address.streetName());    => 陈 桥
console.log(faker.company.companyName());   => 静琪 - 越泽
console.log(faker.date.month());            => May
console.log(faker.internet.email());        => 87@yahoo.com
console.log(faker.phone.phoneNumber());     => 922-61957652
````

这些看起来有些怪异的中文格式，多半是不能用于国内的数据模拟的，我们再看看 mockjs 的表现：
````
let Mock  = require('mockjs');
let Random = Mock.Random;

console.log(Random.city());          => 珠海市
console.log(Random.cname());         => 韩桂英
console.log(Random.date());          => 2007-08-05
console.log(Mock.mock({              => {stars: '★★★★★'}
  "stars|1-10": "★"
}));
Random.image('200x100', '#4A7BF7', 'hello')
  =>  见下图
````
![demo](http://dummyimage.com/200x100/4a7bf7&text=hello)

虽然 mockj s可以模拟的数据不如 faker 那么多，但是由于其对中文的良好支持，并且使用了位于国内的
随机图片提供商，显然是更适合国情的选择。



<a name='mock'></a>
## mockjs用法示例

请先用15分钟阅读 [mockjs官方文档](https://github.com/nuysoft/Mock/wiki)

<a name='install'></a>
### 安装mockjs
在 `/mock` 目录下安装
````
npm install mockjs --save
````


<a name='mock_mock'></a>
### Mock.mock
> 我知道有些人不会去认真的阅读官方文档，所以在此摘抄一些官方文档中的例子作为示范：

````
// repeat 方法（部分）

Mock.mock({
  "string|5": "★"       =>   "string": "★★★★★"
  "string|1-10": "★"    =>   "string": "★★"
  "number|1-100": 100    =>   "number": 85
  "number|1-100.2": 100  =>   "number": 25.69
})
````

<a name='mock_random'></a>
### Mock.Random
> 我知道有些人不会去认真的阅读官方文档，所以在此摘抄一些官方文档中的例子作为示范：

````
// random 方法（部分）

Random.integer(60, 100)    => 78
Random.float(60, 100)      => 89.565475
Random.range(60, 100)      => [60,61,62,...,99]
Random.date()              => "2018-12-28"
Random.image('200x100','#396') => "http://dummyimage.com/200x100/396"
Random.color()             => "#79d8f2"  (默认使用hex颜色)
Random.county(true)        => "浙江省 舟山市 岱山县"
````

<a name='diff_with_mock'></a>
### 为什么不在浏览器中使用mockjs

通过阅读 mockjs 的官方文档可以发现，它其实是作为一个独立的 mock server 存在的，就算没有
json server，一样可以反馈数据，但是由于以下一些缺点，让我只能把它作为一个数据构造器来使用：

* 不能跨域使用
* 与某些框架中的路由处理逻辑冲突
* 无法定义复杂的数据结构，比如下面的数据结构，images 将会是字符串 `[object object]`， 
而非预想中的数组：
````
Mock.mock({
    "list|1-10": [
      "id|+1": 1,
      "images": [1,2,3]
    ] 
  })
````
* 无法自定义较为复杂的路由

<a name='mock_example'></a>
### 示例

下面是一个使用 mockjs 构造的比较复杂的数据格式,
对象是一个新闻列表，其中有100条新闻，每条新闻有对应的id，标题，内容，简介，标签，
浏览量，和一个图片数组：

````javascript
# /mock/db.js

let Mock  = require('mockjs');
let Random = Mock.Random;

module.exports = function() {
  var data = { 
      news: []
  };
  
  var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6)));

  for (var i = 0; i < 100; i++) {
      
    var content = Random.cparagraph(0,10);

    data.news.push({
         id: i, 
         title: Random.cword(8,20),
         desc: content.substr(0,40),
         tag: Random.cword(2,6),
         views: Random.integer(100,5000),
         images: images.slice(0,Random.integer(1,3))
    })
  }

  return data
}

````

`/mock` 下运行
````
json-server db.js -p 3003
````


访问 `http://localhost:3003/news` 看到的数据是:

````
[
	{
		"id": 0,
		"title": "元小总小把清保住影办历战资和总由",
		"desc": "共先定制向向圆适者定书她规置斗平相。要广确但教金更前三响角面等以白。眼查何参提适",
		"tag": "值集空",
		"views": 3810,
		"images": [
			"http://dummyimage.com/200x100/79f2a5&text=别角置",
			"http://dummyimage.com/200x100/f28279&text=收面几容受取",
			"http://dummyimage.com/200x100/7993f2&text=做件"
		]
	},
	{
		"id": 1,
		"title": "物器许条对越复术",
		"desc": "方江周是府整头书生权部部条。始克识史但给又约同段十子按者感律备。关长厂平难山从合",
		"tag": "分七眼术保",
		"views": 4673,
		"images": [
		"http://dummyimage.com/200x100/79f2a5&text=别角置"
		]
	},
	{
		"id": 2,
		"title": "但学却连质法计性想般最",
		"desc": "以群亲它天即资几行位具回同务度。场养验快但部光天火金时内我。任提教毛办结论感看还",
		"tag": "响六",
		"views": 4131,
		"images": [
			"http://dummyimage.com/200x100/79f2a5&text=别角置",
			"http://dummyimage.com/200x100/f28279&text=收面几容受取",
			"http://dummyimage.com/200x100/7993f2&text=做件"
		]
	},
	...
	{
		"id": 99,
		"title": "则群起然线部其深我位价业红候院",
		"desc": "为高值务须西生型住断况里听。志置开用她你然始查她响元还。照员给门次府此据它后支越",
		"tag": "何你",
		"views": 2952,
		"images": [
			"http://dummyimage.com/200x100/79f2a5&text=别角置"
		]
	}
]
````

**以上为本章全部内容**

#### 参考资料

> [json-server 仓库地址](https://github.com/typicode/json-server)

> [mockjs 仓库地址](https://github.com/nuysoft/Mock)



