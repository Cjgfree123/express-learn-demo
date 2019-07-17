# express-learn-demo
express  原理

## 思路
1. 基础实现express服务
2. 从express.js,抽离出applications.js
3. 实现router和应用的分离

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