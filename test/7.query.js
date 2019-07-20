const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.get("/", function(req, res){
    console.log(req.query);
    console.log(req.path);
    // 一般在项目中，不通过res.end返回数据。 因为res.end(str || buffer).即:res.end()只能返回str或者buffer
    // 解决：实际项目中，通过res.json返回数据。
    // res.end("ok");
    res.json({
        name:"ccc_better",
    })
});

app.listen(3007,()=>{
    console.log("监听端口 3007");
});