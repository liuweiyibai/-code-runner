const arr = ["11", "22", "33", "11", "22", "11"];

// 利用 hash 键值对存储
function most1(arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let k = arr[i];
    if (obj[k]) {
      obj[k]++;
    } else {
      obj[k] = 1;
    }
  }

  return Object.keys(obj).reduce((a, b) => {
    return obj[a] > obj[b] ? a : b;
  });
}

// 借助数组Array的reduce方法
function most2(arr) {
  let max;
  let maxNum = 1;
  let newObj = arr.reduce(function (cal, value) {
    cal[value] ? cal[value]++ : (cal[value] = 1);
    if (cal[value] > max) {
      max = value;
      max++;
    }
    return cal;
  }, {});
  return newObj;
}

function most3(arr) {
  let max;
  let maxNum = 1;
  let newObj = arr.reduce(function (cal, value) {
    if (value in cal) {
      cal[value]++;
    } else {
      cal[value] = 1;
    }
    return cal;
  }, {});
  return newObj;
}

console.log(arr);
console.log(most1(arr));
console.log(most2(arr));
console.log(most3(arr));
