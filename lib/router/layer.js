function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
};

Layer.prototype.match = function (path) {
    if (this.path == path) {
        return true;
    }
    // 这一层是一个中间层 /user/2
    if (!this.route) {
        return path.startsWith(this.path + "/");
    }
    return false;
};

Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
}

Layer.prototype.handle_error = function (err, req, res, next) {
    if (this.handler.length != 4) {
        return next(err);
    }
    this.handler(err, req, res, next);
}

module.exports = Layer;