const Router = require("./router");
const http = require("http");
const methods = require("methods"); // ["get","post",...]
const slice = Array.prototype.slice;
function Application() {
    // this._router = new Router(); // 这是一个私有属性的数组
};
Application.prototype.lazyrouter = function(){
    if(!this._router){
        this._router = new Router();
    }
}

methods.forEach(function(method){
    Application.prototype[method] = function(path,){
        this.lazyrouter();
        // 这样写，支持传入多个函数
        this._router[method].apply(this._router,slice(arguments));
        return this;
    }
})

Application.prototype.get = function (path, handler) {
    this.lazyload();
    this._router.get(path, handler);
    router.push({
        path,
        handler,
        // method: "get",
    });
};

// 添加中间件，而中间件和普通路由，都市放在一个数组中。
// 放在this._router.stack
Application.prototype.use = function(){
    this.lazyrouter();
    // 把传给use的参数，全部传给router
    this._router.apply(this._router, arguments);
}

Application.prototype.listen = function () {
    let self = this;
    let server = http.createServer(function (req, res) {
        // 如果没有任何路由规则的话，会走此函数
        function done() {
            res.end(`cannot ${req.method} ${req.url}`)
        }
        this._router.handle(req,res,done);
    });
    server.listen(...arguments);
}

module.exports = Application;
