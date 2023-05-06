function create(proto,des){
  function Fn(){}
  Fn.prototype = proto
  var fn = new Fn()
   if (typeof des === 'object') {
        Object.defineProperties(fn, des);
    }
  return fn
}

function isNew(ctor,...args){
  var proto = Object.create(ctor.prototype)
  var res = ctor.apply(proto,[...args])
  new.target = ctor

  // res 为 非null 对象或者函数直接返回 res
  return proto
}

function bind(ctx,...args){
  var __self = this
  // 判断 bind 被当做构造器使用
  var inner =  function(...args2){
    if(this instanceof inner){
      return __self.apply(this,[...args,...args2])
    }
    return __self.apply(ctx,[...args,...args2])
  }
}

function apply(ctx,args){
  var __self = this
  var key = Symbol()
  ctx[key] = __self
   ctx[key](args)
   delete ctx[key]
}