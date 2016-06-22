# 用JSON-server模拟REST API(三)  进阶使用

前面演示了如何安装并运行 `json server` , 和使用第三方库真实化模拟数据 , 下面将展开更多的配置项和数据操作。


###目录：

####[配置项](#config)

> [返回静态文件](#static)

> [移动设备访问](#mobile)

> [自定义路由](#route)

####[npm启动](#package)


####[数据过滤](#filter)

> [属性值(Filter)](#prop)

> [分割(Slice)](#slice)

> [排序(Sort)](#sort)

> [运算符(Operators)](#operators)

> [全文检索(Full-text search)](#full_text_search)

> [关系图谱(Relationships)](#relationships)


####[作为中间件](#middleware)


上一篇 [用JSON-server模拟REST API(二) 动态数据](./json-server&mock-2nd.md)

上上一篇 [用JSON-server模拟REST API(一) 安装运行](./json-server&mock-1st.md)

<a name='config'></a>
## 配置项

在安装好json server之后，通过 `json-server -h` 可以看到如下配置项：
```
json-server [options] <source>

Options:
  --config, -c       指定 config 文件                  [默认: "json-server.json"]
  --port, -p         设置端口号                                   [default: 3000]
  --host, -H         设置主机                                   [默认: "0.0.0.0"]
  --watch, -w        监控文件                                           [boolean]
  --routes, -r       指定路由文件
  --static, -s       设置静态文件
  --read-only, --ro  只允许 GET 请求                                    [boolean]
  --no-cors, --nc    禁止跨域资源共享                                   [boolean]
  --no-gzip, --ng    禁止GZIP                                          [boolean]
  --snapshots, -S    设置快照目录                                     [默认: "."]
  --delay, -d        设置反馈延时 (ms)
  --id, -i           设置数据的id属性 (e.g. _id)                     [默认: "id"]
  --quiet, -q        不输出日志信息                                     [boolean]
  --help, -h         显示帮助信息                                       [boolean]
  --version, -v      显示版本号                                         [boolean]

Examples:
  bin db.json
  bin file.js
  bin http://example.com/db.json
```

既可以通过命令行方式单行配置，如

````
json-server db.js -p 3008 -d 500 -q -r ./routes.json
````

，也可以通过 `json-server.json` 文件进行配置后：

````json
# /mock/json-server.json

{
    "host": "0.0.0.0",
    "port": "3008",
    "watch": false,
    "delay": 500,
    "quiet": true,
    "routes": "./routes.json"
}
````
运行
````
json-server db.js
````

<a name='static'></a>
### 返回静态文件
在 `/mock` 下建立 `public` 目录，即可直接访问其下的所有静态文件，包括但不限于
`js`, `css` ,`markdown` 文件等。

地址栏输入 `http://localhist:3008/readme.md`  即可访问以下文件
````json
# /mock/public/readme.md

# hello Mr DJ,这节奏不要停
````

<a name='mobile'></a>
### 移动设备访问
通过 `json server` 建立的rest api服务默认可以在局域网中通过WIFI访问接口。

windows下面通过 `ipconfig` 查找到电脑的局域网地址，mac设备是通过 `ifconfig | grep "inet " | grep -v 127.0.0.1
` 查看。

比如我的电脑局域网ip是 `192.168.0.6`,在手机上访问 `http://192.168.0.6:3008`  即可。

<a name='route'></a>
### 自定义路由
可以通过自定义路由的形式，简化数据结构，或是建立高弹性的web api，例如
````json
# /mock/routes.json

{
  "/news/:id/show": "/news/:id",
  "/topics/:id/show": "/news/:id",
    
}
````

访问 `/news/1/show` 和 `topics/1/show` 均返回指定的 `/news/1` 内容。

** * 需要注意的是，路由必须以 `/` 开头**


<a name='package'></a>
## npm启动
相比在终端中直接输入各种命令，我更喜欢利用 `node scripts` 来处理任务，在 `/mock` 下建立文件 `package.json`,
然后运行 `npm run mock` 。

````
# /mock/package.json

{
  "scripts": {
    "mock": "json-server db.js"
  }
}

````

<a name='filter'></a>
## 数据过滤
数据过滤是 `json server` 中非常强力的功能。通过url上简单的query字段，即可过滤出各种
各样的数据。

示例数据源:
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

<a name='prop'></a>
### 属性值(Filter)
使用 `.` 操作对象属性值
````
// 获取图片数量为3，且标签字数为2的新闻

GET /news?images.length=3&tag.length=2

````
<a name='slice'></a>
### 分割(Slice)
使用 `_start` 和 `_end` 或者 `_limit` (response中会包含 `X-Total-Count`)
````
// 获取id=10开始的5篇新闻

GET /news?_start=10&_limit=5

// 获取id=20开始,id=35结束的新闻

GET /news?_start=20&_end=35
````
<a name='sort'></a>
### 排序(Sort)
使用 `_sort` 和 `_order` (默认使用升序(ASC))
````
// 按照浏览数量降序排列

GET /news?_sort=views&_order=DESC

````
<a name='operators'></a>
### 运算符(Operators)
使用 `_gte` 或 `_lte` 选取一个范围
````
// 选取浏览量在2000-2500之间的新闻

GET /news?views_gte=2000&views_lte=2500
````
使用 `_ne` 排除一个值
````
// 选择tag属性不是 "国际新闻" 的分类

GET /news?tag_ne=国际新闻
````
使用 `_like` 进行模糊查找 (支持正则表达式)
````
// 查找title中含有 "前端" 字样的新闻 

GET /news?title_like=前端
````
<a name='full_text_search'></a>
### 全文检索(Full-text search)
使用 `q`，在对象全部value中遍历查找包含指定值的数据
````
// 查找新闻全部字段包含 "强拆" 字样的数据

GET /news?q=强拆
````
<a name='relationships'></a>
### 关系图谱(Relationships)

获取包含下级资源的数据, 使用 `_embed`

```
GET /news?_embed=comments
GET /news/1?_embed=comments
```

获取包含上级资源的数据, 使用 `_expand`

```
GET /news?_expand=post
GET /news/1?_expand=post
```

<a name='middleware'></a>
## 作为中间件

除了独立作为rest api 服务器之外， `json server` 同样可以作为诸如 `Express` 之类框架的中间件使用，
具体API详见 [json server模块](https://github.com/typicode/json-server#module)

**全文完**

> [本文demo](../demos/mock/)