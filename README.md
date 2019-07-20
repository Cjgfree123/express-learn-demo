# express-learn-demo 
express  原理


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

什么是错误处理中间件？

回答: 

5. 报错:Unterminated template literal (在学习模板引擎原理，拼接html时，遇到该错误)

解释: 没有闭合的html标签。

检查: html处，引号拼接。