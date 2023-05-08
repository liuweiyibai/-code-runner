function isNew(ctor, ...args) {
  // 1. 创建一个新对象
  var obj = {};

  // 2. 手动指定新对象原型对象指向构造函数的原型对象
  obj.__proto__ = ctor.prototype;

  // 3. 通过 apply 改变构造函数的 this 指向新对象
  var result = ctor.apply(obj, args);

  //  4. 因为 apply 其实是调用了 ctor 构造函数，如果构造函数返回了非对象，则直接把函数执行结构返回
  return result instanceof Object ? result : obj;
}

// function bind(ctx, ...args) {
//   var __self = this;
//   // 判断 bind 被当做构造器使用
//   var inner = function (...args2) {
//     if (this instanceof inner) {
//       return __self.apply(this, [...args, ...args2]);
//     }
//     return __self.apply(ctx, [...args, ...args2]);
//   };
// }

// function apply(ctx, args) {
//   var __self = this;
//   var key = Symbol();
//   ctx[key] = __self;
//   ctx[key](args);
//   delete ctx[key];
// }
