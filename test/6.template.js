const express = require('../lib/express');
const path = require('path');
const html = require('./views/index.html');
const app = express();
const fs = require('fs');

// 1. views设置模板存放的根目录
app.set('views',path.resolve('views'));

// 2. 用来设置模板引擎 (遇到html结尾的模板，用html来进行渲染)
// 如果渲染的时候，没有指定后缀名，将以下面设置，作为后缀名。
app.set('view engine','html');

// 3. 用来设置模板引擎，遇到html结尾的模板，用html来渲染
app.engine('html', html);
// 当客户端用GET方式,访问/路径，执行对应的回调函数

// 中间件
app.use(function(req,res,next){
    res.render = function(name, options){
        // 拼接后缀
        name = name.indexOf(".")>-1 ? name : name +"."+app.get("engine");
        let filepath = path.join(app.get("views"), name);
        let render = app.engine[ext];
        function done(err, html){
            res.setHeader("Content-Type","text/html");
            res.end(html);
        }
        render(filepath,options,done);
    }
    next();
})

// 4.
app.get('/',function(req,res,next){
    // res.render(模板名称, 数据对象，)
    // res.render(filepath,options,cb);
    res.render('index',{title:'hello',user:{name:'zfpx'}});
    // res.render('index.html',{title:'hello',user:{name:'zfpx'}});
});

app.listen(3000);