const Route = require("./route");
const Layer = require("./layer");
const url = require("url");
const methods = require("methods");
const slice = require("slice");

function Router() {
    // 将router写成方法，支持嵌套路由
    function router(req, res, next) {

    };
    Object.setPrototypeOf(router, proto);
    router.stack = [];
    return router;
};

let proto = Object.create(null);


// 创建一个Route实例,向当前路由系统，添加一个layer
proto.route = function (path) {
    let route = new Route(path);
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

proto.use = function (path, handler) {
    if (typeof handler !== "function") {
        handler = path;
        path = "/";
    }
    let layer = new Layer(path, handler);
    // 通过路由, 有没有route属性，来判断是一个中间件函数，还是一个路由
    /**
     *  中间件函数 (是一个新的layer,layer里边放着next)
     *  user.use(function(req,res,next){
            console.log("ware2: ", Date.now());
            next();
        });

        路由 (在layer里边)
        app.use("/user", user);

     */
    layer.route = undefined;
    this.stack.push(layer);
}

methods.forEach(function (method) {
    Router.prototype[method] = function (path) {
        // 是向router里边，添加一层
        let route = this.route(path);
        route[method].apply(route, slice(arguments, 1));
        return this;
    };
})

proto.get = function (path, handler) {

};

/**
 * 1. 处理中间件
 * 2. 处理子路由
 */
proto.handle = function (req, res, out) {
    let idx = 0,
        self = this,
        slashAdded = false, // 特指: 是否添加过/
        removed = "", // 指的是: 被移除的字符串
        ;
    let {
        pathname
    } = url.parse(req.url, true);

    function next() {
        // 再一次进入路径，需要拼接完整的 请求路径
        if (removed.length > 0) {
            req.url = removed + req.url;
            removed = "";
        }
        if (idx >= self.stack.length) {
            return out();
        };
        let layer = self.stack[idx++];
        if (layer.match(pathname)) {
            // 这一层是中间件层
            if (!layer.route) {
                // 去掉公共前缀   即: /user/2 -> /2
                let removed = layer.path;
                req.url = req.url.slice(removed.length);
                if(err){
                    layer.handle_error(err, req, res, next);
                }else{
                    layer.handle_request(req, res, next);
                }
            }
        } else {
            if (layer.route && layer.route.handle_method(req.method)) {
                layer.handle_request(req, res, next);
            } else {
                next(err);
            }
        }
    }
    next();
}

module.exports = Router;