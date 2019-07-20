let str = `
    <%if(user){%>
        hello <%=suer.name%>
    <%}else{%}>
        hello guest
    <%}%>
`;
 
let options = {
    user:{
        name:"ccc",
    },
    total:555,
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