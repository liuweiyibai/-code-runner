/**
 * 1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * 3. 针对所有的元素重复以上的步骤，除了最后一个；
 * 4. 重复步骤 1~3，直到排序完成。
 */

const bubbleSort = function (array) {
  let i = 0,
    len = array.length,
    j,
    d;
  // 嵌套for循环，然年内部比较大小
  for (; i < len; i++) {
    // 用内层的for出来的每一个arr[i] 和内部的for出来的每一个for出来的arr[j] 相比
    for (j = 0; j < len; j++) {
      // 如果
      if (array[i] < array[j]) {
        // 将大的值暂存
        d = array[j];
        array[j] = array[i];
        array[i] = d;
      }
    }
  }
  return array;
};
var arr = [32, 3, 5];
console.log(bubbleSort(arr)); // [3,5,32]
