let url = require("url");
// 这是一个路由规则的窗口
let router = [{
	path: "*", // 这个路由规则,可以匹配所有的路径
	method: "*", // 这个路由规则,可以匹配所有的方法
	handler(req, res) {
		res.end(`cannot ${req.method} ${req.url}`);
	},
}];
const http = require("http");
function createApplication() {
	return {
		get(path, handler) {
			// 1. 往router里push route对象
			router.push({
				path,
				handler,
				method: "get",
			});
		},
		listen() {
			let server = http.createServer(function (req, res) {
				// 2. 解读出浏览器路由
				let { pathname } = url.parse(req.url, true);
				// 3.如果请求的路径和方法名，和我们的配置一样，就执行回调
				for (let i = 1; i < router.length; i++) {
					let { path, method, handler } = router[i];
					if (pathname === path && method === req.method.toLowerCase()) {
						return handler(res, res);
					}
				};
				router[0].handler(req,res);
			});
			server.listen.apply(server,arguments);
		}
	};
}

module.exports = createApplication;