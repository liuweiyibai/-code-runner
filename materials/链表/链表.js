// 链表的节点
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

// 链表实现
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
