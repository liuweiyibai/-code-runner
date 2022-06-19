// 数组的排序，sort方法
const systemSort = function (array) {
  return array.sort(function (a, b) {
    // a-b –> 小到大，b-a –> 大到小
    return b - a;
  });
};
var arr = [32, 3, 5];
console.log(systemSort(arr)); // 根据内部返回的是a-b还是b-a
