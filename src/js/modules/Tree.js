import treeData from '../data/treeData';

function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  var root = null;
  var count = 0;

  this.insert = function(key) {
    // 재귀 호출
    var newNode = new Node(key);
    if(root === null) {

      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  }

  this.toString = function() {
    return root;
  }

  var insertNode = function(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  }
}

var Tree = {
  create: $('#tree_create'),
  remove: $('#tree_remove'),
  content: $('.tree'),
  tree: null,
  init: function() {
    this.event();
    this.tree = new BinarySearchTree();

    // 초기 값
    this.tree.insert(11);
    this.tree.insert(7);
    this.tree.insert(15);
    this.tree.insert(5);
    this.tree.insert(9);
    this.tree.insert(13);
    this.tree.insert(20);

    this.rendering();
  },
  event: function() {
    this.create.click(() => {
      console.log(this.tree.strString());
    });

    this.remove.click(() => {
      console.log(this.tree.toString());
    })
  },
  rendering: function() {
    var tree = this.tree.toString();
    var str = "";
    console.log(typeof tree.left)
    console.log(new Boolean(null));

  }
}


export default Tree;
