#!/usr/bin/env node

var argv = require('yargs').argv;
var fs = require('fs');
var join = require('path').join;

const modelName = argv.model;

// 改写路由文件(判断路由文件夹是否存在，判断路由文件是否存在)
const routeDirPath = join(__dirname,'routes');
const routeFileName = `routes/${modelName}.js`;
const routeFilePath = join(__dirname,routeFileName);
const routePath = join(__dirname,'routes/routes.js');
let routeString = `
let app = require('express').app();
\n
// ${modelName}
app.user('./${modelName}', require('./controllers/${modelName}Controller.js'));`;

let routeFileString = `
let router = require('express').Router();
let ${modelName} = require('./controllers/${modelName}Controller.js');

/* GET home page. */
router.get('/', ${modelName}.index);

/* GET show page. */
router.get('/:id', ${modelName}.show);

/* post a new . */
router.post('/', ${modelName}.add);

/* update . */
router.post('/update/:id', ${modelName}.update);

/* delete . */
router.post('/delete/:id', ${modelName}.delete);

module.exports = router;
`;
if(fs.existsSync(routeDirPath)){
    
    if(!fs.existsSync(routeFilePath)){
        creatRouteFile();
    }
    
    if(fs.existsSync(routePath)){
        fs.writeFileSync(routePath,`
\n
// ${modelName}
app.user('./${modelName}', require('./controllers/${modelName}Controller.js'));
        `,{flag: 'a'});
    }else{
        fs.writeFileSync(routePath,routeString);
        console.log(`创建文件: ${routePath}`)
    }
    
}else{
    fs.mkdirSync(routeDirPath);  
    console.log('创建目录: routes')
    creatRouteFile();
}

function creatRouteFile(){
    fs.writeFileSync(routeFilePath,routeFileString);  
    console.log(`创建文件: ${routeFileName}`)
}

// 增加控制器
const controllerDirPath = join(__dirname,'controllers');
const controllerFileName = `controllers/${modelName}Controllers.js`;
const controllerFilePath = join(__dirname,controllerFileName);
let controllerFileString = `
let request = require('request');

/* GET home page. */
exports.index = function(req, res) {
    res.render('views/${modelName}/index', { title: ${modelName} });
}

/* GET show page. */
router.get('/:id', function(req, res) {
    let id = req.params.id;
    request.get('api/${modelName}/'+id,function(){
        res.render('views/${modelName}/show', { title: ${modelName} });
    })
});

module.exports = router;
`;
if(fs.existsSync(controllerDirPath)){
    if(fs.existsSync(controllerFilePath)){
        return;
    }else{
        creatControllersFile();
    }
}else{
    fs.mkdirSync(controllerDirPath);  
    console.log('创建目录: controllers')
    creatControllersFile();
}

function creatControllersFile(){
    fs.writeFileSync(controllerFilePath,controllerFileString);  
    console.log(`创建文件: ${controllerFileName}`)
}
// 增加页面

// 增加css

// 增加js
