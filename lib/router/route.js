const Layer = require("./layer");
function Route(path) {
    this.path = path;
    this.stack = [];
    // 表示此路由,有此方法的处理函数
    this.methods = {};
};

Route.prototype.get = function (handler) {
    let layer = new Layer("/", handler);
    layer.method = method;
    this.methods["get"] = true;
    this.stack.push(layer);
}

Route.prototype.dispatch()

module.exports = Route;