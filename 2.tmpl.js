let ejs = require("ejs");
let str = `
    <%if(user){%>
        hello user
    <%}else{%}>
        hello guest
    <%}%>
    <ul>
        <%for(let i=0;i<total;i++){%>
            <li><%=i%></li>
        <%}%>
    </ul>
`;

let options = {
    user: {
        name: "ccc",
    },
    total: 555,
};

// ejs模板渲染原理:
// 拼出一段函数体代码，然后将obj作为作用域，提供属性
// 相当于: require("ejs")._express
function render(str, options) {
    let head = "let tpl = ``;\n with(options){\n tpl+=`";
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g,function(){
        return "${" + arguments[1] + "\n;tpl+=`";
    });
    let tail = "`}\n return tpl; ";
    let html = head + str + tail;
    console.log(html);
    let fn = new Function("options", html);
    return fn(options);
};

let result = render(str, options);

console.log("结果", result);