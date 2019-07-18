const Route = require("./route");
const Layer = require("./layer");
const url = require("url");
const methods = require("methods");
const slice = require("slice");

function Router() {
    this.stack = [];
};
// 创建一个Route实例,向当前路由系统，添加一个layer
Router.prototype.route = function (path) {
    let route = new Route(path);
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

methods.forEach(function (method) {
    Router.prototype[method] = function (path) {
        // 是向router里边，添加一层
        let route = this.route(path);
        route[method].apply(route, slice(arguments, 1));
        return this;
    };
})

Router.prototype.get = function (path, handler) {

};

Router.prototype.handle = function (req, res, out) {
    let idx = 0,
        self = this;
    let {
        pathname
    } = url.parse(req.url, true);

    function next() {
        if (idx >= this.stack.length) {
            return out();
        };
        let layer = this.stack[idx++];
        if (layer.match(pathname) && layer.route && layer.route.handle_method(req.method)) {
            layer.handle_request(req, res, next);
        } else {
            next();
        }
    }
    next();
}

module.exports = Router;