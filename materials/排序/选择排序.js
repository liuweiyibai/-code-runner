/**
 * 选择排序，比较数组中最小值，并且 push 进去，并且在原数组中删除该元素
 * @param arr 要排序的数组
 */
function selectSort(arr) {
  let other = []; // 声明数组
  while (arr.length) {
    // 当 length === 0 时，表示处理完毕

    let min = Infinity; // 这里注意最小值的声明，这里默认无穷

    let minIndex; // 记录最小值的索引

    arr.forEach((t, i) => {
      if (t < min) {
        // 比较，查找最小值
        min = t;
        minIndex = i;
      }
    });

    other.push(min);
    arr.splice(minIndex, 1); // 原数组删除最小值
  }
  return other;
}

const arr = [
  0, 1, 2, 44, 4, 324, 5, 65, 6, 6, 34, 4, 5, 6, 2, 43, 5, 6, 62, 43, 5, 1, 4,
  51, 56, 76, 7, 7, 2, 1, 45, 4, 6, 7,
];

console.log('====================================');
console.log(selectSort(arr));
console.log('====================================');
