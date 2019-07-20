const express = require("express");
const app = express();

// 用来批量处理路径参数的
app.param("uid", function(req, res, next,val,name) {
    req.user = {
        id:1,
        name:"ccc",
    }
    next();
})

app.param("uid", function(req, res, next,val,name) {
    req.user.name = "ccc2";
    next();
})

// 路径参数, 因为这个参数是在路径里面
// vue angular react param

app.get("/user/:uid", function(req, res) {
    console.log(req.params); // 路径参数对象 {uid:1}
    console.log(req.user);
    res.end("user");
})

app.listen(3005,()=>{
    console.log("监听 3005 port");
})

/**
 * express().param("uid") 
 * 1. 可以设置路径请求参数
 * 2. 如果同时设置请求参数, 会存在覆盖问题
 */