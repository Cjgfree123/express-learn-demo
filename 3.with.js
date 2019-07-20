// demo1: with作用域
// let obj = {
//     user:{
//         name:"ccc",
//         age:14,
//     }
// };

// 在with作用域，变量名可以从obj的属性上取值
// while (obj) {
//     console.log("hello" + name + age);
//     for (let i = 0; i < number; i++) {
//         console.log(i)
//     }
// };

// demo2: render编译
let script = `
    let tpl = "";
    with(obj){
        if(user){
            tpl += "hello cc";
        }else{
            tpl += "hello guest";
        }
    }
    return tpl;
`;

let obj = {
    user:{
        name:"ccc",
    }
};

let fn = new Function("obj",script);

let result = fn(obj);

console.log(result);

// value object 值对象 作用域链 执行上下文 运行上下文对象


