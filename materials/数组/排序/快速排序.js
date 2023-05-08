// 快速排序方法：
const quickSort = function (array) {
  if (array.length <= 1) {
    return array;
  }
  // 第一次的基准，找到这个数组最中间元素的索引
  var middleIndex = Math.floor(array.length / 2);
  // 找到当前数组的最中间的元素，使用splice方法会改变原数组，所以原数组中就不会含有pivot
  // splice(middleIndex, 1) // 删除从 middleIndex 开始的1个元素，返回一个数组，数组中包含被删除的数组，并且会改变原数组
  var middle = array.splice(middleIndex, 1)[0];
  // 声明两个数组，用来存放左右两边的值
  var left = [];
  var right = [];
  // 然后开始遍历 array
  for (var i = 0; i < array.length; i++) {
    // 小于中间数字的放到左边数组，大于中间数字的放到右边数组
    if (array[i] < middle) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  // 然后不断重复调用该方法，
  // 因为左边数组肯定是小于 middle ，右边肯定是大于 middle
  // 所以分别对 left 和 right 进行 同样的操作,然后进行合并concat为一个数组
  return quickSort(left).concat([pivot], quickSort(right));
};
var array = [
  0, 1, 2, 44, 4, 324, 5, 65, 6, 6, 34, 4, 5, 6, 2, 43, 5, 6, 62, 43, 5, 1, 4,
  51, 56, 76, 7, 7, 2, 1, 45, 4, 6, 7,
];

console.log(quickSort(array)); // 从小到大排列数组
