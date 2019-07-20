// demo1: express原理
let stack = [
    function (next){
        console.log(1);
        next();
    },
    function (next){
        console.log(2);
        next();
    },
    function (next){
        console.log(3);
        next();
    },
    function (next){
        console.log(4);
    }
];

let i = 0; 
function next(){
    let fn = stack[i++];
    fn(next);
};
next();

// demo2: koa原理

function fn1(){
    console.log("1开始");
    function fn2(){
        console.log("2开始");
        function fn3(){
            console.log("3开始");
            console.log("3结束");
        };
        fn3();
        console.log("2结束");
    }
    fn2();
    console.log("1结束");
}

fn1();