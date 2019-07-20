let fs = require("fs");
function render(str, options,cb) {
    let head = "let tpl = ``;\n with(obj){\n tpl+=`";
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "\n;tpl+=`";
    });
    let tail = "`}\n return tpl; ";
    let html = head + str + tail;
    let fn = new Function("obj", html);
    let result = fn(options);
    cb(null, result);
};

module.exports = render;