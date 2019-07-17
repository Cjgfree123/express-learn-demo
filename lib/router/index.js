function Router() {
    this.stack = [];
};
// 创建一个Route实例,向当前路由系统，添加一个layer
Router.prototype.route = function(path) {
    let route = new Route(path);
    let layer = new layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

Router.prototype.get = function (path,handler) {
    let route = this.route(path);
    route.get(handler);
};

Router.prototype.handler = function(req,res,out) {
    
}

module.exports = Router;