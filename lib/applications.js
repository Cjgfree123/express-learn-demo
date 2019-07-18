const Router = require("./router");
function Application() {
    this._router = new Router(); // 这是一个私有属性的数组
};
Application.prototype.get = function (path, handler) {
    this._router.get(path, handler);
    router.push({
        path,
        handler,
        method: "get",
    });
};
Application.prototype.listen = function (path, handler) {
    // 1. 往router里push route对象
    router.push({
        path,
        handler,
        method: "get",
    })
};
Application.prototype.listen = function () {
    let self = this;
    let server = http.createServer(function (req, res) {
        // 如果没有任何路由规则的话，会走此函数
        function done() {
            res.end(`cannot ${req.method} ${req.url}`)
        }
        this._router.handle(req,res,done);
        // let { pathname } = url.parse(req.url, true);
        // for (let i = 1; i < router.length; i++) {
        //     let { path, method, handler } = router[i];
        //     if (pathname === path && method === req.method.toLowerCase()) {
        //         return handler(res, res);
        //     }
        // };
        // router[0].handler(req, res);
    });
    server.listen.apply(server, arguments);
}
// let app = {
//     get(path, handler) {
//         // 1. 往router里push route对象
//         router.push({
//             path,
//             handler,
//             method: "get",
//         });
//     },
//     listen() {
//         let server = http.createServer(function (req, res) {
//             // 2. 解读出浏览器路由
//             let { pathname } = url.parse(req.url, true);
//             // 3.如果请求的路径和方法名，和我们的配置一样，就执行回调
//             for (let i = 1; i < router.length; i++) {
//                 let { path, method, handler } = router[i];
//                 if (pathname === path && method === req.method.toLowerCase()) {
//                     return handler(res, res);
//                 }
//             };
//             router[0].handler(req, res);
//         });
//         server.listen.apply(server, arguments);
//     },
// }

module.exports = Application;
