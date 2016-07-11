# NPM使用技巧
nodejs是前端开发中不可获取的工具，而 `NPM(node package manager)` 是nodejs开发中必不可少的工具。

目录

[安装]()
* [-g]()
* [--save]()
* [--save-dev]()
* [升级]()
* [卸载]()

[版本]()
* [选择]()
* [升级]()

[安装源]()

##安装
npm本身会随着nodejs一同安装到电脑上，所以不需要额外再进行安装。
如果是windows系统的电脑，一定不要把nodejs安装路径放在admin下面，会导致很多错误发生。
在项目文件夹下面安装包之前，**请务必先建立 `package.json` 文件**，可以使用 `npm init` 命令直接建立。
### -g
-g是--global的缩写，
### --save
### --save-dev

##版本
### 选择
npm3 这个版本和以前版本的显著区别就是文件依赖变成了平行的，可以减少很多重复安装，也可以让移除文件变得更加简便。
````bash
# npm3之前的文件依赖
node_modules
  -- gulp
    -- node_modules
      -- lodash
        -- node_modules
          -- xxx
            -- node_modules
    
# npm3.x的文件依赖
node_modules
  -- gulp
  -- lodash
  -- xxx
````
### 升级
可以通过
````bash
npm update <package>
````

##安装源选择
##依赖选择
