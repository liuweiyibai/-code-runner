let arr = [...new Array(100)].map((_, i) => i);

const shuffle = (arr) => {
  var result = [],
    random;
  while (arr.length > 0) {
    //  随机索引
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
};

/**
 * 洗牌函数，对正序数组进行重排
 */
function shuffle1(arr) {
  let length = arr.length,
    element,
    random;
  while (length) {
    //  随机元素
    random = Math.floor(Math.random() * length--);

    // 最后一个元素
    element = arr[length];

    // 交换随机元素和最后一个元素位置
    [arr[length], arr[random]] = [arr[random], element];
  }
  return arr;
}

const shuffle2 = (arr = []) => arr.sort((a, b) => Math.random() - 0.5);
console.log(arr);
// console.log(shuffle(arr));
console.log(shuffle1(arr));
console.log(shuffle2(arr));
