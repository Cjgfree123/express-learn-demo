let str = `hello <%=name%> world <%=age%>`;
 
let options = {
    name:"zfpx",
    age:8,
};

let ejs = require("ejs");

// ejs模板渲染原理
function render(str, options){
    return str.replace(/<%=(\w+?)%>/g,function(){
        return options[arguments[1]];
    });
};

let result = render(str,options);

console.log(result);