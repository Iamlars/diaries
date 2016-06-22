# 用JSON-server模拟REST API(一) 安装运行

在开发过程中，前后端不论是否分离，接口多半是滞后于页面开发的。所以建立一个
REST风格的API接口，给前端页面提供虚拟的数据，是非常有必要的。

对比过多种mock工具后，我最终选择了使用 `json server` 作为工具，因为它足够简单，
写下少量数据，即可使用。也因为它足够强大，支持CORS和JSONP跨域请求，
支持GET, POST, PUT, PATCH 和 DELETE 方法，更提供了一系列的查询方法，
如limit，order等。下面我将详细介绍 `json server` 的使用。

###目录：

####[安装](#install)

####[运行](#run)
> [通过命令行](#run_by_cli)

> [使用package.json](#run_by_npm)

####[操作数据](#method)
> [get](#get)

> [post](#post)

> [put](#put)

[用JSON-server模拟REST API(二)  动态数据](./json-server&mock-2nd.md)

[用JSON-server模拟REST API(三)  进阶使用](./json-server&mock-3rd.md)


<a name='install'></a>
## 安装

首先你的电脑中需要安装nodejs，建议使用最新版本。
然后全局安装json server，
````bash
  npm install json-server -g 
````

使用linux和macOS的电脑需要加上sudo

```` bash
  sudo npm install json-server -g 
````

安装完成后可以用 `json-server -h` 命令检查是否安装成功，成功后会出现
````
json-server [options] <source>

选项：
  --config, -c       Path to config file            [默认值: "json-server.json"]
  --port, -p         Set port                                     [默认值: 3000]
  --host, -H         Set host                                [默认值: "0.0.0.0"]
  --watch, -w        Watch file(s)                                        [布尔]
  --routes, -r       Path to routes file
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                              [布尔]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing                [布尔]
  --no-gzip, --ng    Disable GZIP Content-Encoding                        [布尔]
  --snapshots, -S    Set snapshots directory                       [默认值: "."]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)          [默认值: "id"]
  --quiet, -q        Suppress log messages from output                    [布尔]
  --help, -h         显示帮助信息                                         [布尔]
  --version, -v      显示版本号                                           [布尔]

示例：
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server
````

<a name='run'></a>
## 运行

安装完成后，可以在任一目录下建立一个 `xxx.json` 文件,例如在 
`mock/` 文件夹下，建立一个 `db.json` 文件，并写入以下内容，
并在 `mock/` 文件夹下执行 `json-server db.json -p 3003` 。
<a name='run_by_cli'></a>

````
{
  "news":[
    {
      "id": 1,
      "title": "曹县宣布昨日晚间登日成功",
      "date": "2016-08-12",
      "likes": 55,
      "views": 100086
    },
    {
      "id": 2,
      "title": "长江流域首次发现海豚",
      "date": "2016-08-12",
      "likes": 505,
      "views": 9800
    }
  ],
  "comments":[
    {
      "id": 1,
      "news_id": 1,
      "data": [
        {
          "id": 1,
          "content": "支持党中央决定"
        },
        {
          "id": 2,
          "content": "抄写党章势在必行！"
        }
      ]
    }
  ]
}
````
<a name='run_by_npm'></a>
为了方便，再创建一个 `package.json` 文件，写入
````
{
  "scripts": {
    "mock": "json-server db.json --port 3003"
  }
}

````

然后使用到 `/mock` 目录下执行 `npm run mock` 命令，如果成功会出现
````
> @ mock /你的电脑中mock文件夹所在目录的路径/mock
> json-server db.json -p 3003


  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3003/news
  http://localhost:3003/comments

  Home
  http://localhost:3003

````

如果不成功请检查 `db.json` 文件的格式是否正确。

<a name='method'></a>
## 操作数据

<a name='get'></a>
### 使用【GET 接口】查询数据
这个时候访问 `http://localhost:3003/db` ，可以查看 `db.json` 
文件中所定义的全部数据。

使用浏览器地址栏，`jQuery.get` 或 `fecth({method: "get"})` 
访问 `http://localhost:3003/news` 则可以看到 `news` 对象下的数据,
以Array格式返回:
````
[
  {
    "id": 1,
    "title": "曹县宣布昨日晚间登日成功",
    "date": "2016-08-12",
    "likes": 55,
    "views": 100086
  },
  {
    "id": 2,
    "title": "长江流域首次发现海豚",
    "date": "2016-08-12",
    "likes": 505,
    "views": 9800
  }
]
````
<a name='post'></a>
### 使用【POST 接口】增加数据
以jquery的 `$.ajax` 方法举例,以下代码会实时的向 `db.json` 中的 `news` 对象push一条新的数据
再次用 `get` 方式访问 `http://localhost:3003/news` , 就可以看到它了
````
$.ajax({
    type: 'post',
    url: 'http://localhost:3003/news',
    data: {
      "id": 3,
      "title": "我是新加入的新闻",
      "date": "2016-08-12",
      "likes": 0,
      "views": 0
    }
  }
)
````
<a name='put'></a>
### 使用【PUT 接口】修改数据
同样以jquery的 `$.ajax` 方法举例,以下代码会实时的对 `db.json` 中的 `news` 对象
中 `id=1` 数据进行修改
````
$.ajax({
    type: 'put',
    url: 'http://localhost:3003/news/1',
    data: {
      "title": "曹县宣布昨日晚间登日失败",
      "date": "2016-08-12",
      "likes": 55,
      "views": 100086
    }
  }
)

// 结果

[
  {
    "id": 1,
    "title": "曹县宣布昨日晚间登日失败",
    "date": "2016-08-12",
    "likes": 55,
    "views": 100086
  }
]
````

**PATCH 和 DELETE 使用方式同上，就不做演示了。**

> [json-server 仓库地址](https://github.com/typicode/json-server)
