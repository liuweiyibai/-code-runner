var arr = [1, 5, 3];

// 两种方式
console.log(Math.max.apply(Math, arr));
console.log(Math.max(...arr));
