const Layer = require("./layer");
const methods = require("methods");

function Route(path) {
    this.path = path;
    this.stack = [];
    // 表示此路由,有此方法的处理函数
    this.methods = {};
};

Route.prototype.handle_method = function (method) {
    method = method.toLowerCase();
    return this.methods[method];
};

methods.forEach(function (method) {
    Router.prototype[method] = function (path) {
        let handlers = slice.call(arguments);
        this.methods["get"] = true;
        for (let i = 0; i < handlers.length; i++) {
            let layer = new Layer("/", handler);
            layer.method = "get";
            this.stack.push(layer);
        }

    }
})

Route.prototype.dispatch = function (req, res, out) {
    let idx = 0,
        self = this;

    function next() {
        if (idx >= this.stack.length) {
            out(); // route.dispatch里的out,刚好是Router里的next
        }
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_method(req, res, next);
        } else {
            next();
        }
    };
    next();
}


module.exports = Route;