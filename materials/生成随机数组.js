const makeRandom = () => Math.floor(Math.random() * 10000);

const makeArray = len => [...new Array(len)].map(() => makeRandom());

// 随机生成长度为10的数组
console.log(makeArray(10));
