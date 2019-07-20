const express = require("../lib/express");
const app = express();

/**
 * 嵌套路由注意:
 * 1. express.Router(), 返回路由实例
 * 2. 
 */

/**
 * demo1: 普通路由
 */
app.use(function(req, res, next){
  console.log("ware1: ", Date.now());
  next();
});

// 后端路由是完整匹配, / != /user, 所以: 用户输入/user,仅仅会命中/user路由。
app.get("/", function(req, res, next){
  res.end("1");
});

/**
 * demo2: 嵌套路由
 */

// 创建一个新的路由系统
const user = express.Router();

app.use("/user", user);

user.use(function(req,res,next){
  console.log("ware2: ", Date.now());
  next();
});

// use表示使用中间件，只需要匹配前缀就行。 即: 访问路径/user/2
user.use("/2",function(req,res,next){
  console.log("ware3")
  res.end(2);
});

app.use(function(err, req, res, next){
  res.end("catch " + err);
})
app.listen(3004);