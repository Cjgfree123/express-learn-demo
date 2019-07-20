# express-learn-demo 
express  原理

## express功能

1. 路由/http方法名
2. 中间件use
3. 错误处理
4. param参数处理
5. 模板引擎

中间件分类:

```
应用层中间件: 使用 app.use()[备注: 嵌套路由用到] 和 app.METHOD() 函数 [备注: app.get("/",()=>{})]将应用层中间件绑定到应用程序对象的实例.

路由层中间件: 与应用层中间件基本相同，差异之处在于它绑定到 express.Router() 的实例。

    比如: var router = express.Router();

错误处理中间件: 基本与其他中间件相同。差别在于错误处理函数有四个自变量而不是三个，专门具有特征符 (err, req, res, next).

    比如: 

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

内置中间件: 唯一内置的中间件函数是 express.static

    比如: 

    app.use(express.static('public', options));

第三方中间件: 安装具有所需功能的 Node.js 模块，然后在应用层或路由器层的应用程序中将其加装入。

    比如: cookie-parser

```

## 测试文件

文件1.get.js
1. 基础实现express服务
2. 从express.js,抽离出applications.js
3. 实现router和应用的分离

文件2.router.js
1. next函数，链式调用

文件3.route.js
1. 将路径相同的接口，进行整合

文件4.use.js
1. 实现嵌套路由

文件5.param.js
1. 实现动态路由参数匹配

文件1.tmpl.js
1. 测试ejs封装，仅支持简单语法。 如

```
<%=name%>
```

文件2.tmpl.js
1. 支持if else等逻辑

文件3.with.js
1. 展示new Function基础渲染原理

## 小收获

1.注意: res.end,并非res.send。res.send会报错

```
res.end("hello")
```

2. 可以将面向对象，抽离成原型写法

```
let fn = {
    get(){
        // ...
    }
}

// 抽离:

function fn(){

}

fn.prototype.get = (){

}
```

3.层级分析

```
Router
    stack
       layer
          path  route
                   method handler

Layer
Router Layer 路径，处理函数(router.dispatch) 特殊属性:route
Route layer 路径,处理函数(真正的业务代码) 特殊属性:method

```

4. 如果任何一步出错了，会把错误交给next. 然后会跳过后面所有的正常处理函数，交给错误中间件进行处理。

5. 报错:Unterminated template literal (在学习模板引擎原理，拼接html时，遇到该错误)

解释: 没有闭合的html标签。

检查: html处，引号拼接。

6. 结论：因为res.end无法返回json，所以使用: res.json。 实际：res.json是对res.end()的封装，原理：先将json数据转化成了str,再通过响应头application/json告诉浏览器，按照json解析。

```
// 一般在项目中，不通过res.end返回数据。 因为res.end(str || buffer).即:res.end()只能返回str或者buffer

// 解决：实际项目中，通过res.json返回数据。
```

