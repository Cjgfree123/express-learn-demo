let path = "/user/:uid/:name";
// let reg = /\/user\/([^\/]+?)\/([^\/]+?)/;
// let url = "/user/1/zfpx";
// let result = reg.exec(url);
// console.log(result);


let pathToRegExp = require("path-to-regexp");
let keys = [];
let result = pathToRegExp(path,keys); 
console.log(result);
console.log(keys);

/**
 * path-to-regexp 库(封装)
 * @param path
 * @param keys
 * 
 * function pathToRegExp(path, keys){
     return path.replace(/:([^\/]+)/g, function(){
        keys.push({
            name: arguments[1],
            optional: false,
            offset: arguments[2],
        })
     })
 }
 */

 
