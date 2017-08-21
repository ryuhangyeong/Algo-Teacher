

function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  var root = null;

  this.insert = function(key) {
    var newNode = new Node(key);

    if(root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  }

  this.getRoot = function() {
    return root;
  }

  this.height = function(node) {
    console.log("test", node)
    var dep, depl, depr;
    if(node === null) {
      dep = 0;
    } else {
      depl = this.height(node.left);
      depr = this.height(node.right);
      if(depl >= depr) {
        dep = depl + 1;
      } else {
        dep = depr + 1;
      }
    }
    return dep;
  }
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

var Node = function(x,y,r, ctx, data, height) {

  this.leftNode = null;

  this.rightNode = null;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeText(data, x, y);
  };

  this.getData = function() { return data; };
  this.getX = function() { return x; };
  this.getY = function() { return y; };
  this.getRadius = function() { return r; };

  this.leftCoordinate = function() {
  	var init = height == 1 ? 3 : height == 3 ? 1 : height;
  	console.log(height);
    return {cx: (x - (init * 3 * r)), cy: (y + (init * 3 * r))}
  };

  this.rightCoordinate = function() {
  	var init = height == 1 ? 3 : height == 3 ? 1 : height;
    return {cx: (x + (init * 3 * r)), cy: (y+(init * 3 * r))}
  };
};

var Line = function() {

  this.draw = function(x, y, toX, toY, r, ctx) {
    var moveToX = x;
    var moveToY = y + r;
    var lineToX = toX;
    var lineToY = toY - r;
    ctx.beginPath();
    ctx.moveTo(moveToX, moveToY);
    ctx.lineTo(lineToX, lineToY);
    ctx.stroke();
  };
};


var BTree = function() {
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  var line = new Line();
  this.root = null;

  var self = this;


  this.getRoot = function() { return this.root; };


  this.add = function(data, height) {

    if(this.root) {
      this.recursiveAddNode(this.root, null, null, data, height);
    } else {

      this.root = this.addAndDisplayNode(500, 20, 15, ctx, data, height);
      return;
    }
  };


  this.recursiveAddNode = function(node, prevNode, coordinateCallback, data, height) {
    if(!node) {

      var xy = coordinateCallback();
      var newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, ctx, data, height);
      line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), ctx)
      return newNode;
    }
    else {
      if(data <= node.getData()) {
        node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data, height);
      }
      else {
        node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data, height);
      }
      return node;
    }
  };

  this.addAndDisplayNode = function(x, y, r, ctx, data, height) {
    var node = new Node(x, y, r, ctx, data, height);
    node.draw();
    return node;
  };
};

var Tree = {
  tree_create: $('#tree_create'),
  tree_input: $('#tree_input'),
  tree: null,
  btree: null,
  init: function() {
    this.event();
    this.inputvalue();
    this.btree = new BTree();
    this.tree = new BinarySearchTree();
  },
  event: function() {
    var arr = []; // 중복 확인을 위한 배열
    this.tree_create.click(() => {
      if(this.tree_input.val() == "") {
        Materialize.toast('입력해주세요!', 4000, 'rounded');
        return;
      }

      if(arr.indexOf(this.tree_input.val()) > -1) {
        Materialize.toast('중복되었어요!', 4000, 'rounded');
        this.inputvalue();
        return;
      }


      this.tree.insert(this.tree_input.val());

      var node = this.tree.getRoot();
      var hegiht = this.tree.height(node);

      arr.push(this.tree_input.val());
      this.btree.add(this.tree_input.val(), this.tree.height(node));
      this.inputvalue();


    })
  },
  inputvalue: function() {
    const random = Math.floor(Math.random() * 100);
    this.tree_input.val(random);
  }
}

export default Tree;
