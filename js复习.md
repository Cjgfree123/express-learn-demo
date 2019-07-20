## 场景: new 构造函数 === 构造函数() 

```
function Router(){
    let obj = {name: "cc"};
    return obj;
} 

let r1 = Router();
let r2 = new Router();
r1 === r2 // true ({name: "cc"})

```

结论: 如果构造函数，返回一个对象。就有: new 构造函数 === 构造函数()

## js作用域 (es5)

1. 分类

* 函数作用域
* 全局作用域
* with作用域

