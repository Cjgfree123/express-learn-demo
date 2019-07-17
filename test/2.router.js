const express = require("../lib/express");
const app = express();

// next:表示执行下一个
// restfulApi:相同路径的接口，只写一个即可
app.get("/",function(req,res,next) {
    console.log(1);
    next();
},function(req,res,next){
    console.log(11);
    next();
})
.get("/",function(req,res,next){
    console.log(2);
    next();
})
.get("/",function(req,res,next){
    console.log(3);
    res.end("ok");
});

app.listen(3002,()=>{
    console.log("listen at 3002");
})

// router: stack。每一个元素就是一个layer
// layer: 包含method+url