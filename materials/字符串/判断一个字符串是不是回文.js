function palindrome(str) {
  str = String(str);
  // str.split('');//字符串转成数组
  // str.split('').reverse();//数组反序排列
  return str === str.split("").reverse().join(""); //数组转化字符串
}
