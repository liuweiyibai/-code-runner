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

let head = new Node(7, new Node(13, null), null);

var head1 = new Node(7, null, null);
var head2 = new Node(13, null, null);
var head3 = new Node(11, null, null);
var head4 = new Node(10, null, null);
var head5 = new Node(1, null, null);

head1.next = head2;
head2.next = head3;
head3.next = head4;
head4.next = head5;

head1.random = null;
head2.random = head1;
head3.random = head5;
head4.random = head3;
head5.random = head1;

console.log('head', head1);

var copyRandomList = function (head) {
  if (!head) return null;
  let pre = head;
  while (pre) {
    pre.next = new Node(pre.val, pre.next, pre.random);
    if (pre.next) pre = pre.next.next;
  }
  pre = head.next;
  while (pre) {
    pre.random && (pre.random = pre.random.next);
    // (pre = pre.next) && (pre = pre.next);
    if (pre.next) pre = pre.next.next;
    else break;
  }
  // 方法一
  // let p = q = head.next
  // while(q.next) {
  //   head.next = head.next.next;
  //   q.next = q.next.next;
  //   head = head.next;
  //   q = q.next
  // }
  // head.next = null
  // return p
  // 方法二
  let new_head = head.next;
  let p = head;
  let q;
  while (p) {
    q = p.next;
    p.next = q.next;
    if (p.next) q.next = p.next.next;
    p = p.next;
  }
  return new_head;
};

console.log('copyRandomList', copyRandomList(head1));
