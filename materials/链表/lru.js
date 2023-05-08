/**
 * @class Node
 * @description 节点的构造函数
 */
function Node(value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

/**
 * @class LinkedList
 * @description 列表的类构造函数
 */
function LinkedList() {
  this.head = null;
  this.tail = null;
}

const list = new LinkedList();
