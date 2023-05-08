/**
 * Object.create 的作用是，创建一个对象，这个的 __proto__ 属性是传入的第一个参数，第二个参数是装饰参数
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * @param {*} proto
 * @param {*} des
 * @returns
 */
function create(proto, des) {
  function Fn() {}
  Fn.prototype = proto;
  var fn = new Fn();

  // 此时 fn.__proto__ = Fn.prorotype，利用 new 操作符特性实现
  if (typeof des === "object") {
    Object.defineProperties(fn, des);
  }
  return fn;
}

// 测试
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};
const me = create(person);
console.log(me.__proto__ === person);
