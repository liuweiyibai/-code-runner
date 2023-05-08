/**
 * 栈
 */
class Stack {
  stack = [];

  // 将元素插入到栈底
  push(node) {
    this.stack.push(node);
  }

  pop() {
    return this.isEmpty() ? undefined : this.stack.pop();
  }

  // 是否为空栈
  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.stack.length;
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }
}

// 测试
let stack = new Stack();
stack.push(1);
stack.push(5);
stack.push(7);
console.log(stack.peek());
console.log(stack.size());

console.log(stack.pop());
console.log(stack.size());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
