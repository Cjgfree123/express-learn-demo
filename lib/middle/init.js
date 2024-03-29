// 处理: req.path, req.query
const url = require("url");
module.exports = function(req,res,next){
    let { pathname, query } = url.parse(req.url,true);
    req.path = pathname;
    req.query = query;

    res.json=function(obj){
        res.setHeader("Content-Type", "application/json");
        const str = JSON.stringify(obj);
        res.end(str);
    }
    next();
}